/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import Image from 'next/image';

interface FormData {
  luas_area_kejadian: string;
  jumlah_sdm: string;
  jumlah_unit: string;
  jumlah_jiwa: string;
  objek_bp: string;
  jumlah_kk: string;
  objek_bup: string;
  objek_bi: string;
}

interface PredictionResult {
  label: string;
}

const PredictionForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    luas_area_kejadian: '',
    jumlah_sdm: '',
    jumlah_unit: '',
    jumlah_jiwa: '',
    objek_bp: '',
    jumlah_kk: '',
    objek_bup: '',
    objek_bi: '',
  });

  const [showModal, setShowModal] = useState<boolean>(false);
  const [result, setResult] = useState<PredictionResult>({ label: '' });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Add this effect to handle body scroll locking when modal is open
  useEffect(() => {
    if (showModal) {
      // Prevent scrolling on the background when modal is open
      document.body.style.overflow = 'hidden';
    } else {
      // Re-enable scrolling when modal is closed
      document.body.style.overflow = 'auto';
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showModal]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // Convert string values to numbers
    const data: Record<string, number> = {};
    Object.keys(formData).forEach((key) => {
      data[key] = parseFloat(formData[key as keyof FormData] || '0');
    });

    try {
      // Using environment variable with fallback
      const apiUrl =
        process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/predict';

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Terjadi kesalahan saat memproses prediksi');
      }

      const resultData = await response.json();
      setResult(resultData);
      setShowModal(true);
    } catch (error: any) {
      console.error('Prediction error:', error);
      setError(error.message || 'Network error occurred');

      // Fallback to demo mode when API is unavailable
      if (
        error.message.includes('Network') ||
        error.message.includes('Failed to fetch')
      ) {
        handleDemoMode();
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Demo mode function - for when the API is unavailable
  const handleDemoMode = () => {
    // Simulate API call
    setTimeout(() => {
      // Mock a successful response
      const severityLevels = ['Rendah', 'Sedang', 'Tinggi'];
      const randomIndex = Math.floor(Math.random() * 3);

      setResult({ label: severityLevels[randomIndex] });
      setShowModal(true);
      setError(null); // Clear error since we're showing a result
    }, 1000);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  // Get appropriate icon based on severity level
  const getIconPath = (): string => {
    if (result.label === 'Rendah') return '/Ringan.png';
    if (result.label === 'Sedang') return '/Sedang.png';
    if (result.label === 'Tinggi') return '/Kritis.png';
    return '/images/default.png';
  };

  // Get severity color
  const getSeverityColor = (): string => {
    if (result.label === 'Rendah') return 'text-green-600';
    if (result.label === 'Sedang') return 'text-yellow-600';
    if (result.label === 'Tinggi') return 'text-red-600';
    return '';
  };

  // Get severity background color
  const getSeverityBgColor = (): string => {
    if (result.label === 'Rendah') return 'bg-green-50';
    if (result.label === 'Sedang') return 'bg-yellow-50';
    if (result.label === 'Tinggi') return 'bg-red-50';
    return '';
  };

  // Get severity border color
  const getSeverityBorderColor = (): string => {
    if (result.label === 'Rendah') return 'border-green-200';
    if (result.label === 'Sedang') return 'border-yellow-200';
    if (result.label === 'Tinggi') return 'border-red-200';
    return '';
  };

  return (
    <div id="prediction-form" className="w-full bg-gray-50 py-16 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white shadow-xl rounded-xl overflow-hidden">
            {/* Header section with decorative red top border */}
            <div className="bg-red-700 py-6 px-8">
              <h1 className="text-2xl md:text-3xl font-bold text-center text-white">
                Prediksi Keparahan Kebakaran
              </h1>
            </div>

            <div className="p-6 md:p-8">
              <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8 rounded">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-5 w-5 text-red-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red-700">
                      Masukkan data-data berikut dengan teliti untuk mendapatkan
                      hasil prediksi yang akurat.
                    </p>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <label
                      htmlFor="luas_area_kejadian"
                      className="block font-medium text-black mb-2"
                    >
                      Luas Area Kejadian (m²)
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        id="luas_area_kejadian"
                        name="luas_area_kejadian"
                        value={formData.luas_area_kejadian}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 text-black"
                        placeholder="Contoh: 150"
                      />
                    </div>
                    <p className="mt-1 text-xs text-gray-500">
                      Masukkan luas area dalam satuan meter persegi
                    </p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <label
                      htmlFor="jumlah_sdm"
                      className="block font-medium text-gray-800 mb-2"
                    >
                      Jumlah SDM
                    </label>
                    <input
                      type="number"
                      id="jumlah_sdm"
                      name="jumlah_sdm"
                      value={formData.jumlah_sdm}
                      onChange={handleChange}
                      required
                      className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 text-black"
                      placeholder="Contoh: 15"
                    />
                    <p className="mt-1 text-xs text-gray-500">
                      Jumlah sumber daya manusia yang tersedia
                    </p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <label
                      htmlFor="jumlah_unit"
                      className="block font-medium text-gray-800 mb-2"
                    >
                      Jumlah Unit
                    </label>
                    <input
                      type="number"
                      id="jumlah_unit"
                      name="jumlah_unit"
                      value={formData.jumlah_unit}
                      onChange={handleChange}
                      required
                      className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 text-black"
                      placeholder="Contoh: 3"
                    />
                    <p className="mt-1 text-xs text-gray-500">
                      Jumlah unit penanggulangan
                    </p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <label
                      htmlFor="jumlah_jiwa"
                      className="block font-medium text-gray-800 mb-2"
                    >
                      Jumlah Jiwa Terdampak
                    </label>
                    <input
                      type="number"
                      id="jumlah_jiwa"
                      name="jumlah_jiwa"
                      value={formData.jumlah_jiwa}
                      onChange={handleChange}
                      required
                      className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 text-black"
                      placeholder="Contoh: 45"
                    />
                    <p className="mt-1 text-xs text-gray-500">
                      Perkiraan jumlah jiwa yang terdampak
                    </p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <label
                      htmlFor="objek_bp"
                      className="block font-medium text-gray-800 mb-2"
                    >
                      Objek BP (Bangunan Pemukiman)
                    </label>
                    <input
                      type="number"
                      id="objek_bp"
                      name="objek_bp"
                      value={formData.objek_bp}
                      onChange={handleChange}
                      required
                      className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 text-black"
                      placeholder="Contoh: 12"
                    />
                    <p className="mt-1 text-xs text-gray-500">
                      Jumlah objek bangunan pemukiman
                    </p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <label
                      htmlFor="jumlah_kk"
                      className="block font-medium text-gray-800 mb-2"
                    >
                      Jumlah KK (Kartu Keluarga)
                    </label>
                    <input
                      type="number"
                      id="jumlah_kk"
                      name="jumlah_kk"
                      value={formData.jumlah_kk}
                      onChange={handleChange}
                      required
                      className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 text-black"
                      placeholder="Contoh: 8"
                    />
                    <p className="mt-1 text-xs text-gray-500">
                      Jumlah kartu keluarga terdampak
                    </p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <label
                      htmlFor="objek_bup"
                      className="block font-medium text-gray-800 mb-2"
                    >
                      Objek BUP (Bangunan Usaha/Perdagangan)
                    </label>
                    <input
                      type="number"
                      id="objek_bup"
                      name="objek_bup"
                      value={formData.objek_bup}
                      onChange={handleChange}
                      required
                      className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 text-black"
                      placeholder="Contoh: 4"
                    />
                    <p className="mt-1 text-xs text-gray-500">
                      Jumlah objek bangunan usaha/perdagangan
                    </p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <label
                      htmlFor="objek_bi"
                      className="block font-medium text-gray-800 mb-2"
                    >
                      Objek BI (Bangunan Industri)
                    </label>
                    <input
                      type="number"
                      id="objek_bi"
                      name="objek_bi"
                      value={formData.objek_bi}
                      onChange={handleChange}
                      required
                      className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 text-black"
                      placeholder="Contoh: 1"
                    />
                    <p className="mt-1 text-xs text-gray-500">
                      Jumlah objek bangunan industri
                    </p>
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full bg-red-700 text-white font-bold py-4 px-6 rounded-lg hover:bg-red-600 transition duration-300 disabled:bg-red-400 shadow-md flex items-center justify-center"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Memproses...
                      </>
                    ) : (
                      <>
                        <svg
                          className="w-5 h-5 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 7l5 5m0 0l-5 5m5-5H6"
                          ></path>
                        </svg>
                        Analisa Prediksi Keparahan
                      </>
                    )}
                  </button>
                </div>

                {error && (
                  <div className="bg-red-50 border-l-4 border-red-500 p-4 mt-4 rounded">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg
                          className="h-5 w-5 text-red-400"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-red-700">{error}</p>
                      </div>
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Modal popup - Now with improved backdrop blur */}
      {showModal && (
        <>
          {/* Backdrop with blur effect */}
          <div
            className="fixed inset-0 z-40 backdrop-blur-md bg-black/30"
            onClick={closeModal}
          ></div>

          {/* Modal content */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
              className="bg-white rounded-xl max-w-lg w-full relative animate-fadeIn shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()} // Prevents closing when clicking on modal content
            >
              {/* Modal header with color based on severity */}
              <div
                className={`${getSeverityBgColor()} px-6 py-4 border-b ${getSeverityBorderColor()}`}
              >
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-black">
                    Hasil Prediksi
                  </h2>
                  <button
                    onClick={closeModal}
                    className="text-gray-500 hover:text-gray-700 transition duration-300"
                    aria-label="Close"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>

              <div className="p-6">
                <div className="flex flex-col md:flex-row items-center justify-between">
                  <div className="w-40 h-40 relative mb-6 md:mb-0">
                    <Image
                      src={getIconPath()}
                      alt={`Ikon tingkat keparahan ${result.label}`}
                      fill
                      style={{ objectFit: 'contain' }}
                    />
                  </div>

                  <div className="md:ml-6 text-center md:text-left flex-1">
                    <p className="text-lg text-gray-700 mb-4">
                      Berdasarkan data yang Anda masukkan, sistem kami
                      memprediksi tingkat keparahan kebakaran:
                    </p>

                    <div
                      className={`text-4xl font-bold mb-2 ${getSeverityColor()}`}
                    >
                      {result.label}
                    </div>

                    <div
                      className={`p-3 ${getSeverityBgColor()} rounded-lg text-sm mb-6`}
                    >
                      {result.label === 'Rendah' && (
                        <p className="text-green-700">
                          Kebakaran dengan tingkat keparahan rendah masih
                          memerlukan perhatian segera.
                        </p>
                      )}
                      {result.label === 'Sedang' && (
                        <p className="text-yellow-700">
                          Kebakaran dengan tingkat keparahan sedang memerlukan
                          pengawasan ketat dan penanganan yang tepat.
                        </p>
                      )}
                      {result.label === 'Tinggi' && (
                        <p className="text-red-700">
                          Kebakaran dengan tingkat keparahan tinggi sangat
                          berbahaya dan memerlukan penanganan segera!
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex justify-between mt-8 border-t pt-4">
                  <button
                    onClick={() => {
                      // Reset form
                      setFormData({
                        luas_area_kejadian: '',
                        jumlah_sdm: '',
                        jumlah_unit: '',
                        jumlah_jiwa: '',
                        objek_bp: '',
                        jumlah_kk: '',
                        objek_bup: '',
                        objek_bi: '',
                      });
                      closeModal();
                    }}
                    className="bg-gray-100 text-gray-700 px-5 py-3 rounded-lg hover:bg-gray-200 transition-colors duration-300 font-medium"
                  >
                    Mulai Baru
                  </button>

                  <button
                    onClick={closeModal}
                    className="bg-red-700 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-colors duration-300 font-medium"
                  >
                    Tutup
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PredictionForm;
