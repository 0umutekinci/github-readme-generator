import React from "react";
import { Sparkles, Monitor, Moon, Sun, Trees } from "lucide-react";

export default function Header({ currentTheme, onThemeChange, themeStyles }) {
  return (
    <header className={`border-b ${themeStyles.border} ${themeStyles.card} backdrop-blur-md sticky top-0 z-50 transition-all duration-300`}>
      <div className="w-full px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className={`h-10 w-10 rounded-xl ${themeStyles.accentBg} flex items-center justify-center text-white shadow-lg`}>
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <h1 className="font-outfit text-xl font-bold tracking-tight">
              GitHub Profile <span className={themeStyles.accentText}>README</span>
            </h1>
            <p className="text-[10px] text-gray-500 font-medium tracking-wider uppercase -mt-1">
              Generator & Editor
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 p-1 bg-black/10 rounded-xl border border-white/5">
            <button
              onClick={() => onThemeChange("dark")}
              className={`p-1.5 rounded-lg transition-all ${
                currentTheme === "dark" ? "bg-indigo-500/20 text-indigo-400" : "text-gray-400 hover:text-white"
              }`}
              title="Dark Mode"
            >
              <Moon className="h-4 w-4" />
            </button>
            <button
              onClick={() => onThemeChange("cyberpunk")}
              className={`p-1.5 rounded-lg transition-all ${
                currentTheme === "cyberpunk" ? "bg-fuchsia-500/20 text-fuchsia-400" : "text-gray-400 hover:text-white"
              }`}
              title="Cyberpunk"
            >
              <Monitor className="h-4 w-4" />
            </button>
            <button
              onClick={() => onThemeChange("light")}
              className={`p-1.5 rounded-lg transition-all ${
                currentTheme === "light" ? "bg-blue-500/20 text-blue-600" : "text-gray-400 hover:text-slate-700"
              }`}
              title="Light Mode"
            >
              <Sun className="h-4 w-4" />
            </button>
            <button
              onClick={() => onThemeChange("emerald")}
              className={`p-1.5 rounded-lg transition-all ${
                currentTheme === "emerald" ? "bg-emerald-500/20 text-emerald-400" : "text-gray-400 hover:text-white"
              }`}
              title="Emerald Mode"
            >
              <Trees className="h-4 w-4" />
            </button>
          </div>

          <span className="text-xs text-gray-500 hidden md:inline">
            Created by <a href="https://github.com/0umutekinci" target="_blank" rel="noopener noreferrer" className={`${themeStyles.accentText} hover:underline font-semibold`}>@0umutekinci</a>
          </span>
          <a
            href="https://github.com/0umutekinci"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm font-medium hover:bg-white/10 hover:border-white/20 transition-all duration-300"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
              <path d="M9 18c-4.51 2-5-2-7-2" />
            </svg>
            <span className="hidden sm:inline">GitHub</span>
          </a>
        </div>
      </div>
    </header>
  );
}
