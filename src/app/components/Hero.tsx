import { motion } from "motion/react";
import { Button } from "./ui/button";
import { ArrowRight, Star, TrendingUp, Sparkles } from "lucide-react";

interface HeroProps {
  onBookNow?: () => void;
}

export function Hero({ onBookNow }: HeroProps) {
  const handleScrollToServices = () => {
    const servicesSection = document.getElementById("services");
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative w-full pt-36 md:pt-44 pb-20 overflow-hidden">
      {/* Decorative Floating Blobs & SVGs specific to Hero */}
      <div className="absolute top-[20%] left-[8%] w-12 h-12 bg-indigo-100 rounded-full blur-sm animate-bounce opacity-60 pointer-events-none" />
      <div className="absolute bottom-[15%] left-[20%] w-16 h-16 bg-pink-100 rounded-full blur-md animate-pulse opacity-50 pointer-events-none" />
      
      {/* Main Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Text & CTAs */}
          <div className="lg:col-span-7 text-left">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              {/* Pill Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs md:text-sm font-semibold mb-6 shadow-sm"
              >
                <Sparkles className="w-4 h-4" />
                <span>Top-rated Web & Digital Agency</span>
              </motion.div>

              {/* Heading */}
              <h1
                className="text-slate-900 mb-6 font-extrabold tracking-tight"
                style={{
                  fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                  lineHeight: 1.1,
                  letterSpacing: '-0.03em'
                }}
              >
                Elevate Your Brand with Expert <span className="text-primary">SEO & Marketing</span>
              </h1>

              {/* Description */}
              <p className="text-slate-600 mb-10 max-w-xl text-base md:text-lg leading-relaxed">
                Supercharge your online reach with our expert SEO and digital marketing solutions. 
                We build high-performance CRMs, custom web applications, and high-ROI Meta Ads strategies to scale your business.
              </p>

              {/* Dual CTA Buttons */}
              <div className="flex flex-wrap items-center gap-4">
                <Button
                  onClick={onBookNow}
                  size="lg"
                  className="bg-primary hover:bg-primary/95 text-white rounded-full px-8 py-7 font-bold text-base shadow-[0_6px_20px_rgba(90,69,253,0.35)] transition-all duration-300 hover:scale-[1.02] flex items-center gap-3 group"
                >
                  Start Business Now
                  <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-primary transition-transform duration-300 group-hover:translate-x-1">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </Button>

              </div>
            </motion.div>
          </div>

          {/* Right Column: Hero Visual Mask & Floating Cards */}
          <div className="lg:col-span-5 relative flex justify-center items-center mt-8 lg:mt-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="relative w-full max-w-[420px] aspect-square"
            >
              {/* Backdrop grid & accent circle */}
              <div className="absolute inset-0 border border-slate-200/50 rounded-full pointer-events-none p-4 animate-[spin_60s_linear_infinite]">
                <div className="w-full h-full border border-dashed border-primary/20 rounded-full" />
              </div>

              {/* Large Circular Curved Image Container */}
              <div className="absolute inset-6 rounded-[40%_60%_70%_30%_/_40%_50%_60%_50%] bg-gradient-to-tr from-primary/10 to-pink-50 overflow-hidden border-4 border-white shadow-2xl">
                <img
                  src="https://res.cloudinary.com/dxiasatlk/image/upload/v1779364973/ChatGPT_Image_May_21_2026_03_59_32_PM_1_losxvo.png"
                  alt="WeBuildReach Professional Expert"
                  className="w-full h-full object-cover object-top scale-105 hover:scale-110 transition-transform duration-700"
                />
              </div>

              {/* Floating Badge 1: Google Reviews Rating */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="absolute top-[10%] -right-4 bg-white border border-slate-100 p-3 md:p-4 rounded-2xl shadow-xl flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center text-amber-500">
                  <Star className="w-5 h-5 fill-amber-500" />
                </div>
                <div>
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-slate-800 font-extrabold text-sm mt-0.5">4.9/5 Rating</p>
                  <p className="text-[10px] text-slate-500 font-medium">Google Reviews</p>
                </div>
              </motion.div>

              {/* Floating Badge 2: Growth Metrics */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="absolute bottom-[10%] -left-8 bg-white border border-slate-100 p-4 rounded-2xl shadow-xl flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 font-semibold tracking-wider uppercase">Traffic Growth</p>
                  <p className="text-slate-900 font-extrabold text-lg leading-none mt-1">+150%</p>
                </div>
              </motion.div>

              {/* Ambient Blob Glow under the image */}
              <div className="absolute inset-0 bg-primary/5 rounded-full filter blur-xl -z-10" />

            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
