import { useTranslations } from "next-intl";
import Footer from "../_HomePageComponents/Footer";
import OurMission from "../_HomePageComponents/OurMission";
import Stats from "../_HomePageComponents/Stats";

import Logos from "../_HomePageComponents/Logos";
import Testamonial from "../_HomePageComponents/Testamonial";
import Hero from "../_HomePageComponents/Hero";
import { getLocale } from "next-intl/server";
export default async function HomePage() {
  const locale = await getLocale();
  console.log(locale);

  const t = useTranslations("HomePage");
  return (
    <h1>
      {t("title")}
      <Hero  locale={locale}/>
      <Logos  locale={locale}/>
      <Testamonial  locale={locale}/>
      <Stats locale={locale} />
      <OurMission  locale={locale}/>
      <Footer  locale={locale}/>
    </h1>
  );
}
