import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Code, Play, Copy, Trash2, Moon, Sun } from "lucide-react";

const languageOptions = [
  { id: "python", name: "Python", judgeId: 71 },
  { id: "java", name: "Java", judgeId: 62 },
  { id: "c", name: "C", judgeId: 50 }
];

const defaultCode = {
  python: `a = int(input())
print(a ** 3)`,

  java: `import java.util.*;
class Main {
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
    int a = sc.nextInt();
    System.out.println(a * a * a);
  }
}`,

  c: `#include <stdio.h>
int main() {
  int a;
  scanf("%d", &a);
  printf("%d", a * a * a);
  return 0;
}`
};

const Compiler = () => {
  const navigate = useNavigate();

  const [selectedLanguage, setSelectedLanguage] = useState("python");
  const [code, setCode] = useState(defaultCode.python);
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  const handleLanguageChange = (lang) => {
    setSelectedLanguage(lang);
    setCode(defaultCode[lang]);
    setInput("");
    setOutput("");
  };

  // ✅ Python auto-indent (4 spaces on Enter)
  const handleCodeKeyDown = (e) => {
    if (selectedLanguage !== "python") return;

    if (e.key === "Enter") {
      e.preventDefault();

      const cursor = e.target.selectionStart;
      const before = code.substring(0, cursor);
      const after = code.substring(cursor);

      const newCode = before + "\n    " + after;
      setCode(newCode);

      requestAnimationFrame(() => {
        e.target.selectionStart = e.target.selectionEnd = cursor + 5;
      });
    }
  };

  const handleRun = async () => {
    if (!code.trim()) return;

    setIsRunning(true);
    setOutput("Running...");

    try {
      const res = await fetch(
        "https://ce.judge0.com/submissions/?base64_encoded=false&wait=true",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            source_code: code,
            language_id: languageOptions.find(
              (l) => l.id === selectedLanguage
            ).judgeId,
            stdin: input
          })
        }
      );

      const result = await res.json();

      if (result.stdout) setOutput(result.stdout);
      else if (result.stderr) setOutput(result.stderr);
      else if (result.compile_output) setOutput(result.compile_output);
      else setOutput(result.status?.description || "No output");

    } catch {
      setOutput("Error connecting to Judge0");
    }

    setIsRunning(false);
  };

  const handleCopy = () => navigator.clipboard.writeText(code);

  const handleClear = () => {
    setCode("");
    setInput("");
    setOutput("");
  };

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen bg-background text-foreground flex flex-col">
        
        {/* Header */}
        <header className="border-b border-border bg-card">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate("/dashboard")}
                className="p-2 rounded-lg hover:bg-muted"
              >
                <ArrowLeft />
              </button>

              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
                  <Code className="text-white" />
                </div>
                <h1 className="text-xl font-bold">Online Compiler</h1>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <select
                value={selectedLanguage}
                onChange={(e) => handleLanguageChange(e.target.value)}
                className="px-3 py-2 rounded-lg bg-muted border border-border"
              >
                {languageOptions.map((lang) => (
                  <option key={lang.id} value={lang.id}>
                    {lang.name}
                  </option>
                ))}
              </select>

              {/* 🌙 Dark Mode Toggle */}
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-lg bg-muted"
              >
                {darkMode ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            </div>
          </div>
        </header>

        {/* Main */}
        <main className="flex-1 container mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* LEFT: Code Editor */}
          <div className="flex flex-col">
            <div className="flex justify-between mb-2">
              <h2 className="font-semibold">Code</h2>
              <div className="flex gap-2">
                <button onClick={handleCopy} className="p-2 rounded bg-muted">
                  <Copy size={16} />
                </button>
                <button onClick={handleClear} className="p-2 rounded bg-muted">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>

            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              onKeyDown={handleCodeKeyDown}
              className="flex-1 p-3 rounded-lg bg-card border border-border font-mono text-sm resize-none"
              spellCheck={false}
            />

            <button
              onClick={handleRun}
              disabled={isRunning}
              className="mt-4 py-3 rounded-lg bg-primary text-white font-semibold flex justify-center items-center gap-2"
            >
              <Play size={18} />
              {isRunning ? "Running..." : "Run Code"}
            </button>
          </div>

          {/* RIGHT: Input + Output */}
          <div className="flex flex-col gap-4">
            <div>
              <h2 className="font-semibold mb-1">Input</h2>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                rows={4}
                className="w-full p-3 rounded-lg bg-card border border-border font-mono text-sm"
                placeholder="stdin"
              />
            </div>

            <div className="flex-1">
              <h2 className="font-semibold mb-1">Output</h2>
              <div className="h-full p-2 rounded-lg bg-muted border border-border font-mono text-sm whitespace-pre-wrap overflow-auto">
                {output || "Output will appear here..."}
              </div>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
};

export default Compiler;
