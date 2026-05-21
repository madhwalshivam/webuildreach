import { useDocumentMetadata } from "../hooks/useDocumentMetadata";
import { motion } from "motion/react";
import { SubPageHero } from "../components/SubPageHero";
import { Code2, Settings, BarChart3, AppWindow, Globe, Palette, ShoppingCart, Terminal, ArrowRight } from "lucide-react";
import { Link } from "react-router";

const services = [
  {
    title: "Web Development",
    slug: "web-dev",
    description: "Custom, high-performance websites built with modern technologies for speed and scale.",
    icon: Code2,
  },
  {
    title: "Software Development",
    slug: "soft-dev",
    description: "Bespoke software solutions tailored to automate and optimize your business workflows.",
    icon: Terminal,
  },
  {
    title: "CRM Solutions",
    slug: "crm",
    description: "Custom Customer Relationship Management systems to manage leads and boost sales efficiency.",
    icon: Settings,
  },
  {
    title: "School ERP",
    slug: "erp",
    description: "Complete Enterprise Resource Planning solutions for educational institutions and management.",
    icon: AppWindow,
  },
  {
    title: "Meta Ads & Marketing",
    slug: "meta-ads",
    description: "High-ROI Facebook and Instagram advertising strategies to scale your business rapidly.",
    icon: BarChart3,
  },
  {
    title: "Graphic Design",
    slug: "graphic-design",
    description: "Stunning visual identities and marketing collateral that capture your brand's essence.",
    icon: Palette,
  },
  {
    title: "App Development",
    slug: "app-dev",
    description: "Native and cross-platform mobile applications that provide seamless user experiences.",
    icon: Globe,
  },
  {
    title: "E-commerce Solutions",
    slug: "ecommerce",
    description: "End-to-end online store development with secure payments and inventory management.",
    icon: ShoppingCart,
  }
];

export default function Academics() {
  useDocumentMetadata(
    "Services | Digital Marketing Agency - WeBuildReach",
    "Explore our premium digital solutions including web development, bespoke software, custom CRM/ERP systems, Meta Ads marketing, and mobile apps."
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SubPageHero 
        title="Professional Services" 
        subtitle="Comprehensive digital solutions designed to accelerate your business growth and technical efficiency."
      />

      {/* Services Grid */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.5 }}
              className="bg-card p-8 rounded-3xl shadow-sm border border-slate-100 hover:border-primary/45 hover:shadow-xl transition-all duration-300 group flex flex-col h-full"
            >
              <div className="w-16 h-16 rounded-2xl mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 bg-primary/10">
                <service.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-extrabold text-slate-900 mb-4">{service.title}</h3>
              <p className="text-slate-500 leading-relaxed mb-8 flex-grow">
                {service.description}
              </p>
              
              <Link 
                to={`/services/${service.slug}`}
                className="inline-flex items-center gap-2 text-primary font-bold text-sm group/btn"
              >
                Learn More 
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Why Choose Me Details */}
      <section className="py-16 sm:py-24 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-6 sm:mb-8">
              Premier Digital Marketing <span className="text-primary">& Development Agency</span>
            </h2>
            
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-3 flex-shrink-0" />
                <p className="text-lg text-slate-600 font-medium">Custom-coded solutions prioritized for speed, SEO, and user conversion.</p>
              </div>
              <div className="flex gap-4">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-3 flex-shrink-0" />
                <p className="text-lg text-slate-600 font-medium">Deep expertise in both technical development and performance marketing.</p>
              </div>
              <div className="flex gap-4">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-3 flex-shrink-0" />
                <p className="text-lg text-slate-600 font-medium">Over 5 years of successful deliveries for global and local clients.</p>
              </div>
              <div className="flex gap-4">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-3 flex-shrink-0" />
                <p className="text-lg text-slate-600 font-medium">Direct communication and personalized support throughout the project.</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="aspect-square rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border border-white">
              <img 
                src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070&auto=format&fit=crop" 
                alt="Web Development Workspace" 
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="absolute -bottom-6 -left-6 bg-primary p-8 rounded-3xl shadow-xl hidden md:block">
              <p className="text-white font-extrabold text-2xl">100%</p>
              <p className="text-white/80 font-bold">Client Satisfaction</p>
            </div>
          </motion.div>

        </div>
      </section>
    </div>
  );
}
