"use client";

import React, { useState } from "react";
import { FiMapPin, FiLoader } from "react-icons/fi";

// Definisikan tipe untuk props agar komponen ini tahu data apa yang ia terima
interface LokasiProps {
  onLokasiChange: (lokasi: string) => void;
  currentLokasi: string;
  isLoading: boolean;
}

const Lokasi: React.FC<LokasiProps> = ({
  onLokasiChange,
  currentLokasi,
  isLoading,
}) => {
  const [inputLokasi, setInputLokasi] = useState(currentLokasi);
  const lokasiPopuler = ["Jakarta", "Bandung", "Depok", "London", "Tokyo"];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      inputLokasi.trim() &&
      inputLokasi.trim().toLowerCase() !== currentLokasi.toLowerCase()
    ) {
      onLokasiChange(inputLokasi.trim());
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto mb-8 z-10">
      <form
        onSubmit={handleSubmit}
        className="flex items-center bg-white/10 backdrop-blur-md rounded-full shadow-lg overflow-hidden"
      >
        <FiMapPin className="text-gray-300 text-xl mx-4" />
        <input
          type="text"
          value={inputLokasi}
          onChange={(e) => setInputLokasi(e.target.value)}
          placeholder="Cari kota..."
          className="w-full bg-transparent p-4 text-white placeholder-gray-400 focus:outline-none"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-500 text-white font-bold py-4 px-6 transition-colors"
        >
          {isLoading ? <FiLoader className="animate-spin" /> : "Cari"}
        </button>
      </form>
      <div className="flex justify-center gap-2 mt-4">
        {lokasiPopuler.map((loc) => (
          <button
            key={loc}
            onClick={() => {
              setInputLokasi(loc);
              onLokasiChange(loc);
            }}
            className={`px-3 py-1 text-sm rounded-full transition-all duration-300 ${
              currentLokasi.toLowerCase() === loc.toLowerCase()
                ? "bg-purple-600 text-white shadow-md"
                : "bg-white/10 hover:bg-white/20 text-gray-200"
            }`}
          >
            {loc}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Lokasi;
