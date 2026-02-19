"use client";

export default function Header({ title }) {
  return (
    <div className="mb-6">
      <h1 className="text-3xl font-bold text-gray-800">
        {title}
      </h1>
    </div>
  );
}