import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Editor from "./components/Editor";
import Preview from "./components/Preview";
import { categories } from "./data/technologies";

const initialData = {
  general: {
    title: "Hi, I'm Umut 👋",
    subtitle: "Full Stack Developer",
    workingOn: "an awesome React application",
    learning: "TypeScript, Web3, and UI/UX Design",
    collaborateOn: "open-source projects",
    askMe: "React, Tailwind CSS, and Node.js",
    contactEmail: "umut@example.com"
  },
  social: {
    github: "0umutekinci",
    linkedin: "0umutekinci",
    twitter: "0umutekinci",
    portfolio: "https://github.com/0umutekinci",
    medium: "",
    devto: ""
  },
  technologies: {
    selected: ["javascript", "typescript", "react", "tailwind", "nodejs", "git", "vscode"]
  },
  stats: {
    theme: "tokyonight",
    showGeneral: true,
    showLanguages: true,
    showStreak: true
  },
  widgets: {
    showBanner: true,
    bannerTheme: "tokyonight",
    bannerType: "waving",
    showTyping: true,
    typingText: "Full Stack Developer, Open Source Enthusiast, Tech Blogger",
    showTrophies: true,
    trophyTheme: "radical"
  },
  extras: {
    visitorBadge: true,
    coffee: "0umutekinci"
  },
  projects: {
    list: [
      { name: "README Generator", description: "A customizable profile README generator built with React and Tailwind CSS.", link: "https://github.com/0umutekinci" },
      { name: "Awesome Portfolio", description: "My personal developer portfolio showcasing my work and projects.", link: "https://github.com/0umutekinci" }
    ]
  }
};

const themeStyles = {
  dark: {
    bg: "bg-[#090D1A]",
    card: "bg-slate-900/75 border-slate-800 text-gray-100 shadow-2xl shadow-black/40",
    text: "text-gray-100",
    accentBg: "bg-gradient-to-tr from-indigo-500 via-indigo-600 to-purple-600",
    accentText: "text-indigo-400",
    border: "border-slate-800",
    input: "bg-slate-950/60 border-slate-800 text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20",
    tabActive: "border-indigo-500 text-indigo-400 bg-indigo-500/5",
    btnPrimary: "bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 shadow-indigo-500/10"
  },
  cyberpunk: {
    bg: "bg-[#05010B]",
    card: "bg-[#0E041A]/90 border-fuchsia-500/20 text-cyan-300 shadow-2xl shadow-fuchsia-950/10",
    text: "text-cyan-100",
    accentBg: "bg-gradient-to-tr from-fuchsia-500 via-purple-600 to-cyan-400",
    accentText: "text-fuchsia-400",
    border: "border-fuchsia-500/20",
    input: "bg-[#16062A]/60 border-fuchsia-500/20 text-cyan-200 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/20",
    tabActive: "border-cyan-400 text-cyan-400 bg-cyan-400/5",
    btnPrimary: "bg-gradient-to-r from-fuchsia-500 to-cyan-500 hover:opacity-90 shadow-fuchsia-500/10"
  },
  light: {
    bg: "bg-slate-50",
    card: "bg-white border-slate-200 text-slate-800 shadow-xl shadow-slate-100",
    text: "text-slate-800",
    accentBg: "bg-gradient-to-tr from-blue-500 via-blue-600 to-sky-500",
    accentText: "text-blue-600",
    border: "border-slate-200",
    input: "bg-slate-50 border-slate-200 text-slate-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20",
    tabActive: "border-blue-500 text-blue-600 bg-blue-50",
    btnPrimary: "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-blue-500/10"
  },
  emerald: {
    bg: "bg-[#020F08]",
    card: "bg-[#031C0E]/90 border-emerald-500/20 text-emerald-100 shadow-2xl shadow-emerald-950/20",
    text: "text-emerald-50",
    accentBg: "bg-gradient-to-tr from-emerald-500 via-emerald-600 to-teal-500",
    accentText: "text-emerald-400",
    border: "border-emerald-500/20",
    input: "bg-[#01140A]/60 border-emerald-500/20 text-emerald-100 focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400/20",
    tabActive: "border-emerald-400 text-emerald-400 bg-emerald-400/5",
    btnPrimary: "bg-gradient-to-r from-emerald-500 to-teal-400 hover:opacity-90 shadow-emerald-500/10"
  }
};

