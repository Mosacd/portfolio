import { lazy, Suspense, useRef, type RefObject } from 'react'
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

  // No font gate here on purpose: the fonts are self-hosted, preloaded, and declared
  // font-display: swap, so text paints immediately in the fallback and swaps to
  // Poppins when it arrives. Blocking render on document.fonts.load would throw away
  // that entire mechanism and delay first paint for no benefit.
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
