// src/pages/Home.jsx
import { useEffect } from 'react';
import gsap from 'gsap';
import Header from '../components/Header';
import ParallaxHero from '../components/ParallaxHero';
import FloorCard from '../components/FloorCard';

const floors = [
    {
        id: '3',
        name: 'Lantai 3',
        description: '9 kamar penghuni + 1 kamar penyelia',
        to: '/floor/3'
    },
    {
        id: '2',
        name: 'Lantai 2',
        description: '7 kamar penghuni + 1 gudang + 1 kamar penyelia',
        to: '/floor/2'
    },
    {
        id: '1',
        name: 'Lantai 1',
        description: '4 kamar penghuni + 1 ruang panel',
        to: '/floor/1'
    },
    {
        id: 'B1',
        name: 'Basement 1',
        description: '5 ruangan: kamar sehat, barbershop, gym, pemerintah, kantor',
        to: '/floor/b1'
    },
    {
        id: 'B2',
        name: 'Basement 2',
        description: '1 ruangan: dapur',
        to: '/floor/b2'
    }
];

const Home = () => {
    useEffect(() => {
        gsap.from('.title-fade', {
            opacity: 1,
            y: -30,
            duration: 0.8,
            ease: 'power2.out'
        });
    }, []);

    return (
        <>
            <Header />
            <ParallaxHero />

            <div className="container py-8">
                <h2 className="title-fade text-3xl font-bold text-center mb-2 text-gray-800">
                    Lantai Asrama
                </h2>
                <p className="text-center text-gray-600 mb-10 mt-10 max-w-2xl mx-auto">
                    Pilih lantai untuk melihat detail ruangan, penghuni, dan status fasilitas.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {floors.map((floor) => (
                        <FloorCard
                            key={floor.id}
                            floor={floor}
                            to={floor.to}
                        />
                    ))}
                </div>
            </div>
        </>
    );
};

export default Home;