import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  GraduationCap,
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  CheckCircle,
  XCircle,
  Info,
} from "lucide-react";
import BASE_API from "../BaseApi";

const Login = () => {
  const navigate = useNavigate();

  const [mode, setMode] = useState("login"); // login | register | forgot
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  /* ===== OTP ===== */
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otp, setOtp] = useState("");

  /* ===== MESSAGE ===== */
  const [message, setMessage] = useState(null);

  const onChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  /* ================= OTP ================= */

  const sendOtp = async () => {
    if (!form.email) {
      setMessage({ type: "error", text: "Enter email first" });
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch(
        `${BASE_API}/mail/emailverify?mail=${form.email}`
      );

      if (res.ok) {
        setOtpSent(true);
        setOtp("");
        setMessage({ type: "success", text: "OTP sent to email" });
      } else {
        setMessage({ type: "error", text: "Failed to send OTP" });
      }
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    if (otp.length !== 4) {
      setMessage({ type: "error", text: "Enter valid 4-digit OTP" });
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch(
        `${BASE_API}/mail/verifyotp?mail=${form.email}&otp=${otp}`
      );

      const text = await res.text();

      if (text.includes("success")) {
        setOtpVerified(true);
        setMessage({ type: "success", text: "OTP verified" });
      } else {
        setMessage({ type: "error", text: "Invalid OTP" });
      }
    } finally {
      setLoading(false);
    }
  };

  /* ================= SUBMIT ================= */

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      /* ===== LOGIN ===== */
      if (mode === "login") {
        const res = await fetch(`${BASE_API}/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: form.email,
            passwordHash: form.password,
          }),
        });

        if (!res.ok) {
          setMessage({ type: "error", text: "Invalid credentials" });
          return;
        }

        const data = await res.json();
        // data = { token, username, role }

        /* ✅ STORE JWT */
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role);
        localStorage.setItem("username", data.username);
        localStorage.setItem("email", form.email);
        for(let i=0;i<10;i++){
          console.log(localStorage.getItem("email")); 
        }

        /* ✅ NAVIGATE */
        navigate("/dashboard", {
          state: {
            username: data.username,
            role: data.role,
          },
        });
      }

      /* ===== REGISTER ===== */
      if (mode === "register") {
        if (!otpVerified) {
          setMessage({ type: "info", text: "Verify email first" });
          return;
        }

        await fetch(`${BASE_API}/auth/register`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: form.name,
            email: form.email,
            passwordHash: form.password,
          }),
        });

        setMessage({
          type: "success",
          text: "Registered successfully. Login now.",
        });

        setMode("login");
      }

      /* ===== FORGOT (FRONTEND READY) ===== */
      if (mode === "forgot" && otpVerified) {
        setMessage({
          type: "success",
          text: "Password reset successful (backend pending)",
        });
        setMode("login");
      }
    } finally {
      setLoading(false);
    }
  };

  /* ================= UI ================= */

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f0f14] to-[#09090b] px-4">
      <div className="w-full max-w-md rounded-3xl bg-[#0f0f14]/80 backdrop-blur-xl border border-white/10 shadow-2xl p-8">

        {/* HEADER */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center mx-auto mb-3">
            <GraduationCap className="text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white">EduSmart</h1>
        </div>

        {/* MESSAGE */}
        {message && (
          <div
            className={`mb-5 rounded-xl px-4 py-3 flex items-center gap-2 text-sm
            ${
              message.type === "success"
                ? "bg-green-500/10 text-green-400"
                : message.type === "error"
                ? "bg-red-500/10 text-red-400"
                : "bg-blue-500/10 text-blue-400"
            }`}
          >
            {message.type === "success" && <CheckCircle size={16} />}
            {message.type === "error" && <XCircle size={16} />}
            {message.type === "info" && <Info size={16} />}
            {message.text}
          </div>
        )}

        {/* MODE TOGGLE */}
        {mode !== "forgot" && (
          <div className="grid grid-cols-2 bg-white/5 rounded-xl p-1 mb-6">
            {["login", "register"].map((m) => (
              <button
                key={m}
                onClick={() => {
                  setMode(m);
                  setOtpSent(false);
                  setOtpVerified(false);
                  setMessage(null);
                }}
                className={`py-2 rounded-lg text-sm ${
                  mode === m ? "bg-primary text-white" : "text-gray-400"
                }`}
              >
                {m === "login" ? "Login" : "Register"}
              </button>
            ))}
          </div>
        )}

        {/* FORM */}
        <form onSubmit={submit} className="space-y-5">

          {mode === "register" && (
            <Field icon={<User />} name="name" placeholder="Full name"
              value={form.name} onChange={onChange} />
          )}

          <Field icon={<Mail />} name="email" placeholder="Email"
            value={form.email} onChange={onChange} />

          {(mode === "register" || mode === "forgot") && !otpVerified && (
            <>
              {!otpSent ? (
                <ActionButton onClick={sendOtp} loading={loading}>
                  Send OTP
                </ActionButton>
              ) : (
                <>
                  <input
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    maxLength="4"
                    placeholder="Enter OTP"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 text-white outline-none"
                  />
                  <ActionButton onClick={verifyOtp} loading={loading}>
                    Verify OTP
                  </ActionButton>
                </>
              )}
            </>
          )}

          {mode !== "forgot" && (
            <div className="relative">
              <Field
                icon={<Lock />}
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={form.password}
                onChange={onChange}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-400"
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>
          )}

          {mode === "login" && (
            <button
              type="button"
              onClick={() => {
                setMode("forgot");
                setOtpSent(false);
                setOtpVerified(false);
              }}
              className="text-sm text-right text-gray-400 hover:text-white w-full"
            >
              Forgot password?
            </button>
          )}

          {mode !== "forgot" && (
            <ActionButton loading={loading}>
              {mode === "login" ? "Login" : "Register"}
            </ActionButton>
          )}
        </form>
      </div>
    </div>
  );
};

/* ===== COMPONENTS ===== */

const Field = ({ icon, ...props }) => (
  <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-3">
    <span className="text-gray-400">{icon}</span>
    <input {...props} className="bg-transparent outline-none text-white w-full" />
  </div>
);

const ActionButton = ({ children, loading, ...props }) => (
  <button
    {...props}
    disabled={loading}
    className="w-full py-3 rounded-xl bg-primary text-white font-semibold
               flex items-center justify-center gap-2 disabled:opacity-70"
  >
    {loading && (
      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
    )}
    {children}
  </button>
);

export default Login;
