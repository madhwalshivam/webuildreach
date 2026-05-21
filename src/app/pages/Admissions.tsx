import { useDocumentMetadata } from "../hooks/useDocumentMetadata";
import { motion } from "motion/react";
import { SubPageHero } from "../components/SubPageHero";
import {
  ClipboardList,
  UserCheck,
  MessageSquare,
  Calendar,
  Mail as MailIcon
} from "lucide-react";
import { Button } from "../components/ui/button";

const steps = [
  {
    icon: ClipboardList,
    title: "Initial Inquiry",
    desc: "Share your project requirements and goals via our online form."
  },
  {
    icon: MessageSquare,
    title: "Strategy Call",
    desc: "We'll hop on a quick call to discuss the scope and technical feasibility."
  },
  {
    icon: UserCheck,
    title: "Proposal & Quote",
    desc: "Receive a detailed breakdown of the timeline, tech stack, and investment."
  },
  {
    icon: Calendar,
    title: "Project Kickoff",
    desc: "Once approved, we begin the development phase with regular updates."
  }
];

export default function Admissions() {
  useDocumentMetadata(
    "Book a Consultation | Digital Marketing Agency - WeBuildReach",
    "Ready to transform your business? Book a consultation with WeBuildReach. Get a strategy call, proposal, and timeline for your web and marketing needs."
  );

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <SubPageHero
        title="Start Your Project"
        subtitle="Ready to transform your business? Book a consultation with our digital marketing agency today."
        backgroundImage="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop"
      />

      {/* Process */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Our Working Process</h2>
            <p className="text-[#94A3B8] text-lg">A structured approach to delivering digital excellence</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative text-center group"
              >
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-[60%] w-full h-[2px] bg-gradient-to-r from-[#EF4444] to-transparent z-0 opacity-20" />
                )}
                <div className="w-20 h-20 bg-[#111111] rounded-2xl shadow-xl flex items-center justify-center mx-auto mb-6 relative z-10 border border-white/5 group-hover:border-[#EF4444]/50 transition-colors duration-300">
                  <step.icon className="w-10 h-10 text-[#EF4444]" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                <p className="text-[#94A3B8]">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section className="py-12 bg-white/5 border-y border-white/5">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-12">Why Consult With Us?</h2>
          <div className="grid md:grid-cols-2 gap-8 text-left">
            <div className="p-8 rounded-3xl bg-[#111111] border border-white/5">
              <h3 className="text-xl font-bold text-white mb-4">Expert Technical Guidance</h3>
              <p className="text-[#94A3B8]">Get direct insights into the best tech stack for your specific business needs, ensuring scalability and performance.</p>
            </div>
            <div className="p-8 rounded-3xl bg-[#111111] border border-white/5">
              <h3 className="text-xl font-bold text-white mb-4">Market-Driven Strategy</h3>
              <p className="text-[#94A3B8]">Our solutions are not just about code; they are built with a deep understanding of digital marketing and conversion.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Admission Form Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Info Side */}
            <div>
              <h2 className="text-4xl font-bold text-white mb-6">Let's Connect</h2>
              <p className="text-[#94A3B8] text-lg mb-8">
                Tell us about your vision. Fill out the form, and our team will get back to you within 24 hours to schedule a strategy call.
              </p>

              <div className="space-y-6">

                <div className="flex gap-4 items-start">
                  <div className="w-12 h-12 rounded-xl bg-[#111111] border border-white/5 shadow-md flex items-center justify-center shrink-0">
                    <MailIcon className="w-6 h-6 text-[#EF4444]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white">Email Support</h4>
                    <p className="text-[#94A3B8]">webuildreach@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Side */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-[#111111] rounded-3xl p-8 md:p-12 shadow-2xl border border-white/5"
            >
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-white">Your Name *</label>
                    <input type="text" className="w-full px-4 py-3 rounded-xl bg-[#050505] border border-white/10 text-white focus:border-[#EF4444] outline-none transition-all" placeholder="Enter your name" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-white">Project Type *</label>
                    <select className="w-full px-4 py-3 rounded-xl bg-[#050505] border border-white/10 text-white focus:border-[#EF4444] outline-none transition-all">
                      <option>Web Development</option>
                      <option>Software Solution</option>
                      <option>CRM/ERP System</option>
                      <option>Meta Ads/Marketing</option>
                      <option>E-commerce Store</option>
                      <option>Mobile App</option>
                    </select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-white">Company Name</label>
                    <input type="text" className="w-full px-4 py-3 rounded-xl bg-[#050505] border border-white/10 text-white focus:border-[#EF4444] outline-none transition-all" placeholder="Enter company name" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-white">Phone Number *</label>
                    <input type="tel" className="w-full px-4 py-3 rounded-xl bg-[#050505] border border-white/10 text-white focus:border-[#EF4444] outline-none transition-all" placeholder="+91 XXXXX XXXXX" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-white">Email Address</label>
                  <input type="email" className="w-full px-4 py-3 rounded-xl bg-[#050505] border border-white/10 text-white focus:border-[#EF4444] outline-none transition-all" placeholder="example@email.com" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-white">Project Brief</label>
                  <textarea rows={3} className="w-full px-4 py-3 rounded-xl bg-[#050505] border border-white/10 text-white focus:border-[#EF4444] outline-none transition-all resize-none" placeholder="Tell us about your goals..."></textarea>
                </div>

                <Button className="w-full bg-[#EF4444] hover:bg-[#DC2626] text-white py-6 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg shadow-[#EF4444]/20">
                  Book My Strategy Call
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
