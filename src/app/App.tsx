import { ThemeProvider } from '@/contexts/ThemeContext';
import { SkipToContent } from '@/components/ui/SkipToContent/SkipToContent';
import { Header } from '@/components/ui/Header/Header';
import { Hero } from '@/features/hero/Hero';
import { About } from '@/features/about/About';
import { Experience } from '@/features/experience/Experience';
import { Skills } from '@/features/skills/Skills';
import { Education } from '@/features/education/Education';
import { Projects } from '@/features/projects/Projects';
import { Contact } from '@/features/contact/Contact';
import { Footer } from '@/features/footer/Footer';
import { ParticleStars } from '@/components/three/ParticleStars/ParticleStars';
import styles from './App.module.scss';

export function App() {
  return (
    <ThemeProvider>
      <ParticleStars />
      <SkipToContent />
      <Header />

      <main id="main-content" className={styles.main}>
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Education />
        <Projects />
        <Contact />
      </main>

      <Footer />
    </ThemeProvider>
  );
}


