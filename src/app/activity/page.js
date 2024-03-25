
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
    const [activityid, setActivityId] = useState('');
    const [date, setDate] = useState('');
    const [starttime, setStartTime] = useState('');
    const [endtime, setEndTime] = useState('');
    const [weather, setWeather] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [description, setDescription] = useState('');
    const [worktype, setWorkType] = useState([]);
    const [workgroup, setWorkGroup] = useState([]);


    const fetchData = async () => {
        try {
            const { data: res } = await axios.get('http://172.16.1.141:8000/activities/');
            setData(res);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const addActivity = async () => {
        try {
            // Convert worktype and workgroup to arrays if they are strings
            const workTypeArray = Array.isArray(worktype) ? worktype : [worktype];
            const workGroupArray = Array.isArray(workgroup) ? workgroup : [workgroup];

            const response = await axios.post('http://172.16.1.141:8000/activities/', {
                activityid,
                date,
                starttime,
                endtime,
                weather,
                latitude,
                longitude,
                description,
                worktype: workTypeArray,
                workgroup: workGroupArray
            });
            return response.data;
        } catch (error) {
            console.error('Error adding activity:', error);
            throw new Error('Failed to add activity: ' + error.message);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleEdit = (id) => {
        // Handle edit action
        console.log('Editing activity with id:', id);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addActivity();
            fetchData();
            setActivityId('');
            setDate('');
            setStartTime('');
            setEndTime('');
            setWeather('');
            setLatitude('');
            setLongitude('');
            setDescription('');
            setWorkType('');
            setWorkGroup('');
        } catch (error) {
            console.error('Error adding activity:', error);
        }
    };


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

            <div className={styles['form-wrapper']}>
                <div className={styles.card}>
                    <form className={styles.form} onSubmit={handleSubmit}>
                        <h2>Add New Activity</h2>
                        <input type="text" placeholder="Activity ID" value={activityid} onChange={(e) => setActivityId(e.target.value)} />
                        <input type="date" placeholder="Date" value={date} onChange={(e) => setDate(e.target.value)} />
                        <input type="time" placeholder="Start Time" value={starttime} onChange={(e) => setStartTime(e.target.value)} />
                        <input type="time" placeholder="End Time" value={endtime} onChange={(e) => setEndTime(e.target.value)} />
                        <input type="text" placeholder="Weather" value={weather} onChange={(e) => setWeather(e.target.value)} />
                        <input type="text" placeholder="Latitude" value={latitude} onChange={(e) => setLatitude(e.target.value)} />
                        <input type="text" placeholder="Longitude" value={longitude} onChange={(e) => setLongitude(e.target.value)} />
                        <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                        <input type="text" placeholder="Work Type" value={worktype} onChange={(e) => setWorkType(e.target.value)} />
                        <input type="text" placeholder="Work Group" value={workgroup} onChange={(e) => setWorkGroup(e.target.value)} />
                        <button type="submit">Add</button>
                    </form>
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
