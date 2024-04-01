"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import styles from './workgroups.module.css';
import Image from 'next/image';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaUsers, FaClipboardList, FaTh } from "react-icons/fa";

export default function WorkgroupsPage() {
    const [data, setData] = useState([]);
    const [name, setName] = useState('');
    const [wgid, setWgid] = useState('');
    const [description, setDescription] = useState('');
    const [showAddForm, setShowAddForm] = useState(false); // State to control visibility of add form
    const [showEditForm, setShowEditForm] = useState(false);
    const [editData, setEditData] = useState({});

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const { data: res } = await axios.get('http://172.16.1.166:8000/workgroups/');
            setData(res);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const addWorkgroup = async ({ name, wgid, description }) => {
        try {
            const response = await axios.post('http://172.16.1.166:8000/workgroups/', { name, wgid, description });
            return response.data;
        } catch (error) {
            throw new Error('Failed to add workgroup: ' + error.message);
        }
    };

    const deleteWorkgroup = async (id) => {
        try {
            await axios.delete(`http://172.16.1.166:8000/workgroups/${id}/`);
            setData(data.filter(workgroup => workgroup.id !== id));
        } catch (error) {
            console.error('Error deleting workgroup:', error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this workgroup?')) {
            try {
                await deleteWorkgroup(id);
                toast.success('Workgroup has been deleted', { autoClose: 3000 });
            } catch (error) {
                console.error('Error deleting workgroup:', error);
            }
        }
    };

    const handleEdit = (workgroup) => {
        setEditData(workgroup);
        setShowEditForm(true);
    };

    const handleEditDataChange = (e) => {
        const { name, value } = e.target;
        setEditData({ ...editData, [name]: value });
    };

    const handleSubmitEdit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://172.16.1.166:8000/workgroups/${editData.id}/`, editData);
            setShowEditForm(false);
            fetchData();
            toast.success('Workgroup has been edited', { autoClose: 3000 });
        } catch (error) {
            console.error('Error editing workgroup:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const newWorkgroup = await addWorkgroup({ name, wgid, description });
            setData([...data, newWorkgroup]);
            setName('');
            setWgid('');
            setDescription('');
            toast.success('New workgroup has been added', { autoClose: 3000 });
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
                                        <button className={`${styles.button} ${styles.edit}`} onClick={() => handleEdit(wg)}>Edit</button><br />
                                        <button className={`${styles.button} ${styles.delete}`} onClick={() => handleDelete(wg.id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className={styles['form-wrapper']}>
                    {!showAddForm ? (
                        <button onClick={() => setShowAddForm(true)} className={styles.addButton}>Add New Workgroup</button>
                    ) : (
                        <div className={styles.card}>
                            <form className={styles.form} onSubmit={handleSubmit}>
                                <h2>Add New Workgroup</h2>
                                <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                                <input type="text" placeholder="ID" value={wgid} onChange={(e) => setWgid(e.target.value)} />
                                <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                                <button className={`${styles.add} ${styles.addButton}`} type="submit">Add</button>
                                <button onClick={() => setShowAddForm(false)} className={`${styles.cancel} ${styles.cancelButton}`}>Cancel</button>
                            </form>
                        </div>
                    )}
                </div>
            </div>

            {showEditForm && (
                <div className={styles['edit-form-wrapper']}>
                    <div className={styles.card}>
                        <button className={styles['close-button']} onClick={() => setShowEditForm(false)}>X</button>
                        <form className={styles.form} onSubmit={handleSubmitEdit}>
                            <h2>Edit Workgroup</h2>
                            <input type="text" placeholder="Name" name="name" value={editData.name} onChange={handleEditDataChange} />
                            <input type="text" placeholder="ID" name="wgid" value={editData.wgid} onChange={handleEditDataChange} />
                            <textarea placeholder="Description" name="description" value={editData.description} onChange={handleEditDataChange}></textarea>
                            <button type="submit" className={`${styles.add} ${styles.addButton}`}>Save</button>
                        </form>
                    </div>
                </div>
            )}

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

            <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
        </>
    );
}
