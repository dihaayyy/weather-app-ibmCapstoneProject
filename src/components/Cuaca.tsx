"use client";

import React from "react";
import { FiThermometer } from "react-icons/fi";
import {
  WiDaySunny,
  WiCloudy,
  WiRain,
  WiShowers,
  WiThunderstorm,
  WiSnow,
  WiFog,
  WiRaindrop,
} from "react-icons/wi";

// ================================================
// Tipe Data untuk komponen ini
// ================================================
interface CurrentWeather {
  temp_c: number;
  feelslike_c: number;
  condition: {
    text: string;
    code: number;
  };
}

interface HourData {
  time_epoch: number;
  time: string;
  temp_c: number;
  condition: {
    code: number;
  };
  chance_of_rain: number;
}

export interface WeatherInfo {
  lokasi: {
    name: string;
    country: string;
  };
  current: CurrentWeather;
  forecast: HourData[];
}

// Definisikan tipe untuk props
interface CuacaProps {
  data: WeatherInfo;
}

// ================================================
// Fungsi Helper untuk Ikon
// ================================================
const getWeatherIcon = (code: number) => {
  const iconMap: { [key: number]: React.ReactElement } = {
    1000: <WiDaySunny />,
    1003: <WiCloudy />,
    1006: <WiCloudy />,
    1009: <WiCloudy />,
    1030: <WiFog />,
    1063: <WiShowers />,
    1183: <WiRain />,
    1189: <WiRain />,
    1195: <WiThunderstorm />,
    1213: <WiSnow />,
    1276: <WiThunderstorm />,
  };
  return iconMap[code] || <WiCloudy />; // Ikon default
};

const Cuaca: React.FC<CuacaProps> = ({ data }) => {
  return (
    <div className="w-full max-w-4xl mx-auto z-10 space-y-8">
      {/* Kartu Cuaca Saat Ini */}
      <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-6 flex flex-col sm:flex-row items-center justify-between text-white">
        <div>
          <h2 className="text-4xl font-bold">
            {data.lokasi.name}, {data.lokasi.country}
          </h2>
          <p className="text-gray-300 text-lg">{data.current.condition.text}</p>
        </div>
        <div className="flex items-center gap-4 sm:gap-8 mt-4 sm:mt-0">
          <div className="text-7xl text-yellow-300">
            {getWeatherIcon(data.current.condition.code)}
          </div>
          <div>
            <p className="text-6xl font-extrabold">
              {Math.round(data.current.temp_c)}°
            </p>
            <p className="text-gray-300 flex items-center gap-1">
              <FiThermometer />
              Terasa {Math.round(data.current.feelslike_c)}°
            </p>
          </div>
        </div>
      </div>

      {/* Prediksi Per Jam */}
      <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-6">
        <h3 className="text-xl font-bold text-white mb-4">Prediksi 24 Jam</h3>
        <div className="overflow-x-auto pb-2">
          <div className="flex space-x-4">
            {data.forecast.map((jam) => (
              <div
                key={jam.time_epoch}
                className="flex-shrink-0 flex flex-col items-center gap-2 bg-black/20 rounded-xl p-4 w-28 text-center transition-transform hover:-translate-y-2 duration-300"
              >
                <p className="font-semibold text-md">
                  {new Date(jam.time).toLocaleTimeString("id-ID", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
                <div className="text-5xl text-yellow-300 my-1">
                  {getWeatherIcon(jam.condition.code)}
                </div>
                <p className="text-2xl font-bold">{Math.round(jam.temp_c)}°C</p>
                <div className="flex items-center text-xs text-cyan-300 font-semibold mt-1">
                  <WiRaindrop className="mr-1 text-lg" />
                  <span>{jam.chance_of_rain}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cuaca;
