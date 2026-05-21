import { useDocumentMetadata } from "../hooks/useDocumentMetadata";
import { motion } from "motion/react";
import { SubPageHero } from "../components/SubPageHero";

export default function About() {
  useDocumentMetadata(
    "About Us | Digital Marketing Agency - WeBuildReach",
    "Learn about WeBuildReach, a premium digital marketing and web development agency. Our mission is to provide cutting-edge solutions that help businesses scale."
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SubPageHero 
        title="About Us" 
        subtitle="Premium Digital Marketing & Development Agency with over 5 years of experience in building high-performance digital engines and scaling brands."
        backgroundImage="https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2070&auto=format&fit=crop"
      />

      {/* Mission & Vision */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12">
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-10 rounded-3xl bg-card border border-border shadow-sm"
          >
            <h2 className="text-3xl font-extrabold text-slate-900 mb-6">Our Mission</h2>
            <p className="text-slate-600 leading-relaxed text-lg font-medium">
              To provide cutting-edge digital solutions that empower businesses to scale and succeed. We combine technical expertise with creative marketing to deliver measurable growth for our clients.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-10 rounded-3xl bg-card border border-border shadow-sm"
          >
            <h2 className="text-3xl font-extrabold text-slate-900 mb-6">Our Vision</h2>
            <p className="text-slate-600 leading-relaxed text-lg font-medium">
              To be the most trusted partner for businesses looking to innovate and dominate their industry. We envision a future where technology and marketing work in perfect harmony to create exceptional user experiences.
            </p>
          </motion.div>

        </div>
      </section>

      {/* History */}
      <section className="py-20 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 items-center gap-16">
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="rounded-3xl overflow-hidden shadow-xl border border-white"
            >
              <img
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop"
                alt="Working Team"
                className="w-full h-full object-cover"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-extrabold text-slate-900 mb-8">
                5+ Years of <span className="text-primary">Building Excellence</span>
              </h2>
              
              <div className="space-y-6 text-slate-600 text-lg font-medium">
                <p>
                  Started in 2018, WeBuildReach has been at the forefront of digital transformation. We have successfully delivered over 100 projects, ranging from custom CRMs to high-converting Meta Ads campaigns.
                </p>
                <p>
                  Our journey is defined by a passion for solving complex problems and a dedication to delivering results that matter. We believe in a client-first approach and continuous learning.
                </p>
                
                <div className="grid grid-cols-2 gap-8 pt-6 border-t border-slate-200">
                  <div>
                    <h3 className="text-3xl font-extrabold text-slate-900">5+</h3>
                    <p className="text-primary font-bold text-sm">Years Experience</p>
                  </div>
                  <div>
                    <h3 className="text-3xl font-extrabold text-slate-900">100+</h3>
                    <p className="text-primary font-bold text-sm">Projects Completed</p>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>
    </div>
  );
}
