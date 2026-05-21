import { useDocumentMetadata } from "../hooks/useDocumentMetadata";
import { useParams, Navigate } from "react-router";
import { SubPageHero } from "../components/SubPageHero";
import { motion } from "motion/react";
import { CheckCircle2, ArrowRight, Code, Rocket, BarChart, Smartphone, Database, Layout, ShoppingCart, Globe } from "lucide-react";
import { Button } from "../components/ui/button";

const servicesData: Record<string, any> = {
  "web-dev": {
    title: "Web Development",
    subtitle: "High-performance, SEO-optimized websites built with modern frameworks like React and Next.js.",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1600&q=80",
    icon: Globe,
    features: [
      "Custom React & Next.js development",
      "PWA (Progressive Web Apps)",
      "Single Page Applications",
      "API Integration & Development",
      "Performance Optimization",
      "SEO Friendly Architecture"
    ],
    process: [
      { title: "Planning", desc: "Defining goals, user flow, and technical requirements." },
      { title: "Design", desc: "Creating intuitive UI/UX mockups and prototypes." },
      { title: "Development", desc: "Writing clean, scalable code with modern tech." },
      { title: "Launch", desc: "Deployment and continuous optimization." }
    ]
  },
  "soft-dev": {
    title: "Software Development",
    subtitle: "Bespoke software solutions designed to solve complex business problems and improve productivity.",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1600&q=80",
    icon: Code,
    features: [
      "Custom Desktop Applications",
      "Cloud-based Solutions",
      "Automation Software",
      "Legacy System Migration",
      "Database Architecture",
      "Microservices Backend"
    ],
    process: [
      { title: "Analysis", desc: "Deep dive into your business bottlenecks." },
      { title: "Architecture", desc: "Designing robust and scalable system blueprints." },
      { title: "Build", desc: "Agile development with regular updates." },
      { title: "Support", desc: "Maintenance and future-proof scaling." }
    ]
  },
  "crm": {
    title: "CRM Solutions",
    subtitle: "Centralize your customer data and automate your sales pipeline with a custom CRM system.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600&q=80",
    icon: Database,
    features: [
      "Lead Management Automation",
      "Sales Pipeline Tracking",
      "Customer Activity Logs",
      "Automated Email Marketing",
      "Reporting & Analytics",
      "Role-based Access Control"
    ],
    process: [
      { title: "Discovery", desc: "Mapping your unique sales and support flows." },
      { title: "Workflow", desc: "Designing automation rules and triggers." },
      { title: "Integration", desc: "Connecting with your existing tools." },
      { title: "Training", desc: "Ensuring your team gets the most out of the system." }
    ]
  },
  "erp": {
    title: "School ERP",
    subtitle: "A complete management system for educational institutions, from admissions to results.",
    image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=1600&q=80",
    icon: Layout,
    features: [
      "Student & Staff Management",
      "Attendance & Timetable",
      "Fee Collection & Accounts",
      "Exam & Result Management",
      "Parent-Teacher Communication",
      "Library & Transport tracking"
    ],
    process: [
      { title: "Needs Assessment", desc: "Tailoring modules to your school's needs." },
      { title: "Data Migration", desc: "Safely importing your existing records." },
      { title: "System Setup", desc: "Configuring roles and permissions." },
      { title: "Implementation", desc: "Smooth rollout across the institution." }
    ]
  },
  "meta-ads": {
    title: "Meta Ads & Marketing",
    subtitle: "Data-driven marketing strategies to maximize your ROI and reach your target audience.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1600&q=80",
    icon: BarChart,
    features: [
      "Facebook & Instagram Ads",
      "Pixel & CAPI Setup",
      "Audience Research & Targeting",
      "Ad Creative Strategy",
      "Retargeting Campaigns",
      "A/B Testing & Analysis"
    ],
    process: [
      { title: "Strategy", desc: "Defining KPIs and target segments." },
      { title: "Setup", desc: "Technical implementation of tracking codes." },
      { title: "Execution", desc: "Launching and managing ad sets." },
      { title: "Scaling", desc: "Allocating budget to winning campaigns." }
    ]
  },
  "graphic-design": {
    title: "Graphic Design",
    subtitle: "Stunning visuals that communicate your brand's message effectively and beautifully.",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1600&q=80",
    icon: Layout,
    features: [
      "Brand Identity & Logo Design",
      "Social Media Graphics",
      "UI/UX Design for Web/Apps",
      "Marketing Collaterals",
      "Packaging Design",
      "Vector Illustrations"
    ],
    process: [
      { title: "Moodboard", desc: "Establishing visual direction and vibe." },
      { title: "Sketching", desc: "Conceptualizing initial design ideas." },
      { title: "Refining", desc: "Polishing the chosen direction to perfection." },
      { title: "Delivery", desc: "Providing all necessary file formats." }
    ]
  },
  "app-dev": {
    title: "App Development",
    subtitle: "Native-feel cross-platform mobile apps for iOS and Android built with React Native.",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1600&q=80",
    icon: Smartphone,
    features: [
      "iOS & Android Development",
      "React Native & Flutter",
      "Mobile UI/UX Design",
      "Offline Functionality",
      "Push Notifications",
      "App Store/Play Store Launch"
    ],
    process: [
      { title: "Wireframing", desc: "Mapping out the mobile user experience." },
      { title: "Prototyping", desc: "Testing the flow and functionality." },
      { title: "Dev", desc: "Building the app with cross-platform efficiency." },
      { title: "Testing", desc: "Ensuring bug-free performance on all devices." }
    ]
  },
  "ecommerce": {
    title: "E-commerce Solutions",
    subtitle: "Scalable online stores designed to convert visitors into loyal customers.",
    image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=1600&q=80",
    icon: ShoppingCart,
    features: [
      "Shopify & Custom E-com",
      "Payment Gateway Integration",
      "Inventory Management",
      "Wishlist & Review Systems",
      "Mobile-First Shopping",
      "Multi-currency Support"
    ],
    process: [
      { title: "Audit", desc: "Analyzing your product catalog and competitors." },
      { title: "Shop Setup", desc: "Building the store architecture." },
      { title: "Integration", desc: "Setting up shipping, tax, and payments." },
      { title: "Launch Ready", desc: "Optimizing for speed and search engines." }
    ]
  }
};

