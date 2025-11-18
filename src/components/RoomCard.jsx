// src/components/RoomCard.jsx
import { useState } from 'react';
import RoomModal from './RoomModal';

const getIcon = (type) => {
    switch (type) {
        case 'kamar': return '🛏️';
        case 'penyelia': return '🧑‍💼';
        case 'gudang': return '📦';
        case 'panel': return '⚡';
        case 'dapur': return '🍳';
        case 'gym': return '🏋️';
        case 'barbershop': return '✂️';
        case 'klinik': return '🏥';
        case 'kantor': return '🏢';
        default: return '🚪';
    }
};

const getStatusColor = (status) => {
    switch (status) {
        case 'occupied': return 'bg-green-100 text-green-800';
        case 'vacant': return 'bg-blue-100 text-blue-800';
        case 'maintenance': return 'bg-yellow-100 text-yellow-800';
        case 'active': return 'bg-emerald-100 text-emerald-800';
        default: return 'bg-gray-100 text-gray-800';
    }
};

const RoomCard = ({ room, floorId, onUpdate, onDelete }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleEdit = () => setIsModalOpen(true);
    const handleDelete = () => {
        if (window.confirm(`Hapus ruangan "${room.name}"? Tindakan ini tidak bisa dibatalkan.`)) {
            onDelete(floorId, room.id);
        }
    };

    const handleSave = (data) => {
        onUpdate(floorId, room.id, data);
        setIsModalOpen(false);
    };

    return (
        <>
            <div
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-5 cursor-pointer border border-gray-100 group"
                style={{ minHeight: '180px', display: 'flex', flexDirection: 'column' }}
            >
                {/* Icon + Title */}
                <div className="flex items-start gap-3 mb-3">
                    <div className="text-2xl">{getIcon(room.type)}</div>
                    <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-lg text-gray-800 truncate">{room.name}</h3>
                        <div className={`inline-block mt-1 px-2 py-0.5 text-xs font-semibold rounded-full ${getStatusColor(room.status)}`}>
                            {room.status === 'occupied' && 'Terisi'}
                            {room.status === 'vacant' && 'Kosong'}
                            {room.status === 'maintenance' && 'Perbaikan'}
                            {room.status === 'active' && 'Aktif'}
                        </div>
                    </div>
                </div>

                {/* Info Penghuni / Tipe */}
                <p className="text-sm text-gray-600 mt-2">
                    {room.type === 'kamar' || room.type === 'penyelia'
                        ? `Penghuni: ${room.occupants}/${room.capacity}`
                        : room.type.charAt(0).toUpperCase() + room.type.slice(1)
                    }
                </p>

                {/* Detail Penghuni (untuk kamar) */}
                {room.type === 'kamar' && room.occupantsDetails && room.occupantsDetails.length > 0 && (
                    <div className="mt-3 space-y-1">
                        {room.occupantsDetails.slice(0, 2).map((p, i) => (
                            <div key={i} className="text-xs text-gray-700 flex items-center">
                                <span className="w-3 h-3 rounded-full bg-blue-400 mr-2"></span>
                                {p.nama} ({p.nis})
                            </div>
                        ))}
                        {room.occupantsDetails.length > 2 && (
                            <div className="text-xs text-gray-500">
                                +{room.occupantsDetails.length - 2} lainnya
                            </div>
                        )}
                    </div>
                )}

                {/* Tombol Aksi */}
                <div className="mt-auto pt-3 border-t border-gray-100">
                    <div className="flex justify-between">
                        <button
                            onClick={handleEdit}
                            className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                            Edit
                        </button>
                        <button
                            onClick={handleDelete}
                            className="text-sm text-red-600 hover:text-red-800 font-medium flex items-center"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            Hapus
                        </button>
                    </div>
                </div>
            </div>

            <RoomModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSave}
                initialData={room}
                floorId={floorId}
            />
        </>
    );
};

export default RoomCard;