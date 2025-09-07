"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { FiLoader, FiAlertTriangle } from "react-icons/fi";

// Impor komponen dari file terpisah
import Lokasi from "@/components/Lokasi";
import Cuaca, { WeatherInfo } from "@/components/Cuaca"; // Impor juga tipe datanya

const WeatherPage = () => {
  const [cuaca, setCuaca] = useState<WeatherInfo | null>(null);
  const [lokasi, setLokasi] = useState("Depok"); // Lokasi default
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!lokasi) return;

    const fetchCuaca = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
        if (!apiKey) {
          throw new Error(
            "API Key tidak ditemukan. Pastikan sudah diatur di .env.local"
          );
        }
        const response = await axios.get(
          `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${lokasi}&days=1&aqi=no&alerts=no`
        );

        setCuaca({
          lokasi: response.data.location,
          current: response.data.current,
          forecast: response.data.forecast.forecastday[0].hour,
        });
      } catch (err: any) {
        if (axios.isAxiosError(err) && err.response?.status === 400) {
          setError(`Lokasi "${lokasi}" tidak ditemukan. Silakan coba lagi.`);
        } else {
          setError(err.message || "Terjadi kesalahan saat mengambil data.");
        }
        setCuaca(null);
      } finally {
        setIsLoading(false);
      }
    };

    const timer = setTimeout(() => {
      fetchCuaca();
    }, 500); // Debounce

    return () => clearTimeout(timer);
  }, [lokasi]);

  return (
    <div className="relative min-h-screen text-white flex flex-col items-center p-4 sm:p-8 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 animate-gradient-xy"></div>

      <main className="z-10 w-full flex flex-col items-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-2 text-center text-white/90">
          Prakiraan Cuaca
        </h1>
        <p className="text-md sm:text-lg text-white/60 mb-8 text-center">
          Dapatkan info cuaca terkini dari seluruh dunia
        </p>

        <Lokasi
          onLokasiChange={setLokasi}
          currentLokasi={lokasi}
          isLoading={isLoading}
        />

        {isLoading && (
          <div className="flex flex-col items-center justify-center text-lg mt-10">
            <FiLoader className="text-5xl animate-spin mb-4" />
            <p>Memuat data untuk {lokasi}...</p>
          </div>
        )}

        {error && (
          <div className="mt-10 bg-red-900/50 border border-red-500 text-red-200 px-6 py-4 rounded-lg flex items-center gap-4">
            <FiAlertTriangle className="text-3xl" />
            <p>{error}</p>
          </div>
        )}

        {!isLoading && cuaca && <Cuaca data={cuaca} />}
      </main>
    </div>
  );
};

export default WeatherPage;
