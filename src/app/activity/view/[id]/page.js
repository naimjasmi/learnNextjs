'use client'
import styles from './view.module.css';
import Link from 'next/link';
export default function ActivityView({ params }) {
    return (
        <>
            <div className={styles.container}>
                <div className={styles['table-wrapper']}>
                    <p>Ini adalah page aktiviti untuk {params.id}</p>
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

