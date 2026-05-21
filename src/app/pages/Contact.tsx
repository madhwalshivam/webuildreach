import { useDocumentMetadata } from "../hooks/useDocumentMetadata";
import { motion } from "motion/react";
import { SubPageHero } from "../components/SubPageHero";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { Button } from "../components/ui/button";

export default function Contact() {
  useDocumentMetadata(
    "Contact | Digital Marketing Agency - WeBuildReach",
    "Get in touch with WeBuildReach. Reach out for custom web development inquiries, Meta Ads strategies, or custom CRM/ERP consultations."
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SubPageHero
        title="Get in Touch"
        subtitle="We're always open to discussing new projects, creative ideas, or opportunities to be part of your vision."
      />

      <section className="py-12 max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16">

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-extrabold text-slate-900 mb-8">Contact Information</h2>

            <div className="space-y-8">

              {/* Location */}
              <div className="flex gap-6">
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-1">Our Location</h3>
                  <p className="text-slate-600 font-medium leading-relaxed">
                    Delhi NCR, India
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex gap-6">
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Mail className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-1">Email Address</h3>
                  <p className="text-slate-600 font-medium leading-relaxed">webuildreach@gmail.com</p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex gap-6">
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Clock className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-1">Working Hours</h3>
                  <p className="text-slate-600 font-medium leading-relaxed">Mon - Sat: 10:00 AM - 8:00 PM</p>
                </div>
              </div>

            </div>
          </motion.div>

          {/* Contact Form Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-card p-10 rounded-3xl shadow-xl border border-slate-100"
          >
            <h2 className="text-3xl font-extrabold text-slate-900 mb-8">Send a Message</h2>

            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">Your Name</label>
                  <input
                    type="text"
                    required
                    className="w-full px-5 py-3.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-primary focus:bg-white transition-all text-sm"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    required
                    className="w-full px-5 py-3.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-primary focus:bg-white transition-all text-sm"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">Subject</label>
                <input
                  type="text"
                  required
                  className="w-full px-5 py-3.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-primary focus:bg-white transition-all text-sm"
                  placeholder="Project Inquiry"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">Message</label>
                <textarea
                  rows={5}
                  required
                  className="w-full px-5 py-3.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-primary focus:bg-white transition-all resize-none text-sm"
                  placeholder="Tell us about your project..."
                />
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full bg-primary hover:bg-primary/95 text-white font-bold rounded-full py-6 shadow-[0_4px_14px_rgba(90,69,253,0.3)] transition-all duration-300 hover:scale-[1.01]"
              >
                Submit Message
              </Button>
            </form>
          </motion.div>

        </div>
      </section>
    </div>
  );
}
