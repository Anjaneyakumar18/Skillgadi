import { useState } from "react";
import { CheckCircle, Users } from "lucide-react";
import BASE_API from "../BaseApi";

const UpcomingQuizzes = ({ quizzes, onApproved }) => {
  const [loadingId, setLoadingId] = useState(null);
  const [enrolledCount, setEnrolledCount] = useState({});

  /* ===== FETCH ENROLLED COUNT (LAZY) ===== */
const fetchEnrolled = async (quizId) => {
  if (enrolledCount[quizId] !== undefined) return;

  setLoadingId(quizId);
  const res = await fetch(
    `${BASE_API}/quiz/enrolled-count?quizId=${quizId}`,{
      Headers:{
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }
    }
  );
  const count = await res.json();

  setEnrolledCount((prev) => ({
    ...prev,
    [quizId]: count,
  }));
  setLoadingId(null);
};

  /* ===== APPROVE QUIZ ===== */
  const approveQuiz = async (quizId) => {
    await fetch(`${BASE_API}/admin/quiz/proceed?quiz_id=${quizId}`,{
      Headers:{
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }
    });
    onApproved();
  };

  if (!quizzes.length) return null;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">
        Upcoming Quizzes (Admin Approval)
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {quizzes.map((q) => (
          <div
            key={q.quizId}
            className="relative bg-card border border-border/50 rounded-2xl p-6"
          >
            {/* ===== ENROLLED COUNT BUTTON ===== */}
            <button
              onClick={() => fetchEnrolled(q.quizId)}
              className="absolute top-3 right-3 flex items-center gap-1
                         text-xs bg-muted px-3 py-1 rounded-full
                         hover:bg-muted/70 transition"
            >
              <Users className="w-4 h-4" />
              {loadingId === q.quizId
                ? "..."
                : enrolledCount[q.quizId] ?? "View"}
            </button>

            <h3 className="text-lg font-semibold mb-1">
              {q.quizName}
            </h3>

            <p className="text-sm text-muted-foreground mb-3">
              {q.difficultyLevel} • {q.numberOfQuestions} Questions
            </p>

            <div className="text-sm space-y-1 mb-4">
              <p>⏰ Start: {q.startTime}</p>
              <p>🏁 End: {q.endTime}</p>
              <p>💰 Price: ₹{q.price}</p>
            </div>

            {/* ===== APPROVAL ===== */}
            {q.proceed === true ? (
              <div className="flex items-center gap-2 text-green-600 font-medium">
                <CheckCircle className="w-5 h-5" />
                Approved
              </div>
            ) : (
              <button
                onClick={() => approveQuiz(q.quizId)}
                className="w-full py-2 bg-primary text-white rounded-xl
                           hover:opacity-90 transition"
              >
                Approve Quiz
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingQuizzes;
