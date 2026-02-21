import { lazy, Suspense } from "react";

const Navbar = lazy(() => import("../components/Navbar/Navbar"));
const HeroSection = lazy(() => import("../components/HeroSection/HeroSection"));
const AboutSection = lazy(
  () => import("../components/AboutSection/AboutSection"),
);
const ProductsSection = lazy(
  () => import("../components/ProductsSection/ProductsSection"),
);
const WhyChooseUs = lazy(() => import("../components/WhyChooseUs/WhyChooseUs"));
const OurBrands = lazy(() => import("../components/OurBrands/OurBrands"));
const Values = lazy(() => import("../components/Values/Values"));
const OurClients = lazy(() => import("../components/OurClients/OurClients"));
const ContactUs = lazy(() => import("../components/ContactUs/ContactUs"));
const Footer = lazy(() => import("../components/Footer/Footer"));
const ButtonScroll = lazy(
  () => import("../components/ButtonScroll/ButtonScroll"),
);

export default function Home() {
  return (
    <>
      <Suspense fallback={null}>
        <Navbar />
        <HeroSection />
        <AboutSection />
        <ProductsSection />
        <WhyChooseUs />
        <OurBrands />
        <Values />
        <OurClients />
        <ContactUs />
        <Footer />
        <ButtonScroll />
      </Suspense>
    </>
  );
}
