// src/pages/FloorB2.jsx
import { useState, useEffect, useRef } from 'react';
import { useRoomData } from '../hooks/useRoomData';
import RoomCard from '../components/RoomCard';
import RoomModal from '../components/RoomModal';
import gsap from 'gsap';
import Header from '../components/Header';

const FloorB2 = () => {
    const { getRooms, addRoom, updateRoom, deleteRoom } = useRoomData();
    const [rooms, setRooms] = useState([]);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const gridRef = useRef(null);

    useEffect(() => {
        setRooms(getRooms('B2'));
    }, [getRooms]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.floor-title', { opacity: 0, y: 30, duration: 0.6 });
            gsap.utils.toArray('.room-card').forEach((card, i) => {
                gsap.from(card, {
                    y: 40,
                    opacity: 1,
                    duration: 0.7,
                    ease: 'power3.out',
                    delay: 0.1 * i,
                    scrollTrigger: { trigger: gridRef.current, start: 'top 85%' }
                });
            });
        });
        return () => ctx.revert();
    }, [rooms]);

    const handleAdd = (data) => {
        addRoom('B2', data);
        setIsAddModalOpen(false);
    };

    const handleUpdate = (roomId, data) => {
        updateRoom('B2', roomId, data);
    };

    const handleDelete = (roomId) => {
        deleteRoom('B2', roomId);
    };

    return (
        <>
            <Header />
            <main className="min-h-screen py-8">
                <div className="container">
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h1 className="floor-title text-2xl md:text-3xl font-bold text-gray-800">
                                Basement 2
                            </h1>
                            <p className="text-gray-600">
                                Dapur utama asrama • Total: {rooms.length} ruangan
                            </p>
                        </div>
                        <button
                            onClick={() => setIsAddModalOpen(true)}
                            className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition flex items-center"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                            {rooms.length === 0 ? 'Buat Dapur' : 'Tambah Area'}
                        </button>
                    </div>

                    <div
                        ref={gridRef}
                        className="grid grid-cols-1 gap-5"
                    >
                        {rooms.map(room => (
                            <RoomCard
                                key={room.id}
                                room={room}
                                floorId="B2"
                                onUpdate={handleUpdate}
                                onDelete={handleDelete}
                            />
                        ))}
                    </div>

                    {rooms.length === 0 && (
                        <div className="text-center py-12 text-gray-500 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border border-amber-200">
                            <div className="text-5xl mb-4">🍳</div>
                            <h3 className="font-bold text-lg text-amber-800 mb-2">Dapur Belum Dibuat</h3>
                            <p className="mb-4 max-w-md mx-auto">
                                Basement 2 akan digunakan sebagai dapur utama asrama. Silakan buat ruangan dapur pertama.
                            </p>
                            <button
                                onClick={() => setIsAddModalOpen(true)}
                                className="px-5 py-2 bg-amber-600 text-white font-medium rounded-lg hover:bg-amber-700 transition shadow-sm"
                            >
                                Buat Dapur Sekarang
                            </button>
                        </div>
                    )}
                </div>

                <RoomModal
                    isOpen={isAddModalOpen}
                    onClose={() => setIsAddModalOpen(false)}
                    onSave={handleAdd}
                    floorId="B2"
                />
            </main>
        </>
    );
};

export default FloorB2;