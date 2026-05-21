import { useEffect, useState } from "react";
import { useDocumentMetadata } from "../hooks/useDocumentMetadata";
import { useParams, Link, useNavigate } from "react-router";
import { supabase } from "../../lib/supabase";
import { motion } from "motion/react";
import { Calendar, ArrowLeft, Clock, Share2, Bookmark, MoreHorizontal } from "lucide-react";
import { toast } from "sonner";
import { Button } from "../components/ui/button";
import { extractSeoMetadata } from "../utils/seoAnalyzer";

export default function BlogDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState<any>(null);
  const [recentPosts, setRecentPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [seoMeta, setSeoMeta] = useState<any>(null);

  useDocumentMetadata(
    blog ? blog.title : "Loading Article",
    blog ? blog.description : "Read this article on WeBuildReach.",
    blog ? { 
      image: blog.image_url, 
      type: "article", 
      keywords: seoMeta?.meta_keywords,
      canonical: seoMeta?.custom_canonical || `https://webuildreach.com/blogs/${slug}`,
      robots: seoMeta?.robots_meta 
        ? `${seoMeta.robots_meta.index ? "index" : "noindex"}, ${seoMeta.robots_meta.follow ? "follow" : "nofollow"}${seoMeta.robots_meta.noarchive ? ", noarchive" : ""}`
        : "index, follow",
      publisher: "https://webuildreach.com"
    } : undefined
  );

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchData();
    
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      setScrollProgress((currentScroll / totalScroll) * 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [slug]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const { data: blogData, error: blogError } = await supabase
        .from("blogs")
        .select("*")
        .eq("slug", slug)
        .single();

      if (blogError) throw blogError;
      
      const { cleanContent, metadata } = extractSeoMetadata(blogData.content);
      
      setBlog({ ...blogData, content: cleanContent });
      setSeoMeta(metadata);

      let canonicalLink = document.querySelector("link[rel='canonical']");
      if (!canonicalLink) {
        canonicalLink = document.createElement("link");
        canonicalLink.setAttribute("rel", "canonical");
        document.head.appendChild(canonicalLink);
      }
      const normalizedCanonical = metadata.custom_canonical || `https://webuildreach.com/blogs/${slug}`;
      canonicalLink.setAttribute("href", normalizedCanonical);

      const { data: recentData } = await supabase
        .from("blogs")
        .select("title, slug, image_url, created_at, category")
        .eq("is_published", true)
        .neq("id", blogData.id)
        .neq("slug", "site-settings-topbar")
        .order("created_at", { ascending: false })
        .limit(4);
      
      setRecentPosts(recentData || []);
    } catch (error: any) {
      console.error(error);
      toast.error("Article not found");
      navigate("/blogs");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-12 h-12 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
      </div>
    );
  }

  if (!blog) return null;

  return (
    <main className="bg-background min-h-screen pt-28 pb-40 text-slate-800 selection:bg-primary/20">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-[2px] z-[1000] bg-slate-100">
        <motion.div 
          className="h-full bg-gradient-to-r from-primary to-indigo-600"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Content Area */}
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-[1fr_320px] gap-12 text-left">
        
        {/* Main Article Card */}
        <article className="min-w-0">
          {/* Back link */}
          <Link to="/blogs" className="inline-flex items-center gap-2 text-slate-500 hover:text-primary text-xs font-semibold uppercase tracking-widest transition-colors group mb-6">
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Back to journal
          </Link>

          {/* Card with image at top */}
          <div className="bg-white border border-slate-100 rounded-3xl shadow-lg overflow-hidden relative">
            {/* Featured Image inside card */}
            <div className="relative aspect-[16/9] overflow-hidden">
              <img 
                src={blog.image_url} 
                alt={blog.title} 
                className="w-full h-full object-cover"
              />
              {/* Category badge on image */}
              <div className="absolute top-5 left-5">
                <span className="px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-primary/90 text-white backdrop-blur-sm">
                  {blog.category}
                </span>
              </div>
            </div>

            {/* Title & meta below image, inside the card */}
            <div className="p-8 md:p-12 space-y-6">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-[1.15] tracking-tight text-slate-900">
                {blog.title}
              </h2>

              <div className="flex flex-wrap items-center gap-6">
                <div className="flex flex-wrap items-center gap-5 text-[11px] font-bold uppercase tracking-widest text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <Calendar size={13} className="text-primary" /> {new Date(blog.created_at).toLocaleDateString()}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock size={13} className="text-primary" /> {Math.ceil((blog.content?.length || 0) / 1000)} min read
                  </span>
                  {seoMeta && seoMeta.rating_value && (
                    <span className="flex items-center gap-1.5 bg-[#FAF9F6] border border-amber-200/50 px-2 py-0.5 rounded-md text-slate-700">
                      <span className="text-amber-500 text-xs">★</span>
                      <span>{seoMeta.rating_value}</span>
                      <span className="text-[9px] text-slate-400 font-semibold lowercase">({seoMeta.rating_count} reviews)</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Divider */}
              <div className="w-full h-px bg-slate-100" />
            
              {/* Article Description */}
              {blog.description && (
                <p className="text-lg md:text-xl text-slate-600 font-medium leading-relaxed border-l-2 border-primary/50 pl-6 italic">
                  {blog.description}
                </p>
              )}

              <div className="flex items-center justify-between py-6 border-y border-slate-100">
                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => {
                      navigator.clipboard.writeText(window.location.href);
                      toast.success("Link copied to clipboard!");
                    }}
                    className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-widest text-slate-500 hover:text-primary transition-colors"
                  >
                    <Share2 size={16} className="text-primary" /> Share
                  </button>
                 
                </div>
                <button className="text-slate-400 hover:text-primary transition-colors">
                  <MoreHorizontal size={20} />
                </button>
              </div>

              {/* Body Content */}
              <div 
                className="blog-content"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />

              {/* Tags & Author */}
              <div className="mt-16 pt-10 border-t border-slate-100 space-y-10">
               

                <div className="flex flex-col md:flex-row gap-6 items-center p-6 rounded-2xl bg-slate-50 border border-slate-100">
                  
                  <div className="space-y-1 text-center md:text-left">
                    <h3 className="text-lg font-semibold text-slate-900">Written by {blog.author || "WeBuildReach Team"}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed max-w-md">
                      WeBuildReach is a premium digital agency focused on building premium, high-performance web experiences.
                    </p>
                  </div>
                </div>
              </div>

            </div>{/* end p-8 md:p-12 */}
          </div>{/* end card */}
        </article>

        {/* Sidebar */}
        <aside>
          <div className="sticky top-24 space-y-12">
            
            {/* Sidebar Heading */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-1 h-5 bg-primary rounded-full" />
                <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Related Insight</h3>
              </div>
              <div className="space-y-4">
                {recentPosts.map((post) => (
                  <RecentCard key={post.slug} post={post} accentColor="#5A45FD" compact />
                ))}
              </div>
            </div>

            {/* Quick Booking Form Card */}
            <div className="p-8 rounded-[32px] bg-card border border-slate-100 relative overflow-hidden shadow-xl">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-[60px] pointer-events-none" />
              <div className="relative z-10 space-y-6">
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-slate-900 tracking-tight">Quick Booking</h3>
                  <p className="text-[11px] text-slate-500 leading-relaxed font-semibold">Fill the form below to book a professional service.</p>
                </div>

                <form 
                  onSubmit={async (e) => {
                    e.preventDefault();
                    const target = e.target as any;
                    const loadingToast = toast.loading("Sending request...");
                    
                    try {
                      const { error } = await supabase.from("bookings").insert([{
                        name: target.name.value,
                        email: target.email.value,
                        service: target.service.value,
                        phone: target.phone.value,
                        business_name: "Blog Inquiry"
                      }]);

                      if (error) throw error;
                      toast.success("Request sent! We will contact you soon.", { id: loadingToast });
                      target.reset();
                    } catch (err: any) {
                      toast.error("Failed to send: " + err.message, { id: loadingToast });
                    }
                  }}
                  className="space-y-4"
                >
                  <input 
                    name="name"
                    type="text" 
                    placeholder="Your Name" 
                    required
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-primary/50 text-slate-800" 
                  />
                  <input 
                    name="email"
                    type="email" 
                    placeholder="Email Address" 
                    required
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-primary/50 text-slate-800" 
                  />
                  <input 
                    name="phone"
                    type="tel" 
                    placeholder="Phone (+91)" 
                    required
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-primary/50 text-slate-800" 
                  />
                  <select 
                    name="service"
                    required
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-primary/50 text-slate-500"
                  >
                    <option value="">Select Service</option>
                    <option value="web-dev">Web Development</option>
                    <option value="app-dev">App Development</option>
                    <option value="seo">SEO & Marketing</option>
                    <option value="uiux">UI/UX Design</option>
                  </select>
                  <Button 
                    type="submit"
                    className="w-full bg-primary hover:bg-primary/95 text-white font-bold py-6 rounded-xl transition-all text-xs uppercase tracking-widest shadow-lg shadow-primary/20"
                  >
                    Get a Free Quote
                  </Button>
                </form>
              </div>
            </div>

          </div>
        </aside>

      </div>

      <style>{`
        .blog-content {
          color: #475569;
          line-height: 1.8;
          font-size: 1.125rem;
          word-wrap: break-word;
          overflow-wrap: break-word;
          max-width: 100%;
        }
        .blog-content h1 { 
          font-size: 2.25rem; 
          font-weight: 800; 
          color: #0F172A; 
          margin: 4rem 0 2rem; 
          letter-spacing: -0.03em; 
          line-height: 1.2; 
        }
        .blog-content h2 { 
          font-size: 1.75rem; 
          font-weight: 800; 
          color: #0F172A; 
          margin: 3.5rem 0 1.5rem; 
          letter-spacing: -0.02em; 
          line-height: 1.25; 
        }
        .blog-content h3 { 
          font-size: 1.4rem; 
          font-weight: 800; 
          color: #0F172A; 
          margin: 2.5rem 0 1rem; 
          letter-spacing: -0.01em;
        }
        .blog-content p { 
          margin-bottom: 1.5rem; 
        }
        .blog-content strong { color: #0F172A; font-weight: 700; }
        .blog-content a {
          color: #5A45FD;
          font-weight: 700;
          text-decoration: underline;
          text-underline-offset: 4px;
          transition: color 0.2s ease, text-decoration-color 0.2s ease;
        }
        .blog-content a:hover {
          color: #4338CA;
          text-decoration-color: #4338CA;
        }
        .blog-content blockquote {
          background: #F8FAFC;
          border-left: 4px solid #5A45FD;
          padding: 2rem;
          border-radius: 0 16px 16px 0;
          font-style: italic;
          color: #334155;
          margin: 3rem 0;
          font-size: 1.25rem;
        }
        .blog-content ul { list-style: none; padding-left: 0; margin-bottom: 1.5rem; }
        .blog-content ul li { 
          position: relative;
          padding-left: 1.5rem;
          margin-bottom: 0.75rem;
        }
        .blog-content ul li::before {
          content: "•";
          position: absolute;
          left: 0;
          color: #5A45FD;
          font-weight: bold;
        }
        .blog-content img { 
          border-radius: 24px; 
          margin: 3rem 0; 
          width: 100%; 
          height: auto; 
          border: 1px solid #E2E8F0; 
        }
        .blog-content pre { 
          background: #0B0F19; 
          padding: 1.5rem; 
          border-radius: 20px; 
          border: 1px solid #1E293B; 
          overflow-x: auto; 
          margin: 2.5rem 0; 
        }
        .blog-content code { 
          font-family: 'JetBrains Mono', monospace; 
          color: #EC4899; 
          font-size: 0.9em; 
          padding: 0.1rem 0.3rem;
          background: #F1F5F9;
          border-radius: 4px;
        }
      `}</style>
      {seoMeta && (
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": window.location.href
            },
            "headline": blog.title,
            "description": blog.description,
            "image": blog.image_url,
            "author": {
              "@type": "Person",
              "name": blog.author || "WeBuildReach Team"
            },
            "publisher": {
              "@type": "Organization",
              "name": "WeBuildReach",
              "logo": {
                "@type": "ImageObject",
                "url": "https://webuildreach.com/logo.png"
              }
            },
            "datePublished": blog.created_at,
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": seoMeta.rating_value || "4.8",
              "ratingCount": seoMeta.rating_count || "125",
              "bestRating": "5",
              "worstRating": "1"
            }
          })}
        </script>
      )}
    </main>
  );
}

/* Reusable Recent Post Card */
function RecentCard({ post, accentColor, compact = false }: { post: any; accentColor: string; compact?: boolean }) {
  return (
    <Link to={`/blogs/${post.slug}`} className="group flex gap-3 items-start p-3 rounded-2xl hover:bg-slate-50 transition-all text-left">
      <div className={`${compact ? "w-16 h-16" : "w-20 h-20"} rounded-xl overflow-hidden flex-shrink-0 border border-slate-100`}>
        <img src={post.image_url} alt={post.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
      </div>
      <div className="flex-1 min-w-0 py-0.5">
        <span className="text-[9px] font-black uppercase tracking-wider mb-1 block" style={{ color: accentColor }}>
          {post.category}
        </span>
        <h4 className="text-sm font-bold text-slate-700 line-clamp-2 group-hover:text-primary transition-colors leading-snug mb-1">
          {post.title}
        </h4>
        <p className="text-[10px] text-slate-400 font-semibold">
          {new Date(post.created_at).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}
        </p>
      </div>
    </Link>
  );
}
