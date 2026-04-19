import { useState, useEffect } from 'react';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { Header } from '@/components/ui/Header/Header';
import { CustomCursor } from '@/components/ui/CustomCursor/CustomCursor';
import { TweaksPanel } from '@/components/ui/TweaksPanel/TweaksPanel';
import { Hero } from '@/features/hero/Hero';
import { Deck } from '@/features/deck/Deck';
import { About } from '@/features/about/About';
import { Timeline } from '@/features/timeline/Timeline';
import { Skills } from '@/features/skills/Skills';
import { SideQuests } from '@/features/sidequests/SideQuests';
import { Contact } from '@/features/contact/Contact';
import { Footer } from '@/features/footer/Footer';
import { useReveal } from '@/hooks/useReveal';
import { useKonami } from '@/hooks/useKonami';
import type { TweakState } from '@/types';

const TWEAK_DEFAULTS: TweakState = {
  accentHue: 75,
  density: 'normal',
  mtg: 'on',
  cursor: 'off',
};

function PortfolioApp() {
  const [tweaksOpen, setTweaksOpen] = useState(false);
  const [tweakState, setTweakState] = useState<TweakState>(() => {
    try {
      const raw = localStorage.getItem('kb-tweaks:v1');
      return raw ? { ...TWEAK_DEFAULTS, ...JSON.parse(raw) } : TWEAK_DEFAULTS;
    } catch {
      return TWEAK_DEFAULTS;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('kb-tweaks:v1', JSON.stringify(tweakState));
    } catch {
      // throws in incognito/private browsing or when quota exceeded
    }
  }, [tweakState]);

  useReveal();
  useKonami();

  return (
    <>
      <div className="bg-grid" />
      <CustomCursor enabled={tweakState.cursor === 'on'} />
      <Header onToggleTweaks={() => setTweaksOpen((v) => !v)} />
      <main id="main-content">
        <Hero />
        <Deck />
        <About />
        <Timeline />
        <Skills />
        <SideQuests />
        <Contact />
      </main>
      <Footer />
      <TweaksPanel
        open={tweaksOpen}
        onClose={() => setTweaksOpen(false)}
        state={tweakState}
        onChange={setTweakState}
      />
    </>
  );
}

export function App() {
  return (
    <ThemeProvider>
      <PortfolioApp />
    </ThemeProvider>
  );
}
