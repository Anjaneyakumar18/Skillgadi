import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Mail,
  User,
  Phone,
  Calendar,
  BarChart3,
  ClipboardList,
  Activity,
} from "lucide-react";

import BASE_API from "../BaseApi";

const Profile = () => {
  const location = useLocation();
  const { username, email } = location.state || {};

  /* ✅ CORRECT fallback (THIS FIXES user@gmail ISSUE) */
  const safeEmail = email || localStorage.getItem("email");
  const safeUsername = username || localStorage.getItem("username");

  const [profile, setProfile] = useState({
    mobileNumber: "",
    yearOfStudy: "",
  });

  const [editing, setEditing] = useState(false);

  /* ===== JWT ROUTE GUARD ===== */
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/";
    }
  }, []);

  /* ===== FETCH PROFILE (JWT HEADER) ===== */
  useEffect(() => {
    if (!safeEmail) return;

    fetch(`${BASE_API}/user/profile?email=${safeEmail}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setProfile({
          mobileNumber: data.mobileNumber || "",
          yearOfStudy: data.yearOfStudy || "",
        });
      });
  }, [safeEmail]);

  /* ===== SAVE PROFILE (JWT HEADER) ===== */
  const saveProfile = async () => {
    await fetch(`${BASE_API}/user/update-profile`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        email: safeEmail,
        mobileNumber: profile.mobileNumber,
        yearOfStudy: profile.yearOfStudy,
      }),
    });

    setEditing(false);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 space-y-12 animate-fade-in">

      {/* ================= HEADER ================= */}
      <div>
        <h1 className="text-3xl font-bold">My Profile</h1>
        <p className="text-muted-foreground">
          Personal details & learning overview
        </p>
      </div>

      {/* ================= BASIC INFO ================= */}
      <section className="bg-card border border-border/50 rounded-2xl p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Basic Information</h2>
          <button
            onClick={() => (editing ? saveProfile() : setEditing(true))}
            className="text-primary font-medium hover:underline"
          >
            {editing ? "Save" : "Edit"}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <InfoRow
            icon={<User />}
            label="Username"
            value={safeUsername || "—"}
          />
          <InfoRow
            icon={<Mail />}
            label="Email"
            value={safeEmail || "—"}
          />

          {/* PHONE / UPI */}
          <div>
            <InfoRow
              icon={<Phone />}
              label="Phone / UPI"
              value={
                editing ? (
                  <input
                    value={profile.mobileNumber}
                    onChange={(e) =>
                      setProfile({ ...profile, mobileNumber: e.target.value })
                    }
                    placeholder="0000000000@axl"
                    className="border rounded-lg px-3 py-2 w-full"
                  />
                ) : (
                  profile.mobileNumber || "—"
                )
              }
            />
            <p className="text-xs text-muted-foreground mt-1 ml-14">
              Add your UPI number eg: 0000000000@axl
            </p>
          </div>

          {/* YEAR */}
          <InfoRow
            icon={<Calendar />}
            label="Year of Study"
            value={
              editing ? (
                <input
                  type="number"
                  value={profile.yearOfStudy}
                  onChange={(e) =>
                    setProfile({ ...profile, yearOfStudy: e.target.value })
                  }
                  className="border rounded-lg px-3 py-2 w-full"
                />
              ) : (
                profile.yearOfStudy || "—"
              )
            }
          />
        </div>
      </section>

      {/* ================= QUIZ STATS ================= */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <StatCard
          title="Enrolled Quizzes"
          value="—"
          icon={<ClipboardList />}
        />
        <StatCard
          title="Quizzes Completed"
          value="—"
          icon={<Activity />}
        />
        <StatCard
          title="Average Score"
          value="— %"
          icon={<BarChart3 />}
        />
      </section>

      {/* ================= PERFORMANCE ================= */}
      <section className="bg-card border border-border/50 rounded-2xl p-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
            <BarChart3 />
          </div>
          <h2 className="text-xl font-semibold">
            Performance – Recent Quizzes
          </h2>
        </div>

        <div className="h-64 rounded-xl bg-muted/40 flex items-center justify-center text-muted-foreground text-sm">
          📊 Scores & attempts chart will be rendered from Django (matplotlib)
        </div>
      </section>
    </div>
  );
};

/* ================= COMPONENTS ================= */

const InfoRow = ({ icon, label, value }) => (
  <div className="flex items-center gap-4">
    <div className="w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
      {icon}
    </div>
    <div className="flex-1">
      <p className="text-sm text-muted-foreground">{label}</p>
      <div className="font-semibold">{value}</div>
    </div>
  </div>
);

const StatCard = ({ title, value, icon }) => (
  <div className="bg-card border border-border/50 rounded-2xl p-6">
    <div className="flex items-center gap-3 mb-2">
      <div className="w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
        {icon}
      </div>
      <h3 className="font-medium">{title}</h3>
    </div>
    <p className="text-3xl font-bold">{value}</p>
  </div>
);

export default Profile;
