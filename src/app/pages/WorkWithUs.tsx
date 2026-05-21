import { useDocumentMetadata } from "../hooks/useDocumentMetadata";
import { SubPageHero } from "../components/SubPageHero";
import { motion } from "motion/react";
import { Briefcase, MapPin, Clock, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "../../lib/supabase";
import { Button } from "../components/ui/button";

const positions = [
  {
    title: "Frontend Engineer (React / Next.js)",
    location: "Remote / Delhi NCR",
    type: "Full-Time",
    desc: "Looking for an expert React developer with deep understanding of Tailwind CSS, state management, and page performance optimizations."
  },
  {
    title: "Performance Marketer (Meta Ads Specialist)",
    location: "Remote / Delhi NCR",
    type: "Full-Time",
    desc: "Responsible for setting up, managing, and scaling high-ROI Facebook/Instagram ad sets, tracking Pixel/CAPI errors, and building strategy reports."
  },
  {
    title: "UI/UX & Graphic Designer",
    location: "Remote",
    type: "Full-Time / Contract",
    desc: "Seeking a designer to build stunning website interfaces, brand guidelines, and high-converting marketing creative materials."
  }
];

export default function WorkWithUs() {
  useDocumentMetadata(
    "Work With Us | WeBuildReach",
    "Join the WeBuildReach team. Explore careers in frontend development, performance marketing, Meta Ads management, and UI/UX design."
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as any;
    const loadingToast = toast.loading("Submitting application...");

    try {
      const { error } = await supabase.from("bookings").insert([{
        name: target.name.value,
        email: target.email.value,
        service: "career",
        phone: target.phone.value,
        business_name: `Role: ${target.role.value} | Portfolio: ${target.portfolio.value}`
      }]);

      if (error) throw error;
      toast.success("Application successfully submitted! We will review your profile.", { id: loadingToast });
      target.reset();
    } catch (err: any) {
      toast.error("Submission failed: " + err.message, { id: loadingToast });
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SubPageHero
        title="Work With Us"
        subtitle="Join our team of creative designers, developers, and growth marketers building premium digital products."
      />

      <section className="py-12 max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16">

        {/* Open Positions list */}
        <div className="space-y-8">
          <div className="space-y-3">
            <span className="text-primary text-xs font-bold uppercase tracking-[0.2em]">Careers</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">Open Opportunities</h2>
            <p className="text-slate-500 font-medium text-sm md:text-base leading-relaxed">
              We are constantly seeking passionate, dedicated individuals who want to push boundaries and design future-proof digital architectures.
            </p>
          </div>

          <div className="space-y-6">
            {positions.map((pos, index) => (
              <motion.div
                key={pos.title}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="p-6 rounded-3xl bg-card border border-slate-100 shadow-sm space-y-4 hover:border-primary/50 transition-all duration-300 group"
              >
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-primary transition-colors">{pos.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{pos.desc}</p>

                <div className="flex flex-wrap gap-4 text-xs font-semibold text-slate-400">
                  <span className="flex items-center gap-1">
                    <MapPin size={14} className="text-primary" /> {pos.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={14} className="text-primary" /> {pos.type}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Application Form */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-card p-10 rounded-3xl border border-slate-100 shadow-xl relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-primary to-indigo-600" />
            <h2 className="text-2xl font-extrabold text-slate-900 mb-2">Apply Now</h2>
            <p className="text-slate-500 text-xs font-medium mb-8">Submit your portfolio details and we will schedule an introductory call.</p>

            <form onSubmit={handleSubmit} className="space-y-6">

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">Your Name</label>
                  <input
                    name="name"
                    type="text"
                    required
                    className="w-full px-5 py-3.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-primary focus:bg-white transition-all text-sm"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">Email Address</label>
                  <input
                    name="email"
                    type="email"
                    required
                    className="w-full px-5 py-3.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-primary focus:bg-white transition-all text-sm"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">Phone Number</label>
                  <input
                    name="phone"
                    type="tel"
                    required
                    className="w-full px-5 py-3.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-primary focus:bg-white transition-all text-sm"
                    placeholder="+91..."
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">Select Role</label>
                  <select
                    name="role"
                    required
                    className="w-full px-5 py-3.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:border-primary focus:bg-white transition-all text-sm"
                  >
                    <option value="frontend">Frontend Developer</option>
                    <option value="marketer">Performance Marketer</option>
                    <option value="designer">UI/UX Designer</option>
                    <option value="other">Other / Internship</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">Portfolio Link (GitHub / Behance)</label>
                <input
                  name="portfolio"
                  type="url"
                  required
                  className="w-full px-5 py-3.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-primary focus:bg-white transition-all text-sm"
                  placeholder="https://..."
                />
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full py-6 bg-primary hover:bg-primary/95 text-white font-bold rounded-full shadow-[0_4px_14px_rgba(90,69,253,0.3)] transition-all duration-300 hover:scale-[1.01] text-sm flex items-center justify-center gap-2"
              >
                Submit Application
                <ArrowRight size={16} />
              </Button>

            </form>
          </motion.div>
        </div>

      </section>
    </div>
  );
}
