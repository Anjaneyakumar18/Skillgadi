import { useState } from "react";
import BASE_API from "../../BaseApi";

function Payments() {
  const token = localStorage.getItem("token");

  const [email, setEmail] = useState("");
  const [quizId, setQuizId] = useState("");

  const [data, setData] = useState([]);
  const [revenue, setRevenue] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [periodRevenue, setPeriodRevenue] = useState(null);

const fetchRevenueByPeriod = async (period) => {
  setLoading(true);
  setError("");
  setData([]);
  setRevenue(null);

  try {
    const res = await fetch(
      `${BASE_API}/api/admin/payments/revenue/range?period=${period}`,
      { headers }
    );
    if (!res.ok) throw new Error();
    setPeriodRevenue(await res.json());
  } catch {
    setError("Unable to fetch revenue for selected period");
  } finally {
    setLoading(false);
  }
};


  const headers = {
    Authorization: `Bearer ${token}`,
  };

  // 1️⃣ Payments by user email
  const fetchByEmail = async () => {
    if (!email) return;

    setLoading(true);
    setError("");
    setRevenue(null);
    setData([]);

    try {
      const res = await fetch(
        `${BASE_API}/api/admin/payments/user?email=${email}`,
        { headers }
      );
      if (!res.ok) throw new Error();
      setData(await res.json());
    } catch {
      setError("No payments found for this email");
    } finally {
      setLoading(false);
    }
  };

  // 2️⃣ Users by quiz
  const fetchUsersByQuiz = async () => {
    if (!quizId) return;

    setLoading(true);
    setError("");
    setRevenue(null);
    setData([]);

    try {
      const res = await fetch(
        `${BASE_API}/api/admin/payments/quiz/users?quizId=${quizId}`,
        { headers }
      );
      if (!res.ok) throw new Error();
      setData(await res.json());
    } catch {
      setError("No users found for this quiz");
    } finally {
      setLoading(false);
    }
  };

  // 3️⃣ Revenue by quiz
  const fetchRevenue = async () => {
    if (!quizId) return;

    setLoading(true);
    setError("");
    setData([]);

    try {
      const res = await fetch(
        `${BASE_API}/api/admin/payments/quiz/revenue?quizId=${quizId}`,
        { headers }
      );
      if (!res.ok) throw new Error();
      setRevenue(await res.json());
    } catch {
      setError("Revenue not available");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-[1200px] mx-auto px-10 py-6">
        {/* ===== REVENUE OVERVIEW ===== */}
<div className="mb-8 p-5 border rounded-lg bg-muted/40">
  <h2 className="text-xl font-semibold mb-1">
    Revenue Overview
  </h2>
  <p className="text-sm text-muted-foreground mb-4">
    View revenue generated over different time periods
  </p>

  <div className="flex flex-wrap gap-3">
    {[
      { label: "1 Day", value: "1D" },
      { label: "1 Week", value: "7D" },
      { label: "2 Weeks", value: "14D" },
      { label: "1 Month", value: "1M" },
      { label: "2 Months", value: "2M" },
      { label: "6 Months", value: "6M" },
      { label: "1 Year", value: "1Y" },
    ].map((p) => (
      <button
        key={p.value}
        onClick={() => fetchRevenueByPeriod(p.value)}
        className="px-4 py-2 text-sm rounded-md
                   border border-border bg-background
                   hover:bg-muted transition"
      >
        {p.label}
      </button>
    ))}
  </div>

  {periodRevenue !== null && (
    <div className="mt-4">
      <p className="text-sm text-muted-foreground">
        Total Revenue
      </p>
      <p className="text-2xl font-bold text-emerald-600">
        ₹{periodRevenue}
      </p>
    </div>
  )}
</div>

      <h1 className="text-2xl font-semibold mb-6">Admin Payments</h1>

      {/* ===== CONTROLS ===== */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* Email */}
        <div className="space-y-2">
          <input
            type="email"
            placeholder="User email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 text-sm rounded-md border"
          />
          <button
            onClick={fetchByEmail}
            className="w-full py-2 text-sm rounded-md
                       bg-emerald-600 text-white hover:bg-emerald-700"
          >
            Fetch User Payments
          </button>
        </div>

        {/* Quiz ID */}
        <div className="space-y-2">
          <input
            type="number"
            placeholder="Quiz ID"
            value={quizId}
            onChange={(e) => setQuizId(e.target.value)}
            className="w-full px-3 py-2 text-sm rounded-md border"
          />
          <button
            onClick={fetchUsersByQuiz}
            className="w-full py-2 text-sm rounded-md
                       bg-slate-700 text-white hover:bg-slate-800"
          >
            Fetch Quiz Users
          </button>
        </div>

        {/* Quiz Name */}
        <div className="space-y-2">
          <input
            type="text"
            placeholder="Quiz Name"
            value={quizId}
            onChange={(e) => setQuizId(e.target.value)}
            className="w-full px-3 py-2 text-sm rounded-md border"
          />
          <button
            onClick={fetchRevenue}
            className="w-full py-2 text-sm rounded-md
                       bg-indigo-600 text-white hover:bg-indigo-700"
          >
            Fetch Revenue
          </button>
        </div>
      </div>

      {/* ===== STATES ===== */}
      {loading && (
        <p className="text-sm text-muted-foreground">Loading…</p>
      )}

      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}

      {/* ===== REVENUE ===== */}
      {revenue && (
        <div className="mb-6 p-4 border rounded-md bg-muted">
          <p className="text-sm text-muted-foreground">Total Revenue</p>
          <p className="text-2xl font-bold text-emerald-600">
            ₹{revenue.totalRevenue}
          </p>
        </div>
      )}

      {/* ===== TABLE ===== */}
      {data.length > 0 && (
        <div className="overflow-x-auto border rounded-md">
          <table className="w-full text-sm">
            <thead className="bg-muted">
              <tr>
                {Object.keys(data[0]).map((key) => (
                  <th key={key} className="px-4 py-2 text-left capitalize">
                    {key}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, i) => (
                <tr key={i} className="border-t">
                  {Object.values(row).map((val, j) => (
                    <td key={j} className="px-4 py-2">
                      {String(val)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Payments;
