"use client"

import React, { useState } from 'react';
import Button from '../../components/button';
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
        <div>
            <form
                onSubmit={handleLogin}
            >
                <h2 className='text-center'>Login</h2>
                <Input
                    label="Email"
                    value={email}
                    onChange={setEmail}
                    placeHolder="Enter email"
                    required
                />
                <Input
                    label="Password"
                    value={password}
                    onChange={setPassword}
                    placeHolder="Enter password"
                    required
                />
                <Button
                    text="Login"
                    type='submit'
                />
            </form>
        </div>
    )
}
