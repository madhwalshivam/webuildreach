import { useState } from "react";
import { useNavigate } from "react-router";
import { supabase } from "../../../lib/supabase";
import { Loader2, Lock, Mail, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { motion } from "motion/react";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      toast.success("Logged in successfully");
      navigate("/admin");
    } catch (error: any) {
      toast.error("Login failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B0A18] via-[#110F2A] to-[#0D0B22] flex items-center justify-center p-6 relative overflow-hidden">

      {/* Background glows */}
      <div className="absolute top-[-15%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-primary/10 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-indigo-700/10 blur-[130px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-md relative"
      >
        {/* Card */}
        <div className="bg-white/[0.04] backdrop-blur-2xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
          {/* Top gradient bar */}
          <div className="h-1 w-full bg-gradient-to-r from-primary to-indigo-500" />

          <div className="p-10">
            {/* Logo / Brand */}
            <div className="text-center mb-10">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/15 border border-primary/30 mb-5">
                <ShieldCheck className="w-8 h-8 text-primary" />
              </div>
              <h1 className="text-2xl font-extrabold text-white tracking-tight">
                WeBuildReach
              </h1>
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500 mt-1">
                Admin Panel
              </p>
              <p className="text-slate-400 text-sm mt-3 font-medium">
                Sign in to manage your content
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleLogin} className="space-y-5">
              {/* Email */}
              <div className="space-y-2">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4 pointer-events-none" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="admin@webuildreach.com"
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-3.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-primary/70 focus:bg-white/8 transition-all"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4 pointer-events-none" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="••••••••••"
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-3.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-primary/70 focus:bg-white/8 transition-all"
                  />
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary hover:bg-primary/90 disabled:opacity-60 text-white font-bold py-4 rounded-full transition-all flex items-center justify-center gap-2 text-sm shadow-lg shadow-primary/25 hover:scale-[1.01] active:scale-[0.99] mt-2"
              >
                {loading ? (
                  <><Loader2 className="animate-spin w-4 h-4" /> Signing in…</>
                ) : (
                  "Sign In to Dashboard"
                )}
              </button>
            </form>

            <p className="mt-8 text-center text-[11px] text-slate-600 font-semibold">
              🔒 Protected by Supabase Auth
            </p>
          </div>
        </div>

        {/* Bottom link */}
        <p className="text-center mt-5 text-[11px] text-slate-600">
          <a href="/" className="hover:text-primary transition-colors font-semibold">
            ← Back to website
          </a>
        </p>
      </motion.div>
    </div>
  );
}
