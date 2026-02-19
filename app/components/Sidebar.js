"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const linkClass = (path) =>
    `block px-4 py-3 rounded-lg transition ${
      pathname === path
        ? "bg-gray-700 text-white"
        : "text-gray-300 hover:bg-gray-700 hover:text-white"
    }`;

  return (
    <div className="w-64 min-h-screen bg-gray-900 p-6">
      <h2 className="text-2xl font-bold text-white mb-8">
        School ERP
      </h2>

      <nav className="space-y-3">
        <Link href="/dashboard" className={linkClass("/dashboard")}>
          Dashboard
        </Link>

        <Link href="/dashboard/users" className={linkClass("/dashboard/users")}>
          Users
        </Link>
      </nav>
    </div>
  );
}