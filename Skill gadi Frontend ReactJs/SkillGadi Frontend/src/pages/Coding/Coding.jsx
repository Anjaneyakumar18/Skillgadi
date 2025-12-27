import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BASE_API from "../../BaseApi";

const Code = () => {
  const [codes, setCodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${BASE_API}/api/code`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setCodes(data || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const filteredCodes = codes.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="px-10 py-6 text-sm text-muted-foreground">
        Loading coding problems…
      </div>
    );
  }

  return (
    <div className="max-w-[1200px] mx-auto px-10 py-6">
      {/* Header */}
      <div className="mb-5">
        <h1 className="text-2xl font-semibold text-foreground">
          Practice Coding Problems
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Improve problem-solving with curated questions
        </p>
      </div>

      {/* Search */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search problems"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-64 px-3 py-2 text-sm rounded-md
                     bg-background border border-border
                     focus:outline-none focus:ring-1 focus:ring-primary"
        />
      </div>

      {/* Problems Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCodes.map((code, index) => (
          <div
            key={code.codeId}
            onClick={() => navigate(`/code/${code.codeId}`)}
            className="border border-border rounded-lg p-4
                       bg-background
                       hover:bg-muted/40 hover:border-muted-foreground/30
                       transition cursor-pointer"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-muted-foreground">
                Problem {index + 1}
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full
                               bg-muted text-muted-foreground">
                Easy
              </span>
            </div>

            <h3 className="text-base font-medium text-foreground mb-1">
              {code.name}
            </h3>

            <p className="text-sm text-muted-foreground line-clamp-2">
              {code.statement}
            </p>

            <button
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/code/${code.codeId}`);
              }}
              className="mt-4 w-full py-2 text-sm rounded-md
bg-emerald-600 text-white
hover:bg-emerald-700
transition-colors"
            >
              Solve
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Code;
