"use client";

import React, { useState } from "react";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const addUser = () => {
    if (!username || !password) return;
    setUsers([...users, { username, password }]);
    setUsername("");
    setPassword("");
  };

  const deleteUser = (index) => {
    const newUsers = [...users];
    newUsers.splice(index, 1);
    setUsers(newUsers);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Users</h2>
      <div className="mb-4 flex gap-2">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="p-2 border rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 border rounded"
        />
        <button
          onClick={addUser}
          className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Add User
        </button>
      </div>

      <ul>
        {users.map((user, index) => (
          <li
            key={index}
            className="flex justify-between items-center p-2 border-b"
          >
            <span>{user.username}</span>
            <button
              onClick={() => deleteUser(index)}
              className="text-red-600 hover:text-red-800"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}