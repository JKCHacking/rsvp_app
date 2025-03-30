"use client"

import React, { useState } from 'react';
import Button from '../../components/button';
import Input from '../../components/input';
import Checkbox from '../../components/checkbox';
import { postVisitorApi } from '../../lib/api';

export default function RSVP() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [going, setGoing] = useState(false);
    const [commute, setCommute] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState("");

    const registerVisitor = async () => {
        const payload = {
            "firstName": firstName,
            "lastName": lastName,
            "contactNumber": phoneNumber,
            "going": going,
            "commute": commute,
        }
        const res = await postVisitorApi(payload);
        if (res.status == 200) {
            console.log("Visitor registration successful!");
        } else {
            console.log("Visitor registration failed!");
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full space-y-4">
                <h2 className="text-2xl font-bold text-center">RSVP Form</h2>
                <Input
                    label="First Name"
                    value={firstName}
                    onChange={setFirstName}
                    placeHolder="Enter first name"
                    required
                />
                <Input
                    label="Last Name"
                    value={lastName}
                    onChange={setLastName}
                    placeHolder="Enter last name"
                    required
                />
                <Input
                    label="Phone Number"
                    value={phoneNumber}
                    onChange={setPhoneNumber}
                    placeHolder="Enter phone number"
                    required
                />
                <Checkbox
                    label="Going?"
                    checked={going}
                    onChange={setGoing}
                />
                <Checkbox
                    label="Commute?"
                    checked={commute}
                    onChange={setCommute}
                />
                <Button
                    text="Register"
                    onClick={registerVisitor}
                />
            </div>
        </div>
    );
}
