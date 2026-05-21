import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { supabase } from "../../../lib/supabase";
import {
  CheckCircle2, Trash2, Mail, Phone, Briefcase, Calendar,
  Clock, BookOpen, LogOut, Menu, X, Search, FileText, ExternalLink, ShieldCheck, LayoutDashboard, Globe
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner";

export default function AdminBookings() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [filteredBookings, setFilteredBookings] = useState<any[]>([]);
  const [blogsCount, setBlogsCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [bookingToDelete, setBookingToDelete] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => { fetchData(); }, []);

  useEffect(() => {
    const filtered = bookings.filter((b) =>
      b.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.phone?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.service?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.business_name?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredBookings(filtered);
  }, [searchTerm, bookings]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const { data: bookingsData, error: bookingsError } = await supabase
        .from("bookings").select("*").order("created_at", { ascending: false });
      if (bookingsError) throw bookingsError;
      setBookings(bookingsData || []);
      setFilteredBookings(bookingsData || []);

      const { count } = await supabase
        .from("blogs")
        .select("*", { count: "exact", head: true })
        .neq("slug", "site-settings-topbar");
      if (count !== null) setBlogsCount(count);
    } catch (error: any) {
      toast.error("Failed to load: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      const { error } = await supabase
        .from("bookings").update({ status }).eq("id", id);
      if (error) throw error;
      setBookings(bookings.map((b) => (b.id === id ? { ...b, status } : b)));
      toast.success(`Request marked as ${status}`);
    } catch (error: any) {
      toast.error("Status update failed: " + error.message);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!bookingToDelete) return;
    try {
      const { error } = await supabase.from("bookings").delete().eq("id", bookingToDelete);
      if (error) throw error;
      setBookings(bookings.filter((b) => b.id !== bookingToDelete));
      toast.success("Booking record deleted");
    } catch (error: any) {
      toast.error("Delete failed: " + error.message);
    } finally { setBookingToDelete(null); }
  };

  const handleLogoutConfirm = async () => {
    await supabase.auth.signOut();
    toast.success("Logged out");
    navigate("/admin/login");
  };

  const completedCount = bookings.filter((b) => b.status === "completed").length;
  const pendingCount = bookings.length - completedCount;

  const navItems = [
    { label: "Blogs List", to: "/admin", icon: BookOpen },
    { label: "Bookings", to: "/admin/bookings", icon: Calendar, active: true, badge: bookings.length > 0 ? bookings.length : undefined },
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
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center">
                <LayoutDashboard className="w-4 h-4 text-primary" />
              </div>
              <h1 className="text-base font-extrabold text-white leading-none">WeBuildReach</h1>
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
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-white">Booking Requests</h1>
            <p className="text-slate-500 text-xs mt-1 font-medium">Review and manage consultation requests from your site</p>
          </div>

          {/* ── METRIC CARDS ── */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              {
                label: "Total Bookings",
                value: bookings.length,
                icon: Calendar,
                bg: "bg-primary/10",
                border: "border-primary/15",
                text: "text-primary",
              },
              {
                label: "Completed Sessions",
                value: completedCount,
                icon: ShieldCheck,
                bg: "bg-emerald-500/10",
                border: "border-emerald-500/15",
                text: "text-emerald-400",
              },
              {
                label: "Pending Leads",
                value: pendingCount,
                icon: Clock,
                bg: "bg-amber-500/10",
                border: "border-amber-500/15",
                text: "text-amber-400",
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

          {/* Search */}
          <div className="relative max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={15} />
            <input
              type="text"
              placeholder="Search bookings…"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/[0.04] border border-white/8 rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-primary/50 text-white placeholder-slate-600 transition-colors"
            />
          </div>

          {/* Bookings List */}
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-10 h-10 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
            </div>
          ) : (
            <div className="grid gap-4">
              {filteredBookings.length === 0 ? (
                <div className="text-center py-20 bg-white/[0.02] border border-white/5 rounded-3xl">
                  <Calendar className="mx-auto mb-4 text-slate-700" size={36} />
                  <p className="text-slate-500 text-sm font-medium">No booking requests found.</p>
                </div>
              ) : (
                filteredBookings.map((booking) => (
                  <motion.div
                    key={booking.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white/[0.03] border border-white/5 rounded-2xl p-5 flex flex-col md:flex-row gap-5 items-start md:items-center hover:border-primary/25 transition-all group"
                  >
                    {/* Main detail area */}
                    <div className="flex-grow min-w-0 space-y-3.5">
                      <div className="flex items-center gap-3">
                        <h2 className="text-base font-bold text-white">{booking.name}</h2>
                        <span className={`text-[9px] uppercase font-black tracking-wider px-2.5 py-1 rounded-full border ${
                          booking.status === 'completed'
                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/15'
                            : 'bg-amber-500/10 text-amber-400 border-amber-500/15'
                        }`}>
                          {booking.status || "pending"}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-[11px] font-semibold text-slate-400">
                        <div className="flex items-center gap-2">
                          <Briefcase size={13} className="text-primary" />
                          <span className="truncate">{booking.service || "Unspecified"}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Mail size={13} className="text-primary" />
                          <a href={`mailto:${booking.email}`} className="truncate hover:text-white transition-colors">{booking.email}</a>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone size={13} className="text-primary" />
                          <a href={`tel:${booking.phone}`} className="truncate hover:text-white transition-colors">{booking.phone}</a>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar size={13} className="text-primary" />
                          <span>{new Date(booking.created_at).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}</span>
                        </div>
                      </div>

                      {booking.business_name && (
                        <p className="text-xs text-slate-500 font-medium">
                          Company / Project: <span className="text-slate-300">{booking.business_name}</span>
                        </p>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 flex-shrink-0 w-full md:w-auto pt-4 md:pt-0 border-t border-white/5 md:border-0 justify-end">
                      {booking.status !== 'completed' && (
                        <button
                          onClick={() => updateStatus(booking.id, 'completed')}
                          className="p-3 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 rounded-xl transition-all cursor-pointer"
                          title="Mark Completed"
                        >
                          <CheckCircle2 size={16} />
                        </button>
                      )}
                      <button
                        onClick={() => setBookingToDelete(booking.id)}
                        className="p-3 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-xl transition-all cursor-pointer"
                        title="Delete Lead"
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
        {bookingToDelete && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setBookingToDelete(null)}
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
              <h3 className="text-lg font-extrabold text-white mb-2">Delete Lead?</h3>
              <p className="text-slate-400 text-sm mb-8 leading-relaxed">
                This is irreversible. This client request record will be permanently deleted.
              </p>
              <div className="flex gap-3">
                <button onClick={() => setBookingToDelete(null)} className="flex-1 bg-white/5 hover:bg-white/10 text-white font-semibold py-3 rounded-xl border border-white/10 text-sm cursor-pointer transition-all">
                  Cancel
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
