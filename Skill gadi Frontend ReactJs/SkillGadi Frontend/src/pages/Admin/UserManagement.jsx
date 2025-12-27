import { useEffect, useState } from "react";
import { Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";

import BASE_API from "../../BaseApi";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [email, setEmail] = useState("");
  const [seen, setSeen] = useState(0);
  const limit = 20;

  const navigate = useNavigate();

  /* ===== JWT ===== */
  const token = localStorage.getItem("token");

  /* ===== ROUTE GUARD ===== */
  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token, navigate]);

  // Load recent users
  const loadUsers = async () => {
    const res = await fetch(
      `${BASE_API}/user/recent?offset=${seen}&limit=${limit}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await res.json();
    setUsers(data);
  };

  // Search user by email
  const searchUser = async () => {
    if (!email) return;

    const res = await fetch(
      `${BASE_API}/user/search?email=${email}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await res.json();
    setUsers(data ? [data] : []);
  };

  useEffect(() => {
    loadUsers();
  }, [seen]);

  return (
    <div className="animate-fade-in">
      <h1 className="text-3xl font-display font-bold mb-6">
        User Management
      </h1>

      {/* Search */}
      <div className="flex gap-4 mb-6">
        <input
          placeholder="Search by email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="px-4 py-2 rounded-xl border border-border w-80"
        />
        <button
          onClick={searchUser}
          className="px-4 py-2 gradient-primary text-primary-foreground rounded-xl"
        >
          Search
        </button>
      </div>

      {/* Table */}
      <div className="bg-card rounded-2xl border border-border/50 overflow-hidden">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="px-6 py-4 text-left">ID</th>
              <th className="px-6 py-4 text-left">Username</th>
              <th className="px-6 py-4 text-left">Email</th>
              <th className="px-6 py-4 text-left">Joined</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.userId} className="border-t border-border/50">
                <td className="px-6 py-4">{u.userId}</td>
                <td className="px-6 py-4">{u.username}</td>
                <td className="px-6 py-4">{u.email}</td>
                <td className="px-6 py-4">
                  {new Date(u.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="p-2 hover:bg-muted rounded-lg">
                    <Eye className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-end mt-6">
        <button
          onClick={() => setSeen(seen + limit)}
          className="px-4 py-2 rounded-xl bg-muted hover:bg-muted/70"
        >
          Next →
        </button>
      </div>
    </div>
  );
};

export default UserManagement;
