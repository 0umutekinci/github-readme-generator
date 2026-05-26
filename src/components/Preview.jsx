import React, { useState, useEffect } from "react";
import { marked } from "marked";
import confetti from "canvas-confetti";
import { Copy, Download, Code, Eye, Check } from "lucide-react";

export default function Preview({ markdown, themeStyles }) {
  const [viewMode, setViewMode] = useState("preview");
  const [copied, setCopied] = useState(false);
  const [renderedHtml, setRenderedHtml] = useState("");

  useEffect(() => {
    const html = marked(markdown, {
      gfm: true,
      breaks: true
    });
    setRenderedHtml(html);
  }, [markdown]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(markdown);
      setCopied(true);
      
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#6366F1", "#A855F7", "#EC4899"]
      });

      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Copy failed:", err);
    }
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([markdown], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "README.md";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);

    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 },
      colors: ["#3B82F6", "#10B981", "#6366F1"]
    });
  };

  return (
    <div className={`rounded-2xl border ${themeStyles.card} flex flex-col h-[calc(100vh-8rem)] transition-all duration-300 shadow-xl overflow-hidden`}>
      <div className={`flex items-center justify-between border-b ${themeStyles.border} bg-black/10 px-6 py-3`}>
        <div className="flex items-center gap-2 p-1 bg-white/5 rounded-xl border border-white/5">
          <button
            onClick={() => setViewMode("preview")}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              viewMode === "preview"
                ? "bg-indigo-500 text-white shadow-sm"
                : "text-gray-400 hover:text-white"
            }`}
          >
            <Eye className="h-3.5 w-3.5" />
            <span>Preview</span>
          </button>
          <button
            onClick={() => setViewMode("code")}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              viewMode === "code"
                ? "bg-indigo-500 text-white shadow-sm"
                : "text-gray-400 hover:text-white"
            }`}
          >
            <Code className="h-3.5 w-3.5" />
            <span>Code (Markdown)</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-xl text-xs font-semibold transition-all active:scale-95"
            title="Copy to clipboard"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-green-400" />
                <span className="text-green-400">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                <span>Copy</span>
              </>
            )}
          </button>
          <button
            onClick={handleDownload}
            className={`flex items-center gap-1.5 px-3.5 py-2 ${themeStyles.btnPrimary} text-white rounded-xl text-xs font-semibold shadow-lg hover:opacity-90 transition-all active:scale-95`}
            title="Download README.md"
          >
            <Download className="h-3.5 w-3.5" />
            <span>Download</span>
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 bg-black/5">
        {viewMode === "preview" ? (
          <div 
            className="markdown-body text-sm max-w-none transition-colors duration-300"
            dangerouslySetInnerHTML={{ __html: renderedHtml || "<p class='text-gray-500 italic'>Generating preview...</p>" }}
          />
        ) : (
          <textarea
            readOnly
            value={markdown}
            className={`w-full h-full font-mono text-xs p-4 rounded-xl border focus:outline-none resize-none transition-all duration-300 ${themeStyles.input}`}
          />
        )}
      </div>
    </div>
  );
}
