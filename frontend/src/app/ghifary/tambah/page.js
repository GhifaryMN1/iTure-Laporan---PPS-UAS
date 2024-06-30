"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // Correctly import useRouter
import axios from 'axios';

const AddReport = () => {
  const [pic, setPic] = useState('');
  const [remark, setRemark] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [success, setSuccess] = useState(false); // sign sukses
  const router = useRouter(); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newReport = {
      program_id: 1, // calll program_id
      pic,
      remark,
      start_date: startDate,
      end_date: endDate,
    };

    try {
      console.log('Submitting report:', newReport); // Log the payload
      const response = await axios.post('http://localhost:8080/activities', newReport);
      console.log('Response:', response); // Log the response
      setSuccess(true); // Set success state to true
      setTimeout(() => {
        router.push('/ghifary'); // Redirect to the home page after 2 seconds
      }, 2000);
    } catch (error) {
      console.error('Error submitting the report:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 font-sans text-black">
      <header className="bg-white shadow mb-8 p-4 rounded flex justify-between items-center">
        <h1 className="text-2xl font-bold">Tambah Laporan</h1>
        <img src="/favicon.ico" alt="iTure Logo" className="w-8 h-8" />
      </header>
      <div className="container mx-auto bg-white shadow rounded p-8">
        {success ? (
          <div className="text-center">
            <div className="text-green-500">
              <svg
                className="mx-auto h-12 w-12"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2l4-4m6 2a9 9 0 11-18 0a9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h2 className="mt-4 text-2xl font-bold text-gray-900">Thank You!</h2>
            <p className="mt-1 text-sm text-gray-500">Response Has Been Submitted</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="pic" className="block text-sm font-medium text-gray-700">PIC</label>
              <input
                type="text"
                id="pic"
                value={pic}
                onChange={(e) => setPic(e.target.value)}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-4"
                required
              />
            </div>
            <div>
              <label htmlFor="remark" className="block text-sm font-medium text-gray-700">Deskripsi</label>
              <textarea
                id="remark"
                value={remark}
                onChange={(e) => setRemark(e.target.value)}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring-indigo-300 sm:text-sm p-4"
                rows="4"
                required
              ></textarea>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">Tanggal Mulai</label>
                <input
                  type="date"
                  id="startDate"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-4"
                  required
                />
              </div>
              <div>
                <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">Tanggal Selesai</label>
                <input
                  type="date"
                  id="endDate"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-4"
                  required
                />
              </div>
            </div>
            <div className="flex justify-between">
              <button
                type="button"
                onClick={() => router.push('/ghifary')}
                className="bg-transparent font-medium border border-blue-950 text-blue-950 px-4 py-2 rounded hover:bg-gray-200"
              >
                Kembali
              </button>
              <button
                type="submit"
                className="bg-blue-950 font-medium text-white px-4 py-2 rounded hover:bg-emerald-800"
              >
                Submit
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default AddReport;
