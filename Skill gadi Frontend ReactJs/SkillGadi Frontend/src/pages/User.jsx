import { useLocation, useNavigate } from "react-router-dom";
import { UserCircle, ArrowLeft, Mail } from "lucide-react";

const User = () => {
  const navigate = useNavigate();
  const location = useLocation();

  /* ===== JWT ===== */
  const token = localStorage.getItem("token");

  // Not authenticated → redirect
  if (!token) {
    navigate("/");
    return null;
  }

  const { username, email } = location.state || {
    username: localStorage.getItem("username") || "User",
    email: localStorage.getItem("email") || "user@email.com",
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md glass rounded-3xl p-8 shadow-2xl">

        {/* Back */}
        <button
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-2 text-sm text-muted-foreground mb-6 hover:text-primary transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </button>

        {/* Avatar */}
        <div className="flex flex-col items-center text-center">
          <UserCircle className="w-20 h-20 text-primary mb-4" />
          <h1 className="text-2xl font-display font-bold">
            {username}
          </h1>
          <p className="text-muted-foreground flex items-center gap-2 mt-2">
            <Mail className="w-4 h-4" />
            {email}
          </p>
        </div>

        {/* Info Card */}
        <div className="mt-8 space-y-4">
          <div className="p-4 rounded-xl bg-card border border-border/50">
            <p className="text-sm text-muted-foreground">Username</p>
            <p className="font-medium">{username}</p>
          </div>

          <div className="p-4 rounded-xl bg-card border border-border/50">
            <p className="text-sm text-muted-foreground">Email</p>
            <p className="font-medium">{email}</p>
          </div>
        </div>

        {/* Placeholder */}
        <div className="mt-6 text-center text-sm text-muted-foreground">
          🚧 More profile features coming soon
        </div>
      </div>
    </div>
  );
};

export default User;
