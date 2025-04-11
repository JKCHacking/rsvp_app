"use client"

import React, { useState } from 'react';
// import Button from '../../components/button';
import Input from '../../components/input';
import { postLoginApi } from '../../lib/api';
import { useRouter } from 'next/navigation';

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        const payload = {
            "username": email,
            "password": password
        }
        const response = await postLoginApi(payload);

        if (response.status == 200) {
            console.log("Login successful");
            router.push("/dashboard");
        } else {
            console.log("Login failed");
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4 text-white">
        <div className="bg-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
            <form className="space-y-5" onSubmit={handleLogin}>
            <div>
                <Input
                label="Email"
                value={email}
                onChange={setEmail}
                placeHolder="Enter your email"
                required
                type="email"
                />
            </div>
            <div>
                <Input
                label="Password"
                value={password}
                onChange={setPassword}
                placeHolder="Enter your password"
                required
                type="password"
                />
            </div>
            <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition"
            >
                Sign In
            </button>
            </form>
            {/* <p className="text-center text-sm text-gray-400 mt-4">
            Don't have an account? <a href="#" className="text-blue-400 hover:underline">Register</a>
            </p> */}
        </div>
        </div>

    )
}
