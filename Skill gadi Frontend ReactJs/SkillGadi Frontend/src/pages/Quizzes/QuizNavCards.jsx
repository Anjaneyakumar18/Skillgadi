import { useNavigate } from "react-router-dom";
import { Radio, Clock, CheckCircle } from "lucide-react";

const cards = [
  {
    title: "Live Quizzes",
    desc: "Attempt quizzes that are live now",
    icon: Radio,
    path: "/quizzes/live"
  },
  {
    title: "Upcoming Quizzes",
    desc: "Register before quiz starts",
    icon: Clock,
    path: "/quizzes/upcoming"
  },
  {
    title: "Completed Quizzes",
    desc: "View past quiz results",
    icon: CheckCircle,
    path: "/quizzes/completed"
  }
];

const QuizNavCards = () => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
      {cards.map((card, i) => (
        <div
          key={i}
          onClick={() => navigate(card.path)}
          className="cursor-pointer bg-card border border-border/50 rounded-2xl p-6 hover:shadow-lg hover:shadow-primary/5 transition-all"
        >
          <card.icon className="w-8 h-8 text-primary mb-4" />
          <h3 className="text-lg font-semibold mb-1">{card.title}</h3>
          <p className="text-sm text-muted-foreground">{card.desc}</p>
        </div>
      ))}
    </div>
  );
};

export default QuizNavCards;
