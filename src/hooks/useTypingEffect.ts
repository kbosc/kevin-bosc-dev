import {useEffect, useRef, useState} from 'react';
import {useReducedMotion} from '@/hooks/useReducedMotion';

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
export function useTypingEffect(options: UseTypingEffectOptions): UseTypingEffectReturn {
    const {text, speed = 80, startDelay = 500} = options;
    const prefersReducedMotion = useReducedMotion();

    // On gère la réinitialisation par la "key" du composant
    // ou on initialise l'état intelligemment.
    const [displayedText, setDisplayedText] = useState(prefersReducedMotion ? text : '');
    const [isComplete, setIsComplete] = useState(prefersReducedMotion);
    const characterIndex = useRef(0);

    useEffect(() => {
        if (prefersReducedMotion) return;

        // On évite de setter l'état synchrone ici si l'état est déjà correct
        characterIndex.current = 0;

        // On utilise un flag interne pour ne pas mettre à jour l'état si le composant est démonté
        let isMounted = true;

        const startTimer = setTimeout(() => {
            const typingInterval = setInterval(() => {
                if (!isMounted) return;

                characterIndex.current += 1;
                if (characterIndex.current <= text.length) {
                    setDisplayedText(text.slice(0, characterIndex.current));
                }

                if (characterIndex.current >= text.length) {
                    setIsComplete(true);
                    clearInterval(typingInterval);
                }
            }, speed);

            return () => clearInterval(typingInterval);
        }, startDelay);

        return () => {
            isMounted = false;
            clearTimeout(startTimer);
        };
    }, [text, speed, startDelay, prefersReducedMotion]);

    return {displayedText, isComplete};
}

