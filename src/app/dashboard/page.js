import UserCard from "./usercard"
import Link from "next/link"
import styles from './usercard.module.css';
import Image from 'next/image';
import Card1 from "./card1";
import Card2 from "./card2";
import Card3 from "./card3";
import Card4 from "./card4";
import { FaUsers, FaClipboardList, FaTh } from "react-icons/fa";


export default function DashboardPage() {
    return (
        <div>
            <div className={styles.container}>
                <p className={styles['page-title']}>Dashboard Page</p>
                <p className={styles['page-subtitle']}>this is dashboard</p>
                <Card1 />
                <div className={styles.cardContainer}>
                    <UserCard />
                    <Card2/>
                    <Card3/>
                    <Card4/>
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

        </div>

    )
}