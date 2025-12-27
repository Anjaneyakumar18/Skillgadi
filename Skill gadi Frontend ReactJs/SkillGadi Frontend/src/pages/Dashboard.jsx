import { useNavigate, useLocation } from "react-router-dom";
import {
  GraduationCap,
  BookOpen,
  FileText,
  Code,
  Users,
  MessageSquare,
  LogOut,
  ChevronRight,
  UserCircle,
} from "lucide-react";
import { useState } from "react";


const featureCards = [
  {
  title: "LemonAI",
  description: "Ask questions powered by OpenAI",
  image: "../public/images/lemonai.jpg", // ✅ dummy image
  path: "/lemon-ai",
  gradient: "from-yellow-400 to-amber-500",
  delay: "0.5s",
},
{
  title: "PickleAI",
  description: "Chat with your custom trained model",
  image: "../public/images/pickleai.jpg", // ✅ dummy image
  path: "/pickle-ai",
  gradient: "from-green-500 to-emerald-600",
  delay: "0.6s",
},
{
  title: "Practice Coding",
  description: "Solve coding problems with multiple difficulty levels",
  icon: Code,
  path: "/code",
  gradient: "from-indigo-500 to-violet-600",
  delay: "0.25s",
},


  {
    title: "Quizzes",
    description: "Test your knowledge with interactive quizzes",
    icon: BookOpen,
    path: "/quizzes",
    gradient: "from-primary to-accent",
    delay: "0s",
  },
  {
    title: "Notes",
    description: "Access study materials and notes",
    icon: FileText,
    path: "/notes",
    gradient: "from-secondary to-primary",
    delay: "0.1s",
  },
  {
    title: "Compiler",
    description: "Write and run code online",
    icon: Code,
    path: "/compiler",
    gradient: "from-accent to-destructive",
    delay: "0.2s",
  },
  {
    title: "About Us",
    description: "Learn more about our platform",
    icon: Users,
    path: "/about",
    gradient: "from-primary/80 to-secondary",
    delay: "0.3s",
  },
  {
    title: "Contact Us",
    description: "Get in touch with our team",
    icon: MessageSquare,
    path: "/contact",
    gradient: "from-secondary to-accent",
    delay: "0.4s",
  },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ safely read state from login
  const { username = "User", email = "user@email.com" } =
    location.state || {};

  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  localStorage.removeItem("username");
  navigate("/");
};

  const goToProfile = () => {
    setMenuOpen(false);
    navigate("/profile", 
      
    );
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* ================= HEADER ================= */}
      <header className="sticky top-0 z-50 glass border-b border-border/50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-display font-bold">
              EduSmart
            </span>
          </div>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-muted/30 transition"
            >
              <UserCircle className="w-8 h-8 text-primary" />
              <span className="hidden sm:inline font-medium">
                {username}
              </span>
            </button>

            {menuOpen && (
              <div className="absolute right-0 mt-2 w-44 rounded-xl glass border border-border/50 shadow-lg overflow-hidden animate-scale-in">
                <button
                  onClick={goToProfile}
                  className="w-full px-4 py-3 text-sm text-left hover:bg-muted/30 transition"
                >
                  👤 Profile
                </button>

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 px-4 py-3 text-sm hover:bg-destructive/10 text-destructive transition"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* ================= MAIN ================= */}
      <main className="flex-1 container mx-auto px-4 py-10">
        {/* Welcome */}
        <div className="text-center mb-14 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Welcome back, {username} 👋
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Continue your learning journey with smart tools built for you
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {featureCards.map((card) => (
            <div
              key={card.title}
              onClick={() => navigate(card.path)}
              className="group relative overflow-hidden rounded-2xl bg-card border border-border/50 p-6 cursor-pointer
                         hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1
                         transition-all duration-500 animate-fade-in"
              style={{ animationDelay: card.delay }}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${card.gradient}
                            opacity-0 group-hover:opacity-5 transition`}
              />

              <div
  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${card.gradient}
              flex items-center justify-center mb-4 overflow-hidden`}
>
  {card.image ? (
    <img
      src={card.image}
      alt={card.title}
      className="w-8 h-8 object-contain"
    />
  ) : (
    <card.icon className="w-7 h-7 text-white" />
  )}
</div>


              <h3 className="text-xl font-display font-semibold mb-2">
                {card.title}
              </h3>

              <p className="text-sm text-muted-foreground mb-4">
                {card.description}
              </p>

              <div className="flex items-center text-primary font-medium text-sm">
                Explore
                <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* ================= FOOTER ================= */}
      <footer className="border-t border-border/50 bg-background/60 backdrop-blur">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
          <p className="mb-1">
            🚧 <span className="font-medium">Coming Soon</span> — analytics, achievements & rewards
          </p>
          <p className="opacity-70">
            © {new Date().getFullYear()} EduSmart. Built for learners.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
