import { motion } from "motion/react";
import { Award, Globe2, TrendingUp, Target } from "lucide-react";

const timeline = [
  {
    year: "2018-2020",
    title: "Foundation & Early Freelance",
    description: "Started journey in web development, building custom websites for local businesses and mastering HTML/CSS/JS.",
    icon: Award,
  },
  {
    year: "2020-2022",
    title: "Agency Experience & Scale",
    description: "Worked with digital agencies to deliver large-scale E-commerce and CRM solutions using React and Node.js.",
    icon: TrendingUp,
  },
  {
    year: "2022-2024",
    title: "Performance Marketing Mastery",
    description: "Expanded expertise into Meta Ads and Digital Marketing, helping clients achieve 10x ROI on their ad spend.",
    icon: Globe2,
  },
  {
    year: "2024+",
    title: "Global Tech Partner",
    description: "Operating as an independent technology partner for international clients, delivering end-to-end tech and marketing growth.",
    icon: Target,
  },
];

export function InternationalVision() {
  return (
    <section className="relative py-32 bg-[#050505] overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#EF4444] rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#DC2626] rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <p className="text-[#EF4444] tracking-[0.2em] uppercase mb-4 font-bold">
            Our Professional Growth
          </p>
          <h2 className="text-white mb-6" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 800, lineHeight: 1.1 }}>
            Roadmap to Digital Expertise
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto" style={{ fontSize: '1.125rem' }}>
            A journey of continuous learning and successful project deliveries across the globe.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#EF4444] via-[#DC2626] to-[#EF4444] hidden md:block opacity-30" />

          <div className="space-y-12">
            {timeline.map((item, index) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                className={`relative flex flex-col md:flex-row gap-8 items-center ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Content */}
                <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                  <div className="inline-block px-4 py-1 rounded-full bg-[#EF4444]/20 text-[#EF4444] mb-4" style={{ fontWeight: 700 }}>
                    {item.year}
                  </div>
                  <h3 className="text-white mb-3" style={{ fontSize: '1.5rem', fontWeight: 700 }}>
                    {item.title}
                  </h3>
                  <p className="text-white/70 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Icon Circle */}
                <div className="relative flex-shrink-0">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#EF4444] to-[#DC2626] flex items-center justify-center border-4 border-[#050505] shadow-2xl">
                    <item.icon className="w-9 h-9 text-white" />
                  </div>
                  {/* Glow Effect */}
                  <div className="absolute inset-0 rounded-full bg-[#EF4444] blur-xl opacity-30 -z-10" />
                </div>

                {/* Spacer for alternating layout */}
                <div className="flex-1 hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-20 text-center"
        >
          <p className="text-white/90 mb-6" style={{ fontSize: '1.125rem' }}>
            Ready to be part of the next success story?
          </p>
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 backdrop-blur-sm border border-white/10">
            <Globe2 className="w-5 h-5 text-[#EF4444]" />
            <span className="text-white" style={{ fontWeight: 700 }}>Available for International Projects</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
