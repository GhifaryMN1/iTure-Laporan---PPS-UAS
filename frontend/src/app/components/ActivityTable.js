"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './ActivityTable.module.css';

const ActivityTable = () => {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await axios.get('http://localhost:8080/activities');
        setActivities(response.data);
      } catch (error) {
        console.error('Error fetching activities:', error);
      }
    };

    fetchActivities();
  }, []);
  console.log(activities)
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Activities</h1>
        <button className={styles.button}>Tambah Laporan</button>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Program ID</th>
            <th>PIC</th>
            <th>Remark</th>
            <th>Status</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {activities.map(activity => (
            <tr key={activity.id}>
              <td>{activity.id}</td>
              <td>{activity.program_id}</td>
              <td>{activity.pic}</td>
              <td>{activity.remark}</td>
              <td className={activity.status === 'Selesai' ? styles.status-completed : styles.status-not-completed}>
                {activity.status}
              </td>
              <td>{activity.created_at}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ActivityTable;
