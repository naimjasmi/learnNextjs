'use client'
import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './map.module.css';
import Link from 'next/link';
import MapPage from '@/app/components/MapPage';
import Image from 'next/image';
import { FaUsers, FaClipboardList, FaTh } from "react-icons/fa";

export default function WorkMap() {


    return (
        <>
            <div className={styles.container}>
                <div className={styles['map-container']}>
                    <MapPage />
                </div>
            </div>

            <nav className={styles['sidebar']}>
                <ul className={styles['sidebar-list']}>
                    <div className={styles.avatar}>
                        <Image src="/msalogo.png"
                            alt="User Avatar"
                            width={600}
                            height={600}
                            className={styles.logoImage} />
                    </div>
                    <li className={styles['sidebar-item']}>
                        <Link href="/dashboard" scroll={false}><FaTh/> Dashboard</Link>
                    </li>
                    <li className={styles['sidebar-item']}>
                        <Link href="/activity" scroll={false}><FaClipboardList/> Activity</Link>
                    </li>
                    <li className={styles['sidebar-item']}>
                        <Link href="/workgroups" scroll={false}><FaUsers/> Workgroup</Link>
                    </li>
                </ul>
            </nav>
        </>
    )
}
