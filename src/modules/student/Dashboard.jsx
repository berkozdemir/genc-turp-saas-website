import React from 'react';
import { Link } from 'react-router-dom';

export default function StudentDashboard() {
  return (
    <div className="p-10 bg-green-50 min-h-screen text-center">
      <h1 className="text-3xl font-bold text-green-700 mb-4">Öğrenci Paneli 👋</h1>
      <p className="mb-8">Burası Efe'nin alanı. Günlük, anketler ve Spotify burada olacak.</p>
      <Link to="/student/marketplace" className="bg-black text-white px-4 py-2 rounded-lg">Marketplace'e Git</Link>
    </div>
  );
}
