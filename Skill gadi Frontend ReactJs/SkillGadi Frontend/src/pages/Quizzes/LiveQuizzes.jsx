import React, { useEffect, useState } from "react";

const BASE_API = "http://localhost:9000";

const LiveQuizzes = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch(`${BASE_API}/quiz/live`, {
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
    return <p className="text-muted-foreground">Loading live quizzes...</p>;
  }

  if (quizzes.length === 0) {
    return <p className="text-muted-foreground">No live quizzes</p>;
  }

  return (
    <div className="space-y-4">
      {quizzes.map((q) => (
        <div
          key={q.quizId}
          className="p-4 rounded-xl border bg-card"
        >
          <h3 className="font-semibold">{q.quizName}</h3>
          <p className="text-sm text-muted-foreground">
            Ends at {new Date(q.endTime).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
};

export default LiveQuizzes;