'use client';

import { useRouter } from 'next/navigation';
import React from 'react';
import Button from '../components/button';
import ImageSlider from '../components/imageSlider';
import SwiperCarousel from '../components/SwiperCarousel';


export default function Home() {
    const router = useRouter();
    const slides = [
        "https://picsum.photos/100",
        "https://picsum.photos/101",
        "https://picsum.photos/102",
        "https://picsum.photos/103",
        "https://picsum.photos/104",
    ];

    const handleSubmit = () => {
        router.push('/registration');
        console.log('Form Submitted');
    };

    const handleLogin = () => {
        router.push('/login');
    }

    return (
        <>
            <div className="flex flex-col items-center justify-center gap-3">
                <h1 className="text-3xl font-custom1">Shai & Josh</h1>
                <SwiperCarousel/>
                <Button
                    text="Register"
                    onClick={handleSubmit}
                />
                <Button
                    text="Login"
                    onClick={handleLogin}
                />
            </div>
            <div className="flex justify-center items-center h-screen bg-gray-100">
                <p className="p-10 bg-green-500 text-white text-2xl">
                    Welcome to my Home Page! Please register here:
                </p>
                <Button
                    text="Register"
                    onClick={handleSubmit}
                />
                <Button
                    text="Login"
                    onClick={handleLogin}
                />
            </div>
        </>
        
    );
}
