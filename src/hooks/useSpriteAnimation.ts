import {useEffect, useRef, useState} from 'react';

interface UseSpriteAnimationOptions {
  /** Array of image URLs representing the animation frames */
  frames: string[];
  /** Frames per second for the animation. Default: 24 */
  fps?: number;
  /** Whether the animation should be playing */
  isPlaying: boolean;
  /** Direction of playback */
  direction: 'forward' | 'reverse';
  /** Callback fired when the animation completes */
  onComplete?: () => void;
}

interface UseSpriteAnimationReturn {
  /** The current frame image URL to display */
  currentFrame: string;
  /** Whether the animation is currently running */
  isAnimating: boolean;
}

/**
 * Hook that plays through a sequence of image frames like a sprite animation.
 * Used for the profile photo sunglasses effect.
 *
 * When isPlaying turns true, it plays through the frames in the given direction.
 * When not playing, it shows the first frame (forward) or last frame (reverse)
 * depending on the direction — i.e., the "idle" frame for the current theme.
 */
export function useSpriteAnimation(options: UseSpriteAnimationOptions): UseSpriteAnimationReturn {
    const { frames, fps = 24, isPlaying, direction, onComplete } = options;

    const [currentFrameIndex, setCurrentFrameIndex] = useState(() => {
        return direction === 'forward' ? 0 : frames.length - 1;
    });
    const [isAnimating, setIsAnimating] = useState(false);
    const animationFrameRef = useRef<number | null>(null);
    const lastFrameTimeRef = useRef<number>(0);

    // Preload frames
    useEffect(() => {
        frames.forEach((frameSrc) => {
            const img = new Image();
            img.src = frameSrc;
        });
    }, [frames]);

    useEffect(() => {
        if (!isPlaying || frames.length === 0) return;

        const startIndex = direction === 'forward' ? 0 : frames.length - 1;
        const endIndex = direction === 'forward' ? frames.length - 1 : 0;
        const frameDuration = 1000 / fps;

        const timeoutId = setTimeout(() => {
            setCurrentFrameIndex(startIndex);
            setIsAnimating(true);
        }, 0);

        lastFrameTimeRef.current = performance.now();
        let localIndex = startIndex;

        const animate = (timestamp: number) => {
            const elapsed = timestamp - lastFrameTimeRef.current;

            if (elapsed >= frameDuration) {
                lastFrameTimeRef.current = timestamp;
                localIndex = direction === 'forward' ? localIndex + 1 : localIndex - 1;

                const hasReachedEnd = direction === 'forward'
                    ? localIndex > endIndex
                    : localIndex < endIndex;

                if (hasReachedEnd) {
                    setCurrentFrameIndex(endIndex);
                    setIsAnimating(false);
                    onComplete?.();
                    return;
                }

                setCurrentFrameIndex(localIndex);
            }
            animationFrameRef.current = requestAnimationFrame(animate);
        };

        animationFrameRef.current = requestAnimationFrame(animate);

        return () => {
            clearTimeout(timeoutId);
            if (animationFrameRef.current !== null) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, [isPlaying, direction, frames, fps, onComplete]);

    const currentFrame = frames[currentFrameIndex] ?? '';
    return { currentFrame, isAnimating };
}