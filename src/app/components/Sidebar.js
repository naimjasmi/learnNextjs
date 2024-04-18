"use client"

import React, { useState } from "react";
import styles from "./sidebar.module.css";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaUsers, FaClipboardList, FaTh, FaBars, FaSignOutAlt } from "react-icons/fa";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();
  function handleLogout(ev) {
    ev.preventDefault();
    // Add your logout logic here
    console.log("Logout clicked");
    router.push('/login');
  };

  const toggleSidebar = () => {
    setIsOpen(prevIsOpen => !prevIsOpen);
  };

  return (
    <div className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
      <div className={styles.overlay} onClick={toggleSidebar}></div>
      <div className={styles.sidebarContent}>
        <div className={styles.toggleBtn} onClick={toggleSidebar}>
          <FaBars />
        </div>
        <div className={styles.sidebarItems}>
          <ul className={styles["sidebar-list"]}>
            <div className={styles.avatar}>
              <Link href="/dashboard">
                <Image
                  src="/msalogo.png"
                  alt="User Avatar"
                  width={600}
                  height={600}
                  className={styles.logoImage}
                />
              </Link>
            </div>
            <li className={styles["sidebar-item"]}>
              <Link href="/dashboard" scroll={false}>
                <FaTh /> Dashboard
              </Link>
            </li>
            <li className={styles["sidebar-item"]}>
              <Link href="/activity" scroll={false}>
                <FaClipboardList /> Activity
              </Link>
            </li>
            <li className={styles["sidebar-item"]}>
              <Link href="/workgroups" scroll={false}>
                <FaUsers /> Workgroup
              </Link>
            </li>
          </ul>
        </div>
        {/* Logout option */}
        <div className={styles.logout}>
          <button onClick={handleLogout}>
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
