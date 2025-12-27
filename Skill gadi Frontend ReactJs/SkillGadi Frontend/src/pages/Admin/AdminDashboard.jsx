import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Shield,
  LogOut,
  Users,
  BookOpen,
  FileText,
  Code,
  Plus,
  Edit,
  Eye,
  BarChart3,
  Settings,
  Menu,
  X,
  CreditCard,
} from "lucide-react";

import Payments from "../Transactions/Payments";
import ManageQuizzes from "./ManageQuizzes";
import UserManagement from "./UserManagement";
import NotesManagement from "./NotesManagement";
import NotesRevenue from "./NotesRevenue";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showNotesRevenue, setShowNotesRevenue] = useState(false);

  const stats = [
    { label: "Total Users", value: "1,234", icon: Users, color: "bg-primary" },
    { label: "Total Quizzes", value: "56", icon: BookOpen, color: "bg-secondary" },
    { label: "Total Notes", value: "128", icon: FileText, color: "bg-accent" },
    { label: "Code Runs", value: "8,901", icon: Code, color: "bg-destructive" },
  ];

  const tabs = [
    { id: "overview", label: "Overview", icon: BarChart3 },
    { id: "quizzes", label: "Manage Quizzes", icon: BookOpen },
    { id: "payments", label: "Payments", icon: CreditCard },
    { id: "notes", label: "Manage Notes", icon: FileText },
    { id: "users", label: "Users", icon: Users },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const handleLogout = () => {
    localStorage.clear();
    navigate("/admin");
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* ================= SIDEBAR ================= */}
      <aside
        className={`fixed top-0 left-0 h-screen w-64 bg-sidebar border-r
        border-sidebar-border flex flex-col
        transition-transform duration-300 ease-in-out
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-sidebar-border flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-destructive to-accent flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-lg font-bold text-sidebar-foreground">
                Admin
              </span>
              <p className="text-xs text-muted-foreground">Dashboard</p>
            </div>
          </div>

          <button
            onClick={() => setSidebarOpen(false)}
            className="text-muted-foreground"
          >
            <X />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setShowNotesRevenue(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                activeTab === tab.id
                  ? "bg-sidebar-primary text-sidebar-primary-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent"
              }`}
            >
              <tab.icon className="w-5 h-5" />
              {tab.label}
            </button>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-sidebar-border">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl
                       text-destructive hover:bg-destructive/10 transition"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* ================= MAIN ================= */}
      <main
        className={`flex-1 transition-all duration-300
        ${sidebarOpen ? "ml-64" : "ml-0"} h-screen overflow-y-auto p-8`}
      >
        {/* TOP BAR */}
        <div className="flex items-center justify-between mb-6">
          {!sidebarOpen && (
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-lg border bg-card hover:bg-muted"
            >
              <Menu />
            </button>
          )}
          <h1 className="text-xl font-semibold capitalize">
            {activeTab}
          </h1>
        </div>

        {/* ================= OVERVIEW ================= */}
        {activeTab === "overview" && (
          <div className="space-y-10 animate-fade-in">
            <div>
              <h2 className="text-3xl font-bold">Admin Dashboard</h2>
              <p className="text-muted-foreground">
                Manage platform efficiently
              </p>
            </div>

            {/* QUICK ACTIONS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <QuickAction
                title="Add Quiz"
                desc="Create new quiz"
                icon={<Plus />}
                onClick={() => navigate("/admin/add-quiz")}
              />
              <QuickAction
                title="Add Questions"
                desc="Pending quizzes"
                icon={<Edit />}
                onClick={() => setActiveTab("quizzes")}
              />
              <QuickAction
                title="Live Quizzes"
                desc="Running now"
                icon={<Eye />}
                onClick={() => setActiveTab("quizzes")}
              />
              <QuickAction
                title="Users"
                desc="User control"
                icon={<Users />}
                onClick={() => setActiveTab("users")}
              />
            </div>

            {/* STATS */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((s) => (
                <div key={s.label} className="bg-card border rounded-2xl p-6">
                  <div
                    className={`w-12 h-12 rounded-xl ${s.color}
                    flex items-center justify-center mb-4`}
                  >
                    <s.icon className="text-white" />
                  </div>
                  <p className="text-sm text-muted-foreground">{s.label}</p>
                  <p className="text-3xl font-bold">{s.value}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= OTHER TABS ================= */}
        {activeTab === "quizzes" && <ManageQuizzes />}
        {activeTab === "users" && <UserManagement />}
        {activeTab === "payments" && <Payments />}

        {/* ================= NOTES ================= */}
        {activeTab === "notes" && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold">Notes Management</h2>

              <button
                onClick={() => setShowNotesRevenue(!showNotesRevenue)}
                className="px-4 py-2 text-sm rounded-md
                           border border-border
                           hover:bg-muted transition"
              >
                {showNotesRevenue ? "Back to Notes" : "View Notes Revenue"}
              </button>
            </div>

            {showNotesRevenue ? <NotesRevenue /> : <NotesManagement />}
          </div>
        )}

        {activeTab === "settings" && (
          <h2 className="text-3xl font-bold">Settings</h2>
        )}
      </main>
    </div>
  );
};

/* ================= QUICK ACTION ================= */
const QuickAction = ({ title, desc, icon, onClick }) => (
  <button
    onClick={onClick}
    className="bg-card border rounded-2xl p-6
               hover:shadow-lg hover:-translate-y-1 transition text-left"
  >
    <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary
                    flex items-center justify-center mb-4">
      {icon}
    </div>
    <h3 className="font-semibold">{title}</h3>
    <p className="text-sm text-muted-foreground">{desc}</p>
  </button>
);

export default AdminDashboard;
