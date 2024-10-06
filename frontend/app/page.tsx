'use client';

import { useRouter } from 'next/navigation';
import React from 'react';
import Button from '../components/button';


export default function Home() {
  const router = useRouter();

  const handleSubmit = () => {
    router.push('/registration');
    console.log('Form Submitted');
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <p className="p-10 bg-green-500 text-white text-2xl">
        Welcome to my Home Page! Please register here:
      </p>
      <Button
        text="Register"
        type="submit"
        onClick={handleSubmit}
        className='mt-4'
      />
    </div>
  );
}
