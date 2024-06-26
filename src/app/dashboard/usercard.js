import styles from "./usercard.module.css";
import Image from 'next/image';

export default function UserCard() {
    return (
        <div className={styles.usercard}>
            <div className={styles.avatar}>
                <Image src="/guypic.png"
                    alt="User Avatar"
                    width={600}
                    height={600}
                    className={styles.avatarImage} />
            </div>
            <div className={styles.userInfo}>
                <h1>Mohamad Naim</h1>
                <p>Role: Frontend Developer</p>
                <p>Email: mohamad@example.com</p>
                <p className={styles.contact}>Contact: 0186688766</p>
            </div>
            <div className={styles.bio}>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla convallis libero in magna tempus, a accumsan ligula ultrices.</p>
            </div>
        </div>
    );
}
