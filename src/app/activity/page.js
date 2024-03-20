"use client";
import Link from "next/link"
import styles from './activity.module.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function ActivityPage() {
    const [data, setData] = useState([]);
    const [name, setActivityid] = useState('');
    const [date, setDate] = useState('');
    const [starttime, setStarttime] = useState('');
    const [endtime, setEndtime] = useState('');
    const [weather, setWeather] = useState('');
    const [image, setImage] = useState('');
    const [latitude, setLatitude] = useState('');
    const [worktype, setWorktype] = useState('');
    const [workgroup, setWorkgroup] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const { data: res } = await axios.get('http://172.16.1.117:8000/activities/');
            setData(res);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <>

            <p className={styles['page-title']}>Activity Page</p>
            <div className={styles['table-wrapper']}>
                <table className={styles['workgroup-table']}>
                    <thead>
                        <tr>
                            <th>activity id</th>
                            <th>date</th>
                            <th>start time</th>
                            <th>end time</th>
                            <th>weather</th>
                            <th>latitude</th>
                            <th>longitude</th>
                            <th style={{ width: '200px' }}>description</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {data.length !== 0 && data.map((ac, index) => (
                            <tr key={index} className={index % 2 === 0 ? styles.even : styles.odd}>
                                <td>{ac.activityid}</td>
                                <td>{ac.date}</td>
                                <td>{ac.starttime}</td>
                                <td>{ac.endtime}</td>
                                <td>{ac.weather}</td>
                                <td>{ac.latitude}</td>
                                <td>{ac.longitude}</td>
                                <td>{ac.description}</td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <nav className={styles['sidebar']}>
                <ul className={styles['sidebar-list']}>
                    <h2>Menu</h2><br />
                    <li className={styles['sidebar-item']}>
                        <Link href="/activity" scroll={false}>Activity</Link>
                    </li>
                    <li className={styles['sidebar-item']}>
                        <Link href="/workgroups" scroll={false}>Workgroup</Link>
                    </li>
                </ul>
            </nav>

        </>


    )
}