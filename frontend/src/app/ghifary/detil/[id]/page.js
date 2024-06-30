"use client";
import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation'; // Import useParams & Router "kembali"
import axios from 'axios';

const ActivityDetail = () => {
  const { id } = useParams(); // Get the ID from the dynamic route parameters
  const [activity, setActivity] = useState(null);
  const router = useRouter(); // Initialize the router

  useEffect(() => {
    const fetchActivity = async () => {
      if (id) {
        try {
          const response = await axios.get(`http://localhost:8080/activities/${id}`);
          setActivity(response.data);
        } catch (error) {
          console.error('Error fetching activity details:', error);
        }
      }
    };

    fetchActivity();
  }, [id]);

  if (!activity) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 font-sans text-black">
      <header className="bg-white shadow mb-8 p-4 rounded flex justify-between items-center">
        <h1 className="text-2xl font-bold">Detail Laporan</h1>
        <img src="/favicon.ico" alt="iTure Logo" className="w-8 h-8" />
      </header>
      <div className="container mx-auto bg-white shadow rounded p-4">
        <h2 className="text-xl font-semibold">{activity.name}</h2>
        <div className="p-4">
        <div className="grid grid-cols-[max-content,max-content,1fr] gap-y-2">
            <div className="font-semibold">ID</div>
            <div className="px-4">:</div>
            <div>{activity.id}</div>
            <div className="font-semibold">Program ID</div>
            <div className="px-4">:</div>
            <div>{activity.program_id}</div>
            <div className="font-semibold">PIC</div>
            <div className="px-4">:</div>
            <div>{activity.pic}</div>
            <div className="font-semibold">Deskripsi</div>
            <div className="px-4">:</div>
            <div>{activity.remark}</div>
            <div className="font-semibold">Status</div>
            <div className="px-4">:</div>
            <div>{activity.status}</div>
            <div className="font-semibold">Created At</div>
            <div className="px-4">:</div>
            <div>{activity.created_at}</div>
        </div>

        </div>
      </div>
      <div className="flex justify-center items-center mt-8">
        <button
          onClick={() => router.back()}
          className="bg-white font-medium border border-blue-950 text-blue-950 px-4 py-2 rounded hover:bg-gray-200"
        >
          Kembali
        </button>
      </div>
    </div>
  );
};

export default ActivityDetail;
