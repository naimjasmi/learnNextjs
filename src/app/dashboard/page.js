import UserCard from "./usercard"
import Link from "next/link"
import styles from './usercard.module.css';
export default function DashboardPage() {
    return (
        <div>
            <div className={styles.container}>
                <p className={styles['page-title']}>Dashboard Page</p>
                <p className={styles['page-subtitle']}>this is dashboard</p>
                <UserCard />
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

        </div>

    )
}