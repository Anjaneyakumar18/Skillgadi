import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BASE_API from "../../BaseApi";

const url = `${BASE_API}/admin/quiz/add`;

const AddQuiz = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    quizName: "",
    difficultyLevel: "EASY",
    numberOfQuestions: "",
    price: "",
    startTime: "",
    endTime: "",
  });

  /* ===== JWT ===== */
  const token = localStorage.getItem("token");

  /* ===== ROUTE GUARD ===== */
  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        ...form,
        numberOfQuestions: Number(form.numberOfQuestions),
        price: Number(form.price),
        isActive: true,
      }),
    });

    if (res.ok) {
      navigate("/admin/manage-quizzes");
    } else {
      alert("Failed to add quiz");
    }
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-2xl mx-auto bg-card p-8 rounded-2xl border border-border/50">
        <h1 className="text-3xl font-display font-bold mb-6">
          Add New Quiz
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            name="quizName"
            placeholder="Quiz Name"
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-xl border border-border bg-background"
          />

          <select
            name="difficultyLevel"
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-border bg-background"
          >
            <option value="EASY">Easy</option>
            <option value="MEDIUM">Medium</option>
            <option value="HARD">Hard</option>
          </select>

          <input
            name="numberOfQuestions"
            type="number"
            placeholder="Number of Questions"
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-xl border border-border bg-background"
          />

          <input
            name="price"
            type="number"
            placeholder="Price"
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-border bg-background"
          />

          <div className="grid grid-cols-2 gap-4">
            <input
              name="startTime"
              type="datetime-local"
              onChange={handleChange}
              className="px-4 py-3 rounded-xl border border-border bg-background"
            />
            <input
              name="endTime"
              type="datetime-local"
              onChange={handleChange}
              className="px-4 py-3 rounded-xl border border-border bg-background"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 gradient-primary text-primary-foreground rounded-xl font-semibold"
          >
            Create Quiz
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddQuiz;
