import { useEffect, useState } from "react";
import { useDocumentMetadata } from "../hooks/useDocumentMetadata";
import { SubPageHero } from "../components/SubPageHero";
import { motion } from "motion/react";
import { Calendar, ArrowRight, User } from "lucide-react";
import { Link } from "react-router";
import { supabase } from "../../lib/supabase";

export default function Blogs() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useDocumentMetadata(
    "Blogs | WeBuildReach - Insights & Innovation",
    "Read our latest blog posts and articles on Web Development, custom software, CRM, ERP, and performance marketing strategies."
  );

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const { data, error } = await supabase
        .from("blogs")
        .select("*")
        .eq("is_published", true)
        .neq("slug", "site-settings-topbar")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setBlogs(data || []);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="bg-background text-foreground min-h-screen">
      {/* Hero */}
      <SubPageHero
        title="Our Journal"
        subtitle="Deep dives into modern web technologies, design systems, and digital growth strategies."
      />

      {/* Blog Cards */}
      <section className="py-16 md:py-24 px-6">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 animate-pulse">
                  <div className="aspect-[16/10] bg-slate-100" />
                  <div className="p-6 space-y-3">
                    <div className="h-4 bg-slate-100 rounded-full w-1/3" />
                    <div className="h-6 bg-slate-100 rounded-full w-full" />
                    <div className="h-4 bg-slate-100 rounded-full w-2/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : blogs.length === 0 ? (
            <div className="text-center py-32 bg-white rounded-3xl border border-slate-100 shadow-sm">
              <p className="text-slate-400 text-lg font-bold">Curating excellence. Check back soon!</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05, duration: 0.5 }}
                  className="group"
                >
                  <Link
                    to={`/blogs/${post.slug}`}
                    className="block bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl hover:border-primary/30 transition-all duration-500"
                  >
                    {/* Image inside the card */}
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <img
                        src={post.image_url}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      {/* Category badge */}
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-primary/90 text-white backdrop-blur-sm">
                          {post.category}
                        </span>
                      </div>
                    </div>

                    {/* Text content inside the card */}
                    <div className="p-6 space-y-3">
                      {/* Meta row */}
                      <div className="flex items-center gap-3 text-[11px] font-semibold text-slate-400">
                        <span className="flex items-center gap-1.5">
                          <Calendar size={12} className="text-primary" />
                          {new Date(post.created_at).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </span>
                        <span className="w-1 h-1 rounded-full bg-slate-300" />
                        <span className="flex items-center gap-1">
                          <User size={12} />
                          {post.author}
                        </span>
                      </div>

                      {/* Title */}
                      <h2 className="text-lg font-extrabold text-slate-900 leading-snug group-hover:text-primary transition-colors duration-300 line-clamp-2">
                        {post.title}
                      </h2>

                      {/* Description */}
                      <p className="text-slate-500 text-sm leading-relaxed line-clamp-2">
                        {post.description}
                      </p>

                      {/* Read more */}
                      <div className="pt-3 flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-wider group-hover:gap-3 transition-all duration-300">
                        Read Article <ArrowRight size={14} />
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
