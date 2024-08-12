import Footer from "./_HomePageComponents/Footer";
import Hero from "./_HomePageComponents/Hero";
import Logos from "./_HomePageComponents/Logos";
import OurMission from "./_HomePageComponents/OurMission";
import Stats from "./_HomePageComponents/Stats";
import Testamonial from "./_HomePageComponents/Testamonial";

export default async function page() {
  return (
    <>
      <Hero />
      <Logos />
      <Testamonial />
      <Stats />
      <OurMission />
      <Footer />
    </>
  );
}
