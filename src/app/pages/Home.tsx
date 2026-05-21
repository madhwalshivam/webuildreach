import { useDocumentMetadata } from "../hooks/useDocumentMetadata";
import { Hero } from "../components/Hero";
import { TrustStrip } from "../components/TrustStrip";
import { WhySection } from "../components/WhySection";
import { FounderVision } from "../components/FounderVision";
import { CampusExperience as OurServices } from "../components/CampusExperience";
import { AcademicEcosystem as DetailedServices } from "../components/AcademicEcosystem";
import { ResultsAndLife } from "../components/ResultsAndLife";
import { Testimonials } from "../components/Testimonials";
import { AdmissionsFunnel } from "../components/AdmissionsFunnel";

interface HomeProps {
  onBookNow?: () => void;
}

export default function Home({ onBookNow }: HomeProps) {
  useDocumentMetadata(
    "Digital Marketing Agency | WeBuildReach",
    "WeBuildReach is a high-end digital marketing and web development agency providing expert web development, custom CRM/ERP solutions, and performance Meta Ads strategies."
  );

  return (
    <>
      <Hero onBookNow={onBookNow} />
      <TrustStrip />
      <WhySection />
      <FounderVision />
      <OurServices />
      <DetailedServices />
      <ResultsAndLife />
      <Testimonials />
      <AdmissionsFunnel />
    </>
  );
}
