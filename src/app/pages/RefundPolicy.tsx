import { useDocumentMetadata } from "../hooks/useDocumentMetadata";
import { SubPageHero } from "../components/SubPageHero";
import { AlertCircle } from "lucide-react";

export default function RefundPolicy() {
  useDocumentMetadata(
    "Refund Policy | WeBuildReach",
    "Refund and cancellation guidelines for WeBuildReach. Review eligibility details for custom development projects and marketing retainers."
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <SubPageHero
        title="Refund & Cancellation Policy"
        subtitle="Learn about our refund parameters for consulting, customized development, and marketing retainers."
        backgroundImage="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2070&auto=format&fit=crop"
      />

      <section className="py-24 max-w-4xl mx-auto px-6 space-y-12 text-left">
        <div className="flex items-center gap-4 p-6 rounded-3xl bg-white border border-slate-200/60 shadow-sm">
          <AlertCircle className="w-10 h-10 text-primary flex-shrink-0" />
          <div>
            <h2 className="text-xl font-bold text-slate-900">Fair Refund Guidelines</h2>
            <p className="text-slate-500 text-sm mt-1">We aim for client satisfaction. Read below to understand refund eligibility based on service phases.</p>
          </div>
        </div>

        <div className="space-y-8 text-slate-600 leading-relaxed">
          <div className="space-y-3">
            <h3 className="text-2xl font-extrabold text-slate-900">1. Custom Design and Development Projects</h3>
            <p>
              For customized web development, software development, CRM/ERP builds, and UI/UX design:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Deposits or initial payments are non-refundable once the discovery phase has finished and actual design or wireframing work has begun.</li>
              <li>If a project is cancelled by the client before the wireframing phase starts, a 50% refund of the initial deposit may be granted.</li>
              <li>Completed milestones are non-refundable once approved by the client and delivered.</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="text-2xl font-extrabold text-slate-900">2. Marketing and Ad Management Services</h3>
            <p>
              For Meta Ads campaigns, search engine optimization (SEO), and retainer marketing services:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Retainer fees are non-refundable once the campaign planning or active media running has commenced for the billed month.</li>
              <li>Ad spend budgets (paid directly to advertising channels like Meta or Google) are non-refundable, as these charges are collected directly by the respective platforms.</li>
              <li>Clients may cancel retainers with a 15-day written notice before the next billing cycle.</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="text-2xl font-extrabold text-slate-900">3. Consultation Fees</h3>
            <p>
              Hourly consulting or advisory sessions are non-refundable once the meeting has taken place. If you need to reschedule, please notify us at least 24 hours in advance.
            </p>
          </div>

          <div className="pt-8 border-t border-slate-200 text-xs text-slate-400 font-medium">
            Last Updated: May 19, 2026
          </div>
        </div>
      </section>
    </div>
  );
}
