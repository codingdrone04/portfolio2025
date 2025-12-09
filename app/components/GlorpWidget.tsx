"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const GLORP_IMAGES = [
    "babyglorp.png",
    "danceglorp.png",
    "dogglorp.png",
    "larryglorp.png",
    "smolglorp.png",
    "threeglorps.png"
];

const THINKING_BUBBLES = [
    { size: "w-2 h-2", top: "-top-12", right: "right-10", delay: "0s" },
    { size: "w-3 h-3", top: "-top-20", right: "right-6", delay: "0.5s" },
    { size: "w-4 h-4", top: "-top-28", right: "right-3", delay: "1s" }
];

// Animation timing constants (in milliseconds)
const TIMING = {
    FADE_OUT: 300,
    STATE_RESET_DELAY: 10,
    THINKING_DURATION: 1500,
    GLORP_DISPLAY_DURATION: 5000
} as const;

export default function GlorpWidget() {
    const [isGenerating, setIsGenerating] = useState(false);
    const [currentGlorpIndex, setCurrentGlorpIndex] = useState<number | null>(null);
    const [isVisible, setIsVisible] = useState(true);
    const [animationKey, setAnimationKey] = useState(0);
    const [isResetting, setIsResetting] = useState(false);
    const timeoutsRef = useRef<NodeJS.Timeout[]>([]);

    // Cleanup timeouts on unmount
    useEffect(() => {
        return () => {
            timeoutsRef.current.forEach(clearTimeout);
        };
    }, []);

    const generateGlorp = () => {
        // Clear any existing timeouts
        timeoutsRef.current.forEach(clearTimeout);
        timeoutsRef.current = [];

        // Smoothly fade out everything first
        setIsResetting(true);
        setIsVisible(false);

        // Wait for fade out, then reset
        const timeout1 = setTimeout(() => {
            setIsGenerating(false);
            setCurrentGlorpIndex(null);
            setIsVisible(true);
            setAnimationKey(prev => prev + 1); // Force re-render of bubbles
            setIsResetting(false);

            // Small delay to ensure state is reset before starting new animation
            const timeout2 = setTimeout(() => {
                setIsGenerating(true);
                setIsVisible(false);

                // Show thinking bubbles, then show the glorp
                const timeout3 = setTimeout(() => {
                    // Pick a random glorp from the array
                    const randomIndex = Math.floor(Math.random() * GLORP_IMAGES.length);
                    setCurrentGlorpIndex(randomIndex);
                    setIsVisible(true);

                    // Show the glorp, then hide everything
                    const timeout4 = setTimeout(() => {
                        setIsVisible(false);
                        const timeout5 = setTimeout(() => {
                            setCurrentGlorpIndex(null);
                            setIsGenerating(false);
                            setIsVisible(true);
                        }, TIMING.FADE_OUT);
                        timeoutsRef.current.push(timeout5);
                    }, TIMING.GLORP_DISPLAY_DURATION);
                    timeoutsRef.current.push(timeout4);
                }, TIMING.THINKING_DURATION);
                timeoutsRef.current.push(timeout3);
            }, TIMING.STATE_RESET_DELAY);
            timeoutsRef.current.push(timeout2);
        }, TIMING.FADE_OUT);
        timeoutsRef.current.push(timeout1);
    };

    return (
        <div className="hidden md:block absolute bottom-2 right-4 z-10" role="complementary" aria-label="Glorp Generator Widget">
            <div className={`relative ${currentGlorpIndex === null && !isGenerating ? 'animate-bounce' : ''}`}>
                {/* Glorpbox - always visible */}
                <button
                    type="button"
                    className="cursor-pointer transition-transform hover:scale-110 active:scale-95 flex items-center justify-center group"
                    onClick={generateGlorp}
                    aria-label="Generate a random Glorp character"
                    aria-busy={isGenerating}
                    title="Click to generate a Glorp!"
                >
                    <Image
                        src="/glorps/glorpbox.png"
                        alt="Glorp Box"
                        width={128}
                        height={128}
                        className="max-w-32 max-h-32 w-auto h-auto"
                        style={{
                            imageRendering: "pixelated",
                            objectFit: "contain"
                        }}
                        unoptimized
                    />
                </button>

                {/* Thinking bubbles animation - stay visible during whole generation */}
                {isGenerating && !isResetting && (
                    <div role="status" aria-live="polite" aria-label="Generating Glorp">
                        {THINKING_BUBBLES.map((bubble, index) => (
                            <div
                                key={`bubble-${index + 1}-${animationKey}`}
                                className={`absolute ${bubble.top} ${bubble.right} ${bubble.size} bg-blue-500 dark:bg-blue-400 rounded-full opacity-0 shadow-md z-20`}
                                style={{
                                    animationDelay: bubble.delay,
                                    animation: `fadeInBounce 0.5s ease-in ${bubble.delay} forwards, gentleBounce 2s ease-in-out ${bubble.delay} infinite`
                                }}
                                aria-hidden="true"
                            />
                        ))}
                    </div>
                )}

                {/* Generated glorp in a thought bubble */}
                {currentGlorpIndex !== null && (
                    <div
                        role="status"
                        aria-live="polite"
                        aria-label={`Generated Glorp: ${GLORP_IMAGES[currentGlorpIndex].replace('.png', '')}`}
                        className={`absolute -top-72 right-0 bg-blue-500 dark:bg-blue-600 border border-blue-500 dark:border-blue-400 shadow-xl p-4 transition-opacity duration-300 z-10 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                        style={{
                            borderRadius: '73% 27% 55% 45% / 42% 68% 32% 58%'
                        }}
                    >
                        <Image
                            src={`/glorps/${GLORP_IMAGES[currentGlorpIndex]}`}
                            alt="Glorp"
                            width={128}
                            height={128}
                            className="max-w-32 max-h-32 w-auto h-auto opacity-0 rounded-2xl"
                            style={{
                                imageRendering: "pixelated",
                                objectFit: "contain",
                                animation: isVisible ? 'fadeInBounce 0.5s ease-in forwards' : 'none'
                            }}
                            unoptimized
                        />
                    </div>
                )}
            </div>
        </div>
    );
}
