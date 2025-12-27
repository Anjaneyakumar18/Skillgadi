import React, { useEffect, useState } from "react";

import BASE_API from "../../BaseApi";
const UpcomingQuizzes = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch(`${BASE_API}/admin/quiz/upcoming`, {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`
  }
})
      .then((res) => res.json())
      .then((data) => setQuizzes(data || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p className="text-muted-foreground">Loading upcoming quizzes...</p>;
  }

  if (quizzes.length === 0) {
    return <p className="text-muted-foreground">No upcoming quizzes</p>;
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
            Starts at {new Date(q.startTime).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
};

export default UpcomingQuizzes;