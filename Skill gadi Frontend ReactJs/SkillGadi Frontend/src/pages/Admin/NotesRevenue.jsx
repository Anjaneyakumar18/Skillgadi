import { useState } from "react";
import BASE_API from "../../BaseApi";

function NotesRevenue() {
  const token = localStorage.getItem("token");
  const [revenue, setRevenue] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const fetchRevenue = async (days) => {
    setLoading(true);
    setError("");
    setRevenue(null);

    try {
      const res = await fetch(
        `${BASE_API}/api/admin/notes/revenue?days=${days}`,
        { headers }
      );
      if (!res.ok) throw new Error();
      setRevenue(await res.json());
    } catch {
      setError("Unable to fetch revenue");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-[1000px] mx-auto px-10 py-6">
      <h1 className="text-2xl font-semibold mb-2">Notes Revenue</h1>
      <p className="text-sm text-muted-foreground mb-6">
        Revenue generated from paid notes
      </p>

      {/* Period Buttons */}
      <div className="flex flex-wrap gap-3 mb-6">
        {[1, 7, 14, 30, 60, 180, 365].map((d) => (
          <button
            key={d}
            onClick={() => fetchRevenue(d)}
            className="px-4 py-2 text-sm rounded-md
                       border bg-background hover:bg-muted transition"
          >
            Last {d} days
          </button>
        ))}
      </div>

      {loading && <p className="text-sm text-muted-foreground">Loading…</p>}
      {error && <p className="text-sm text-red-500">{error}</p>}

      {revenue && (
        <div className="p-5 border rounded-lg bg-muted/40">
          <p className="text-sm text-muted-foreground">Total Revenue</p>
          <p className="text-3xl font-bold text-emerald-600">
            ₹{revenue.totalRevenue}
          </p>
        </div>
      )}
    </div>
  );
}

export default NotesRevenue;
