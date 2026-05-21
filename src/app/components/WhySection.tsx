import { motion } from "motion/react";
import { ArrowRight, Sparkles, CheckCircle } from "lucide-react";
import { Button } from "./ui/button";

export function WhySection() {
  const points = [
    "Expert team with 5+ years of digital experience",
    "Custom full-stack web and app solutions",
    "Data-driven high-ROI marketing strategies",
    "Bespoke CRM & ERP workflow automations"
  ];

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Decorative Blur Blobs */}
      <div className="absolute top-[30%] left-[-10%] w-[350px] h-[350px] bg-purple-200/20 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Column: Styled Circular Image Frame with Spinning Dashed Ring */}
          <div className="lg:col-span-6 relative flex justify-center items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative w-full max-w-[400px] aspect-square"
            >
              {/* Outer Dashed Spinning Ring */}
              <div className="absolute inset-0 border border-slate-200 rounded-full p-6 animate-[spin_40s_linear_infinite]">
                <div className="w-full h-full border border-dashed border-primary/30 rounded-full" />
              </div>

              {/* Floating Badge: Since 2018 */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: -20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="absolute -top-4 left-6 bg-white border border-slate-100 p-4 rounded-full shadow-lg flex items-center justify-center flex-col w-20 h-20 z-20"
              >
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider leading-none">Since</span>
                <span className="text-primary font-extrabold text-lg leading-none mt-1">2018</span>
              </motion.div>

              {/* Inner Circle Image */}
              <div className="absolute inset-8 rounded-full overflow-hidden border-8 border-white shadow-2xl bg-slate-100">
                <img
                  src="https://res.cloudinary.com/dxiasatlk/image/upload/v1779364789/ChatGPT_Image_May_21_2026_05_28_43_PM_1_ghmuv8.png"
                  alt="WeBuildReach Digital Solutions"
                  className="w-full h-full object-cover scale-105 hover:scale-110 transition-transform duration-700"
                />
              </div>

              {/* Floating Floater Widget: Strategy & Marketing */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="absolute bottom-12 -right-6 bg-white border border-slate-100 py-3 px-5 rounded-2xl shadow-xl flex items-center gap-2.5 z-20"
              >
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs text-slate-800 font-extrabold">SEO Strategy</p>
                  <p className="text-[10px] text-slate-400 font-medium">Growth Solutions</p>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Right Column: Text Information & Capabilities */}
          <div className="lg:col-span-6 text-left">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              {/* Badge */}
              <span className="inline-block px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-bold uppercase tracking-wider mb-4">
                COMPREHENSIVE SOLUTIONS
              </span>

              {/* Heading */}
              <h2
                className="text-slate-900 mb-6 font-extrabold tracking-tight"
                style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)', lineHeight: 1.15 }}
              >
                Comprehensive SEO & Digital Marketing Solutions.
              </h2>

              {/* Paragraphs */}
              <p className="text-slate-600 mb-6 leading-relaxed">
                Welcome to WeBuildReach, your partner in online success. Our comprehensive digital marketing and development services are designed to help businesses of all sizes achieve their goals and maximize their digital ROI.
              </p>

              {/* Bullet Points */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {points.map((point) => (
                  <div key={point} className="flex items-start gap-2.5">
                    <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-slate-700 text-sm font-medium">{point}</span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/95 text-white rounded-full px-8 py-6 font-bold shadow-[0_4px_14px_rgba(90,69,253,0.3)] transition-all duration-300 flex items-center gap-2 group hover:scale-[1.02]"
              >
                Read More
                <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center text-primary transition-transform duration-300 group-hover:translate-x-1">
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </Button>

            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
