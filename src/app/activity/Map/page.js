'use client'
import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './map.module.css';
import Link from 'next/link';
import MapPage from '@/app/components/MapPage';

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
