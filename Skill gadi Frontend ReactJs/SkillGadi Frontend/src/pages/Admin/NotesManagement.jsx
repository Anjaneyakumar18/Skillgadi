import { useState } from "react";
import BASE_API from "../../BaseApi";

function NotesManagement() {
  const token = localStorage.getItem("token");

  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    driveLink: "",
  });

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  /* ================= LOAD NOTES (LAZY) ================= */
  const loadNotes = async () => {
    setLoading(true);
    const res = await fetch(`${BASE_API}/api/admin/notes`, { headers });
    setNotes(await res.json());
    setLoading(false);
  };

  /* ================= SEARCH NOTES ================= */
  const searchNotes = async () => {
    if (!search) {
      loadNotes();
      return;
    }

    setLoading(true);
    const res = await fetch(
      `${BASE_API}/api/admin/notes/search?title=${search}`,
      { headers }
    );
    setNotes(await res.json());
    setLoading(false);
  };

  /* ================= ADD NOTE ================= */
  const addNote = async () => {
    if (!form.title || !form.price || !form.driveLink) {
      alert("Fill all required fields");
      return;
    }

    await fetch(`${BASE_API}/api/admin/notes`, {
      method: "POST",
      headers,
      body: JSON.stringify(form),
    });

    setForm({
      title: "",
      description: "",
      price: "",
      driveLink: "",
    });

    // ❌ do NOT auto reload unless admin asks
  };

  /* ================= ENABLE / DISABLE ================= */
  const disableNote = async (id) => {
    await fetch(`${BASE_API}/api/admin/notes/${id}/disable`, {
      method: "PUT",
      headers,
    });
  };

  const enableNote = async (id) => {
    await fetch(`${BASE_API}/api/admin/notes/${id}/enable`, {
      method: "PUT",
      headers,
    });
  };

  return (
    <div className="space-y-8">
      {/* ================= ADD NOTE ================= */}
      <div className="bg-card border rounded-xl p-6 space-y-4">
        <h3 className="font-semibold text-lg">Add New Note</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            placeholder="Note title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="px-3 py-2 border rounded-md"
          />

          <input
            type="number"
            placeholder="Price"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            className="px-3 py-2 border rounded-md"
          />

          <input
            placeholder="Drive link"
            value={form.driveLink}
            onChange={(e) => setForm({ ...form, driveLink: e.target.value })}
            className="px-3 py-2 border rounded-md"
          />
        </div>

        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
          rows={3}
          className="w-full px-3 py-2 border rounded-md"
        />

        <button
          onClick={addNote}
          className="px-6 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700"
        >
          Add Note
        </button>
      </div>

      {/* ================= CONTROLS ================= */}
      <div className="flex gap-3 items-center">
        <button
          onClick={loadNotes}
          className="px-4 py-2 text-sm rounded-md
                     border border-border hover:bg-muted"
        >
          Load Notes
        </button>

        <input
          placeholder="Search by title"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-3 py-2 border rounded-md w-72"
        />

        <button
          onClick={searchNotes}
          className="px-4 py-2 text-sm rounded-md
                     border border-border hover:bg-muted"
        >
          Search
        </button>

        {loading && (
          <span className="text-sm text-muted-foreground">
            Loading…
          </span>
        )}
      </div>

      {/* ================= NOTES TABLE ================= */}
      {notes.length > 0 && (
        <div className="border rounded-xl overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted">
              <tr>
                <th className="px-4 py-3 text-left">Title</th>
                <th className="px-4 py-3 text-left">Price</th>
                <th className="px-4 py-3 text-left">Link</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-center">Action</th>
              </tr>
            </thead>

            <tbody>
  {notes.map((n) => (
    <tr key={n.noteId} className="border-t">
      <td className="px-4 py-3 font-medium">{n.title}</td>
      <td className="px-4 py-3">₹{n.price}</td>

      {/* ✅ DRIVE LINK */}
      <td className="px-4 py-3">
        {n.driveLink ? (
          <a
            href={n.driveLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            Open
          </a>
        ) : (
          <span className="text-muted-foreground">—</span>
        )}
      </td>

      <td className="px-4 py-3">
        {n.isActive ? (
          <span className="text-green-600">Active</span>
        ) : (
          <span className="text-red-500">Disabled</span>
        )}
      </td>

      <td className="px-4 py-3 text-center">
        {n.isActive ? (
          <button
            onClick={() => disableNote(n.noteId)}
            className="text-red-500 hover:underline"
          >
            Disable
          </button>
        ) : (
          <button
            onClick={() => enableNote(n.noteId)}
            className="text-green-600 hover:underline"
          >
            Enable
          </button>
        )}
      </td>
    </tr>
  ))}
</tbody>

          </table>
        </div>
      )}
    </div>
  );
}

export default NotesManagement;
