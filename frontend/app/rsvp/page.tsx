"use client";

import React, { useState } from 'react';
import Button from '../../components/button';
import Input from '../../components/input';
import { postVisitorApi } from '../../lib/api';
import YesNoRadio from '../../components/yesnoradio';
import { Toast } from '../../components/toast';
import { useRouter } from "next/navigation";

export default function RSVP() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [hasCompanion, setHasCompanion] = useState(false);
    const [companionFirstName, setCompanionFirstName] = useState("");
    const [companionLastName, setCompanionLastName] = useState("");
    const [going, setGoing] = useState(false);
    const [car, setCar] = useState(false);
    const [contactNumber, setContactNumber] = useState("");

    const [missingFields, setMissingFields] = useState(false);

    const [toastMessage, setToastMessage] = useState("");
    const [toastType, setToastType] = useState<"success" | "error" | "info">("info");

    const router = useRouter();

    const handleGoBack = () => {
        router.push("/");
    };
    
    const registerVisitor = async () => {
        const payload = {
            "firstName": firstName,
            "lastName": lastName,
            "contactNumber": contactNumber,
            "going": going,
            "car": car,
            "companion": {
                "firstName": companionFirstName,
                "lastName": companionLastName
            }
        }

        if (firstName == "" || lastName == "" || contactNumber == ""){
            setMissingFields(true);
            return
        }

        const res = await postVisitorApi(payload);
        if (res.status == 200) {
            console.log("Visitor registration successful!");
            console.log(res.data.message);

            setToastMessage(res.data.message);
            setToastType("success");
            router.push("/rsvp");
        } else {
            console.log("Visitor registration failed!");
            console.log(res);

            setToastMessage(res);
            setToastType("error");
        }
    }

    return (
        <div className="flex flex-col space-y-4 items-center justify-center min-h-screen shadow-lg bg-cover bg-center" style={{ backgroundImage: "url('images/rsvp-image.jpg')" }}>
            {missingFields && 
                <div className="mt-2 rounded-xl bg-red-100 text-red-700 px-4 py-3 text-sm shadow-sm font-bold">
                    Please fill in all required fields (*).
                </div>
            }
            <div className="bg-white/30 backdrop-blur-sm p-6 rounded-lg shadow-lg max-w-sm w-full space-y-4">
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
                    label="Contact Number"
                    value={contactNumber}
                    onChange={setContactNumber}
                    placeHolder="Enter contact number"
                    required
                />
                <YesNoRadio
                    label="Are you going?"
                    name="going"
                    onChange={setGoing}
                    required
                />
                <YesNoRadio
                    label="Do you have a car?"
                    name="car"
                    onChange={setCar}
                />
                <YesNoRadio
                    label="Do you have a companion?"
                    name="companion"
                    onChange={setHasCompanion}
                />
                {hasCompanion && 
                    <div className="space-y-4">
                        <Input
                            label="First Name"
                            value={companionFirstName}
                            onChange={setCompanionFirstName}
                            placeHolder="Enter first name"
                            required
                        />
                        <Input
                            label="Last Name"
                            value={companionLastName}
                            onChange={setCompanionLastName}
                            placeHolder="Enter last name"
                            required
                        />
                    </div>
                }
                <div className="flex justify-between">
                    <Button
                        text="Go Back Home"
                        onClick={handleGoBack}
                        variant="secondary"
                    />
                    <Button
                        text="Submit"
                        onClick={registerVisitor}
                    />
                </div>
            </div>
            {toastMessage && (
                <Toast
                message={toastMessage}
                onClose={() => setToastMessage("")}
                type={toastType}
                />
            )}
        </div>
    );
}
