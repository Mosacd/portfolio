import { lazy, StrictMode, Suspense, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import './index.css'
import ErrorBoundary from './components/ErrorBoundary.tsx'
// App is the landing route for every visitor, so lazy-loading it only added a
// sequential request after the main bundle parsed. ProjectPage stays lazy.
import App from './App.tsx'

const ProjectPage = lazy(() => import('./components/projects/ProjectPage.tsx'))

const PageFallback = () => (
  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 border-8 border-[#d8a01340] border-t-[#d8a013] rounded-full animate-spin" />
)

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <ScrollToTop />
        <Suspense fallback={<PageFallback />}>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/projects/:slug" element={<ProjectPage />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>,
)
