import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BASE_API from "../../BaseApi";
import { Play, Sun, Moon, CheckCircle, XCircle } from "lucide-react";

const languageOptions = {
  python: 71,
  java: 62,
  c: 50,
};

const CodeQuestion = () => {
  const { codeId } = useParams();
  const token = localStorage.getItem("token");

  const [question, setQuestion] = useState(null);
  const [hiddenCases, setHiddenCases] = useState([]);
  const [language, setLanguage] = useState("python");
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [status, setStatus] = useState("idle"); // idle | running | success | fail
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    fetch(`${BASE_API}/api/code/${codeId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then(setQuestion);

    fetch(`${BASE_API}/api/hidden-cases/code/${codeId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then(setHiddenCases);
  }, [codeId]);

  const runOnJudge0 = async (stdin) => {
    const res = await fetch(
      "https://ce.judge0.com/submissions/?base64_encoded=false&wait=true",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source_code: code,
          stdin,
          language_id: languageOptions[language],
        }),
      }
    );

    const result = await res.json();
    return result.stdout?.trim() || "";
  };

  const handleSubmit = async () => {
    setStatus("running");
    setOutput("");

    for (let test of hiddenCases) {
      const result = await runOnJudge0(test.input);
      if (result !== test.expectedOutput.trim()) {
        setStatus("fail");
        setOutput(
          `Input:\n${test.input}\n\nExpected:\n${test.expectedOutput}\n\nGot:\n${result}`
        );
        return;
      }
    }

    setStatus("success");
    setOutput("All hidden test cases passed successfully 🎉");
  };

  if (!question) return <p>Loading...</p>;

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen bg-background text-foreground px-6 py-6 max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">{question.name}</h1>

          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-lg bg-muted"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* LEFT: PROBLEM */}
          <div className="space-y-4">
            <div className="rounded-xl border bg-card p-6">
              <h2 className="text-lg font-semibold mb-2">Problem Description</h2>
              <div className="text-base leading-relaxed whitespace-pre-wrap max-h-[360px] overflow-y-auto">
                {question.statement}
              </div>
            </div>

            <div className="rounded-xl border bg-card p-6">
              <h2 className="text-lg font-semibold mb-3">Example</h2>

              <p className="font-medium">Input</p>
              <pre className="bg-muted p-3 rounded mt-1">
                {question.sampleinput1}
              </pre>

              <p className="font-medium mt-4">Output</p>
              <pre className="bg-muted p-3 rounded mt-1">
                {question.sampleoutput1}
              </pre>
            </div>
          </div>

          {/* RIGHT: EDITOR + OUTPUT */}
          <div className="flex flex-col gap-3">

            {/* Editor Header */}
            <div className="flex justify-between items-center">
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="px-3 py-2 rounded-lg border bg-card"
              >
                <option value="python">Python</option>
                <option value="java">Java</option>
                <option value="c">C</option>
              </select>

              <button
                onClick={handleSubmit}
                className="px-6 py-2 rounded-lg bg-primary text-primary-foreground font-semibold flex gap-2"
              >
                <Play size={18} /> Submit
              </button>
            </div>

            {/* Code Editor */}
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="h-60 p-3 rounded-lg border bg-card font-mono text-sm resize-none"
              placeholder="Write your code here..."
            />

            {/* OUTPUT BOX (ALWAYS VISIBLE) */}
            <div
              className={`rounded-lg border p-4 font-mono text-sm whitespace-pre-wrap transition-all
                ${
                  status === "success"
                    ? "bg-green-50 border-green-400 animate-pulse"
                    : status === "fail"
                    ? "bg-red-50 border-red-400"
                    : "bg-muted"
                }`}
            >
              {status === "idle" && (
                <p className="text-muted-foreground">
                  Submit code to evaluate against hidden test cases.
                </p>
              )}

              {status === "running" && (
                <p className="flex items-center gap-2">
                  <Play size={16} /> Running test cases...
                </p>
              )}

              {status === "success" && (
                <p className="flex items-center gap-2 text-green-700 font-medium">
                  <CheckCircle size={18} /> Accepted
                  {"\n\n"}
                  {output}
                </p>
              )}

              {status === "fail" && (
                <p className="flex items-center gap-2 text-red-700 font-medium">
                  <XCircle size={18} /> Wrong Answer
                  {"\n\n"}
                  {output}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeQuestion;
