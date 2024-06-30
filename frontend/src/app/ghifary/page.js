"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation'; // Import useRouter
import 'tailwindcss/tailwind.css';

const HomePage = () => {
  const [activities, setActivities] = useState([]);
  const router = useRouter(); // Initialize the router

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

  const handleAddReport = () => {
    router.push('/ghifary/tambah'); // Navigate to the addReport page
  };

  const handleRowClick = (id) => {
    router.push(`/ghifary/detil/${id}`); // Navigate to the activity detail page
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 font-sans text-black">
      <header className="bg-white shadow mb-8 p-4 rounded flex justify-between items-center">
        <h1 className="text-2xl font-bold">Program Sejahtera</h1>
        <img src="/favicon.ico" alt="iTure Logo" className="w-8 h-8" />
      </header>
      <div className="container mx-auto bg-white shadow rounded p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-semibold">Daftar Laporan</h1>
          <button
            className="bg-blue-900 text-white p-2 rounded hover:bg-blue-950"
            onClick={handleAddReport}
          >
            <td>
              <svg
                className="w-4 h-3 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="3"
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </td>
            <td>
              Tambah Laporan
            </td>
            
          </button>
        </div>
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b text-center">ID</th>
              <th className="py-2 px-4 border-b text-center">Program ID</th>
              <th className="py-2 px-4 border-b text-center">PIC</th>
              <th className="py-2 px-4 border-b text-center">Status</th>
              <th className="py-2 px-4 border-b text-center">Created At</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((activity) => (
              <tr
                key={activity.id}
                className="hover:bg-gray-100 cursor-pointer"
                onClick={() => handleRowClick(activity.id)}
              >
                <td className="py-2 px-4 border-b text-center">{activity.id}</td>
                <td className="py-2 px-4 border-b text-center">{activity.program_id}</td>
                <td className="py-2 px-4 border-b text-center">{activity.pic}</td>
                <td
                  className={`py-2 px-4 border-b text-center ${
                    activity.status === 'CREATED' ? 'text-green-500' : 'text-red-500'
                  }`}
                >
                  {activity.status}
                </td>
                <td className="py-2 px-4 border-b text-center">{activity.created_at}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HomePage;
