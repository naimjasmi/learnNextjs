"use client";

import Link from 'next/link';
import styles from './workgroups.module.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function WorkgroupsPage() {
    const [data, setData] = useState([]);
    const [name, setName] = useState('');
    const [wgid, setWgid] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const { data: res } = await axios.get('http://172.16.1.132:8000/workgroups/');
            setData(res);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const addWorkgroup = async ({ name, wgid, description }) => {
        try {
            const response = await axios.post('http://172.16.1.132:8000/workgroups/', { name, wgid, description });
            return response.data;
        } catch (error) {
            throw new Error('Failed to add workgroup: ' + error.message);
        }
    };

    const deleteWorkgroup = async (id) => {
        try {
            const response = await axios.delete(`http://172.16.1.132:8000/workgroups/${id}/`); // delete using id
            //setData(data.filter(workgroup => workgroup.id !== id)); // Filter based on id
            //return response.data;
        } catch (error) {
            console.error('Error deleting workgroup:', error);
        }
    };

    const handleDelete = async (id) => { // Use async as deleteWorkgroup is async
        if (window.confirm('Are you sure you want to delete this workgroup?')) {
            try {
                await deleteWorkgroup(id); 
                setData(data.filter(workgroup => workgroup.id !== id)); // Update list data after deletion
            } catch (error) {
                console.error('Error deleting workgroup:', error);
            }
        }
    };

    const handleEdit = (id) => {
        // Handle edit action
        console.log('Editing workgroup with id:', id);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const newWorkgroup = await addWorkgroup({ name, wgid, description });
            setData([...data, newWorkgroup]);
            setName('');
            setWgid('');
            setDescription('');
        } catch (error) {
            console.error('Error adding workgroup:', error);
        }
    };

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
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.length !== 0 && data.map((wg, index) => (
                                <tr key={index} className={index % 2 === 0 ? styles.even : styles.odd}>
                                    <td>{wg.name}</td>
                                    <td>{wg.wgid}</td>
                                    <td>{wg.description}</td>
                                    <td>
                                        <button className={`${styles.button} ${styles.edit}`} onClick={() => handleEdit(wg.id)}>Edit</button><br/>
                                        <button className={`${styles.button} ${styles.delete}`} onClick={() => handleDelete(wg.id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className={styles['form-wrapper']}>
                    <div className={styles.card}>
                        <form className={styles.form} onSubmit={handleSubmit}>
                            <h2>Add New Workgroup</h2>
                            <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                            <input type="text" placeholder="ID" value={wgid} onChange={(e) => setWgid(e.target.value)} />
                            <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                            <button type="submit">Add</button>
                        </form>
                    </div>
                </div>
            </div>
            <nav className={styles['sidebar']}>
                <ul className={styles['sidebar-list']}>
                    <h2>Menu</h2><br />
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

