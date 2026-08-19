import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { BackgroundEffects } from './components/BackgroundEffects';
import { CommandPalette } from './components/CommandPalette';
import { ResumeModal } from './components/ResumeModal';
import { InitialLoader } from './components/InitialLoader';

// Pages
import { HomePage } from './pages/HomePage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ExperiencePage } from './pages/ExperiencePage';
import { SkillsPage } from './pages/SkillsPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';

// Scroll to top handler on route change
const ScrollToTop: React.FC = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const el = document.getElementById(hash.replace('#', ''));
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [pathname, hash]);

  return null;
};

// 3D Animated Page Wrapper with perspective depth
const pageVariants = {
  initial: {
    opacity: 0,
    y: 28,
    rotateX: 3,
    scale: 0.985,
    filter: 'blur(4px)',
  },
  animate: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 0.45,
      ease: [0.16, 1, 0.3, 1],
    },
  },
  exit: {
    opacity: 0,
    y: -18,
    rotateX: -2,
    scale: 0.985,
    filter: 'blur(3px)',
    transition: {
      duration: 0.25,
      ease: [0.7, 0, 0.84, 0],
    },
  },
};

const AnimatedPageWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      style={{ perspective: '1200px', transformStyle: 'preserve-3d' }}
    >
      {children}
    </motion.div>
  );
};

export function App() {
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('kg_portfolio_theme');
    return saved !== null ? saved === 'dark' : true;
  });

  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [resumeModalOpen, setResumeModalOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('kg_portfolio_theme', darkMode ? 'dark' : 'light');
    if (darkMode) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Global Ctrl+K / Cmd+K Keyboard Shortcut Listener
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, []);

  return (
    <>
      {loading && <InitialLoader onComplete={() => setLoading(false)} />}

      <Router>
        <div className={`min-h-screen relative font-sans ${darkMode ? 'bg-bg-dark text-slate-100' : 'bg-slate-50 text-slate-900'} transition-colors duration-300`}>
          <ScrollToTop />
          
          {/* Background Visual Effects with Three.js */}
          <BackgroundEffects darkMode={darkMode} />

          {/* Global Floating Pill Navbar */}
          <Navbar
            darkMode={darkMode}
            setDarkMode={setDarkMode}
            onOpenCommandPalette={() => setCommandPaletteOpen(true)}
            onOpenResumeModal={() => setResumeModalOpen(true)}
          />

          {/* Dynamic Page Router with 3D Framer Motion transitions */}
          <main className="relative z-10 perspective-container">
            <AnimatePresence mode="wait">
              <Routes>
                <Route
                  path="/"
                  element={
                    <AnimatedPageWrapper>
                      <HomePage
                        onOpenResumeModal={() => setResumeModalOpen(true)}
                        onOpenCommandPalette={() => setCommandPaletteOpen(true)}
                      />
                    </AnimatedPageWrapper>
                  }
                />
                <Route
                  path="/projects"
                  element={
                    <AnimatedPageWrapper>
                      <ProjectsPage />
                    </AnimatedPageWrapper>
                  }
                />
                <Route
                  path="/experience"
                  element={
                    <AnimatedPageWrapper>
                      <ExperiencePage />
                    </AnimatedPageWrapper>
                  }
                />
                <Route
                  path="/skills"
                  element={
                    <AnimatedPageWrapper>
                      <SkillsPage />
                    </AnimatedPageWrapper>
                  }
                />
                <Route
                  path="/about"
                  element={
                    <AnimatedPageWrapper>
                      <AboutPage onOpenResumeModal={() => setResumeModalOpen(true)} />
                    </AnimatedPageWrapper>
                  }
                />
                <Route
                  path="/contact"
                  element={
                    <AnimatedPageWrapper>
                      <ContactPage />
                    </AnimatedPageWrapper>
                  }
                />
                <Route
                  path="*"
                  element={
                    <AnimatedPageWrapper>
                      <HomePage
                        onOpenResumeModal={() => setResumeModalOpen(true)}
                        onOpenCommandPalette={() => setCommandPaletteOpen(true)}
                      />
                    </AnimatedPageWrapper>
                  }
                />
              </Routes>
            </AnimatePresence>
          </main>

          {/* Global Footer */}
          <Footer />

          {/* Cmd+K / Ctrl+K Command Palette Modal */}
          <CommandPalette
            isOpen={commandPaletteOpen}
            onClose={() => setCommandPaletteOpen(false)}
            darkMode={darkMode}
            setDarkMode={setDarkMode}
            onOpenResumeModal={() => {
              setResumeModalOpen(true);
              setCommandPaletteOpen(false);
            }}
          />

          {/* Printable & Downloadable Resume Modal */}
          <ResumeModal
            isOpen={resumeModalOpen}
            onClose={() => setResumeModalOpen(false)}
          />
        </div>
      </Router>
    </>
  );
}

export default App;
