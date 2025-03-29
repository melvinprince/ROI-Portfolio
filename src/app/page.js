import AdvertisingSection from "@/components/advertising/AdvertisingSection";
import AppDevSection from "@/components/appDev/AppDevSection";
import BrandingSection from "@/components/branding/BrandingSection";
import DesigningSection from "@/components/designing/DesigningSection";
import DigitalSection from "@/components/digitalMarketing/DigitalSection";
import IntroSection from "@/components/introSection/IntorSection";
import MarketingSection from "@/components/marketing/MarketingSection";
import MediaSection from "@/components/mediaProduction/MediaSection";
import PrintingSection from "@/components/printing/Printing";
import Services from "@/components/services/Services";
import WebDevSection from "@/components/webDev/WebDevSection";

export default function Home() {
  return (
    <div>
      <IntroSection />
      <Services />
      <MediaSection />
      <DigitalSection />
      <BrandingSection />
      <PrintingSection />
      <WebDevSection />
      <AppDevSection />
      <MarketingSection />
      <DesigningSection />
      <AdvertisingSection />
    </div>
  );
}
