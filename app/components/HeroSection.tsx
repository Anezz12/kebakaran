import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const HeroSection: React.FC = () => {
  return (
    <div className="relative bg-gray-900 overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent opacity-80 z-10"></div>
        <Image
          src="/bg.jpg"
          alt="Latar belakang kebakaran hutan"
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 lg:py-40 z-20">
        <div className="md:w-2/3">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Deteksi Dini Selamatkan <span className="text-red-500">Kota</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-8">
            Sistem berbasis kecerdasan buatan untuk deteksi dini dan pencegahan
            kebakaran Kota. Lindungi sumber daya alam kita sebelum terlambat.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="#prediction-form" className="inline-block">
              <button className="bg-red-700 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition duration-300 text-lg w-full sm:w-auto">
                Lihat Peta Deteksi
              </button>
            </Link>
            <Link href="/" className="inline-block">
              <button className="bg-white hover:bg-gray-100 text-red-700 font-bold py-3 px-6 rounded-lg shadow-lg transition duration-300 text-lg w-full sm:w-auto">
                Laporkan Kebakaran
              </button>
            </Link>
          </div>

          <div className="mt-12 flex items-center space-x-6">
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold text-white">95%</span>
              <span className="text-gray-300 text-sm">Akurasi Deteksi</span>
            </div>
            <div className="w-px h-12 bg-gray-600"></div>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold text-white">10x</span>
              <span className="text-gray-300 text-sm">Respons Lebih Cepat</span>
            </div>
            <div className="w-px h-12 bg-gray-600"></div>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold text-white">24/7</span>
              <span className="text-gray-300 text-sm">Pemantauan</span>
            </div>
          </div>
        </div>
      </div>

      {/* Alert banner */}
      <div className="absolute bottom-0 left-0 right-0 bg-red-700 py-3 px-4 md:px-8 z-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-3 md:mb-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <p className="text-white font-medium">
              Tingkat Risiko Kebakaran Saat Ini:{' '}
              <span className="font-bold">TINGGI</span> di Wilayah Tengah
            </p>
          </div>
          <button className="bg-white text-red-700 px-4 py-1 rounded-md font-medium hover:bg-gray-100 transition duration-300">
            Periksa Pembaruan
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