interface ServiceDetailProps {
  onBookNow?: () => void;
}

export default function ServiceDetail({ onBookNow }: ServiceDetailProps) {
  const { slug } = useParams();
  const service = slug ? servicesData[slug] : null;

  useDocumentMetadata(
    service ? `${service.title} | WeBuildReach` : "",
    service ? `${service.subtitle} Explore features, custom processes, and details for our ${service.title} services.` : ""
  );

  if (!service) {
    return <Navigate to="/services" replace />;
  }

  return (
    <main className="bg-background text-foreground min-h-screen">
      <SubPageHero 
        title={service.title} 
        subtitle={service.subtitle}
      />

      {/* Features Grid */}
      <section className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-10 md:gap-20 items-center mb-16 sm:mb-32">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-primary tracking-[0.2em] uppercase mb-4 font-bold">Key Features</h2>
              <h3 className="text-slate-900 text-3xl sm:text-4xl md:text-5xl font-extrabold mb-8 leading-tight">
                Solutions built for <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-indigo-600">Modern Businesses</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {service.features.map((feature: string, i: number) => (
                  <div key={i} className="flex items-center gap-3 p-4 rounded-2xl bg-card border border-slate-100 shadow-sm group hover:border-primary transition-all">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    <span className="text-slate-700 text-sm font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative w-full"
            >
              <div className="aspect-square rounded-[2rem] sm:rounded-[3rem] overflow-hidden border border-white shadow-xl">
                <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent" />
              </div>
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-primary rounded-full blur-[100px] opacity-15 -z-10" />
            </motion.div>
          </div>

          {/* Process Section */}
          <div className="text-center mb-16">
            <h2 className="text-slate-900 text-4xl font-extrabold mb-4">Our Development Process</h2>
            <p className="text-slate-500 max-w-2xl mx-auto">We follow a systematic approach to ensure your project is delivered on time and exceeds your expectations.</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {service.process.map((step: any, i: number) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="relative p-8 rounded-3xl bg-card border border-slate-100 text-center group hover:border-primary/50 transition-all shadow-sm"
              >
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6 group-hover:bg-primary group-hover:text-white transition-colors text-primary">
                  <span className="font-bold text-xl">{i + 1}</span>
                </div>
                <h4 className="text-slate-900 font-bold text-xl mb-3">{step.title}</h4>
                <p className="text-slate-500 text-sm leading-relaxed">{step.desc}</p>
                {i < 3 && <ArrowRight className="hidden md:block absolute top-1/2 -right-4 -translate-y-1/2 text-slate-200 w-8 h-8" />}
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-20 sm:mt-32 p-6 sm:p-12 rounded-3xl sm:rounded-[3rem] bg-gradient-to-r from-primary to-indigo-600 text-center shadow-xl text-white relative overflow-hidden"
          >
            <div className="absolute top-[-50%] left-[-20%] w-[350px] h-[350px] bg-white/5 rounded-full blur-3xl pointer-events-none" />
            
            <h2 className="text-white text-2xl sm:text-3xl md:text-5xl font-extrabold mb-6 leading-tight relative z-10">
              Ready to build your <br /> next project?
            </h2>
            
            <Button 
              size="lg" 
              onClick={onBookNow}
              className="bg-white hover:bg-slate-50 text-primary hover:text-primary/95 font-bold w-full sm:w-auto px-12 py-6 rounded-full text-base sm:text-lg md:text-xl shadow-lg transition-all relative z-10"
            >
              Book a Free Consultation
            </Button>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
