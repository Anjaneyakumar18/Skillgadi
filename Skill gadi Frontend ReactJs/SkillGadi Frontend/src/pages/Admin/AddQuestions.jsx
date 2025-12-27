import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BASE_API from "../../BaseApi";

const AddQuestions = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [quiz, setQuiz] = useState(null);
  const [questions, setQuestions] = useState([]);

  // ================= FETCH QUIZ =================
  useEffect(() => {
    fetch(`${BASE_API}/admin/quiz/${quizId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((data) => {
        setQuiz(data);

        setQuestions(
          Array.from({ length: data.numberOfQuestions }, () => ({
            questionText: "",
            optiona: "",
            optionb: "",
            optionc: "",
            optiond: "",
            correctOption: "A",
          }))
        );
      });
  }, [quizId]);

  // ================= UPDATE QUESTION =================
  const update = (index, field, value) => {
    const copy = [...questions];
    copy[index][field] = value;
    setQuestions(copy);
  };

  // ================= SUBMIT =================
  const submit = async () => {
    // 🔒 Validation
    for (let q of questions) {
      if (
        !q.questionText ||
        !q.optiona ||
        !q.optionb ||
        !q.optionc ||
        !q.optiond
      ) {
        alert("Fill all fields for every question");
        return;
      }
    }

    await fetch(`${BASE_API}/admin/quiz/${quizId}/add-questions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(questions),
    });

    navigate("/admin/dashboard");
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">
        Add Questions — {quiz?.quizName}
      </h1>

      {questions.map((q, i) => (
        <div
          key={i}
          className="mb-6 p-4 border rounded-lg bg-white"
        >
          <h2 className="font-semibold mb-2">
            Question {i + 1}
          </h2>

          <input
            placeholder="Question text"
            value={q.questionText}
            onChange={(e) =>
              update(i, "questionText", e.target.value)
            }
            className="block w-full mb-2 border p-2"
          />

          <input
            placeholder="Option A"
            value={q.optiona}
            onChange={(e) =>
              update(i, "optiona", e.target.value)
            }
            className="block w-full mb-2 border p-2"
          />

          <input
            placeholder="Option B"
            value={q.optionb}
            onChange={(e) =>
              update(i, "optionb", e.target.value)
            }
            className="block w-full mb-2 border p-2"
          />

          <input
            placeholder="Option C"
            value={q.optionc}
            onChange={(e) =>
              update(i, "optionc", e.target.value)
            }
            className="block w-full mb-2 border p-2"
          />

          <input
            placeholder="Option D"
            value={q.optiond}
            onChange={(e) =>
              update(i, "optiond", e.target.value)
            }
            className="block w-full mb-3 border p-2"
          />

          <select
            value={q.correctOption}
            onChange={(e) =>
              update(i, "correctOption", e.target.value)
            }
            className="border p-2"
          >
            <option value="A">Correct: A</option>
            <option value="B">Correct: B</option>
            <option value="C">Correct: C</option>
            <option value="D">Correct: D</option>
          </select>
        </div>
      ))}

      <button
        onClick={submit}
        className="px-6 py-3 bg-indigo-600 text-white rounded"
      >
        Save All Questions
      </button>
    </div>
  );
};

export default AddQuestions;
