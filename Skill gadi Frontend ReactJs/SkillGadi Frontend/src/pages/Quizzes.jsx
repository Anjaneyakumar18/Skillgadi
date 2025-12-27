import React, { useEffect, useState } from "react";
import QuizIntro from "./Quizzes/QuizIntro";
import QuizNavCards from "./Quizzes/QuizNavCards";
import EnrolledQuizzesPlaceholder from "./Quizzes/EnrolledQuizzesPlaceholder";

const BASE_API = "http://localhost:9000";

const Quizzes = () => {
  const [enrolledUpcoming, setEnrolledUpcoming] = useState([]);
  const [enrolledLive, setEnrolledLive] = useState([]);
  const [enrolledCompleted, setEnrolledCompleted] = useState([]);
  const [loading, setLoading] = useState(true);

  // TEMP: hardcoded userId (JWT phase-2 will remove this)
  const userId = 1;

  const token = localStorage.getItem("token");

  const authHeader = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [up, live, completed] = await Promise.all([
          fetch(
            `${BASE_API}/quiz/enrolled/upcoming?userId=${userId}`,
            { headers: authHeader }
          ).then((r) => r.json()),

          fetch(
            `${BASE_API}/quiz/enrolled/live?userId=${userId}`,
            { headers: authHeader }
          ).then((r) => r.json()),

          fetch(
            `${BASE_API}/quiz/enrolled/completed?userId=${userId}`,
            { headers: authHeader }
          ).then((r) => r.json()),
        ]);

        setEnrolledUpcoming(up || []);
        setEnrolledLive(live || []);
        setEnrolledCompleted(completed || []);
      } catch (err) {
        console.error("Failed to load enrolled quizzes", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  return (
    <>
      <QuizIntro />

      {/* ================= Enrolled Quizzes ================= */}
      <div className="mb-10">
        <h2 className="text-2xl font-display font-bold mb-4">
          Your Enrolled Quizzes
        </h2>

        {loading && (
          <p className="text-muted-foreground">Loading quizzes...</p>
        )}

        {!loading &&
          enrolledUpcoming.length === 0 &&
          enrolledLive.length === 0 &&
          enrolledCompleted.length === 0 && (
            <EnrolledQuizzesPlaceholder />
          )}

        {/* -------- LIVE -------- */}
        {enrolledLive.length > 0 && (
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Live</h3>
            {enrolledLive.map((q) => (
              <div
                key={q.quizId}
                className="p-4 mb-2 rounded-xl border bg-card"
              >
                <div className="font-medium">{q.quizName}</div>
                <div className="text-sm text-muted-foreground">
                  {q.numberOfQuestions} questions • ₹{q.price}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* -------- UPCOMING -------- */}
        {enrolledUpcoming.length > 0 && (
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Upcoming</h3>
            {enrolledUpcoming.map((q) => (
              <div
                key={q.quizId}
                className="p-4 mb-2 rounded-xl border bg-card"
              >
                <div className="font-medium">{q.quizName}</div>
                <div className="text-sm text-muted-foreground">
                  Starts at {new Date(q.startTime).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* -------- COMPLETED -------- */}
        {enrolledCompleted.length > 0 && (
          <div>
            <h3 className="font-semibold mb-2">Completed</h3>
            {enrolledCompleted.map((q) => (
              <div
                key={q.quizId}
                className="p-4 mb-2 rounded-xl border bg-card opacity-70"
              >
                <div className="font-medium">{q.quizName}</div>
                <div className="text-sm text-muted-foreground">
                  Completed
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <QuizNavCards />
    </>
  );
};

export default Quizzes;