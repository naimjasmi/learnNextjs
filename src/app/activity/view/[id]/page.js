"use client"

import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './view.module.css';
import Link from 'next/link';
import Map from '@/app/components/Map';
import Workgroup from '@/app/components/Workgroup';
import Worktype from '@/app/components/Worktype';
import Image from 'next/image';
import { FaUsers, FaClipboardList, FaTh } from "react-icons/fa";
import Sidebar from '@/app/components/Sidebar';

export default function ActivityView({ params }) {
    const [activityData, setActivityData] = useState(null);
    const [workgroups, setWorkgroups] = useState([]);
    const [worktype, setWorktype] = useState([]);

    useEffect(() => {
        async function getData() {
            try {
                const { data: res } = await axios.get(`http://172.16.1.108:8000/workgroups/`)
                if (res) {
                    setWorkgroups(res)
                }
            }
            catch (error) {
                console.log(error)
            }
        }
        getData();
    }, [])

    useEffect(() => {
        async function getData() {
            try {
                const { data: res } = await axios.get(`http://172.16.1.108:8000/worktype/`)
                if (res) {
                    setWorktype(res)
                }
            }
            catch (error) {
                console.log(error)
            }
        }
        getData();
    }, [])

    useEffect(() => {
        const fetchActivityData = async () => {
            try {
                const { data } = await axios.get(`http://172.16.1.108:8000/activities/${params.id}/`);
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
                <div className={styles['details-container']}>
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
                            {activityData.image && ( // Check if image data is available
                                <div className={styles.imageContainer}>
                                    <img src={activityData.image} alt="Activity Image" className={styles.image} />
                                </div>
                            )}
                            <p>Work Type: <Worktype activitywt={activityData.worktype} worktype={worktype} />
                                <br /></p>
                            <p>Work Group: <Workgroup activitywg={activityData.workgroup} workgroups={workgroups} />
                                <br /></p>
                        </div>
                    ) : (
                        <p>Loading...</p>
                    )}
                </div>

                <div className={styles['map-container']}>
                    {activityData && activityData.latitude && activityData.longitude && (
                        <Map latitude={activityData.latitude} longitude={activityData.longitude} />
                    )}
                </div>
            </div>
            <Sidebar />
        </>
    )
}
