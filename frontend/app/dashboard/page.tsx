"use client"

import React, { useState, useEffect } from 'react';
import Table, { ColumnDefinition } from '../../components/table';
import { getVisitorApi, postLogoutApi } from '../../lib/api';
// import Button from '../../components/button';
// import { useRouter } from 'next/navigation';

interface Visitor {
    firstName: string;
    lastName: string;
    going: boolean;
    car: boolean;
    contactNumber: string;
}

export default function Dashboard() {
    // const router = useRouter();
    const [visitors, setVisitors] = useState<Visitor[]>([]);

    // const logoutKeycloak = async () => {
    //     const response = await postLogoutApi();
    //     if (response.status != 200) {
    //         console.log("Failed to logout from Keycloak");
    //     }
    //     console.log("Logout from keycloak");
    //     router.push('/login');
    // };

    const getVisitors = async () => {
        const response = await getVisitorApi();
        if (response.status != 200) {
            throw new Error("Failed to fetch list of visitors");
        }
        const data: Visitor[] = await response.data;
        setVisitors(data);
    };

    const color = visitors?.length > 100 ? "bg-red-500" : "bg-green-500";

    const columns: ColumnDefinition<Visitor>[] = [
        {
            "key": "firstName",
            "header": "First Name",
            "align": "center",
        },
        {
            "key": "lastName",
            "header": "Last Name",
            "align": "center",
        },
        {
            "key": "contactNumber",
            "header": "Contact Number",
            "align": "center",
        },
        {
            "key": "going",
            "header": "Going",
            "align": "center",
            "render": (value, row) => value ? "Yes" : "No"
        },
        {
            "key": "car",
            "header": "Car",
            "align": "center",
            "render": (value, row) => value ? "Yes" : "No"
        },
    ];

    useEffect(() => {
        getVisitors();
    }, []);

    return (
        <div className="min-h-screen bg-gray-900">
            <div className="bg-gray-800 px-6 py-4 shadow-md">
                <h1 className="text-xl font-semibold text-white">Dashboard</h1>
            </div>
            <div className="flex justify-center gap-4 p-4 flex-wrap">
                <div className="w-40 h-40 bg-gray-800 flex flex-col items-center justify-center rounded-2xl shadow-lg m-2 border border-gray-700">
                    <span className="text-sm text-gray-400 mb-1">Total Visitors</span>
                    <span className={`text-4xl font-bold ${visitors?.length > 100 ? "text-red-400" : "text-green-400"}`}>
                        {visitors?.length}
                    </span>
                </div>
                <Table
                    className="m-2 shadow-lg rounded-lg overflow-hidden border border-gray-700 bg-gray-800 w-full max-w-5xl"
                    columns={columns}
                    data={visitors}
                    hoverEffect
                    stripedRows
                />
            </div>
        </div>

    )
}
