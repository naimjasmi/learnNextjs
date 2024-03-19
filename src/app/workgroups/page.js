import Link from "next/link";
import styles from "./workgroups.module.css";

async function getData() {
    const res = await fetch('http://172.16.1.100:8000/workgroups/');
    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }
    return res.json();
}

export default async function WorkgroupsPage() {
    const data = await getData();

    return (
        <>
            <div className={styles.container}>
                <p className={styles['page-title']}>Workgroup Page</p>
                <div className={styles['table-wrapper']}>
                    <table className={styles['workgroup-table']}>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>ID</th>
                                <th>Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((wg, index) => (
                                <tr key={index} className={index % 2 === 0 ? styles.even : styles.odd}>
                                    <td>{wg.name}</td>
                                    <td>{wg.wgid}</td>
                                    <td>{wg.description}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className={styles['form-wrapper']}>
                    <div className={styles.card}>
                        <form className={styles.form}>
                            <h2>Add New Workgroup</h2>
                            <input type="text" placeholder="Name" />
                            <input type="text" placeholder="ID" />
                            <textarea placeholder="Description"></textarea>
                            <button type="submit">Add</button>
                        </form>
                    </div>
                </div>
            </div>
            <nav className={styles['sidebar']}>
                <ul className={styles['sidebar-list']}>
                <h2>Menu</h2><br/>
                    <li className={styles['sidebar-item']}>
                        <Link href="/activity" scroll={false}>Activity</Link>
                    </li>
                    <li className={styles['sidebar-item']}>
                        <Link href="/workgroups" scroll={false}>Workgroup</Link>
                    </li>
                </ul>
            </nav>
        </>
    );
}
