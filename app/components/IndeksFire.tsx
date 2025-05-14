import React from 'react';

const IndeksFire: React.FC = () => {
  return (
    <div id="indeks-fire" className="bg-gray-50 py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
              Skala Tingkat Keparahan Kebakaran
            </h2>
            <p className="text-xl text-black font-medium">
              Indeks kebakaran berdasarkan luas area terbakar untuk membantu
              penanganan cepat dan tepat
            </p>
          </div>

          <div className="bg-white shadow-xl rounded-xl overflow-hidden">
            <div className="bg-red-700 py-4 px-6">
              <div className="flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
                <h3 className="text-xl font-bold text-white">
                  Indeks Keparahan Berdasarkan Luas Area
                </h3>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="py-4 px-6 text-left text-black font-bold text-lg">
                      Tingkat
                    </th>
                    <th className="py-4 px-6 text-left text-black font-bold text-lg">
                      Luas Area Terbakar
                    </th>
                    <th className="py-4 px-6 text-left text-black font-bold text-lg">
                      Keterangan
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr className="hover:bg-green-50 transition-colors duration-150">
                    <td className="py-5 px-6">
                      <div className="flex items-center">
                        <div className="h-4 w-4 rounded-full bg-green-500 mr-3"></div>
                        <span className="font-bold text-black text-base">
                          Ringan (Level 1)
                        </span>
                      </div>
                    </td>
                    <td className="py-5 px-6 text-black font-medium text-base">
                      {'< 1.000 m²'}
                      <br />
                      <span className="text-sm">(kurang dari 0,1 hektar)</span>
                    </td>
                    <td className="py-5 px-6 text-black font-medium text-base">
                      Kebakaran kecil, mudah dikendalikan oleh 1–2 unit pemadam
                      kebakaran.
                    </td>
                  </tr>
                  <tr className="hover:bg-yellow-50 transition-colors duration-150">
                    <td className="py-5 px-6">
                      <div className="flex items-center">
                        <div className="h-4 w-4 rounded-full bg-yellow-500 mr-3"></div>
                        <span className="font-bold text-black text-base">
                          Sedang (Level 2)
                        </span>
                      </div>
                    </td>
                    <td className="py-5 px-6 text-black font-medium text-base">
                      1.000 – 5.000 m²
                      <br />
                      <span className="text-sm">(0,1 – 0,5 hektar)</span>
                    </td>
                    <td className="py-5 px-6 text-black font-medium text-base">
                      Membutuhkan 2–4 unit pemadam kebakaran, biasanya tidak
                      meluas dengan cepat.
                    </td>
                  </tr>
                  <tr className="hover:bg-orange-50 transition-colors duration-150">
                    <td className="py-5 px-6">
                      <div className="flex items-center">
                        <div className="h-4 w-4 rounded-full bg-orange-500 mr-3"></div>
                        <span className="font-bold text-black text-base">
                          Berat (Level 3)
                        </span>
                      </div>
                    </td>
                    <td className="py-5 px-6 text-black font-medium text-base">
                      5.000 – 20.000 m²
                      <br />
                      <span className="text-sm">(0,5 – 2 hektar)</span>
                    </td>
                    <td className="py-5 px-6 text-black font-medium text-base">
                      Memerlukan respons besar, mungkin melibatkan koordinasi
                      antar pos pemadam kebakaran.
                    </td>
                  </tr>
                  <tr className="hover:bg-red-50 transition-colors duration-150">
                    <td className="py-5 px-6">
                      <div className="flex items-center">
                        <div className="h-4 w-4 rounded-full bg-red-500 mr-3"></div>
                        <span className="font-bold text-black text-base">
                          Kritis (Level 4)
                        </span>
                      </div>
                    </td>
                    <td className="py-5 px-6 text-black font-medium text-base">
                      {'> 20.000 m²'}
                      <br />
                      <span className="text-sm">(lebih dari 2 hektar)</span>
                    </td>
                    <td className="py-5 px-6 text-black font-medium text-base">
                      Kebakaran skala besar, dapat mengancam area yang luas, dan
                      kemungkinan diperlukan evakuasi.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-gray-50 p-4 border-t border-gray-200">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-black"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3 text-sm text-black font-medium">
                  <p>
                    Skala ini digunakan untuk penilaian awal dan penentuan
                    respons yang tepat. Faktor lain seperti jenis area, bahan
                    terbakar, dan risiko sekitar juga perlu dipertimbangkan.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 grid md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
              <h3 className="font-bold text-lg mb-2 text-black">
                Level 1: Ringan
              </h3>
              <p className="text-black font-medium">
                Penanganan biasanya cepat dan tidak memerlukan evakuasi
                besar-besaran.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-yellow-500">
              <h3 className="font-bold text-lg mb-2 text-black">
                Level 2: Sedang
              </h3>
              <p className="text-black font-medium">
                Terkendali dalam beberapa jam dengan penggunaan sumber daya
                secukupnya.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-orange-500">
              <h3 className="font-bold text-lg mb-2 text-black">
                Level 3: Berat
              </h3>
              <p className="text-black font-medium">
                Mungkin diperlukan evakuasi parsial dan bantuan tambahan dari
                pos lain.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-red-500">
              <h3 className="font-bold text-lg mb-2 text-black">
                Level 4: Kritis
              </h3>
              <p className="text-black font-medium">
                Memerlukan pengerahan semua sumber daya dan kemungkinan bantuan
                antar daerah.
              </p>
            </div>
          </div>

          <div className="mt-10 bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-red-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-bold text-black">
                  Perhatian penting:
                </h3>
                <div className="mt-2 text-sm font-medium text-black">
                  <p>
                    Indeks ini merupakan panduan umum. Penilaian kebakaran harus
                    selalu dilakukan oleh tenaga profesional. Segera hubungi
                    Pemadam Kebakaran (113) jika terjadi kebakaran.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndeksFire;
