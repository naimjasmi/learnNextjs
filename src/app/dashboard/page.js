"use client"

import UserCard from "./usercard";
import Link from "next/link";
import styles from './usercard.module.css';
import Image from 'next/image';
import Card1 from "./card1";
import Card2 from "./card2";
import Card3 from "./card3";
import Card4 from "./card4";
import Card5 from "./card5";
import MapPage from '@/app/components/MapPage';
import { FaUsers, FaClipboardList, FaTh } from "react-icons/fa";
import Sidebar from "../components/Sidebar";

export default function DashboardPage() {
    return (
        <div>
            <div className={styles.container}>
                <p className={styles['page-title']}>Dashboard Page</p>
                <p className={styles['page-subtitle']}>this is dashboard</p>
                <MapPage />
                <div className={styles.cardContainer}>
                    <UserCard />
                    <Card2 />
                    <Card3 />
                    <Card4 />
                </div>
                <Card5 />
            </div>
            <Sidebar />
        </div>
    )
}
