import { Trophy, ClipboardList, PlayCircle } from "lucide-react";

const steps = [
  {
    icon: ClipboardList,
    title: "Register",
    desc: "Enroll in quizzes with a single click"
  },
  {
    icon: PlayCircle,
    title: "Take Test",
    desc: "Attempt quizzes within the time limit"
  },
  {
    icon: Trophy,
    title: "Win Rewards",
    desc: "Earn rewards & climb the leaderboard"
  }
];

const QuizIntro = () => {
  return (
    <div className="bg-card border border-border/50 rounded-2xl p-6 mb-10">
      <h2 className="text-2xl font-display font-bold mb-6">
        How It Works
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {steps.map((step, i) => (
          <div
            key={i}
            className="flex flex-col items-center text-center p-4 rounded-xl bg-muted/40"
          >
            <step.icon className="w-8 h-8 text-primary mb-3" />
            <h3 className="font-semibold mb-1">{step.title}</h3>
            <p className="text-sm text-muted-foreground">{step.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuizIntro;
