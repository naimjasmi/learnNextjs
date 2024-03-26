import styles from "./usercard.module.css";

export default function UserCard() {
    return ( 
            <div className={styles.usercard}>
                <h1>Mohamad Naim</h1>
                <p>Role: Frontend Developer</p>
                <p>Email: mohamad@example.com</p>
                <p className={styles.contact}>Contact: 0186688766</p>
            </div>

    );
}
