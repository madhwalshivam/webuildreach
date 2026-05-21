import { motion } from "motion/react";
import { Play, Check, Shield, Target } from "lucide-react";
import { useState } from "react";
import { AdmissionDialog } from "./AdmissionDialog";

export function AcademicEcosystem() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <section className="relative py-24 bg-transparent overflow-hidden">
      {/* Background ambient light */}
      <div className="absolute bottom-[10%] left-[-5%] w-[400px] h-[400px] bg-purple-100/30 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-bold uppercase tracking-wider mb-4">
            TAILORED SOLUTIONS
          </span>
          <h2 id="detailed-services" className="text-slate-900 font-extrabold tracking-tight mb-4" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', lineHeight: 1.15 }}>
            Tailored Solutions, Proven Results,<br className="hidden md:inline" /> and Exceptional Service
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto text-base">
            We focus on delivering premium digital structures that drive engagement and maximize client ROI.
          </p>
        </motion.div>

        {/* Content Layout */}
        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Card: Large Video / Image Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 group relative rounded-3xl overflow-hidden shadow-xl border border-slate-100 cursor-pointer min-h-[400px] flex flex-col justify-end"
            onClick={() => setIsDialogOpen(true)}
          >
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop"
                alt="WeBuildReach Collaboration Video"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent" />
            </div>

            {/* Play Button Overlay */}
           

            {/* Content overlay */}
            <div className="relative z-20 p-8 md:p-12 text-left">
              <span className="text-xs font-bold uppercase tracking-wider text-pink-400 mb-2 block">
                Who We Are
              </span>
              <h3 className="text-white font-extrabold text-2xl md:text-3xl tracking-tight leading-tight max-w-xl group-hover:text-primary transition-colors duration-300">
                Explore Our Unique Value Proposition & How We Drive Business Growth
              </h3>
            </div>
          </motion.div>

          {/* Right Cards: Two Checklist Features */}
          <div className="lg:col-span-5 flex flex-col gap-6 justify-between">
            
            {/* Card 1: Support */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="p-8 rounded-3xl bg-white border border-slate-100 shadow-sm flex flex-col justify-between relative hover:border-primary/40 transition-colors duration-300 group"
            >
              <div className="absolute top-6 right-6 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <Check className="w-4 h-4" />
              </div>
              
              <div>
                <span className="inline-block px-3 py-1 rounded-full bg-primary/5 text-primary text-[10px] font-bold tracking-widest uppercase mb-4">
                  SUPPORT
                </span>
                
                <h4 className="text-slate-900 font-extrabold text-lg md:text-xl mb-3 leading-snug">
                  We do more than just a service provider, we're your partner in success
                </h4>
                
                <p className="text-slate-500 text-sm leading-relaxed">
                  Our dedicated engineering and marketing team is here 24/7. We provide proactive monitoring, routine updates, and immediate troubleshooting to ensure your business runs continuously without hitches.
                </p>
              </div>
            </motion.div>

            {/* Card 2: Our Goal */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="p-8 rounded-3xl bg-white border border-slate-100 shadow-sm flex flex-col justify-between relative hover:border-pink-300 transition-colors duration-300 group"
            >
              <div className="absolute top-6 right-6 w-8 h-8 rounded-full bg-pink-500/10 flex items-center justify-center text-pink-500">
                <Check className="w-4 h-4" />
              </div>
              
              <div>
                <span className="inline-block px-3 py-1 rounded-full bg-pink-500/5 text-pink-500 text-[10px] font-bold tracking-widest uppercase mb-4">
                  OUR GOAL
                </span>
                
                <h4 className="text-slate-900 font-extrabold text-lg md:text-xl mb-3 leading-snug">
                  We focus on results, we're dedicated to helping you achieve your goals
                </h4>
                
                <p className="text-slate-500 text-sm leading-relaxed">
                  We run experiments and data checks to optimize your conversions. From UI/UX refinement to Meta Ads target adjustments, every action is oriented to drive sales, brand reach, and high-ROI returns.
                </p>
              </div>
            </motion.div>

          </div>

        </div>
      </div>

      {/* AdmissionDialog (Book consultation) */}
      <AdmissionDialog isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)} />
    </section>
  );
}
