import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BASE_API from "../../BaseApi";

const ManageQuizzes = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const [upcoming, setUpcoming] = useState([]);
  const [live, setLive] = useState([]);
  const [noQ, setNoQ] = useState([]);
  const [loading, setLoading] = useState(true);

  const headers = { Authorization: `Bearer ${token}` };

  const load = async () => {
    setLoading(true);
    const [u, l, n] = await Promise.all([
      fetch(`${BASE_API}/admin/quiz/up-comming`, { headers }).then(r => r.json()),
      fetch(`${BASE_API}/admin/quiz/live`, { headers }).then(r => r.json()),
      fetch(`${BASE_API}/admin/quiz/without-questions`, { headers }).then(r => r.json())
    ]);
    setUpcoming(u || []);
    setLive(l || []);
    setNoQ(n || []);
    setLoading(false);
  };

  const proceed = async (id) => {
    await fetch(`${BASE_API}/admin/quiz/proceed?quiz_id=${id}`, {
      method: "POST",
      headers
    });
    load();
  };

  useEffect(() => {
    if (!token) navigate("/");
    load();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-8 space-y-8">

      <h1 className="text-3xl font-bold">Manage Quizzes</h1>

      <Section title="No Questions">
        {noQ.map(q => (
          <Card
            key={q.quizId}
            title={q.quizName}
            subtitle="Click to add questions"
            onClick={() => navigate(`/admin/add-questions/${q.quizId}`)}
          />
        ))}
      </Section>

      <Section title="Upcoming">
        {upcoming.map(q => (
          <Card
            key={q.quizId}
            title={q.quizName}
            subtitle={q.proceed ? "Already started" : "Click to start"}
            disabled={q.proceed}
            onClick={() => !q.proceed && proceed(q.quizId)}
          />
        ))}
      </Section>

      <Section title="Live">
        {live.map(q => (
          <Card
            key={q.quizId}
            title={q.quizName}
            subtitle="Click to end quiz"
            onClick={() => proceed(q.quizId)}
          />
        ))}
      </Section>

    </div>
  );
};

const Section = ({ title, children }) => (
  <div>
    <h2 className="text-xl font-semibold mb-4">{title}</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">{children}</div>
  </div>
);

const Card = ({ title, subtitle, onClick, disabled }) => (
  <div
    onClick={!disabled ? onClick : undefined}
    className={`p-6 border rounded-xl cursor-pointer
      ${disabled ? "opacity-50 cursor-not-allowed" : "hover:shadow-lg"}`}
  >
    <h3 className="font-semibold">{title}</h3>
    <p className="text-sm text-muted-foreground">{subtitle}</p>
  </div>
);

export default ManageQuizzes;
