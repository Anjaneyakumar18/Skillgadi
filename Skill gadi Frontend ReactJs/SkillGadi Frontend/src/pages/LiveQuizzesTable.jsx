const LiveQuizzesTable = ({ quizzes }) => {
  /* ===== JWT CHECK ===== */
  const token = localStorage.getItem("token");

  // Not authenticated → render nothing
  if (!token) return null;

  if (!quizzes || !quizzes.length) return null;

  return (
    <div className="bg-card border border-border/50 rounded-2xl p-6">
      <h2 className="text-xl font-bold mb-4">Live Quizzes</h2>

      <table className="w-full">
        <thead className="bg-muted/50">
          <tr>
            <th className="px-4 py-3">Quiz</th>
            <th className="px-4 py-3">Start</th>
            <th className="px-4 py-3">End</th>
          </tr>
        </thead>
        <tbody>
          {quizzes.map((q) => (
            <tr key={q.quizId} className="border-t">
              <td className="px-4 py-3">{q.quizName}</td>
              <td className="px-4 py-3">{q.startTime}</td>
              <td className="px-4 py-3">{q.endTime}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LiveQuizzesTable;