export default function App() {
  const [data, setData] = useState(initialData);
  const [markdown, setMarkdown] = useState("");
  const [theme, setTheme] = useState("dark");
  const [sections, setSections] = useState([
    { id: "header", name: "Header & Title", visible: true },
    { id: "about", name: "About Me Items", visible: true },
    { id: "technologies", name: "Technologies & Tools", visible: true },
    { id: "projects", name: "Featured Projects", visible: true },
    { id: "stats", name: "GitHub Stats Cards", visible: true },
    { id: "socials", name: "Social Badges", visible: true },
    { id: "extras", name: "Extras & Visitor Counter", visible: true }
  ]);

  const handleSectionOrderChange = (index, direction) => {
    const newSections = [...sections];
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    const temp = newSections[index];
    newSections[index] = newSections[targetIndex];
    newSections[targetIndex] = temp;
    setSections(newSections);
  };

  const handleSectionToggle = (id) => {
    setSections(
      sections.map((section) =>
        section.id === id ? { ...section, visible: !section.visible } : section
      )
    );
  };

  useEffect(() => {
    let generatedMarkdown = "";

    sections.forEach((section) => {
      if (!section.visible) return;

      if (section.id === "header") {
        const username = data.social.github;
        if (data.widgets.showBanner && username) {
          const bannerText = encodeURIComponent(data.general.title || `Hi, I'm ${username}`);
          generatedMarkdown += `<p align="center">\n  <img src="https://capsule-render.vercel.app/api?type=${data.widgets.bannerType}&color=auto&height=220&section=header&text=${bannerText}&fontSize=50&theme=${data.widgets.bannerTheme}" alt="Header Banner" />\n</p>\n\n`;
        } else if (data.general.title || data.general.subtitle) {
          generatedMarkdown += `<h1 align="center">${data.general.title}</h1>\n`;
        }

        if (data.widgets.showTyping && data.widgets.typingText) {
          const lines = data.widgets.typingText.split(",").map(item => encodeURIComponent(item.trim())).join(";");
          generatedMarkdown += `<p align="center">\n  <a href="https://git.io/typing-svg">\n    <img src="https://readme-typing-svg.demolab.com?font=Fira+Code&size=22&pause=1000&color=4F46E5&center=true&vCenter=true&width=435&lines=${lines}" alt="Typing SVG" />\n  </a>\n</p>\n\n`;
        } else if (data.general.subtitle && !data.widgets.showBanner) {
          generatedMarkdown += `<p align="center"><strong>${data.general.subtitle}</strong></p>\n\n`;
        }

        generatedMarkdown += "<br />\n\n";
      }

      if (section.id === "about") {
        let aboutContent = "";
        if (data.general.workingOn) {
          aboutContent += `- 🔭 I’m currently working on **${data.general.workingOn}**\n`;
        }
        if (data.general.learning) {
          aboutContent += `- 🌱 I’m currently learning **${data.general.learning}**\n`;
        }
        if (data.general.collaborateOn) {
          aboutContent += `- 👯 I’m looking to collaborate on **${data.general.collaborateOn}**\n`;
        }
        if (data.general.askMe) {
          aboutContent += `- 💬 Ask me about **${data.general.askMe}**\n`;
        }
        if (data.general.contactEmail) {
          aboutContent += `- 📫 How to reach me: **${data.general.contactEmail}**\n`;
        }
        if (aboutContent) {
          generatedMarkdown += `### About Me\n\n${aboutContent}\n`;
        }
      }

      if (section.id === "technologies") {
        if (data.technologies.selected.length > 0) {
          generatedMarkdown += "### Languages and Tools\n\n<p align=\"left\">\n";
          data.technologies.selected.forEach((techId) => {
            let foundTech = null;
            categories.forEach((cat) => {
              const tech = cat.items.find((t) => t.id === techId);
              if (tech) foundTech = tech;
            });
            if (foundTech) {
              generatedMarkdown += `  <img src="https://img.shields.io/badge/${foundTech.badge}" alt="${foundTech.name}" />\n`;
            }
          });
          generatedMarkdown += "</p>\n\n";
        }
      }

      if (section.id === "projects") {
        if (data.projects.list.length > 0) {
          generatedMarkdown += "### Featured Projects\n\n";
          data.projects.list.forEach((proj) => {
            if (proj.name) {
              generatedMarkdown += `- **${proj.name}** - ${proj.description || ""} ${proj.link ? `([View Project](${proj.link}))` : ""}\n`;
            }
          });
          generatedMarkdown += "\n";
        }
      }

      if (section.id === "stats") {
        const username = data.social.github;
        if (username) {
          if (data.widgets.showTrophies) {
            generatedMarkdown += `### GitHub Trophies\n\n<p align="center">\n  <a href="https://github.com/ryo-ma/github-profile-trophy">\n    <img src="https://github-profile-trophy.vercel.app/?username=${username}&theme=${data.widgets.trophyTheme}" alt="GitHub Trophies" />\n  </a>\n</p>\n\n`;
          }

          if (data.stats.showGeneral || data.stats.showLanguages || data.stats.showStreak) {
            generatedMarkdown += "### GitHub Stats\n\n<p align=\"center\">\n";
            if (data.stats.showGeneral) {
              generatedMarkdown += `  <img src="https://github-readme-stats.vercel.app/api?username=${username}&show_icons=true&theme=${data.stats.theme}" alt="GitHub Stats" />\n`;
            }
            if (data.stats.showStreak) {
              generatedMarkdown += `  <img src="https://github-readme-streak-stats.herokuapp.com/?user=${username}&theme=${data.stats.theme}" alt="GitHub Streak" />\n`;
            }
            if (data.stats.showLanguages) {
              generatedMarkdown += `  <img src="https://github-readme-stats.vercel.app/api/top-langs/?username=${username}&layout=compact&theme=${data.stats.theme}" alt="Top Languages" />\n`;
            }
            generatedMarkdown += "</p>\n\n";
          }
        }
      }

      if (section.id === "socials") {
        const hasSocial = Object.values(data.social).some((val) => val);
        if (hasSocial) {
          generatedMarkdown += "### Connect with me\n\n<p align=\"left\">\n";
          if (data.social.linkedin) {
            generatedMarkdown += `  <a href="https://linkedin.com/in/${data.social.linkedin}" target="_blank">\n    <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn" />\n  </a>\n`;
          }
          if (data.social.twitter) {
            generatedMarkdown += `  <a href="https://twitter.com/${data.social.twitter}" target="_blank">\n    <img src="https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white" alt="Twitter" />\n  </a>\n`;
          }
          if (data.social.portfolio) {
            generatedMarkdown += `  <a href="${data.social.portfolio}" target="_blank">\n    <img src="https://img.shields.io/badge/Portfolio-FF5722?style=for-the-badge&logo=todoist&logoColor=white" alt="Portfolio" />\n  </a>\n`;
          }
          if (data.social.medium) {
            generatedMarkdown += `  <a href="https://medium.com/@${data.social.medium}" target="_blank">\n    <img src="https://img.shields.io/badge/Medium-12100E?style=for-the-badge&logo=medium&logoColor=white" alt="Medium" />\n  </a>\n`;
          }
          if (data.social.devto) {
            generatedMarkdown += `  <a href="https://dev.to/${data.social.devto}" target="_blank">\n    <img src="https://img.shields.io/badge/dev.to-0A0A0A?style=for-the-badge&logo=devdotto&logoColor=white" alt="Dev.to" />\n  </a>\n`;
          }
          generatedMarkdown += "</p>\n\n";
        }
      }

      if (section.id === "extras") {
        const hasExtra = data.extras.visitorBadge || data.extras.coffee;
        if (hasExtra) {
          generatedMarkdown += "### Support & Visitors\n\n<p align=\"left\">\n";
          if (data.extras.visitorBadge && data.social.github) {
            generatedMarkdown += `  <img src="https://komarev.com/normal-badge/?key=${data.social.github}&color=blue" alt="Visitor Count" />\n`;
          }
          if (data.extras.coffee) {
            generatedMarkdown += `  <a href="https://buymeacoffee.com/${data.extras.coffee}" target="_blank">\n    <img src="https://img.shields.io/badge/buy%20me%20a%20coffee-donate-orange?style=for-the-badge&logo=buy-me-a-coffee&logoColor=white" alt="Buy Me A Coffee" />\n  </a>\n`;
          }
          generatedMarkdown += "</p>\n\n";
        }
      }
    });

    setMarkdown(generatedMarkdown);
  }, [data, sections]);

  const activeTheme = themeStyles[theme];

  return (
    <div className={`min-h-screen ${activeTheme.bg} flex flex-col font-sans transition-all duration-300`}>
      <Header 
        currentTheme={theme} 
        onThemeChange={setTheme} 
        themeStyles={activeTheme} 
      />
      <main className="flex-1 w-full px-4 sm:px-6 lg:px-8 py-6 grid grid-cols-1 lg:grid-cols-2 gap-6 overflow-hidden">
        <Editor
          data={data}
          onChange={setData}
          sections={sections}
          onSectionOrderChange={handleSectionOrderChange}
          onSectionToggle={handleSectionToggle}
          categories={categories}
          themeStyles={activeTheme}
        />
        <Preview 
          markdown={markdown} 
          themeStyles={activeTheme} 
        />
      </main>
    </div>
  );
}
