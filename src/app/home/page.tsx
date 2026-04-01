'use client';

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Game1 from "../../components/Game1";

export default function Home() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const loggedIn = localStorage.getItem('isLoggedIn');

        if (!loggedIn) {
            router.push('/unguided/auth/not-authorized');
        } else {
            setIsAuthenticated(true);
            setIsLoading(false);
        }
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem('isLoggedIn');
        router.push('/unguided/auth/login');
    };

    if (isLoading) {
        return <div className="min-h-screen flex items-center justify-center text-white bg-slate-900">Loading...</div>;
    }

    if (!isAuthenticated) return null;

    return (
        <div className="flex flex-col items-center justify-center min-h-screen min-w-screen p-8 bg-slate-900">
            <div className="w-full max-w-4xl flex justify-between items-center mb-8">
                <h1 className="text-4xl font-bold text-white">Selamat Datang!</h1>
                
                <button 
                    onClick={handleLogout}
                    className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transition-colors"
                    title="Logout"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5.636 5.636a9 9 0 1 0 12.728 0M12 3v9" />
                    </svg>
                </button>
            </div>

            <Game1 />
        </div>
    );
}