// src/components/AnimatedPage.jsx
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

/**
 * AnimatedPage
 * Wrapper untuk halaman yang ingin diberi animasi masuk (fade + slide)
 * Gunakan sebagai komponen pembungkus di setiap halaman
 *
 * Contoh penggunaan:
 *   return (
 *     <AnimatedPage>
 *       <YourPageContent />
 *     </AnimatedPage>
 *   );
 */
const AnimatedPage = ({ children, delay = 0 }) => {
    const pageRef = useRef(null);

    useEffect(() => {
        if (!pageRef.current) return;

        // Reset state
        gsap.set(pageRef.current, { opacity: 0, y: 30 });

        // Animasi masuk
        gsap.to(pageRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'expo.out',
            delay: delay,
        });
    }, [delay]);

    return (
        <div
            ref={pageRef}
            className="animated-page"
            style={{
                opacity: 0,
                willChange: 'opacity, transform',
                // Hindari FOUC saat reload
            }}
        >
            {children}
        </div>
    );
};

export default AnimatedPage;