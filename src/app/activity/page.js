
"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import styles from './activity.module.css';
import DataTable from 'react-data-table-component';
import { useRouter } from 'next/navigation';

export default function ActivityPage() {
    const router = useRouter();

    const [data, setData] = useState([]);

    const fetchData = async () => {
        try {
            const { data: res } = await axios.get('http://172.16.1.132:8000/activities/');
            setData(res);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);


    const columns = [
        {
            name: 'Activity ID',
            selector: row => row.activityid,
            sortable: true,
        },
        {
            name: 'Date',
            selector: row => row.date,
            sortable: true,
        },
        {
            name: 'Weather',
            selector: row => row.weather,
        },
        {
            name: 'Description',
            selector: row => row.description,
            sortable: true,
        },
        {
            name: 'Action',
            cell: row => (
                <>
                    <button className='btn btn-sm btn-primary' onClick={() => router.push(`/activity/view/${row.id}`)}>View</button>
                </>
            ),
            ignoreRowClick: true
        },
    ];


    return (
        <>
            <div className={styles.container}>
            <p className={styles['page-title']}>Activity Page</p>
                <div className={styles['table-wrapper']}>
                    
                    <div className='col-sm p-2'>
                        <DataTable
                            columns={columns}
                            data={data}
                        />
                    </div>
                </div>
            </div>

            <nav className={styles['sidebar']}>
                <ul className={styles['sidebar-list']}>
                    <h2>Menu</h2><br />
                    <li className={styles['sidebar-item']}>
                        <Link href="/dashboard" scroll={false}>Dashboard</Link>
                    </li>
                    <li className={styles['sidebar-item']}>
                        <Link href="/activity" scroll={false}>Activity</Link>
                    </li>
                    <li className={styles['sidebar-item']}>
                        <Link href="/workgroups" scroll={false}>Workgroup</Link>
                    </li>
                </ul>
            </nav>
        </>
    );
}
