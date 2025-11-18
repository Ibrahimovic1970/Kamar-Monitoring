// src/hooks/useRoomData.js
import { useState, useEffect } from 'react';

// Mock initial data — sesuai struktur lantai yang diminta
const initialData = {
    '3': [
        {
            id: '301',
            type: 'kamar',
            name: 'Kamar 301',
            status: 'occupied',
            occupants: 2,
            capacity: 3,
            occupantsDetails: [
                { nama: 'Budi Santoso', nis: '2023001', kelas: 'X IPA 1' },
                { nama: 'Ani Wijaya', nis: '2023002', kelas: 'X IPA 1' }
            ]
        },
        {
            id: '302',
            type: 'kamar',
            name: 'Kamar 302',
            status: 'vacant',
            occupants: 0,
            capacity: 3,
            occupantsDetails: []
        },
        {
            id: '3P',
            type: 'penyelia',
            name: 'Kamar Penyelia',
            status: 'occupied',
            occupants: 1,
            capacity: 1,
            occupantsDetails: [
                { nama: 'Pak Ahmad', nis: 'STAFF001', kelas: 'Penyelia' }
            ]
        },
    ],
    '2': [
        {
            id: '201',
            type: 'kamar',
            name: 'Kamar 201',
            status: 'occupied',
            occupants: 2,
            capacity: 3,
            occupantsDetails: [
                { nama: 'Fajar', nis: '2023006', kelas: 'XI IPA 1' },
                { nama: 'Gita', nis: '2023007', kelas: 'XI IPA 1' }
            ]
        },
        {
            id: '2G',
            type: 'gudang',
            name: 'Gudang',
            status: 'active',
            occupants: 0,
            capacity: 0,
            occupantsDetails: []
        },
        {
            id: '2P',
            type: 'penyelia',
            name: 'Kamar Penyelia',
            status: 'occupied',
            occupants: 1,
            capacity: 1,
            occupantsDetails: [
                { nama: 'Bu Siti', nis: 'STAFF002', kelas: 'Penyelia' }
            ]
        },
    ],
    '1': [
        {
            id: '101',
            type: 'kamar',
            name: 'Kamar 101',
            status: 'occupied',
            occupants: 2,
            capacity: 3,
            occupantsDetails: [
                { nama: 'Hendra', nis: '2023008', kelas: 'XII IPA 1' },
                { nama: 'Ira', nis: '2023009', kelas: 'XII IPA 1' }
            ]
        },
        {
            id: '1P',
            type: 'panel',
            name: 'Ruang Panel Listrik',
            status: 'active',
            occupants: 0,
            capacity: 0,
            occupantsDetails: []
        },
    ],
    'B1': [
        {
            id: 'B1-KS',
            type: 'klinik',
            name: 'Ruang Kesehatan',
            status: 'active',
            occupants: 0,
            capacity: 0,
            occupantsDetails: []
        },
        {
            id: 'B1-GM',
            type: 'gym',
            name: 'Ruang Gym',
            status: 'active',
            occupants: 0,
            capacity: 0,
            occupantsDetails: []
        },
    ],
    'B2': [
        {
            id: 'B2-DP',
            type: 'dapur',
            name: 'Dapur Utama',
            status: 'active',
            occupants: 2,
            capacity: 4,
            occupantsDetails: [
                { nama: 'Koki A', nis: 'STAFF003', kelas: 'Dapur' },
                { nama: 'Koki B', nis: 'STAFF004', kelas: 'Dapur' }
            ]
        },
    ],
};

export const useRoomData = () => {
    const [rooms, setRooms] = useState(() => {
        const saved = localStorage.getItem('dorm-rooms');
        return saved ? JSON.parse(saved) : initialData;
    });

    // Simpan ke localStorage tiap perubahan
    useEffect(() => {
        localStorage.setItem('dorm-rooms', JSON.stringify(rooms));
    }, [rooms]);

    // CREATE
    const addRoom = (floorId, newRoom) => {
        setRooms(prev => ({
            ...prev,
            [floorId]: [...(prev[floorId] || []), {
                ...newRoom,
                id: generateId(floorId),
                occupantsDetails: newRoom.occupantsDetails || []
            }]
        }));
    };

    // READ — ambil semua ruangan di lantai tertentu
    const getRooms = (floorId) => rooms[floorId] || [];

    // UPDATE
    const updateRoom = (floorId, roomId, updatedData) => {
        setRooms(prev => ({
            ...prev,
            [floorId]: prev[floorId].map(room =>
                room.id === roomId ? { ...room, ...updatedData } : room
            )
        }));
    };

    // DELETE
    const deleteRoom = (floorId, roomId) => {
        setRooms(prev => ({
            ...prev,
            [floorId]: prev[floorId].filter(room => room.id !== roomId)
        }));
    };

    // Helper: generate ID otomatis
    const generateId = (floorId) => {
        const prefix = floorId === 'B1' ? 'B1-' : floorId === 'B2' ? 'B2-' : floorId;
        const existing = rooms[floorId] || [];
        const nums = existing
            .filter(r => r.id.startsWith(prefix) && !isNaN(r.id.slice(prefix.length)))
            .map(r => parseInt(r.id.slice(prefix.length)) || 0);
        const nextNum = nums.length ? Math.max(...nums) + 1 : 1;
        return `${prefix}${nextNum}`;
    };

    return {
        rooms,
        addRoom,
        getRooms,
        updateRoom,
        deleteRoom,
    };
};