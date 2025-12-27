import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, FileText, Download, Eye, Search } from "lucide-react";
import BASE_URL from "../BaseApi";

const Notes = () => {
  const navigate = useNavigate();

  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingId, setLoadingId] = useState(null);
  const [search, setSearch] = useState("");
  const [rzpReady, setRzpReady] = useState(false);

  const TOKEN = localStorage.getItem("token");
  const EMAIL = localStorage.getItem("email");
  const RAZORPAY_KEY = "rzp_test_RvPrgCkZtOOwl2";

  /* ===============================
     LOAD RAZORPAY SDK (SAFE)
     =============================== */
  useEffect(() => {
    if (window.Razorpay) {
      setRzpReady(true);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => setRzpReady(true);
    script.onerror = () => alert("Failed to load Razorpay SDK");
    document.body.appendChild(script);
  }, []);

  /* ===============================
     FETCH NOTES
     =============================== */
  useEffect(() => {
    fetch(`${BASE_URL}/api/notes/recent`, {
      headers: { Authorization: `Bearer ${TOKEN}` },
    })
      .then((res) => res.json())
      .then(setNotes)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  /* ===============================
     SEARCH NOTES
     =============================== */
  const searchNotes = async () => {
    if (!search.trim()) return;

    setLoading(true);
    const res = await fetch(
      `${BASE_URL}/api/notes/search?keyword=${search}`,
      { headers: { Authorization: `Bearer ${TOKEN}` } }
    );

    const data = await res.json();
    setNotes(data || []);
    setLoading(false);
  };

  /* ===============================
     BUY NOTES
     =============================== */
  const buyNotes = async (note) => {
    if (!rzpReady) {
      alert("Payment system loading, try again");
      return;
    }

    try {
      setLoadingId(note.noteId);

      /* 1️⃣ CREATE ORDER */
      const orderRes = await fetch(
        `${BASE_URL}/api/payments/create-order`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${TOKEN}`,
          },
          body: JSON.stringify({
            noteId: note.noteId,
            amount: note.price
          }),
        }
      );

      const orderText = await orderRes.text();
      if (!orderRes.ok) throw new Error(orderText || "Order failed");

      const order = JSON.parse(orderText);

      /* 2️⃣ OPEN RAZORPAY */
      const options = {
        key: RAZORPAY_KEY,
        amount: order.amount, // already in paise
        currency: "INR",
        name: "SkillGadi",
        description: note.title,
        order_id: order.id,

        handler: async function (response) {
          const verifyRes = await fetch(
            `${BASE_URL}/api/payments/verify`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${TOKEN}`,
              },
              body: JSON.stringify({
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
                email: EMAIL,
                notes: note.title,
                amount: note.price,
                mail: true,
              }),
            }
          );

          const msg = await verifyRes.text();
          alert(msg);
        },

        theme: { color: "#2563eb" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (err) {
      alert(err.message || "Payment failed");
    } finally {
      setLoadingId(null);
    }
  };

  /* ===============================
     UI
     =============================== */
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b bg-white p-4 flex gap-4">
        <button onClick={() => navigate("/dashboard")}>
          <ArrowLeft />
        </button>
        <FileText />
        <h2 className="text-xl font-bold">Notes</h2>
      </header>

      <div className="max-w-5xl mx-auto p-6 flex gap-3">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search notes..."
          className="flex-1 border rounded px-4 py-2"
        />
        <button
          onClick={searchNotes}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          <Search size={16} />
        </button>
      </div>

      <main className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6 p-6">
        {loading ? (
          <p>Loading...</p>
        ) : notes.length === 0 ? (
          <p>No notes found</p>
        ) : (
          notes.map((note) => (
            <div key={note.noteId} className="bg-white p-5 rounded shadow">
              <h3 className="font-semibold">{note.title}</h3>
              <p className="text-sm text-gray-600 mt-2">{note.description}</p>

              <div className="flex gap-3 mt-4">
                <button className="flex-1 border py-2 rounded">
                  <Eye size={16} /> Preview
                </button>

                <button
                  disabled={loadingId === note.noteId}
                  onClick={() => buyNotes(note)}
                  className="flex-1 bg-blue-600 text-white py-2 rounded"
                >
                  <Download size={16} />
                  {loadingId === note.noteId ? "Processing..." : `Buy ₹${note.price}`}
                </button>
              </div>
            </div>
          ))
        )}
      </main>
    </div>
  );
};

export default Notes;
