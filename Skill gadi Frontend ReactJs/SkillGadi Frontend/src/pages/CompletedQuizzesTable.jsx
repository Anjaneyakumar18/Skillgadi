const CompletedQuizzesTable = ({ quizzes }) => {
  /* ===== JWT CHECK ===== */
  const token = localStorage.getItem("token");

  // If user is not authenticated, do not render anything
  if (!token) return null;

  if (!quizzes || !quizzes.length) return null;

  return (
    <div className="bg-card border border-border/50 rounded-2xl p-6">
      <h2 className="text-xl font-bold mb-4">Completed Quizzes</h2>

      <table className="w-full">
        <thead className="bg-muted/50">
          <tr>
            <th className="px-4 py-3">Quiz</th>
            <th className="px-4 py-3">Ended At</th>
          </tr>
        </thead>
        <tbody>
          {quizzes.map((q) => (
            <tr key={q.quizId} className="border-t">
              <td className="px-4 py-3">{q.quizName}</td>
              <td className="px-4 py-3">{q.endTime}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CompletedQuizzesTable;
