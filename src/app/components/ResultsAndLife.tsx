import { motion } from "motion/react";
import { Search, BarChart, TrendingUp, Heart, Sparkles, CheckCircle } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/autoplay";

const benefits = [
  {
    title: "Analysis & Report",
    desc: "We run deep technical audits and keyword analyses to reveal your hidden growth opportunities.",
    icon: Search,
  },
  {
    title: "SEO Strategy",
    desc: "Maximize organic reach with semantic code adjustments and premium content architectures.",
    icon: BarChart,
  },
  {
    title: "PPC Media Ads",
    desc: "Convert search intent instantly with target-focused campaigns that minimize lead costs.",
    icon: TrendingUp,
  },
  {
    title: "Social Marketing",
    desc: "Build active brand communities and viral reach via data-driven Facebook & Instagram Ads.",
    icon: Heart,
  },
  {
    title: "Content Marketing",
    desc: "Produce authority articles and high-conversion landing pages that capture buyers.",
    icon: Sparkles,
  },
  {
    title: "Clean Reporting",
    desc: "Trace every dollar spent to conversion actions with custom performance dashboards.",
    icon: CheckCircle,
  },
];

const industries = [
  {
    title: "E-commerce Brands",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80",
    category: "Scaling",
  },
  {
    title: "Real Estate Agents",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=80",
    category: "Lead Gen",
  },
  {
    title: "Education Tech",
    image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=600&q=80",
    category: "Automation",
  },
  {
    title: "Healthcare Clinics",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&q=80",
    category: "Systems",
  },
  {
    title: "Legal Firms",
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&q=80",
    category: "Consulting",
  },
  {
    title: "Creative Agencies",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80",
    category: "Branding",
  },
];

export function ResultsAndLife() {
  return (
    <section id="portfolio" className="relative py-12 bg-transparent overflow-hidden">

      {/* Background ambient light */}
      <div className="absolute top-[20%] right-[-10%] w-[450px] h-[450px] bg-pink-100/20 rounded-full blur-[130px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">

        {/* Benefits Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-28"
        >
          <div className="text-center mb-16">
            <span className="inline-block px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-bold uppercase tracking-wider mb-4">
              BENEFITS OF SEO & DIGITAL MARKETING
            </span>
            <h2 className="text-slate-900 font-extrabold tracking-tight mb-4" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', lineHeight: 1.15 }}>
              Benefits of SEO & Digital Marketing
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto text-base">
              By combining technology and marketing excellence, we establish your brand as an industry leader.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="relative p-8 rounded-3xl bg-white border border-slate-100 hover:border-primary/40 hover:shadow-xl transition-all duration-300 group"
              >
                {/* Icon Circle */}
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform duration-300">
                  <benefit.icon className="w-6 h-6" />
                </div>

                <h3 className="text-slate-900 font-extrabold text-lg mb-3">
                  {benefit.title}
                </h3>

                <p className="text-slate-500 text-sm leading-relaxed">
                  {benefit.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Industries We Serve Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-16">
            <span className="inline-block px-3 py-1 rounded-full border border-pink-500/20 bg-pink-500/5 text-pink-500 text-xs font-bold uppercase tracking-wider mb-4">
              INDUSTRIES WE SERVE
            </span>
            <h2 className="text-slate-900 font-extrabold tracking-tight mb-4" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', lineHeight: 1.15 }}>
              Versatile Industry Expertise
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto text-base">
              We design custom growth modules matching the strict compliance and needs of diverse industries.
            </p>
          </div>

          {/* Swiper Carousel */}
          <div className="w-full">
            <Swiper
              modules={[Autoplay]}
              spaceBetween={24}
              slidesPerView={1}
              loop={true}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              breakpoints={{
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
              className="pb-12"
            >
              {industries.map((ind) => (
                <SwiperSlide key={ind.title}>
                  <div className="group cursor-pointer">
                    <div className="relative aspect-[4/3] rounded-3xl overflow-hidden mb-4 border border-slate-100 shadow-sm">
                      <img
                        src={ind.image}
                        alt={ind.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent" />

                      {/* Category tag */}
                      <div className="absolute top-4 right-4 px-4 py-1 rounded-full bg-white/90 backdrop-blur-md shadow-sm border border-slate-100">
                        <span className="text-primary font-extrabold text-[10px] uppercase tracking-wider">
                          {ind.category}
                        </span>
                      </div>

                      {/* Content Overlay */}
                      <div className="absolute bottom-6 left-6 right-6">
                        <h3 className="text-white font-extrabold text-xl group-hover:text-primary transition-colors duration-300">
                          {ind.title}
                        </h3>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
