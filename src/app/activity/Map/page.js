'use client'
import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './map.module.css';
import Link from 'next/link';
import MapPage from '@/app/components/MapPage';
import Image from 'next/image';
import { FaUsers, FaClipboardList, FaTh } from "react-icons/fa";
import Sidebar from '@/app/components/Sidebar';

export default function WorkMap() {

    return (
        <>
            <div className={styles.container}>
                <div className={styles['map-container']}>
                    <MapPage />
                </div>
            </div>
            <Sidebar />
        </>
    )
}
