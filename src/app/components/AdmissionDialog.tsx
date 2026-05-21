import { useState } from "react";
import { Dialog, DialogContent } from "./ui/dialog";
import { Button } from "./ui/button";
import { motion, AnimatePresence } from "motion/react";
import {
  CheckCircle2,
  Send,
  Loader2,
  User,
  Mail,
  Phone,
  Briefcase,
  ChevronDown,
  IndianRupee,
} from "lucide-react";
import { supabase } from "../../lib/supabase";
import { toast } from "sonner";

interface AdmissionDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const services = [
  "Web Development",
  "Software Development",
  "CRM Solutions",
  "School ERP",
  "Meta Ads & Marketing",
  "Graphic Design",
  "App Development",
  "E-commerce Solutions",
];

/* Budget ranges keyed by service */
const budgetRanges: Record<string, string[]> = {
  "Web Development": [
    "₹15,000 – ₹30,000 (Landing Page)",
    "₹30,000 – ₹60,000 (Business Website)",
    "₹60,000 – ₹1,20,000 (Custom Web App)",
    "₹1,20,000 – ₹3,00,000 (Enterprise Platform)",
    "₹3,00,000+ (Complex System)",
  ],
  "Software Development": [
    "₹30,000 – ₹75,000 (Basic Tool)",
    "₹75,000 – ₹2,00,000 (Mid-range Software)",
    "₹2,00,000 – ₹5,00,000 (Advanced System)",
    "₹5,00,000+ (Enterprise Software)",
  ],
  "CRM Solutions": [
    "₹25,000 – ₹60,000 (Basic CRM)",
    "₹60,000 – ₹1,50,000 (Mid CRM + Automation)",
    "₹1,50,000 – ₹4,00,000 (Advanced CRM)",
    "₹4,00,000+ (Full Custom CRM)",
  ],
  "School ERP": [
    "₹40,000 – ₹80,000 (Small School)",
    "₹80,000 – ₹2,00,000 (Mid School / College)",
    "₹2,00,000 – ₹5,00,000 (Large Institution)",
    "₹5,00,000+ (Multi-Branch ERP)",
  ],
  "Meta Ads & Marketing": [
    "₹10,000 – ₹25,000/mo (Starter Campaign)",
    "₹25,000 – ₹60,000/mo (Growth Package)",
    "₹60,000 – ₹1,50,000/mo (Scale Package)",
    "₹1,50,000+/mo (Premium Ads Management)",
  ],
  "Graphic Design": [
    "₹5,000 – ₹15,000 (Logo + Brand Kit)",
    "₹15,000 – ₹40,000 (Full Brand Identity)",
    "₹5,000 – ₹20,000/mo (Social Media Pack)",
    "₹20,000 – ₹60,000 (Marketing Collaterals)",
  ],
  "App Development": [
    "₹40,000 – ₹80,000 (Basic App)",
    "₹80,000 – ₹2,00,000 (Mid App + API)",
    "₹2,00,000 – ₹5,00,000 (Advanced App)",
    "₹5,00,000+ (Enterprise Mobile App)",
  ],
  "E-commerce Solutions": [
    "₹20,000 – ₹50,000 (Basic Store)",
    "₹50,000 – ₹1,20,000 (Feature-rich Store)",
    "₹1,20,000 – ₹3,00,000 (Custom E-commerce)",
    "₹3,00,000+ (Marketplace / B2B Portal)",
  ],
};

