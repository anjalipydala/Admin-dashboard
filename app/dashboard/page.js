"use client";

import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import Link from "next/link";

export default function Dashboard() {
  const [adminCount, setAdminCount] = useState(0);
  const [staffCount, setStaffCount] = useState(0);
  const [studentCount, setStudentCount] = useState(0);

  useEffect(() => {
    const unsubAdmin = onSnapshot(
      collection(db, "users", "init", "admin"),
      (snapshot) => setAdminCount(snapshot.size)
    );

    const unsubStaff = onSnapshot(
      collection(db, "users", "init", "staff"),
      (snapshot) => setStaffCount(snapshot.size)
    );

    const unsubStudent = onSnapshot(
      collection(db, "users", "init", "students"),
      (snapshot) => setStudentCount(snapshot.size)
    );

    return () => {
      unsubAdmin();
      unsubStaff();
      unsubStudent();
    };
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>

      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="p-6 bg-white shadow rounded-xl">
          <h2>Total Admins</h2>
          <p className="text-2xl font-bold">{adminCount}</p>
        </div>

        <div className="p-6 bg-white shadow rounded-xl">
          <h2>Total Staff</h2>
          <p className="text-2xl font-bold">{staffCount}</p>
        </div>

        <div className="p-6 bg-white shadow rounded-xl">
          <h2>Total Students</h2>
          <p className="text-2xl font-bold">{studentCount}</p>
        </div>
      </div>

      <Link
        href="/dashboard/users"
        className="bg-blue-600 text-white px-6 py-2 rounded-lg"
      >
        Manage Users
      </Link>
    </div>
  );
}