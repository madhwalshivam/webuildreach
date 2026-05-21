import { useState } from "react";
import { useDocumentMetadata } from "../hooks/useDocumentMetadata";
import { SubPageHero } from "../components/SubPageHero";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, HelpCircle } from "lucide-react";

const faqData = [
  {
    question: "What services does WeBuildReach offer?",
    answer: "We offer comprehensive digital solutions including custom Web Development (React, Next.js), Software Automation, CRM and School ERP systems, Mobile App Development (React Native, Flutter), and high-ROI digital marketing (specifically Meta Ads and Local SEO)."
  },
  {
    question: "How long does a standard web development project take?",
    answer: "A standard landing page or corporate website takes 2 to 4 weeks. Complex custom web applications, e-commerce stores, or custom CRM systems can take anywhere from 6 to 12 weeks, depending on the scoping requirements and integrations."
  },
  {
    question: "Do you build custom CRM and School ERP platforms?",
    answer: "Yes, we specialize in building bespoke CRM systems that automate business workflows, track sales pipelines, and manage customer data. We also build complete School ERP systems loaded with student-parent panels, timetable systems, and fee accounting modules."
  },
  {
    question: "What is your process for managing Meta Ads and digital marketing?",
    answer: "We follow a data-driven structure: audience research, pixel & CAPI integration, high-end ad creative production, campaign launch, daily optimization, and A/B testing. We focus heavily on maximizing your Return on Ad Spend (ROAS)."
  },
  {
    question: "How can we get a project quote?",
    answer: "You can book a free consultation using our 'Book Now' forms, or contact us directly at info@webuildreach.com. We will analyze your specifications and provide a custom proposal detailing timeline milestones and cost parameters."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useDocumentMetadata(
    "FAQ | WeBuildReach",
    "Frequently asked questions about WeBuildReach. Find answers regarding web development timelines, custom CRM/ERP projects, and Meta Ads marketing."
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SubPageHero
        title="Frequently Asked Questions"
        subtitle="Find quick answers to common queries regarding our development processes, pricing, and campaign management."
      />

      <section className="py-12 max-w-3xl mx-auto px-6 space-y-6">

        {/* Title row */}
        <div className="flex items-center gap-3 mb-10">
          <HelpCircle className="w-8 h-8 text-primary" />
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">General Queries</h2>
        </div>

        {/* Accordions */}
        <div className="space-y-4">
          {faqData.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="rounded-2xl border border-slate-100 bg-white overflow-hidden transition-all duration-300 hover:border-primary/40 shadow-sm"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left font-bold text-slate-800 hover:text-primary transition-colors"
                >
                  <span className="text-base md:text-lg pr-4 font-bold">{item.question}</span>
                  <ChevronDown className={`w-5 h-5 text-primary transition-transform duration-300 flex-shrink-0 ${isOpen ? "rotate-180" : ""}`} />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-6 text-slate-500 font-medium text-sm md:text-base leading-relaxed border-t border-slate-50 pt-4">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </section>
    </div>
  );
}
