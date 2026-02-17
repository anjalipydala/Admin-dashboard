"use client";

import { useState } from "react";

export default function Sidebar() {
  const [links, setLinks] = useState([
    { id: 1, name: "Home" },
    { id: 2, name: "Users" },
    { id: 3, name: "Settings" },
  ]);

  const handleAddLink = () => {
    const name = prompt("Enter link name");
    if (name) setLinks([...links, { id: Date.now(), name }]);
  };

  const handleDelete = (id) => {
    setLinks(links.filter((link) => link.id !== id));
  };

  return (
    <div className="w-64 bg-gray-800 text-white p-4 flex flex-col">
      <h2 className="text-xl font-bold mb-4">Sidebar</h2>
      <button
        onClick={handleAddLink}
        className="bg-blue-600 p-2 mb-4 rounded hover:bg-blue-700"
      >
        Add Link
      </button>
      <ul>
        {links.map((link) => (
          <li key={link.id} className="flex justify-between mb-2">
            {link.name}
            <button onClick={() => handleDelete(link.id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}