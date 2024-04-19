'use client';

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from './register.module.css';
import Image from "next/image";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function RegisterPage() {
    const router = useRouter();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [passwordMatchError, setPasswordMatchError] = useState(false);
    const [passwordValidationError, setPasswordValidationError] = useState("");
    const [passwordStrength, setPasswordStrength] = useState("");

    useEffect(() => {
        setPasswordValidationError(
            <p className={styles.validationNote}>
                Must contains:
                <br />
                &bull; 8 characters
                <br />
                &bull; 1 lower case
                <br />
                &bull; 1 special character
            </p>
        );
    }, []);

    useEffect(() => {
        calculatePasswordStrength(password);
    }, [password]);

    function calculatePasswordStrength(password) {


        if (password.length == 6 || /^[a-z]+$/.test(password)) {
            setPasswordStrength("weak");
        } else if (password.length >= 8 && password.length <= 11 && /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/.test(password)) {
            setPasswordStrength("normal");
        } else if (password.length >= 12 && /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/.test(password)) {
            setPasswordStrength("strong");
        }
    }

    function handleRegister(ev) {
        ev.preventDefault();

        // Validate password
        const passwordRegex = /^(?=.*[a-z])(?=.*[!@#$%^&*])(?=.{8,})/;
        const requirements = [];
        if (!passwordRegex.test(password)) {
            if (password.length < 8) {
                requirements.push("Must contain at least 8 characters");
            }
            if (!/[a-z]/.test(password)) {
                requirements.push("Must contain at least 1 lowercase letter");
            }
            if (!/[!@#$%^&*]/.test(password)) {
                requirements.push("Must contain at least 1 special character");
            }
            setPasswordValidationError(
                <ul className={styles.passwordError}>
                    {requirements.map((requirement, index) => (
                        <li key={index}>{requirement}</li>
                    ))}
                </ul>
            );
            return; // Prevent further execution
        } else {
            setPasswordValidationError("");
        }

        // Check if passwords match
        if (password !== confirmPassword) {
            setPasswordMatchError(true);
            return;
        } else {
            setPasswordMatchError(false);
        }

        // Proceed with registration logic
        router.push('/login');
    }

    function handleForgotPassword(ev) {
        ev.preventDefault();
        // Forgot password logic
        router.push('/forgot-password');
    }

    const togglePasswordVisibility = (field) => {
        if (field === "password") {
            setShowPassword(!showPassword);
        } else if (field === "confirmPassword") {
            setShowConfirmPassword(!showConfirmPassword);
        }
    };

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
            <h1 className={styles.title}>MSA eWorklog</h1>
            <form onSubmit={handleRegister} className={styles.form}>
                <div className={styles.formGroup}>
                    <label htmlFor="username" className={styles.label}>Username</label>
                    <input type="text" id="username" className={styles.input} />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="email" className={styles.label}>Email</label>
                    <input type="email" id="email" className={styles.input} />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="password" className={styles.label}>Password</label>
                    <div className={styles.inputWithIcon}>
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            className={`${styles.input} ${passwordValidationError && styles.error}`}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button
                            type="button"
                            className={styles.passwordToggle}
                            onClick={() => togglePasswordVisibility("password")}
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>
                    <div className={styles.passwordStrengthIndicator}>
                        <div className={`${styles.strengthBar} ${styles[passwordStrength]}`}></div>
                        <span className={styles.strengthLabel}>{passwordStrength}</span>
                    </div>
                    <br />
                    {passwordValidationError && <p className={styles.errorMessage}>{passwordValidationError}</p>}
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="confirmPassword" className={styles.label}>Confirm Password</label>
                    <div className={styles.inputWithIcon}>
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            id="confirmPassword"
                            className={`${styles.input} ${passwordMatchError ? styles.error : ""}`}
                            value={confirmPassword}
                            onChange={(e) => {
                                setConfirmPassword(e.target.value);
                                setPasswordMatchError(false); // Reset error when typing in confirm password field
                            }}
                        />
                        <button
                            type="button"
                            className={styles.passwordToggle}
                            onClick={() => togglePasswordVisibility("confirmPassword")}
                        >
                            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>
                    {passwordMatchError && <p className={styles.errorMessage}>Passwords do not match.</p>}
                </div>
                <button type="submit" className={styles.button}>Register</button>
            </form>
            <div className={styles.extraLinks}>
                <a href="#" onClick={handleForgotPassword} className={styles.link}>Forgot Password?</a><br />
                <span className={styles.linkText}>Already have an account? </span>
                <a href="/login" className={styles.link}>Login Here</a>
            </div>
        </div>
    );
}
