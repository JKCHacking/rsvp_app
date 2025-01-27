"use client"

import React, { useState, useEffect } from 'react';
import Table, { ColumnDefinition } from '../../components/table';
import { getVisitorApi } from '../../lib/api';

interface Visitor {
    firstName: string;
    lastName: string;
    fullName: string;
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

    const columns: ColumnDefinition<Visitor>[] = [
        {
            "key": "fullName",
            "header": "Full Name",
            "align": "center",
            "render": (value, row) => `${row.firstName} ${row.lastName}`
        },
        {
            "key": "going",
            "header": "Going",
            "align": "center",
            "render": (value, row) => value ? "Yes" : "No"
        },
        {
            "key": "commute",
            "header": "Commute",
            "align": "center",
            "render": (value, row) => value ? "Yes" : "No"
        },
        {
            "key": "contactNumber",
            "header": "Contact Number",
            "align": "center",
        },
    ];

    useEffect(() => {
        getVisitors();
    }, []);

    return (
        <div>
            <h1>Dashboard Page</h1>
            <Table
                columns={columns}
                data={visitors}
                hoverEffect
                stripedRows
            />
        </div>
    )
}
