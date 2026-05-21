import { useEffect, useState } from "react";
import { useDocumentMetadata } from "../hooks/useDocumentMetadata";
import { Link } from "react-router";
import { motion } from "motion/react";
import { Home, BookOpen, ArrowRight } from "lucide-react";
import { supabase } from "../../lib/supabase";

export default function NotFound() {
  const [recentBlogs, setRecentBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useDocumentMetadata(
    "404 - Page Not Found | WeBuildReach",
    "The page you are looking for does not exist on WeBuildReach. Return to our home page or explore our latest dynamic blog insights."
  );

  useEffect(() => {
    fetchRecentBlogs();
  }, []);

  const fetchRecentBlogs = async () => {
    try {
      const { data, error } = await supabase
        .from("blogs")
        .select("title, slug, image_url, created_at, category")
        .eq("is_published", true)
        .neq("slug", "site-settings-topbar")
        .order("created_at", { ascending: false })
        .limit(3);

      if (error) throw error;
      setRecentBlogs(data || []);
    } catch (err) {
      console.error("Error fetching recent blogs on 404:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="bg-slate-50 min-h-screen pt-32 pb-24 px-6 text-slate-800 overflow-hidden relative">
      {/* Ambient background glows */}
      <div className="absolute top-[20%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[35vw] h-[35vw] rounded-full bg-indigo-400/5 blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto text-center relative z-10 space-y-16">
        {/* Animated 404 & Text */}
        <div className="space-y-6">
          <motion.h1
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-[9rem] md:text-[12rem] font-extrabold leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-primary to-indigo-800 select-none filter drop-shadow-[0_4px_30px_rgba(90,69,253,0.15)]"
          >
            404
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-2xl md:text-4xl font-extrabold tracking-tight text-slate-900"
          >
            Lost in the Digital Reach?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-slate-500 max-w-lg mx-auto text-sm md:text-base leading-relaxed font-medium"
          >
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </motion.p>
        </div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto"
        >
          <Link
            to="/"
            className="w-full sm:w-auto h-12 inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/95 text-white font-bold px-8 rounded-full transition-all duration-300 shadow-lg shadow-primary/20 active:scale-95 text-sm"
          >
            <Home size={16} />
            Go to Home Page
          </Link>

          <Link
            to="/blogs"
            className="w-full sm:w-auto h-12 inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-bold px-8 rounded-full transition-all duration-300 shadow-sm active:scale-95 text-sm"
          >
            <BookOpen size={16} />
            Explore Blogs
          </Link>
        </motion.div>

        {/* Recent Blogs Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="pt-12 border-t border-slate-200/60 space-y-8"
        >
          <div className="flex flex-col items-center justify-center gap-2 text-center">
            <span className="text-primary text-xs font-bold tracking-[0.2em] uppercase">Recommended Reads</span>
            <h3 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight">Our Latest Journal Insights</h3>
          </div>

          {loading ? (
            <div className="grid md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-slate-100 rounded-3xl aspect-[4/3] animate-pulse border border-slate-200/50"></div>
              ))}
            </div>
          ) : recentBlogs.length === 0 ? (
            <p className="text-slate-400 italic text-sm font-medium">No articles available at the moment.</p>
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              {recentBlogs.map((post) => (
                <Link
                  key={post.slug}
                  to={`/blogs/${post.slug}`}
                  className="group block bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl hover:border-primary/30 transition-all duration-500"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={post.image_url}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider bg-primary/90 text-white backdrop-blur-sm">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-5 space-y-2">
                    <h4 className="text-base font-bold text-slate-800 group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                      {post.title}
                    </h4>
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-primary group-hover:gap-3 transition-all">
                      Read Story <ArrowRight size={12} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </main>
  );
}
