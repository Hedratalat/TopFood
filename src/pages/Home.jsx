import { lazy, Suspense } from "react";

const Navbar = lazy(() => import("../components/Navbar/Navbar"));
const HeroSection = lazy(() => import("../components/HeroSection/HeroSection"));

const ProductsSection = lazy(
  () => import("../components/ProductsSection/ProductsSection"),
);
const WhyChooseUs = lazy(() => import("../components/WhyChooseUs/WhyChooseUs"));
const OurBrands = lazy(() => import("../components/OurBrands/OurBrands"));
const Values = lazy(() => import("../components/Values/Values"));
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
        <OurBrands />
        <ProductsSection />
        <WhyChooseUs />
        <Values />
        <Footer />
        <ButtonScroll />
      </Suspense>
    </>
  );
}
