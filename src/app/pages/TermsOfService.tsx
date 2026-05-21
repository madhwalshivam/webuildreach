import { useDocumentMetadata } from "../hooks/useDocumentMetadata";
import { SubPageHero } from "../components/SubPageHero";
import { FileText } from "lucide-react";

export default function TermsOfService() {
  useDocumentMetadata(
    "Terms of Service | WeBuildReach",
    "Terms of Service for WeBuildReach. Read our project terms, payment schedules, client obligations, and liability parameters."
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <SubPageHero
        title="Terms of Service"
        subtitle="Please read our terms and conditions carefully before utilizing our design, development, and marketing solutions."
        backgroundImage="https://images.unsplash.com/photo-1450133064473-71024230f91b?q=80&w=2070&auto=format&fit=crop"
      />

      <section className="py-24 max-w-4xl mx-auto px-6 space-y-12 text-left">
        <div className="flex items-center gap-4 p-6 rounded-3xl bg-white border border-slate-200/60 shadow-sm">
          <FileText className="w-10 h-10 text-primary flex-shrink-0" />
          <div>
            <h2 className="text-xl font-bold text-slate-900">Service Agreement</h2>
            <p className="text-slate-500 text-sm mt-1">Our terms govern all project scopes, design/development contracts, and marketing retainer campaigns.</p>
          </div>
        </div>

        <div className="space-y-8 text-slate-600 leading-relaxed">
          <div className="space-y-3">
            <h3 className="text-2xl font-extrabold text-slate-900">1. Project Initiation and Scoping</h3>
            <p>
              All projects are initiated based on a signed Statement of Work (SOW) or a detailed digital agreement outlining deliverables, timelines, and payment milestones. Any changes to the project scope after initiation will require a written addendum and may affect the final delivery date and cost.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-2xl font-extrabold text-slate-900">2. Payments and Retainers</h3>
            <p>
              Payment terms are specified in the individual project contracts. Typically, a setup fee or initial deposit is required before any development or design work commences. Monthly marketing retainers (such as Meta Ads management) are billed in advance at the start of each service cycle.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-2xl font-extrabold text-slate-900">3. Intellectual Property Rights</h3>
            <p>
              Upon full receipt of payment, the ownership of custom source code, designs, and branding deliverables is transferred to the client. WeBuildReach retains the right to display the completed work in our digital portfolio and case studies unless a strict non-disclosure agreement (NDA) is signed beforehand.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-2xl font-extrabold text-slate-900">4. Client Responsibilities</h3>
            <p>
              To ensure project timelines are met, clients must provide necessary assets (content, images, brand guidelines, database credentials, and system access) in a timely manner. WeBuildReach is not responsible for project delays caused by a client's delay in providing these details or feedback.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-2xl font-extrabold text-slate-900">5. Limitation of Liability</h3>
            <p>
              WeBuildReach shall not be liable for any indirect, incidental, or consequential damages resulting from the use or inability to use our software, servers, integrations, or marketing campaigns. We do not guarantee specific financial results from marketing campaigns, as market conditions and customer behavior are external variables.
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
