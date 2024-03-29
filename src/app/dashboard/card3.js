"use client"
import { Scatter } from 'react-chartjs-2';
import styles from "./card4.module.css";

export default function Card3() {
    // Sample data for the scatter plot
    const scatterData = {
        datasets: [
            {
                label: 'Scatter Plot',
                data: [
                    { x: 10, y: 20 },
                    { x: 15, y: 10 },
                    { x: 25, y: 30 },
                    { x: 35, y: 40 },
                    { x: 45, y: 50 },
                ],
                backgroundColor: 'rgba(75, 192, 192, 0.5)', // Color of the data points
                pointRadius: 8, // Size of the data points
            },
        ],
    };

    // Scatter plot options
    const scatterOptions = {
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'X-axis Label', // Label for the x-axis
                    color: 'black',
                    font: {
                        size: 14,
                        weight: 'bold',
                    },
                },
                grid: {
                    display: true,
                    color: 'lightgray',
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Y-axis Label', // Label for the y-axis
                    color: 'black',
                    font: {
                        size: 14,
                        weight: 'bold',
                    },
                },
                grid: {
                    display: true,
                    color: 'lightgray',
                },
            },
        },
    };

    return (
        <div className={styles.usercard}>
            <div className={styles.scatterChart}>
                <Scatter data={scatterData} options={scatterOptions} />
            </div>
            <div className={styles.cardInfo}>
                <h2>Scatter Plot </h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscinga.</p>
                <p>Yelit. Nulla convallis libero in magna tempus, a accumsan ligula ultrices.</p>
            </div>
        </div>
    );
}
