import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Mail,
  Github,
  Linkedin,
  Instagram,
  Globe,
  MessageSquare,
} from "lucide-react";

const ContactUs = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* ================= HEADER ================= */}
      <header className="sticky top-0 z-50 glass border-b border-border/50">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <button
            onClick={() => navigate("/dashboard")}
            className="p-2 rounded-xl hover:bg-muted transition"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl gradient-secondary flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-secondary-foreground" />
            </div>
            <span className="text-xl font-display font-bold">Contact Us</span>
          </div>
        </div>
      </header>

      {/* ================= MAIN ================= */}
      <main className="container mx-auto px-4 py-14">
        <div className="max-w-4xl mx-auto">

          {/* ================= INTRO ================= */}
          <div className="text-center mb-14 animate-fade-in">
            <h1 className="text-4xl font-display font-bold mb-4">
              Let’s Connect
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl mx-auto">
              Have questions, ideas, or collaboration requests?  
              EduSmart is built by developers, for learners — feel free to reach
              out through any of the channels below.
            </p>
          </div>

          {/* ================= EMAILS ================= */}
          <section className="mb-14 animate-fade-in">
            <h2 className="text-2xl font-display font-semibold mb-6 text-center">
              Official Contact Emails
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  label: "Primary Website Email",
                  email: "skillgadi@gmail.com",
                },
                {
                  label: "Full Stack Developer",
                  email: "anjaneyakumar1804@gmail.com",
                },
                {
                  label: "Frontend Developer",
                  email: "shivasaiyannakula@gmail.com",
                },
                {
                  label: "Frontend Developer",
                  email: "ghft645@gmail.com",
                },
              ].map((item) => (
                <div
                  key={item.email}
                  className="flex items-center gap-4 bg-card border border-border/50 rounded-2xl p-5"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {item.label}
                    </p>
                    <p className="font-medium">{item.email}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ================= SOCIAL LINKS ================= */}
          <section className="mb-14 animate-fade-in">
            <h2 className="text-2xl font-display font-semibold mb-6 text-center">
              Follow & Connect
            </h2>

            <div className="flex flex-wrap justify-center gap-6">
              <a
                href="https://github.com/Anjaneyakumar18"
                target="_blank"
                className="flex items-center gap-3 px-6 py-4 bg-card border border-border/50 rounded-2xl hover:shadow-lg transition"
              >
                <Github className="w-6 h-6" />
                <span>GitHub</span>
              </a>

              <a
                href="https://www.linkedin.com/in/anjaneya-kumar-ramisetty-8663362b0/"
                target="_blank"
                className="flex items-center gap-3 px-6 py-4 bg-card border border-border/50 rounded-2xl hover:shadow-lg transition"
              >
                <Linkedin className="w-6 h-6 text-blue-600" />
                <span>LinkedIn</span>
              </a>

              <a
                href="https://www.instagram.com/leetcodewithashok/"
                target="_blank"
                className="flex items-center gap-3 px-6 py-4 bg-card border border-border/50 rounded-2xl hover:shadow-lg transition"
              >
                <Instagram className="w-6 h-6 text-pink-500" />
                <span>Instagram</span>
              </a>

              <div className="flex items-center gap-3 px-6 py-4 bg-card border border-border/50 rounded-2xl">
                <Globe className="w-6 h-6 text-green-600" />
                <span>EduSmart / SkillGadi</span>
              </div>
            </div>
          </section>

          {/* ================= FOOTER NOTE ================= */}
          <div className="text-center text-sm text-muted-foreground animate-fade-in">
            We usually respond within 24–48 hours.  
            Thanks for supporting independent developers 🚀
          </div>

        </div>
      </main>
    </div>
  );
};

export default ContactUs;
