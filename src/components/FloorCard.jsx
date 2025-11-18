// src/components/FloorCard.jsx
import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';

const FloorCard = ({ floor, to }) => {
    const cardRef = useRef(null);

    useEffect(() => {
        if (cardRef.current) {
            gsap.from(cardRef.current, {
                y: 50,
                opacity: 1,
                duration: 0.6,
                ease: 'power3.out',
            });
        }
    }, []);

    let bgColor = 'bg-white';
    let accentColor = 'border-l-4 border-blue-500';
    if (floor.id === 'B1') bgColor = 'bg-gradient-to-br from-emerald-50 to-cyan-50';
    if (floor.id === 'B2') bgColor = 'bg-gradient-to-br from-amber-50 to-orange-50';

    return (
        <Link to={to} className="block">
            <div
                ref={cardRef}
                className={`${bgColor} ${accentColor} rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 overflow-hidden`}
                style={{ minHeight: '120px', display: 'flex', flexDirection: 'column' }}
            >
                <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                        <h3 className="text-xl font-bold text-gray-800">{floor.name}</h3>
                        <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                            {floor.description}
                        </p>
                    </div>
                    <div className="mt-2 flex justify-between items-center">
                        <span className="inline-block bg-gray-200 text-gray-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                            {floor.id}
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default FloorCard;