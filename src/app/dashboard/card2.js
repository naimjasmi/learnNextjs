"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js'; // Import Chart and registerables from Chart.js
import styles from "./card2.module.css";

Chart.register(...registerables); // Register necessary chart elements

export default function Card2() {
    const [workgroupData, setWorkgroupData] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchWorkgroupData();
    }, []);

    const fetchWorkgroupData = async () => {
        try {
            const response = await axios.get('http://172.16.1.166:8000/workgroups/');
            const workgroups = response.data;
            const workgroupCount = countWorkgroups(workgroups);
            setWorkgroupData(workgroupCount);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching workgroup data:', error);
        }
    };

    const countWorkgroups = (workgroups) => {
        const workgroupCount = {};
        workgroups.forEach(workgroup => {
            if (workgroupCount[workgroup.wgid]) {
                workgroupCount[workgroup.wgid]++;
            } else {
                workgroupCount[workgroup.wgid] = 1;
            }
        });
        return workgroupCount;
    };

    const chartData = {
        labels: Object.keys(workgroupData),
        datasets: [{
            data: Object.values(workgroupData),
            backgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56',
                '#FF9F40',
                '#4BC0C0',
                '#9966FF',
                '#F44336'
            ],
            hoverBackgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56',
                '#FF9F40',
                '#4BC0C0',
                '#9966FF',
                '#F44336'
            ]
        }]
    };

    return (
        <div className={styles.usercard}>
            <div className={styles.userInfo}>
                <h1>Total Workgroups</h1>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <div style={{ width: '100%', height: '300px' }}>
                        <Pie data={chartData} />
                    </div>
                )}
            </div>
        </div>
    );
}
