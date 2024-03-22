'use client'
import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './view.module.css';
import Link from 'next/link';

export default function ActivityView({ params }) {
    const [activityData, setActivityData] = useState(null);

    useEffect(() => {
        const fetchActivityData = async () => {
            try {
                const { data } = await axios.get(`http://172.16.1.132:8000/activities/${params.id}/`);
                setActivityData(data);
            } catch (error) {
                console.error('Error fetching activity data:', error);
            }
        };

        fetchActivityData();
    }, [params.id]);

    return (
        <>
            <div className={styles.container}>
                <div className={styles['table-wrapper']}>
                    {activityData ? (
                        <div className={styles.card}>
                            <h2>Activity Details</h2>
                            <p>Activity ID: {activityData.activityid}</p>
                            <p>Created:{activityData.created}</p>
                            <p>Updated at:{activityData.updated_at}</p>
                            <p>Date: {activityData.date}</p>
                            <p>Start Time: {activityData.starttime}</p>
                            <p>End Time: {activityData.endtime}</p>
                            <p>Weather: {activityData.weather}</p>
                            <p>Description: {activityData.description}</p>
                            <p>Latitude: {activityData.latitude}</p>
                            <p>Longitude: {activityData.longitude}</p>
                            <p>Work Type: {activityData.worktype.map((type, index) => (
                                <span key={index}>{type}</span>
                            ))}</p>
                            <p>Work Group: {activityData.workgroup.map((group, index) => (
                                <span key={index}>{group}</span>
                            ))}</p>
                        </div>
                    ) : (
                        <p>Loading...</p>
                    )}
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
    )
}
