import { Toaster } from "@/components/ui/toaster.jsx";
import { Toaster as Sonner } from "@/components/ui/sonner.jsx";
import { TooltipProvider } from "@/components/ui/tooltip.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Quizzes from "./pages/Quizzes.jsx";
import Notes from "./pages/Notes.jsx";
import Compiler from "./pages/Compiler.jsx";
import AboutUs from "./pages/AboutUs.jsx";
import ContactUs from "./pages/ContactUs.jsx";
import AdminLogin from "./pages/Admin/AdminLogin.jsx";
import AdminDashboard from "./pages/Admin/AdminDashboard.jsx";
import NotFound from "./pages/NotFound.jsx";
import User from "./pages/User.jsx";
import LemonAI from "./pages/LemonAI";
import PickleAI from "./pages/PickleAI";
import AddQuiz from "./pages/Admin/AddQuiz.jsx";
import AddQuestions from "./pages/Admin/AddQuestions.jsx";
import Profile from "./pages/Profile.jsx";
import LiveQuizzes from "./pages/Quizzes/LiveQuizzes.jsx";
import UpcomingQuizzes from "./pages/Quizzes/UpcomingQuizzes.jsx";
import CompletedQuizzes from "./pages/Quizzes/CompletedQuizzes.jsx";
import Code from "./pages/Coding/Coding.jsx";
import CodeQuestion from "./pages/Coding/CodeQuestion.jsx";
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/quizzes" element={<Quizzes />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/compiler" element={<Compiler />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/user" element={<User />} />
          <Route path="/lemon-ai" element={<LemonAI />} />
          <Route path="/pickle-ai" element={<PickleAI />} />
          <Route path="/admin/add-quiz" element={<AddQuiz />} />
          <Route path="/quizzes/live" element={<LiveQuizzes />} />
          <Route path="/quizzes/upcoming" element={<UpcomingQuizzes />} />
          <Route path="/quizzes/completed" element={<CompletedQuizzes />} />
          <Route path="/admin/add-questions/:quizId" element={<AddQuestions />}/>
          <Route path="/profile" element={<Profile />} />
          <Route path="code" element={<Code />} />
          <Route path="/code/:codeId" element={<CodeQuestion />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
