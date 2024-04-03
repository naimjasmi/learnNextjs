"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import styles from './activity.module.css';
import DataTable from 'react-data-table-component';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { FaUsers, FaClipboardList, FaTh, FaPlusCircle, FaMapMarkerAlt } from "react-icons/fa";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ActivityPage() {
    const router = useRouter();

    const [data, setData] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [activityid, setActivityId] = useState('');
    const [date, setDate] = useState('');
    const [starttime, setStartTime] = useState('');
    const [endtime, setEndTime] = useState('');
    const [weather, setWeather] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [description, setDescription] = useState('');
    const [worktype, setWorkType] = useState([]);
    const [workgroup, setWorkGroup] = useState([]);
    const [showAddActivityForm, setShowAddActivityForm] = useState(false); // State to control visibility of add activity form

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const { data: res } = await axios.get('http://172.16.1.166:8000/activities/');
            setData(res);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const addActivity = async () => {
        try {
            // Convert worktype and workgroup to arrays if they are strings
            const workTypeArray = Array.isArray(worktype) ? worktype : [worktype];
            const workGroupArray = Array.isArray(workgroup) ? workgroup : [workgroup];

            const response = await axios.post('http://172.16.1.166:8000/activities/', {
                activityid,
                date,
                starttime,
                endtime,
                weather,
                latitude,
                longitude,
                description,
                worktype: workTypeArray,
                workgroup: workGroupArray
            });
            toast.success('New activity has been added', { autoClose: 3000 });
            return response.data;
        } catch (error) {
            console.error('Error adding activity:', error);
            throw new Error('Failed to add activity: ' + error.message);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addActivity();
            fetchData();
            setShowAddActivityForm(false); // Hide the form after submission
            resetForm();
        } catch (error) {
            console.error('Error adding activity:', error);
        }
    };

    const toggleAddActivityForm = () => {
        setShowAddActivityForm(!showAddActivityForm);
    };

    const resetForm = () => {
        setActivityId('');
        setDate('');
        setStartTime('');
        setEndTime('');
        setWeather('');
        setLatitude('');
        setLongitude('');
        setDescription('');
        setWorkType('');
        setWorkGroup('');
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://172.16.1.166:8000/activities/${id}/`);
            fetchData(); // Refresh the data after deletion
            toast.success('Activity has been deleted', { autoClose: 3000 });
        } catch (error) {
            console.error('Error deleting activity:', error);
        }
    };

    const columns = [
        {
            name: 'Activity ID',
            selector: row => row.activityid,
            sortable: true,
        },
        {
            name: 'Date',
            selector: row => row.date,
            sortable: true,
        },
        {
            name: 'Weather',
            selector: row => row.weather,
        },
        {
            name: 'Description',
            selector: row => row.description,
            sortable: true,
        },
        {
            name: 'Action',
            cell: row => (
                <>
                    <button className='btn btn-sm btn-primary' onClick={() => router.push(`/activity/view/${row.id}`)}>View</button>
                    <button className='btn btn-sm btn-danger' onClick={() => handleDelete(row.id)}>Delete</button>
                </>
            ),
            ignoreRowClick: true
        },
    ];

    const handleSearchChange = (e) => {
        setSearchValue(e.target.value.toLowerCase());
    };

    const filteredData = searchValue
        ? data.filter(item => (
            item.activityid.toLowerCase().includes(searchValue) ||
            item.date.toLowerCase().includes(searchValue) ||
            item.weather.toLowerCase().includes(searchValue) ||
            item.description.toLowerCase().includes(searchValue)
        ))
        : data;

    return (
        <>
            <div className={styles.container}>
                <p className={styles['page-title']}>Activity Page</p>
                <div className={styles['table-wrapper']}>
                    <div className='col-sm p-2'>
                        <DataTable
                            columns={columns}
                            data={filteredData}
                            pagination
                            paginationPerPageOptions={[5, 10, 20, 50]}
                            paginationRowsPerPageOptions={[5, 10, 20, 50]}
                            subHeader
                            subHeaderComponent={
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    className={styles.search}
                                    value={searchValue}
                                    onChange={handleSearchChange}
                                />
                            }
                        />
                    </div>
                </div>
            </div>

            <div className={styles['form-wrapper']}>

                <button style={{ marginRight: '10px' }} onClick={() => router.push(`/activity/Map`)} className={styles.addButton}>
                    Maps <FaMapMarkerAlt />
                </button>

                {!showAddActivityForm && (
                    <button onClick={toggleAddActivityForm} className={styles.addButton}>
                        Add New Activity <FaPlusCircle />
                    </button>
                )}

                {showAddActivityForm && (
                    <div className={styles.card}>
                        <form className={styles.form} onSubmit={handleSubmit}>
                            <h2>Add New Activity</h2>
                            <input type="text" placeholder="Activity ID" value={activityid} onChange={(e) => setActivityId(e.target.value)} />
                            <input type="date" placeholder="Date" value={date} onChange={(e) => setDate(e.target.value)} />
                            <input type="time" placeholder="Start Time" value={starttime} onChange={(e) => setStartTime(e.target.value)} />
                            <input type="time" placeholder="End Time" value={endtime} onChange={(e) => setEndTime(e.target.value)} />
                            <select value={weather} onChange={(e) => setWeather(e.target.value)}>
                                <option value="" disabled selected>Weather</option>
                                <option value="clear">Clear</option>
                                <option value="cloudy">Cloudy</option>
                                <option value="lightrain">Light Rain</option>
                                <option value="heavyrain">Heavy Rain</option>
                            </select>
                            <input type="text" placeholder="Latitude" value={latitude} onChange={(e) => setLatitude(e.target.value)} />
                            <input type="text" placeholder="Longitude" value={longitude} onChange={(e) => setLongitude(e.target.value)} />
                            <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                            <span>Work Type</span>
                            <select className="custom-select" multiple value={worktype} onChange={(e) => setWorkType(Array.from(e.target.selectedOptions, option => option.value))}>
                               
                                <option value="33316552-79b4-4172-b8ee-2828cfe9b272">WT001 : Open Trench</option>
                                <option value="7de27d79-c6ea-4e5b-8005-92e0c0df3aa8">WT002 : Cable Pulling/Splicing</option>
                                <option value="56c16e68-f697-4cae-ae16-5dbbaa0a9aa0">WT003 : Sub-duct Installation</option>
                                <option value="3a46a618-ba51-4be0-8b60-9eed35b20882">WT004 : HDD - Duct Pulling</option>
                                <option value="a95703d9-d3bf-4dac-b18f-4da1524b41ca">WT005 : HDD - Reaming</option>
                                <option value="38e1587e-f67d-4616-82ac-4d6bf640afdd">WT006 : HDD - Piloting</option>
                                <option value="d76d7d11-7b68-4d34-b18c-2b7dff10f195">WT007 : Cable Signal Testing</option>
                            </select>
                            <input type="text" placeholder="Work Group" value={workgroup} onChange={(e) => setWorkGroup(e.target.value)} />
                            <div>
                                <button type="submit" className={`${styles.add} ${styles.addButton}`}>Add</button>
                                <button type="button" className={`${styles.cancel} ${styles.cancelButton}`} onClick={toggleAddActivityForm}>Cancel</button>
                            </div>
                        </form>
                    </div>

                )}
            </div>
            <nav className={styles['sidebar']}>
                <ul className={styles['sidebar-list']}>
                    <div className={styles.avatar}>
                        <Link href="/dashboard">
                            <Image src="/msalogo.png"
                                alt="User Avatar"
                                width={600}
                                height={600}
                                className={styles.logoImage} />
                        </Link>
                    </div>
                    <li className={styles['sidebar-item']}>
                        <Link href="/dashboard" scroll={false}><FaTh /> Dashboard</Link>
                    </li>
                    <li className={styles['sidebar-item']}>
                        <Link href="/activity" scroll={false}><FaClipboardList /> Activity</Link>
                    </li>
                    <li className={styles['sidebar-item']}>
                        <Link href="/workgroups" scroll={false}><FaUsers /> Workgroup</Link>
                    </li>
                </ul>
            </nav>

            <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
        </>
    );
}
