import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { supabase } from "../../../lib/supabase";
import {
  Plus, Edit, Trash2, ExternalLink, LogOut,
  BookOpen, FileText, Search, Menu, X, Users,
  Calendar, LayoutDashboard, Globe, TrendingUp,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner";

export default function AdminDashboard() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [filteredBlogs, setFilteredBlogs] = useState<any[]>([]);
  const [bookingsCount, setBookingsCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState<string | null>(null);

  // Top Bar Announcement states
  const [topBarConfig, setTopBarConfig] = useState({
    title: "",
    description: "",
    canonical_url: "",
    is_published: false
  });
  const [savingTopBar, setSavingTopBar] = useState(false);

  const navigate = useNavigate();

  useEffect(() => { 
    fetchData(); 
    fetchTopBar();
  }, []);

  useEffect(() => {
    const filtered = blogs.filter((blog) =>
      blog.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.description?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredBlogs(filtered);
  }, [searchTerm, blogs]);

  const fetchTopBar = async () => {
    try {
      const { data, error } = await supabase
        .from("blogs")
        .select("*")
        .eq("slug", "site-settings-topbar")
        .maybeSingle();

      if (error) throw error;

      if (data) {
        setTopBarConfig({
          title: data.title || "",
          description: data.description || "",
          canonical_url: data.canonical_url || "",
          is_published: data.is_published || false
        });
      } else {
        // Create initial config draft
        const defaultRow = {
          title: "🔥 Special Offer: Get 20% off on all Web & Marketing services!",
          slug: "site-settings-topbar",
          content: "bg-gradient-to-r from-primary to-indigo-600 text-white",
          description: "Book Now",
          image_url: "none",
          category: "settings",
          author: "Admin",
          is_published: false,
          canonical_url: "/contact"
        };
        const { error: insertError } = await supabase
          .from("blogs")
          .insert([defaultRow]);
        if (!insertError) {
          setTopBarConfig(defaultRow);
        }
      }
    } catch (err: any) {
      console.error("Error loading topbar config:", err.message);
    }
  };

  const handleSaveTopBar = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSavingTopBar(true);
      const { error } = await supabase
        .from("blogs")
        .update({
          title: topBarConfig.title,
          description: topBarConfig.description,
          canonical_url: topBarConfig.canonical_url,
          is_published: topBarConfig.is_published
        })
        .eq("slug", "site-settings-topbar");

      if (error) throw error;
      toast.success("Top Bar Configuration saved successfully!");
    } catch (err: any) {
      toast.error("Failed to save Top Bar settings: " + err.message);
    } finally {
      setSavingTopBar(false);
    }
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const { data: blogsData, error: blogsError } = await supabase
        .from("blogs")
        .select("*")
        .neq("slug", "site-settings-topbar")
        .order("created_at", { ascending: false });
      if (blogsError) throw blogsError;
      setBlogs(blogsData || []);
      setFilteredBlogs(blogsData || []);

      const { count } = await supabase
        .from("bookings").select("*", { count: "exact", head: true });
      if (count !== null) setBookingsCount(count);
    } catch (error: any) {
      toast.error("Failed to load: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!blogToDelete) return;
    try {
      const { error } = await supabase.from("blogs").delete().eq("id", blogToDelete);
      if (error) throw error;
      setBlogs(blogs.filter((b) => b.id !== blogToDelete));
      toast.success("Blog deleted successfully");
    } catch (error: any) {
      toast.error("Delete failed: " + error.message);
    } finally { setBlogToDelete(null); }
  };

  const handleLogoutConfirm = async () => {
    await supabase.auth.signOut();
    toast.success("Logged out");
    navigate("/admin/login");
  };

  /* ── Sidebar shared nav items ── */
  const navItems = [
    { label: "Blogs List", to: "/admin", icon: BookOpen, active: true },
    { label: "Bookings", to: "/admin/bookings", icon: Calendar, badge: bookingsCount > 0 ? bookingsCount : undefined },
  ];

  return (
    <div className="min-h-screen bg-[#070611] text-white flex flex-col md:flex-row relative">

      {/* ── MOBILE HEADER ── */}
      <header className="md:hidden w-full bg-[#0D0B22]/95 backdrop-blur border-b border-white/5 px-5 py-4 flex items-center justify-between z-40 sticky top-0">
        <span className="font-extrabold text-lg text-white">
          WeBuildReach <span className="text-primary">Admin</span>
        </span>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 text-slate-400 hover:text-white bg-white/5 rounded-xl transition-all"
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </header>

      {/* ── SIDEBAR ── */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64
        bg-[#0D0B22]/95 backdrop-blur-2xl
        border-r border-white/5
        flex flex-col justify-between
        p-6 transform transition-transform duration-300
        md:translate-x-0 md:static md:h-screen
        ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
      `}>

        <div className="space-y-8">
          {/* Logo */}
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center">
                  <LayoutDashboard className="w-4 h-4 text-primary" />
                </div>
                <h1 className="text-base font-extrabold text-white leading-none">WeBuildReach</h1>
              </div>
              <p className="text-[9px] text-slate-600 font-bold uppercase tracking-[0.2em] mt-2 pl-10">Admin Panel</p>
            </div>
            <button onClick={() => setIsMobileMenuOpen(false)} className="md:hidden text-slate-500 hover:text-white">
              <X size={18} />
            </button>
          </div>

          {/* Nav */}
          <nav className="space-y-1.5">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                  item.active
                    ? "bg-primary/15 border border-primary/20 text-primary"
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <item.icon size={17} />
                {item.label}
                {item.badge !== undefined && (
                  <span className="ml-auto bg-primary/20 text-primary text-[10px] font-bold px-2 py-0.5 rounded-full border border-primary/20">
                    {item.badge}
                  </span>
                )}
              </Link>
            ))}

            <a
              href="https://webuildreach.com"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-slate-400 hover:text-white hover:bg-white/5 transition-all"
            >
              <Globe size={17} />
              Live Website
              <ExternalLink size={12} className="ml-auto opacity-50" />
            </a>
          </nav>
        </div>

        {/* Logout */}
        <div className="pt-6 border-t border-white/5">
          <button
            onClick={() => setIsLogoutModalOpen(true)}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-slate-500 hover:text-red-400 hover:bg-red-500/5 transition-all"
          >
            <LogOut size={17} />
            Logout
          </button>
        </div>
      </aside>

      {/* ── MAIN ── */}
      <div className="flex-1 min-h-screen flex flex-col">
        <main className="flex-1 p-6 md:p-10 max-w-6xl mx-auto w-full space-y-8">

          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight text-white">Dashboard</h1>
              <p className="text-slate-500 text-xs mt-1 font-medium">Manage blog posts and consultation bookings</p>
            </div>
            <Link
              to="/admin/new"
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-full text-sm font-bold transition-all shadow-lg shadow-primary/20 active:scale-95 flex-shrink-0"
            >
              <Plus size={17} /> Create New Post
            </Link>
          </div>

          {/* ── METRIC CARDS ── */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              {
                label: "Total Blogs",
                value: blogs.length,
                icon: FileText,
                color: "primary",
                bg: "bg-primary/10",
                border: "border-primary/15",
                text: "text-primary",
              },
              {
                label: "Bookings",
                value: bookingsCount,
                icon: Users,
                color: "indigo",
                bg: "bg-indigo-500/10",
                border: "border-indigo-500/15",
                text: "text-indigo-400",
              },
              {
                label: "Published",
                value: blogs.filter((b) => b.is_published).length,
                icon: TrendingUp,
                color: "emerald",
                bg: "bg-emerald-500/10",
                border: "border-emerald-500/15",
                text: "text-emerald-400",
              },
            ].map((card) => (
              <div
                key={card.label}
                className="bg-white/[0.03] border border-white/5 rounded-2xl p-6 relative overflow-hidden hover:bg-white/[0.05] transition-all"
              >
                <div className={`w-11 h-11 ${card.bg} border ${card.border} rounded-xl flex items-center justify-center mb-4`}>
                  <card.icon className={`w-5 h-5 ${card.text}`} />
                </div>
                <p className="text-[10px] uppercase font-bold tracking-wider text-slate-500 mb-1">{card.label}</p>
                <p className="text-3xl font-black text-white">{card.value}</p>
              </div>
            ))}
          </div>

          {/* Top Bar Banner Announcement Settings */}
          <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-6 space-y-6">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-white/5 pb-4">
              <div>
                <h3 className="font-extrabold text-sm text-white flex items-center gap-2">
                  📢 Site-wide Promo Announcement Banner (Top Bar)
                </h3>
                <p className="text-[10px] text-slate-500 mt-0.5">Toggle and configure the special alert bar that displays at the very top of your main site pages.</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[10px] uppercase font-black tracking-widest text-slate-400">Status:</span>
                <label className="relative inline-flex items-center cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={topBarConfig.is_published}
                    onChange={(e) => setTopBarConfig(prev => ({ ...prev, is_published: e.target.checked }))}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-slate-300 after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary peer-checked:after:bg-white peer-checked:after:border-white"></div>
                  <span className="ml-2 text-xs font-bold text-slate-300">
                    {topBarConfig.is_published ? "Active (Visible)" : "Inactive (Hidden)"}
                  </span>
                </label>
              </div>
            </div>

            <form onSubmit={handleSaveTopBar} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
              <div className="md:col-span-6 space-y-2">
                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400">Announcement Text</label>
                <input
                  type="text"
                  required
                  value={topBarConfig.title}
                  onChange={(e) => setTopBarConfig(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-primary text-slate-200 font-semibold"
                  placeholder="e.g. 🔥 Special Offer: Get 20% off on all services this week!"
                />
              </div>

              <div className="md:col-span-5 space-y-2">
                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400">Action Redirect URL</label>
                <input
                  type="text"
                  value={topBarConfig.canonical_url}
                  onChange={(e) => setTopBarConfig(prev => ({ ...prev, canonical_url: e.target.value }))}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-primary text-slate-200 font-semibold"
                  placeholder="e.g. /contact"
                />
              </div>

              <div className="md:col-span-1">
                <button
                  type="submit"
                  disabled={savingTopBar}
                  className="w-full bg-primary hover:bg-primary/95 text-white font-bold h-10 px-4 rounded-xl text-xs flex items-center justify-center transition-all cursor-pointer shadow-lg shadow-primary/20 hover:scale-[1.02]"
                >
                  {savingTopBar ? "Saving..." : "Save"}
                </button>
              </div>
            </form>
          </div>

          {/* Search */}
          <div className="relative max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={15} />
            <input
              type="text"
              placeholder="Search by title, category…"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/[0.04] border border-white/8 rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-primary/50 text-white placeholder-slate-600 transition-colors"
            />
          </div>

          {/* Blog list */}
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-10 h-10 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
            </div>
          ) : (
            <div className="grid gap-4">
              {filteredBlogs.length === 0 ? (
                <div className="text-center py-20 bg-white/[0.02] border border-white/5 rounded-3xl">
                  <BookOpen className="mx-auto mb-4 text-slate-700" size={36} />
                  <p className="text-slate-500 text-sm font-medium">No blogs found.</p>
                </div>
              ) : (
                filteredBlogs.map((blog) => (
                  <motion.div
                    key={blog.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white/[0.03] border border-white/5 rounded-2xl p-5 flex flex-col md:flex-row gap-5 items-center hover:border-primary/25 transition-all group"
                  >
                    {/* Thumbnail */}
                    <div className="w-full md:w-40 aspect-video rounded-xl overflow-hidden bg-slate-900 flex-shrink-0 border border-white/5">
                      {blog.image_url ? (
                        <img src={blog.image_url} alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-600 text-xs">No Image</div>
                      )}
                    </div>

                    {/* Meta */}
                    <div className="flex-grow min-w-0">
                      <div className="flex flex-wrap items-center gap-2.5 mb-2">
                        <span className="text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/15">
                          {blog.category || "General"}
                        </span>
                        {blog.is_published ? (
                          <span className="text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/15">
                            Published
                          </span>
                        ) : (
                          <span className="text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-500/10 text-slate-500 border border-slate-500/15">
                            Draft
                          </span>
                        )}
                        <span className="text-[10px] text-slate-600 font-medium">
                          {new Date(blog.created_at).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}
                        </span>
                      </div>
                      <h2 className="text-base font-bold mb-1 text-white group-hover:text-primary transition-colors truncate">{blog.title}</h2>
                      <p className="text-slate-500 text-xs line-clamp-2 leading-relaxed">{blog.description}</p>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 flex-shrink-0 w-full md:w-auto pt-4 md:pt-0 border-t border-white/5 md:border-0 justify-end">
                      <a
                        href={`/blogs/${blog.slug}`}
                        target="_blank"
                        rel="noreferrer"
                        className="p-3 bg-white/5 hover:bg-white/10 rounded-xl text-slate-400 hover:text-white transition-all"
                        title="View live"
                      >
                        <ExternalLink size={16} />
                      </a>
                      <Link
                        to={`/admin/edit/${blog.id}`}
                        className="p-3 bg-primary/10 hover:bg-primary/20 rounded-xl text-primary transition-all"
                        title="Edit"
                      >
                        <Edit size={16} />
                      </Link>
                      <button
                        onClick={() => setBlogToDelete(blog.id)}
                        className="p-3 bg-red-500/10 hover:bg-red-500/20 rounded-xl text-red-400 transition-all cursor-pointer"
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          )}
        </main>
      </div>

      {/* ── LOGOUT MODAL ── */}
      <AnimatePresence>
        {isLogoutModalOpen && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsLogoutModalOpen(false)}
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.4 }}
              className="relative w-full max-w-sm bg-[#0D0B22] border border-white/10 rounded-3xl p-8 shadow-2xl overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-indigo-500" />
              <h3 className="text-lg font-extrabold text-white mb-2">Logout?</h3>
              <p className="text-slate-400 text-sm mb-8 leading-relaxed">
                You'll need to sign in again to access the admin panel.
              </p>
              <div className="flex gap-3">
                <button onClick={() => setIsLogoutModalOpen(false)} className="flex-1 bg-white/5 hover:bg-white/10 text-white font-semibold py-3 rounded-xl border border-white/10 text-sm cursor-pointer transition-all">
                  Cancel
                </button>
                <button onClick={handleLogoutConfirm} className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-xl text-sm cursor-pointer transition-all shadow-lg shadow-red-600/20">
                  Logout
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── DELETE MODAL ── */}
      <AnimatePresence>
        {blogToDelete && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setBlogToDelete(null)}
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.4 }}
              className="relative w-full max-w-sm bg-[#0D0B22] border border-white/10 rounded-3xl p-8 shadow-2xl overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-red-600" />
              <h3 className="text-lg font-extrabold text-white mb-2">Delete Article?</h3>
              <p className="text-slate-400 text-sm mb-8 leading-relaxed">
                This is irreversible. The article and all metadata will be permanently removed.
              </p>
              <div className="flex gap-3">
                <button onClick={() => setBlogToDelete(null)} className="flex-1 bg-white/5 hover:bg-white/10 text-white font-semibold py-3 rounded-xl border border-white/10 text-sm cursor-pointer transition-all">
                  Keep It
                </button>
                <button onClick={handleDeleteConfirm} className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-xl text-sm cursor-pointer transition-all shadow-lg shadow-red-600/20">
                  Delete
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
