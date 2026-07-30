import { lazy, Suspense, useEffect, useRef, useState, type RefObject } from 'react'
import Header, { type SectionKey } from './components/header'
import Hero from './components/hero'
import { usePageMeta } from '@/hooks/usePageMeta'

const Experience = lazy(() => import('./components/experience'))
const Projects = lazy(() => import('./components/projects'))
const TechStack = lazy(() => import('./components/techstack'))
const About = lazy(() => import('./components/about'))
const RobotChatbot = lazy(() => import('./components/chatBot'))


function App() {

  // Typed as Record<SectionKey, ...> so a nav item without a matching ref is a build error.
  const sectionRefs: Record<SectionKey, RefObject<HTMLDivElement | null>> = {
    experience: useRef<HTMLDivElement | null>(null),
    projects: useRef<HTMLDivElement | null>(null),
    techstack: useRef<HTMLDivElement | null>(null),
    about: useRef<HTMLDivElement | null>(null),
  };

  const scrollTo = (section: SectionKey) => {
    sectionRefs[section].current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Restores the index.html defaults when returning here from a project page.
  usePageMeta({
    title: 'Levan Mosiashvili',
    description: 'Frontend Developer Portfolio of Levan Mosiashvili',
    path: '/',
  });



  const [fontLoaded, setFontLoaded] = useState(false);

  // Never let a font request gate the whole page: reveal on success, on failure,
  // or after a short timeout, whichever happens first.
  useEffect(() => {
    let settled = false;
    const reveal = () => {
      if (settled) return;
      settled = true;
      setFontLoaded(true);
    };

    const timer = setTimeout(reveal, 2000);

    Promise.all([
      document.fonts.load('500 1em Poppins'),
      document.fonts.load('600 1em Poppins'),
      document.fonts.load('800 1em Poppins'),
    ])
      .catch(() => undefined)
      .finally(reveal);

    return () => clearTimeout(timer);
  }, []);

  if (!fontLoaded) {
    return <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 border-8 border-[#d8a01340] border-t-[#d8a013] rounded-full animate-spin"
    ></div>;
  }

  return (
    <div className='w-full relative sm:px-5 py-10 lg:p-10 max-w-7xl 2xl:max-w-screen-2xl m-auto text-center'>
      <Header scrollTo = {scrollTo} />
      <Hero/>
      <Suspense>
      <div className='flex flex-col gap-40 mt-40 fancy-block *:pt-10'>
      <Experience experienceRef = {sectionRefs.experience}/>
      <Projects projectsRef = {sectionRefs.projects} />
      <TechStack techstackRef = {sectionRefs.techstack}/>
      <About aboutRef = {sectionRefs.about}/>
      </div>
      <RobotChatbot/>
      </Suspense>
    </div>
  )
}

export default App
