"use client";

import { useEffect, useState } from "react";

const DashboardView = () => {
  const [statistik, setStatistik] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch("/api/statistik")
      .then((res) => res.json())
      .then((data) => {
        setStatistik(data);
      })
      .finally(() => setLoading(false));
  }, []);
  return (
    <div className="max-w-7xl mx-auto p-5 space-y-5">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      {loading ? (
        <div className="w-full h-96 bg-gray-300 animate-pulse"></div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3">
          <div className="w-full p-3 bg-white rounded border space-y-3">
            <h1 className="text-xl font-bold">Total Products</h1>
            <p className="font-semibold">{statistik?.productsCount}</p>
          </div>

          <div className="w-full p-3 bg-white rounded border space-y-3">
            <h1 className="text-xl font-bold">Total Users</h1>
            <p className="font-semibold">{statistik?.usersCount}</p>
          </div>

          <div className="w-full p-3 bg-white rounded border space-y-3">
            <h1 className="text-xl font-bold">Total Categories</h1>
            <p className="font-semibold">{statistik?.categoriesCount}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardView;
