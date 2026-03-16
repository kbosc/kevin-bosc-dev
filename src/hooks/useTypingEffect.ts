import { useCallback, useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface UseTypingEffectOptions {
  /** The full text to type out */
  text: string;
  /** Milliseconds between each character. Default: 80 */
  speed?: number;
  /** Milliseconds to wait before starting. Default: 500 */
  startDelay?: number;
}

interface UseTypingEffectReturn {
  /** The currently displayed text (progressively growing) */
  displayedText: string;
  /** Whether the typing animation has finished */
  isComplete: boolean;
}

/**
 * Hook that animates text appearing one character at a time.
 * Respects prefers-reduced-motion by showing the full text immediately.
 */
export function useTypingEffect(
  options: UseTypingEffectOptions,
): UseTypingEffectReturn {
  const { text, speed = 80, startDelay = 500 } = options;

  const prefersReducedMotion = useReducedMotion();
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const characterIndex = useRef(0);

  const typeNextCharacter = useCallback(() => {
    characterIndex.current += 1;
    const nextText = text.slice(0, characterIndex.current);
    setDisplayedText(nextText);

    if (characterIndex.current >= text.length) {
      setIsComplete(true);
    }
  }, [text]);

  useEffect(() => {
    // Skip animation if user prefers reduced motion
    if (prefersReducedMotion) {
      setDisplayedText(text);
      setIsComplete(true);
      return;
    }

    // Reset state when text changes
    characterIndex.current = 0;
    setDisplayedText('');
    setIsComplete(false);

    // Delay before starting the typing effect
    const startTimer = setTimeout(() => {
      const typingInterval = setInterval(() => {
        characterIndex.current += 1;
        const nextText = text.slice(0, characterIndex.current);
        setDisplayedText(nextText);

        if (characterIndex.current >= text.length) {
          setIsComplete(true);
          clearInterval(typingInterval);
        }
      }, speed);

      // Cleanup interval
      return () => clearInterval(typingInterval);
    }, startDelay);

    return () => {
      clearTimeout(startTimer);
    };
  }, [text, speed, startDelay, prefersReducedMotion, typeNextCharacter]);

  return { displayedText, isComplete };
}

