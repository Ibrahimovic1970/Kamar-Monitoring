// src/components/RoomModal.jsx
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const RoomModal = ({ isOpen, onClose, onSave, initialData = null, floorId }) => {
    const modalRef = useRef(null);
    const overlayRef = useRef(null);

    // ✅ SEMUA HOOK DI LEVEL PALING ATAS — TANPA KONDISI / EARLY RETURN
    const [formData, setFormData] = useState({
        type: 'kamar',
        name: '',
        status: 'vacant',
        occupants: 0,
        capacity: 3,
        occupantsDetails: [],
    });

    // ✅ useEffect 1: Sinkronisasi data saat modal dibuka
    useEffect(() => {
        if (isOpen) {
            if (initialData) {
                setFormData({
                    type: initialData.type || 'kamar',
                    name: initialData.name || '',
                    status: initialData.status || 'vacant',
                    occupants: initialData.occupants || 0,
                    capacity: initialData.capacity || (initialData.type === 'kamar' ? 3 : 0),
                    occupantsDetails: initialData.occupantsDetails || [],
                });
            } else {
                setFormData({
                    type: 'kamar',
                    name: '',
                    status: 'vacant',
                    occupants: 0,
                    capacity: 3,
                    occupantsDetails: [],
                });
            }
        }
    }, [isOpen, initialData]);

    // ✅ useEffect 2: Animasi masuk/keluar — modal di tengah layar
    useEffect(() => {
        if (!modalRef.current || !overlayRef.current) return;

        if (isOpen) {
            // Setup awal (invisible)
            gsap.set(modalRef.current, { scale: 0.9, opacity: 0, y: 20 });
            gsap.set(overlayRef.current, { opacity: 0 });

            // Masuk
            gsap.to(overlayRef.current, { opacity: 0.7, duration: 0.3 });
            gsap.to(modalRef.current, {
                scale: 1,
                opacity: 1,
                y: -350,
                x: -250,
                duration: 0.4,
                ease: 'back.out(1.7)',
                onComplete: () => {
                    modalRef.current?.focus();
                }
            });
        } else {
            // Keluar
            const timeline = gsap.timeline({ onComplete: onClose });
            timeline
                .to(modalRef.current, { scale: 0.95, opacity: 0, y: 10, duration: 0.25, ease: 'power2.in' })
                .to(overlayRef.current, { opacity: 0, duration: 0.25 }, '<');
        }
    }, [isOpen, onClose]);

    // ✅ useEffect 3: Sinkronisasi jumlah penghuni dari detail
    useEffect(() => {
        const count = formData.occupantsDetails.filter(d => d.nama?.trim()).length;
        if (count !== formData.occupants) {
            setFormData(prev => ({ ...prev, occupants: count }));
        }
    }, [formData.occupantsDetails]);

    // ———————————————————————
    // Handler functions (di luar hook)
    // ———————————————————————

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleOccupantChange = (index, field, value) => {
        setFormData(prev => {
            const newDetails = [...prev.occupantsDetails];
            newDetails[index] = { ...newDetails[index], [field]: value };
            return { ...prev, occupantsDetails: newDetails };
        });
    };

    const addOccupant = () => {
        setFormData(prev => {
            if (prev.occupantsDetails.length >= prev.capacity) return prev;
            return {
                ...prev,
                occupantsDetails: [...prev.occupantsDetails, { nama: '', nis: '', kelas: '' }]
            };
        });
    };

    const removeOccupant = (index) => {
        setFormData(prev => ({
            ...prev,
            occupantsDetails: prev.occupantsDetails.filter((_, i) => i !== index)
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.type === 'kamar' && formData.occupants > formData.capacity) {
            alert('Jumlah penghuni melebihi kapasitas!');
            return;
        }
        onSave({
            ...formData,
            occupants: formData.occupantsDetails.filter(d => d.nama?.trim()).length
        });
    };

    // ✅ EARLY RETURN HANYA DI AKHIR — SETELAH SEMUA HOOK
    if (!isOpen) return null;

    // ———————————————————————
    // JSX Return
    // ———————————————————————

    return (
        <>
            {/* Overlay */}
            <div
                ref={overlayRef}
                className="fixed inset-0 bg-black z-40"
                onClick={onClose}
                style={{ opacity: 0 }}
            ></div>

            {/* Modal — di tengah layar */}
            <div
                ref={modalRef}
                className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md p-6"
                style={{ opacity: 0, scale: 0.9 }}
                tabIndex="-1"
            >
                <div className="bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden">
                    {/* Header */}
                    <div className="p-5 border-b border-gray-100">
                        <h3 className="text-xl font-bold text-gray-800">
                            {initialData ? 'Edit Ruangan' : 'Tambah Ruangan Baru'}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">
                            Lantai {floorId} • {initialData && `ID: ${initialData.id}`}
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="p-5 space-y-5">
                        {/* Tipe Ruangan */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Tipe Ruangan</label>
                            <select
                                name="type"
                                value={formData.type}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required
                            >
                                <option value="kamar">Kamar Penghuni</option>
                                <option value="penyelia">Kamar Penyelia</option>
                                <option value="gudang">Gudang</option>
                                <option value="panel">Panel Listrik</option>
                                <option value="dapur">Dapur</option>
                                <option value="gym">Gym</option>
                                <option value="barbershop">Barbershop</option>
                                <option value="klinik">Ruang Kesehatan</option>
                                <option value="kantor">Kantor</option>
                            </select>
                        </div>

                        {/* Nama Ruangan */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Nama Ruangan</label>
                            <input
                                name="name"
                                type="text"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Contoh: Kamar 101, Dapur Utama"
                                required
                            />
                        </div>

                        {/* Status */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                            <select
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required
                            >
                                <option value="occupied">Terisi</option>
                                <option value="vacant">Kosong</option>
                                <option value="maintenance">Perbaikan</option>
                                <option value="active">Aktif (fasilitas)</option>
                            </select>
                        </div>

                        {/* Kapasitas & Penghuni */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Kapasitas</label>
                                <input
                                    name="capacity"
                                    type="number"
                                    min="0"
                                    value={formData.capacity}
                                    onChange={handleChange}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Penghuni Saat Ini</label>
                                <input
                                    name="occupants"
                                    type="number"
                                    min="0"
                                    max={formData.capacity}
                                    value={formData.occupants}
                                    onChange={handleChange}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    readOnly
                                />
                            </div>
                        </div>

                        {/* Detail Penghuni (hanya untuk kamar) */}
                        {formData.type === 'kamar' && (
                            <div className="mt-5 pt-4 border-t border-gray-200">
                                <div className="flex justify-between items-center mb-3">
                                    <h4 className="font-medium text-gray-800">Detail Penghuni</h4>
                                    <button
                                        type="button"
                                        onClick={addOccupant}
                                        disabled={formData.occupantsDetails.length >= formData.capacity}
                                        className={`px-3 py-1 text-xs font-medium rounded ${formData.occupantsDetails.length >= formData.capacity
                                                ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                                : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                                            }`}
                                    >
                                        + Tambah Penghuni
                                    </button>
                                </div>

                                {formData.occupantsDetails.map((occupant, index) => (
                                    <div key={index} className="mb-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-sm font-medium text-gray-700">Penghuni {index + 1}</span>
                                            <button
                                                type="button"
                                                onClick={() => removeOccupant(index)}
                                                className="text-red-500 hover:text-red-700 text-xs font-medium"
                                            >
                                                Hapus
                                            </button>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                            <div>
                                                <label className="block text-xs text-gray-600 mb-1">Nama</label>
                                                <input
                                                    type="text"
                                                    value={occupant.nama}
                                                    onChange={(e) => handleOccupantChange(index, 'nama', e.target.value)}
                                                    className="w-full p-2 border border-gray-300 rounded text-sm"
                                                    placeholder="Contoh: Andi Pratama"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs text-gray-600 mb-1">NIS</label>
                                                <input
                                                    type="text"
                                                    value={occupant.nis}
                                                    onChange={(e) => handleOccupantChange(index, 'nis', e.target.value)}
                                                    className="w-full p-2 border border-gray-300 rounded text-sm"
                                                    placeholder="Contoh: 2023001"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs text-gray-600 mb-1">Kelas</label>
                                                <input
                                                    type="text"
                                                    value={occupant.kelas}
                                                    onChange={(e) => handleOccupantChange(index, 'kelas', e.target.value)}
                                                    className="w-full p-2 border border-gray-300 rounded text-sm"
                                                    placeholder="Contoh: X IPA 1"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                {formData.occupantsDetails.length === 0 && (
                                    <div className="text-center py-4 text-gray-500 text-sm">
                                        Belum ada penghuni. Klik "+ Tambah Penghuni" untuk menambahkan.
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Tombol Aksi */}
                        <div className="flex justify-end space-x-3 pt-4">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-4 py-2 text-gray-600 font-medium rounded-lg hover:bg-gray-100 transition"
                            >
                                Batal
                            </button>
                            <button
                                type="submit"
                                className="px-5 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition shadow-sm"
                            >
                                {initialData ? 'Simpan Perubahan' : 'Tambah Ruangan'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default RoomModal;