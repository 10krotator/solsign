"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status !== "loading") {
      setLoading(false);
    }
  }, [status]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!session) {
    return <div>Access Denied</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">
          Welcome, {session.user?.name || "User"}!
        </h2>
        <p className="mb-4">Your public key: {session.user?.name}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-100 p-4 rounded-md">
            <h3 className="font-semibold mb-2">Recent Activity</h3>
            <p>No recent activity to display.</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-md">
            <h3 className="font-semibold mb-2">Quick Actions</h3>
            <ul>
              <li>
                <button className="text-blue-600 hover:underline">
                  Create New Document
                </button>
              </li>
              <li>
                <button className="text-blue-600 hover:underline">
                  View All Documents
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
