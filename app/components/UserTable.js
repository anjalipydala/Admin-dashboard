export default function UserTable({
  users,
  onEdit,
  onDelete,
}) {
  return (
    <div className="bg-white rounded-xl shadow p-4">
      {users.length === 0 ? (
        <p className="text-gray-500">No users found.</p>
      ) : (
        users.map((user) => (
          <div
            key={user.id}
            className="flex justify-between items-center border-b py-3"
          >
            <div>
              <p className="font-semibold">{user.name || "-"}</p>
              <p className="text-sm text-gray-500">
                {user.email || "-"}
              </p>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => onEdit(user)}
                className="text-blue-600"
              >
                Edit
              </button>

              <button
                onClick={() => onDelete(user)}
                className="text-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}