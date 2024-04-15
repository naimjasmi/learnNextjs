'use client';

import { useRouter } from "next/navigation";
import styles from './login.module.css'; // Import CSS module for styling

export default function LoginPage() {
    const router = useRouter();

    function handleLogin(ev) {
        ev.preventDefault();
        //login logic
        router.push('/dashboard');
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>MSA eWorklog</h1>
            <form onSubmit={handleLogin} className={styles.form}>
                <div className={styles.formGroup}>
                    <label htmlFor="loginid" className={styles.label}>Login</label>
                    <input type="text" id="loginid" className={styles.input} />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="password" className={styles.label}>Password</label>
                    <input type="password" id="password" className={styles.input} />
                </div>
                <button type="submit" className={styles.button}>Login</button>
            </form>
            <footer className={styles.footer}></footer>
        </div>
    );
}
