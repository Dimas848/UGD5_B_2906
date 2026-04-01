'use client';

import { useRouter } from 'next/navigation';

export default function NotAuthorizedPage() {
    const router = useRouter();

    return (
        <div className="min-h-screen flex items-center justify-center bg-blue-600">
            {/* Card Peringatan */}
            <div className="bg-[#b3c5ff] p-8 rounded-3xl shadow-2xl max-w-sm w-full text-center flex flex-col items-center border-4 border-white/30">
                
                {/* Gambar Mobil sesuai soal */}
                <div className="w-full h-44 rounded-2xl mb-6 overflow-hidden bg-gray-800 shadow-inner">
                    <img 
                        src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=400" 
                        alt="Cars" 
                        className="w-full h-full object-cover"
                    />
                </div>
                
                <h2 className="text-2xl font-bold text-gray-900 flex items-center justify-center gap-2 mb-2">
                    <span className="text-red-600 text-3xl">❌</span> Anda belum login
                </h2>
                <p className="text-gray-700 font-semibold text-sm mb-8">
                    Silakan login terlebih dahulu untuk mengakses halaman ini.
                </p>
                
                <button 
                    onClick={() => router.push('/auth/login')}
                    className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 px-10 rounded-xl flex items-center gap-2 transition-all shadow-lg"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                    </svg>
                    Kembali
                </button>
            </div>
        </div>
    );
}