export function AdmissionDialog({ isOpen, onClose }: AdmissionDialogProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    service: "",
    budget: "",
    business: "",
    phone: "",
    email: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.from("bookings").insert([
        {
          name: formData.name,
          service: `${formData.service}${formData.budget ? ` | Budget: ${formData.budget}` : ""}`,
          business_name: formData.business,
          phone: formData.phone,
          email: formData.email,
        },
      ]);
      if (error) throw error;
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({ name: "", service: "", budget: "", business: "", phone: "", email: "" });
        onClose();
      }, 4000);
    } catch (error: any) {
      toast.error("Failed to send request: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInput = (field: string, value: string) => {
    setFormData((prev) => {
      // Reset budget when service changes
      if (field === "service") return { ...prev, service: value, budget: "" };
      return { ...prev, [field]: value };
    });
  };

  const budgets = formData.service ? budgetRanges[formData.service] ?? [] : [];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      {/* ── hideCloseButton removes the default Radix X so we don't get two ── */}
      <DialogContent
        hideClose
        className="sm:max-w-[560px] p-0 overflow-hidden rounded-3xl border border-slate-100 shadow-2xl shadow-primary/10 bg-white"
      >
        <AnimatePresence mode="wait">
          {!isSubmitted ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* ── Gradient Top Banner ── */}
              <div className="relative bg-gradient-to-br from-primary to-indigo-600 px-8 pt-7 pb-8 overflow-hidden">
                <div className="absolute top-[-40%] right-[-10%] w-52 h-52 rounded-full bg-white/10 blur-2xl pointer-events-none" />
                <div className="absolute bottom-[-30%] left-[-10%] w-40 h-40 rounded-full bg-indigo-400/20 blur-2xl pointer-events-none" />

                {/* Single custom close button */}
                <button
                  type="button"
                  onClick={onClose}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/15 hover:bg-white/30 flex items-center justify-center transition-all duration-200 z-10 text-white"
                  aria-label="Close"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </button>

                <div className="relative z-10">
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-white text-[10px] font-bold uppercase tracking-widest mb-4">
                    Free Consultation
                  </span>
                  <h2 className="text-2xl font-extrabold text-white leading-tight mb-1">
                    Book a Consultation
                  </h2>
                  <p className="text-white/75 text-sm font-medium">
                    Fill the form and our team will contact you within 24&nbsp;hours.
                  </p>
                </div>
              </div>

              {/* ── Form Body ── */}
              <form onSubmit={handleSubmit} className="px-8 py-6 space-y-4">

                {/* Row 1 – Name + Service */}
                <div className="grid grid-cols-2 gap-4">
                  {/* Name */}
                  <div className="space-y-1.5">
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500">
                      Your Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 pointer-events-none" />
                      <input
                        type="text"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => handleInput("name", e.target.value)}
                        required
                        className="w-full pl-10 pr-4 py-3 text-sm rounded-xl border border-slate-200 bg-slate-50 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-primary focus:bg-white transition-all"
                      />
                    </div>
                  </div>

                  {/* Service */}
                  <div className="space-y-1.5">
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500">
                      Service Needed
                    </label>
                    <div className="relative">
                      <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 pointer-events-none" />
                      <select
                        value={formData.service}
                        onChange={(e) => handleInput("service", e.target.value)}
                        required
                        className="w-full pl-4 pr-9 py-3 text-sm rounded-xl border border-slate-200 bg-slate-50 text-slate-700 focus:outline-none focus:border-primary focus:bg-white transition-all appearance-none"
                      >
                        <option value="" disabled>Select service</option>
                        {services.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Budget dropdown — animates in only after service is selected */}
                <AnimatePresence>
                  {formData.service && budgets.length > 0 && (
                    <motion.div
                      key="budget"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="space-y-1.5 pt-1">
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500">
                          Estimated Budget
                        </label>
                        <div className="relative">
                          <IndianRupee className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 pointer-events-none" />
                          <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 pointer-events-none" />
                          <select
                            value={formData.budget}
                            onChange={(e) => handleInput("budget", e.target.value)}
                            required
                            className="w-full pl-10 pr-9 py-3 text-sm rounded-xl border border-primary/40 bg-primary/5 text-slate-700 focus:outline-none focus:border-primary focus:bg-white transition-all appearance-none font-medium"
                          >
                            <option value="" disabled>Select your budget range</option>
                            {budgets.map((b) => (
                              <option key={b} value={b}>{b}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Business Name */}
                <div className="space-y-1.5">
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    Business / Project Name
                  </label>
                  <div className="relative">
                    <Briefcase className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 pointer-events-none" />
                    <input
                      type="text"
                      placeholder="Your business name"
                      value={formData.business}
                      onChange={(e) => handleInput("business", e.target.value)}
                      required
                      className="w-full pl-10 pr-4 py-3 text-sm rounded-xl border border-slate-200 bg-slate-50 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-primary focus:bg-white transition-all"
                    />
                  </div>
                </div>

                {/* Row 3 – Phone + Email */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500">Phone</label>
                    <div className="relative">
                      <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 pointer-events-none" />
                      <input
                        type="tel"
                        placeholder="+91 00000 00000"
                        value={formData.phone}
                        onChange={(e) => handleInput("phone", e.target.value)}
                        required
                        className="w-full pl-10 pr-4 py-3 text-sm rounded-xl border border-slate-200 bg-slate-50 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-primary focus:bg-white transition-all"
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 pointer-events-none" />
                      <input
                        type="email"
                        placeholder="you@example.com"
                        value={formData.email}
                        onChange={(e) => handleInput("email", e.target.value)}
                        required
                        className="w-full pl-10 pr-4 py-3 text-sm rounded-xl border border-slate-200 bg-slate-50 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-primary focus:bg-white transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* Submit */}
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-primary hover:bg-primary/95 text-white py-6 rounded-full font-bold text-base shadow-lg shadow-primary/25 transition-all duration-300 hover:scale-[1.01] flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <><Loader2 className="w-5 h-5 animate-spin" /> Sending…</>
                  ) : (
                    <><span>Book Appointment</span><Send className="w-4 h-4" /></>
                  )}
                </Button>

                <p className="text-center text-[10px] text-slate-400 font-medium pb-1">
                  No spam. We'll only use your info to contact you about this project.
                </p>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.88 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="p-14 flex flex-col items-center text-center"
            >
              <div className="relative mb-6">
                <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl scale-125" />
                <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-primary to-indigo-600 flex items-center justify-center shadow-xl shadow-primary/30">
                  <CheckCircle2 className="w-11 h-11 text-white" />
                </div>
              </div>
              <h2 className="text-2xl font-extrabold text-slate-900 mb-3">Request Sent! 🎉</h2>
              <p className="text-slate-500 font-medium leading-relaxed max-w-xs">
                Thank you for reaching out. Our team will review your project details and get back to you within&nbsp;
                <span className="text-primary font-bold">24 hours</span>.
              </p>
              <div className="mt-8 w-full h-1 rounded-full bg-slate-100 overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-primary to-indigo-600 rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 4, ease: "linear" }}
                />
              </div>
              <p className="text-[10px] text-slate-400 font-semibold mt-2">Closing automatically…</p>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}
