"use client"

import React, { useState, useEffect } from 'react';
import Table from '../../components/table';
import { getVisitorApi } from '../../lib/api';

interface Visitor {
    firstName: string;
    lastName: string;
    going: boolean;
    commute: boolean;
    contactNumber: string;
}

export default function Dashboard() {
    const [visitors, setVisitors] = useState<Visitor[]>([]);

    const getVisitors = async () => {
        const response = await getVisitorApi();
        if (response.status != 200) {
            throw new Error("Failed to fetch list of visitors");
        }
        const data: Visitor[] = await response.data;
        setVisitors(data);
    };

    useEffect(() => {
        getVisitors();
        console.log(">>>>" + visitors);
    }, []);

    return (
        <div>
            <h1>Dashboard Page</h1>

        </div>
    )
}
