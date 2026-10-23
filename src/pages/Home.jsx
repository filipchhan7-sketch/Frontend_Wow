import Hero from '../components/sections/Hero';
import Marquee from '../components/sections/Marquee';
import WhyWow from '../components/sections/WhyWow';
import Stats from '../components/sections/Stats';
import StoryTeaser from '../components/sections/StoryTeaser';
import MenuTeaser from '../components/sections/MenuTeaser';
import Steps from '../components/sections/Steps';
import StoresTeaser from '../components/sections/StoresTeaser';
import EventsTeaser from '../components/sections/EventsTeaser';
import NewsTeaser from '../components/sections/NewsTeaser';
import FinalCTA from '../components/sections/FinalCTA';

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <WhyWow />
      <MenuTeaser />
      <Stats />
      <StoryTeaser />
      <Steps bg="bg-brand-soft/60" />
      <StoresTeaser />
      <EventsTeaser />
      <NewsTeaser />
      <FinalCTA />
    </>
  );
}
