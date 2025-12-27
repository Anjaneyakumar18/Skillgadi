import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Shield, Eye, EyeOff, Lock, Mail } from "lucide-react";
import BASE_API from "../../BaseApi";

const url = `${BASE_API}/auth/admin`;

const AdminLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,          // ✅ MUST BE email
          passwordHash: formData.password // ✅ MUST BE passwordHash
        }),
      });

      if (!res.ok) {
        setError("Invalid admin credentials");
        setLoading(false);
        return;
      }

      const data = await res.json();
      // Expected response: { token, username, role }

      // ✅ STORE JWT
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);
      localStorage.setItem("username", data.username);

      navigate("/admin/dashboard");
    } catch (err) {
      setError("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center gradient-dark p-4">
      <div className="relative w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-destructive to-accent mb-4 shadow-lg">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-primary-foreground">
            Admin Portal
          </h1>
          <p className="text-muted-foreground mt-2">
            Authorized personnel only
          </p>
        </div>

        <div className="glass rounded-3xl p-8 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-5">

            {error && (
              <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-xl text-destructive text-sm text-center">
                {error}
              </div>
            )}

            {/* EMAIL */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Admin Email
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter admin email"
                  className="w-full pl-12 pr-4 py-3 bg-background/50 border border-border rounded-xl focus:ring-2 focus:ring-destructive/50"
                />
              </div>
            </div>

            {/* PASSWORD */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter password"
                  className="w-full pl-12 pr-12 py-3 bg-background/50 border border-border rounded-xl focus:ring-2 focus:ring-destructive/50"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>
            </div>

            {/* SUBMIT */}
            <button
              disabled={loading}
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-destructive to-accent text-white font-semibold rounded-xl shadow-lg hover:scale-[1.02] transition"
            >
              {loading ? "Checking..." : "Access Dashboard"}
            </button>
          </form>

          <p className="mt-6 text-center text-xs text-muted-foreground">
            Restricted admin access only.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
