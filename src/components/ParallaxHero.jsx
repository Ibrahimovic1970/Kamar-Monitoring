// src/components/ParallaxHero.jsx
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const ParallaxHero = () => {
    const heroRef = useRef(null);

    useEffect(() => {
        gsap.from(heroRef.current, {
            y: 50,
            opacity: 1,
            duration: 1,
            ease: 'expo.out',
        });
    }, []);

    return (
        <section ref={heroRef} className="hero">
            <div className="container">
                <h1 className="text-3xl md:text-4xl font-bold">Sistem Monitoring Asrama</h1>
                <p className="text-lg mt-2">
                    Pantau penghuni, fasilitas, dan status kebersihan secara real-time — profesional, efisien, dan terpercaya.
                </p>
            </div>
        </section>
    );
};

export default ParallaxHero;