// login.js
'use client';

import { useRouter } from "next/navigation";
import styles from './login.module.css'; // Import CSS module for styling
import Image from "next/image";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function LoginPage() {
    const router = useRouter();
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    function handleLogin(ev) {
        ev.preventDefault();
        //login logic
        router.push('/dashboard');
    }

    function handleForgotPassword(ev) {
        ev.preventDefault();
        // forgot password logic
        router.push('/forgot-password');
    }

    const togglePasswordVisibility = () => {
        setShowPassword(prevState => !prevState);
    };

    function handleRegister(ev) {
        ev.preventDefault();
        // register logic
        router.push('/register');
    }

    return (
        <div className={styles.container}>
            <div className={styles.logo}>
                <Image
                    src="/msalogo.png"
                    alt="MSA Logo"
                    width={150}
                    height={150}
                />
            </div>
            <h1 className={styles.title}>Login</h1>
            <form onSubmit={handleLogin} className={styles.form}>
                <div className={styles.formGroup}>
                    <label htmlFor="loginid" className={styles.label}>Login</label>
                    <input type="text" id="loginid" className={styles.input} />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="password" className={styles.label}>Password</label>
                    <div className={styles.inputWithIcon}>
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            className={styles.input}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button
                            type="button"
                            className={styles.passwordToggle}
                            onClick={togglePasswordVisibility}
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>
                </div>
                <button type="submit" className={styles.button}>Login</button>
            </form>
            <div className={styles.extraLinks}>
                <a href="#" onClick={handleForgotPassword} className={styles.link}>Forgot Password?</a><br />
                <span className={styles.linkText}>Don't have an account? </span>
                <a href="#" onClick={handleRegister} className={styles.link}>Register Here</a>
            </div>
        </div>
    );
}
