import { motion } from "motion/react";
import { Quote, Rocket, BarChart, History } from "lucide-react";

export function FounderVision() {
  return (
    <section className="relative py-12 bg-transparent overflow-hidden">
      {/* Background ambient blobs */}
      <div className="absolute top-[20%] right-[-5%] w-[300px] h-[300px] bg-pink-100/30 rounded-full blur-[90px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Badge */}
            <span className="inline-block px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-bold uppercase tracking-wider mb-4">
              OUR AGENCY VISION
            </span>

            {/* Heading */}
            <h2 className="text-slate-900 mb-12 font-extrabold tracking-tight" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', lineHeight: 1.15 }}>
              Our Vision & Passion
            </h2>

            {/* Blockquote Card */}
            <div className="relative mb-16 inline-block text-left w-full">
              <Quote className="absolute -top-8 -left-8 w-16 h-16 text-primary opacity-10" />
              <blockquote className="relative p-8 md:p-12 bg-white border border-slate-100 rounded-3xl shadow-[0_10px_30px_rgba(90,69,253,0.03)] backdrop-blur-sm">
                <p className="text-slate-800 mb-8 leading-relaxed italic" style={{ fontSize: 'clamp(1.125rem, 2vw, 1.6rem)', fontWeight: 500 }}>
                  "We don't just build websites; we build digital growth engines. Our goal is to empower 
                  businesses with technology and creative performance marketing that is both beautiful and highly functional."
                </p>
                <footer className="text-slate-500">
                  <p className="text-slate-900 font-extrabold text-lg">WeBuildReach Team</p>
                  <p className="text-xs mt-1">Expert Web Development & Digital Marketing Agency</p>
                </footer>
              </blockquote>
            </div>

            {/* Feature Column Cards */}
            <div className="grid md:grid-cols-3 gap-8 text-left">
              
              {/* Card 1 */}
              <div className="p-6 rounded-2xl bg-white border border-slate-100 hover:border-primary/40 transition-colors duration-300 shadow-sm">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center mb-4 text-primary">
                  <History className="w-5 h-5" />
                </div>
                <h4 className="text-slate-900 font-bold mb-2">Proven Track Record</h4>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Years of experience in full-stack development and performance marketing.
                </p>
              </div>

              {/* Card 2 */}
              <div className="p-6 rounded-2xl bg-white border border-slate-100 hover:border-primary/40 transition-colors duration-300 shadow-sm">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center mb-4 text-primary">
                  <Rocket className="w-5 h-5" />
                </div>
                <h4 className="text-slate-900 font-bold mb-2">Custom Tech Ecosystem</h4>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Specialized in custom CRM, ERP, and high-conversion E-commerce solutions.
                </p>
              </div>

              {/* Card 3 */}
              <div className="p-6 rounded-2xl bg-white border border-slate-100 hover:border-primary/40 transition-colors duration-300 shadow-sm">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center mb-4 text-primary">
                  <BarChart className="w-5 h-5" />
                </div>
                <h4 className="text-slate-900 font-bold mb-2">ROI-Driven Marketing</h4>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Expert in Meta Ads strategy and data-driven conversion rate optimization.
                </p>
              </div>

            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
