import { useDocumentMetadata } from "../hooks/useDocumentMetadata";
import { SubPageHero } from "../components/SubPageHero";
import { Shield } from "lucide-react";

export default function PrivacyPolicy() {
  useDocumentMetadata(
    "Privacy Policy | WeBuildReach",
    "Privacy Policy for WeBuildReach. Learn how we collect, use, protect, and handle your personal data when using our services."
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <SubPageHero
        title="Privacy Policy"
        subtitle="Your privacy is extremely important to us. Learn how we collect, use, and protect your personal information."
        backgroundImage="https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=2070&auto=format&fit=crop"
      />

      <section className="py-12 max-w-4xl mx-auto px-6 space-y-12 text-left">
        <div className="flex items-center gap-4 p-6 rounded-3xl bg-white border border-slate-200/60 shadow-sm">
          <Shield className="w-10 h-10 text-primary flex-shrink-0" />
          <div>
            <h2 className="text-xl font-bold text-slate-900">Commitment to Security</h2>
            <p className="text-slate-500 text-sm mt-1">We implement advanced industry-standard encryption and protocols to protect client data.</p>
          </div>
        </div>

        <div className="space-y-8 text-slate-600 leading-relaxed">
          <div className="space-y-3">
            <h3 className="text-2xl font-extrabold text-slate-900">1. Information We Collect</h3>
            <p>
              We collect information you provide directly to us when requesting a consultation, booking a service, or subscribing to our newsletters. This may include your name, email address, phone number, business details, and project requirements.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-2xl font-extrabold text-slate-900">2. How We Use Your Information</h3>
            <p>
              The collected information is used solely to provide, maintain, and optimize our digital services. This includes scheduling consultations, managing client databases, communicating project milestones, and delivering personalized marketing analytics reports.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-2xl font-extrabold text-slate-900">3. Data Protection and Retention</h3>
            <p>
              We take appropriate security measures to prevent unauthorized access, disclosure, modification, or unauthorized destruction of the data. Your personal details are stored securely and kept only as long as necessary to fulfill the services requested.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-2xl font-extrabold text-slate-900">4. Sharing with Third Parties</h3>
            <p>
              We do not sell, trade, or rent your personal identification information to third parties. We may share generic aggregated demographic information not linked to any personal identification details with our trusted business partners for analytical purposes.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-2xl font-extrabold text-slate-900">5. Cookies and Tracking</h3>
            <p>
              Our website uses cookies to improve your user experience. Cookies help us analyze web traffic and customize page layouts. You can choose to accept or decline cookies through your browser settings.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-2xl font-extrabold text-slate-900">6. Updates to This Policy</h3>
            <p>
              WeBuildReach reserves the right to update this privacy policy at any time. When we do, we will revise the updated date at the bottom of this page. We encourage users to frequently check this page for any changes.
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
