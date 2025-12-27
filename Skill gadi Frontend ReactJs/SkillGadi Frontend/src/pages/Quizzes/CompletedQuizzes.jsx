import React, { useEffect, useState } from "react";
import BASE_API from "../../BaseApi";
const CompletedQuizzes = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch(`${BASE_API}/quiz/completed`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setQuizzes(data || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p className="text-muted-foreground">Loading completed quizzes...</p>;
  }

  if (quizzes.length === 0) {
    return <p className="text-muted-foreground">No completed quizzes</p>;
  }

  return (
    <div className="space-y-4">
      {quizzes.map((q) => (
        <div
          key={q.quizId}
          className="p-4 rounded-xl border bg-card opacity-70"
        >
          <h3 className="font-semibold">{q.quizName}</h3>
          <p className="text-sm text-muted-foreground">
            Quiz completed
          </p>
        </div>
      ))}
    </div>
  );
};

export default CompletedQuizzes;