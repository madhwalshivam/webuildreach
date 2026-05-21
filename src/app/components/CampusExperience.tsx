import { motion } from "motion/react";
import { Link } from "react-router";
import { Code2, LineChart, Database, Smartphone, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";

const popularServices = [
  {
    title: "Search Engine Optimization (SEO)",
    slug: "meta-ads", // matches existing slug
    icon: LineChart,
    description: "Enhance your online visibility, drive organic traffic, and secure top rankings on Google with search strategies.",
    bgClass: "bg-pink-50/50 hover:bg-pink-50",
    borderClass: "border-pink-200/30 hover:border-pink-300",
    iconBg: "bg-pink-500",
    iconText: "text-pink-500",
  },
  {
    title: "Custom Web Development",
    slug: "web-dev",
    icon: Code2,
    description: "High-performance websites and bespoke web applications built with modern frameworks to capture leads.",
    bgClass: "bg-blue-50/50 hover:bg-blue-50",
    borderClass: "border-blue-200/30 hover:border-blue-300",
    iconBg: "bg-blue-500",
    iconText: "text-blue-500",
  },
  {
    title: "CRM & ERP solutions",
    slug: "crm",
    icon: Database,
    description: "Streamline operations and automate business workflows with tailored ERP systems and secure client databases.",
    bgClass: "bg-amber-50/50 hover:bg-amber-50",
    borderClass: "border-amber-200/30 hover:border-amber-300",
    iconBg: "bg-amber-500",
    iconText: "text-amber-500",
  },
  {
    title: "Mobile App Development",
    slug: "app-dev",
    icon: Smartphone,
    description: "Intuitive, high-performance native-feel cross-platform apps for iOS and Android tailored to your business needs.",
    bgClass: "bg-emerald-50/50 hover:bg-emerald-50",
    borderClass: "border-emerald-200/30 hover:border-emerald-300",
    iconBg: "bg-emerald-500",
    iconText: "text-emerald-500",
  },
];

export function CampusExperience() {
  return (
    <section className="relative py-24 bg-transparent overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-bold uppercase tracking-wider mb-4">
            Popular Services
          </span>
          <h2 id="services" className="text-slate-900 font-extrabold tracking-tight mb-4" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', lineHeight: 1.15 }}>
            Popular Digital Marketing Services <br className="hidden md:inline" /> to Build Your Business
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto text-base">
            Our experts deliver tailor-made services designed to elevate your brand's digital presence and accelerate sales.
          </p>
        </motion.div>

        {/* 4-Column Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {popularServices.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
            >
              <Link 
                to={`/services/${service.slug}`}
                className={`flex flex-col h-full p-8 rounded-3xl border ${service.borderClass} ${service.bgClass} shadow-[0_4px_20px_rgba(0,0,0,0.01)] transition-all duration-300 group hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(0,0,0,0.03)]`}
              >
                {/* Icon Box */}
                <div className={`w-14 h-14 rounded-2xl ${service.iconBg}/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300`}>
                  <service.icon className={`w-7 h-7 ${service.iconText}`} />
                </div>

                {/* Content */}
                <h3 className="text-slate-900 font-extrabold text-xl mb-4 leading-tight">
                  {service.title}
                </h3>
                
                <p className="text-slate-500 text-sm leading-relaxed mb-6 flex-grow">
                  {service.description}
                </p>

                {/* Read More Link */}
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 group-hover:text-primary transition-colors duration-300 mt-auto">
                  <span>Learn More</span>
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* View More Services Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center"
        >
          <Link to="/services">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/95 text-white rounded-full px-8 py-6 font-bold shadow-[0_4px_14px_rgba(90,69,253,0.3)] transition-all duration-300 flex items-center gap-2 mx-auto hover:scale-[1.02]"
            >
              View More Services
              <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center text-primary">
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Button>
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
