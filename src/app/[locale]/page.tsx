import {useTranslations} from 'next-intl';
import Footer from '../_HomePageComponents/Footer';
import OurMission from '../_HomePageComponents/OurMission';
import Stats from '../_HomePageComponents/Stats';

import Logos from '../_HomePageComponents/Logos';
import Testamonial from '../_HomePageComponents/Testamonial';
import Hero from '../_HomePageComponents/Hero';
 
export default function HomePage() {
  const t = useTranslations('HomePage');
  return <h1>{t('title')}
      <Hero />
      <Logos />
      <Testamonial />
      <Stats />
      <OurMission />
      <Footer /></h1>;
}