import { useNavigate } from "react-router-dom";
import { ArrowLeft, Info } from "lucide-react";

const AboutUs = () => {
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
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
              <Info className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-display font-bold">
              About the Project
            </span>
          </div>
        </div>
      </header>

      {/* ================= MAIN ================= */}
      <main className="container mx-auto px-4 py-12">

        {/* ================= PROJECT INTRO ================= */}
        <section className="max-w-4xl mx-auto text-center mb-20 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
            EduSmart
          </h1>

          <p className="text-lg text-muted-foreground leading-relaxed">
            EduSmart is a full-stack smart learning platform designed to bring
            quizzes, notes, coding tools, and real-time interactions into a
            single, scalable system.
            <br /><br />
            This project focuses on clean architecture, real-world backend
            workflows, authentication, email verification, payments, and
            production-ready UI — built with the mindset of industry standards,
            not just a college project.
          </p>

          <div className="mt-8 flex justify-center gap-6 flex-wrap">
            <div className="px-5 py-3 rounded-xl bg-card border border-border/50 text-sm">
              React • Tailwind • Lucide
            </div>
            <div className="px-5 py-3 rounded-xl bg-card border border-border/50 text-sm">
              Spring Boot • Django • REST APIs
            </div>
            <div className="px-5 py-3 rounded-xl bg-card border border-border/50 text-sm">
              MachineLearning • Data Handling With Python • Pandas
            </div>
            <div className="px-5 py-3 rounded-xl bg-card border border-border/50 text-sm">
              MySQL • Payments • Email Automation
            </div>
          </div>
        </section>

        {/* ================= TEAM ================= */}
        <section className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-display font-bold text-center mb-12">
            Meet the Builders
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

            {/* ================= ANJANEYA ================= */}
            <div className="bg-card border border-border/50 rounded-3xl p-8 text-center animate-fade-in">
              
              {/* BIG IMAGE */}
              <div className="flex justify-center mb-6">
                <img
                  src="../public/images/ak2.jpg"
                  alt="R. Anjaneya Kumar"
                  className="w-36 h-36 rounded-full object-cover border-4 border-primary/30
                             shadow-lg hover:scale-105 transition-transform duration-300"
                />
              </div>

              <h3 className="text-xl font-display font-semibold">
                R. Anjaneya Kumar
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Full Stack Developer & Major contribution for Backend
              </p>

              <p className="text-sm leading-relaxed text-muted-foreground">
                Primary architect of EduSmart. Worked extensively on backend
                systems (Spring Boot + Django), authentication, email
                verification, payment integration, database design, mail
                automation and REST APIs.
                <br /><br />
                Strong in Data Structures & Algorithms, SQL, and scalable backend
                design. Focused on writing clean, maintainable, and
                production-ready code.
              </p>

              <div className="mt-6 flex justify-center gap-4 text-sm text-primary">
                <a href="https://www.linkedin.com/in/anjaneya-kumar-ramisetty-8663362b0/" target="_blank">LinkedIn</a>
                <a href="https://github.com/Anjaneyakumar18" target="_blank">GitHub</a>
                <a href="https://leetcode.com/u/anjaneyakumar1804/" target="_blank">LeetCode</a>
                <a href="https://anjaneya-s-portfolio-main.vercel.app/" target="_blank">Portfolio</a>
              </div>
            </div>

            {/* ================= ASHOK ================= */}
            <div className="bg-card border border-border/50 rounded-3xl p-8 text-center animate-fade-in">
              
              {/* BIG IMAGE */}
              <div className="flex justify-center mb-6">
                <img
                  src="../public/images/ashok1.jpg"
                  alt="Ashok Nimmala"
                  className="w-36 h-36 rounded-full object-cover border-4 border-secondary/30
                             shadow-lg hover:scale-105 transition-transform duration-300"
                />
              </div>

              <h3 className="text-xl font-display font-semibold">
                Ashok Nimmala
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Frontend Developer & Deployment
              </p>

              <p className="text-sm leading-relaxed text-muted-foreground">
                Responsible for frontend development, UI integration, and
                deployment workflows. Ensured smooth user experience and
                reliable hosting of the application.
                <br /><br />
                Played a key role in optimizing builds, managing deployments,
                and integrating frontend features with backend services.
              </p>

              <div className="mt-6 flex justify-center gap-4 text-sm text-primary">
                <a href="https://www.linkedin.com/in/ashok-nimmala-542116282?originalSubdomain=in" target="_blank">LinkedIn</a>
                <a href="https://github.com/ashok-nimmala478" target="_blank">GitHub</a>
                <a href="https://www.instagram.com/leetcodewithashok/" target="_blank">
                  Ig-LeetcodeWithAshok
                </a>
              </div>
            </div>

            {/* ================= SHIVA SAI ================= */}
          </div>
          <div>
          <div className="bg-card border border-border/50 rounded-3xl p-8 text-center animate-fade-in">
              
              {/* BIG IMAGE */}
              <div className="flex justify-center mb-6">
                <img
                  src="../public/images/sai1.jpg"
                  alt="Y. Shiva Sai"
                  className="w-36 h-36 rounded-full object-cover border-4 border-secondary/30
                             shadow-lg hover:scale-105 transition-transform duration-300"
                />
              </div>

              <h3 className="text-xl font-display font-semibold">
                Y. Shiva Sai
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Frontend Developer
              </p>

              <p className="text-sm leading-relaxed text-muted-foreground">
                Responsible for frontend development and UI integration. Ensured smooth user experience and
                reliable hosting of the application.
                <br /><br />
                Played a key role in optimizing builds, managing deployments,
                and integrating frontend features with backend services.
              </p>

              <div className="mt-6 flex justify-center gap-4 text-sm text-primary">
                <a href="https://www.linkedin.com/in/shiva-sai-yannakula-aa5b83301?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank">LinkedIn</a>
                <a href="https://github.com/yannakulashivasai" target="_blank">GitHub</a>
                <a href="https://yannakulashivasai.github.io/portfolio-/" target="_blank">
                  PortFolio
                </a>
              </div>
            </div>
            </div>

          
        </section>

        {/* ================= FOOTER NOTE ================= */}
        <div className="mt-20 text-center text-sm text-muted-foreground animate-fade-in">
          Built with real-world engineering practices, not templates.
        </div>

      </main>
    </div>
  );
};

export default AboutUs;
