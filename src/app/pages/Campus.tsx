import { useDocumentMetadata } from "../hooks/useDocumentMetadata";
import { motion } from "motion/react";
import { SubPageHero } from "../components/SubPageHero";

const projects = [
  {
    title: "E-commerce Platform",
    description: "A high-performance online store with custom inventory management and secure payment gateway.",
    image: "https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=2089&auto=format&fit=crop"
  },
  {
    title: "Custom School ERP",
    description: "Comprehensive management system for educational institutions with student tracking and automated billing.",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2112&auto=format&fit=crop"
  },
  {
    title: "Real Estate CRM",
    description: "Bespoke CRM system designed for real estate agencies to track leads, properties, and sales performance.",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2073&auto=format&fit=crop"
  },
  {
    title: "Healthcare Dashboard",
    description: "Intuitive patient management dashboard with real-time data visualization and appointment scheduling.",
    image: "https://images.unsplash.com/photo-1504868584819-f8e905263543?q=80&w=2076&auto=format&fit=crop"
  }
];

export default function Campus() {
  useDocumentMetadata(
    "Portfolio | Digital Marketing Agency - WeBuildReach",
    "Explore a selection of high-performance digital products and successful marketing campaigns delivered to our clients by WeBuildReach."
  );

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <SubPageHero 
        title="Project Portfolio" 
        subtitle="Explore a selection of high-performance digital products and successful marketing campaigns delivered to our clients."
        backgroundImage="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop"
      />

      {/* Projects Grid */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Featured Work</h2>
          <div className="w-20 h-1 bg-[#EF4444] mx-auto" />
        </div>
        
        <div className="grid md:grid-cols-2 gap-12">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-4xl h-[450px] shadow-2xl border border-white/5"
            >
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-90" />
              <div className="absolute bottom-0 left-0 p-10">
                <h3 className="text-3xl font-bold text-white mb-4">{project.title}</h3>
                <p className="text-[#94A3B8] text-lg leading-relaxed max-w-md">
                  {project.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Performance Section */}
      <section className="py-24 bg-white/5 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-white mb-8">Built for <span className="text-[#EF4444]">Performance</span></h2>
            <p className="text-[#94A3B8] text-lg mb-10 leading-relaxed">
              Every project we undertake is optimized for maximum speed and conversion. As a premier digital marketing agency, we ensure that your digital presence isn't just a website, but a powerful business tool.
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div className="p-8 rounded-3xl bg-[#111111] border border-white/5">
                <p className="font-bold text-white text-xl mb-2">99+ Speed</p>
                <p className="text-[#94A3B8]">Google PageSpeed Score</p>
              </div>
              <div className="p-8 rounded-3xl bg-[#111111] border border-white/5">
                <p className="font-bold text-white text-xl mb-2">SEO Ready</p>
                <p className="text-[#94A3B8]">Built-in optimization</p>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-4xl overflow-hidden shadow-2xl h-[450px] border border-white/5"
          >
            <img 
              src="https://images.unsplash.com/photo-1551288049-bbbda5366391?q=80&w=2070&auto=format&fit=crop" 
              alt="Performance Metrics" 
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </section>
    </div>
  );
}
