"use client";

import { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  onSnapshot,
  getDocs,
} from "firebase/firestore";
import { db } from "../../firebase";

import Header from "../../components/Header";
import ConfirmDeleteModal from "../../components/ConfirmDeleteModal";

export default function UsersPage() {
  const roles = ["admin", "staff", "students"];

  const [role, setRole] = useState("admin");
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({});
  const [editingUser, setEditingUser] = useState(null);
  const [deleteUser, setDeleteUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // 🔹 Live Firestore Sync
  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "users", "init", role),
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsers(data);
      }
    );

    return () => unsub();
  }, [role]);

  // 🔹 Generate ID for Admin & Staff
  const generateId = async () => {
    const snapshot = await getDocs(
      collection(db, "users", "init", role)
    );

    const count = snapshot.size + 1;

    if (role === "admin") {
      return `ADM${String(count).padStart(3, "0")}`;
    }

    if (role === "staff") {
      return `STF${String(count).padStart(3, "0")}`;
    }

    return "";
  };

  // 🔹 Save User
  const handleSave = async () => {
    let newData = {};

    if (role === "students") {
      const { name, className, section, idNo } = form;

      if (!name || !className || !section || !idNo) return;

      const userId = `${className}${section}${idNo}`;
      const password = `${userId}@123`;

      newData = {
        name,
        class: className,
        section,
        idNo,
        userId,
        password,
        role,
      };
    } else {
      if (!form.name) return;

      const userId = await generateId();
      const password = `${userId}@123`;

      newData = {
        name: form.name,
        userId,
        password,
        role,
      };
    }

    if (editingUser && editingUser.id) {
      await updateDoc(
        doc(db, "users", "init", role, editingUser.id),
        newData
      );
    } else {
      await addDoc(
        collection(db, "users", "init", role),
        newData
      );
    }

    setForm({});
    setEditingUser(null);
    setShowModal(false);
  };

  // 🔹 Delete User
  const confirmDelete = async () => {
    await deleteDoc(
      doc(db, "users", "init", role, deleteUser.id)
    );
    setDeleteUser(null);
  };

  return (
    <div>
      <Header title="User Management" />

      {/* Role Tabs */}
      <div className="flex gap-4 mb-6">
        {roles.map((r) => (
          <button
            key={r}
            onClick={() => setRole(r)}
            className={`px-4 py-2 rounded ${
              role === r
                ? "bg-blue-600 text-white"
                : "bg-gray-200"
            }`}
          >
            {r.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Add User Button */}
      <div className="flex justify-end mb-6">
        <button
          onClick={() => {
            setForm({});
            setEditingUser(null);
            setShowModal(true);
          }}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Add {role}
        </button>
      </div>

      {/* User List */}
      <div className="bg-white p-6 rounded-xl shadow">
        {users.length === 0 ? (
          <p>No users found.</p>
        ) : (
          users.map((user) => (
            <div
              key={user.id}
              className="border-b py-3 flex justify-between"
            >
              <div>
                <p className="font-semibold">
                  {user.name}
                </p>

                <p className="text-sm text-gray-500">
                  ID: {user.userId} | Password:{" "}
                  {user.password}
                </p>

                {role === "students" && (
                  <p className="text-sm">
                    Class {user.class} - {user.section}
                  </p>
                )}
              </div>

              <button
                onClick={() => setDeleteUser(user)}
                className="text-red-600"
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>

      {/* Add User Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
          <div className="bg-white w-96 p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-bold mb-4">
              Add {role}
            </h2>

            <input
              placeholder="Name"
              className="border p-2 rounded w-full mb-3"
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
            />

            {role === "students" && (
              <>
                <input
                  placeholder="Class"
                  className="border p-2 rounded w-full mb-3"
                  onChange={(e) =>
                    setForm({
                      ...form,
                      className: e.target.value,
                    })
                  }
                />
                <input
                  placeholder="Section"
                  className="border p-2 rounded w-full mb-3"
                  onChange={(e) =>
                    setForm({
                      ...form,
                      section: e.target.value,
                    })
                  }
                />
                <input
                  placeholder="ID No"
                  className="border p-2 rounded w-full mb-3"
                  onChange={(e) =>
                    setForm({
                      ...form,
                      idNo: e.target.value,
                    })
                  }
                />
              </>
            )}

            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>

              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      <ConfirmDeleteModal
        isOpen={deleteUser !== null}
        onClose={() => setDeleteUser(null)}
        onConfirm={confirmDelete}
      />
    </div>
  );
}