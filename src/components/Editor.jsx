import React, { useState } from "react";
import { 
  User, 
  Share2, 
  Code2, 
  BarChart3, 
  Coffee, 
  ChevronUp, 
  ChevronDown, 
  Eye, 
  EyeOff,
  Plus,
  Trash2,
  Sparkles
} from "lucide-react";

export default function Editor({ data, onChange, sections, onSectionOrderChange, onSectionToggle, categories, themeStyles }) {
  const [activeTab, setActiveTab] = useState("general");

  const updateField = (section, field, value) => {
    onChange({
      ...data,
      [section]: {
        ...data[section],
        [field]: value
      }
    });
  };

  const handleTechToggle = (techId) => {
    const currentTechs = data.technologies.selected;
    const isSelected = currentTechs.includes(techId);
    const updatedTechs = isSelected
      ? currentTechs.filter(id => id !== techId)
      : [...currentTechs, techId];

    updateField("technologies", "selected", updatedTechs);
  };

  const addCustomProject = () => {
    const newProject = { name: "", description: "", link: "" };
    updateField("projects", "list", [...data.projects.list, newProject]);
  };

  const updateCustomProject = (index, field, value) => {
    const updatedList = data.projects.list.map((proj, idx) => {
      if (idx === index) {
        return { ...proj, [field]: value };
      }
      return proj;
    });
    updateField("projects", "list", updatedList);
  };

  const deleteCustomProject = (index) => {
    const updatedList = data.projects.list.filter((_, idx) => idx !== index);
    updateField("projects", "list", updatedList);
  };

  return (
    <div className={`rounded-2xl border ${themeStyles.card} flex flex-col h-[calc(100vh-8rem)] transition-all duration-300 shadow-xl overflow-hidden`}>
      <div className={`flex border-b ${themeStyles.border} bg-black/10 overflow-x-auto`}>
        <button
          onClick={() => setActiveTab("general")}
          className={`flex items-center gap-2 px-5 py-4 text-sm font-medium border-b-2 transition-all ${
            activeTab === "general"
              ? themeStyles.tabActive
              : "border-transparent text-gray-400 hover:text-white"
          }`}
        >
          <User className="h-4 w-4" />
          <span>General</span>
        </button>
        <button
          onClick={() => setActiveTab("socials")}
          className={`flex items-center gap-2 px-5 py-4 text-sm font-medium border-b-2 transition-all ${
            activeTab === "socials"
              ? themeStyles.tabActive
              : "border-transparent text-gray-400 hover:text-white"
          }`}
        >
          <Share2 className="h-4 w-4" />
          <span>Social Media</span>
        </button>
        <button
          onClick={() => setActiveTab("techs")}
          className={`flex items-center gap-2 px-5 py-4 text-sm font-medium border-b-2 transition-all ${
            activeTab === "techs"
              ? themeStyles.tabActive
              : "border-transparent text-gray-400 hover:text-white"
          }`}
        >
          <Code2 className="h-4 w-4" />
          <span>Technologies</span>
        </button>
        <button
          onClick={() => setActiveTab("stats")}
          className={`flex items-center gap-2 px-5 py-4 text-sm font-medium border-b-2 transition-all ${
            activeTab === "stats"
              ? themeStyles.tabActive
              : "border-transparent text-gray-400 hover:text-white"
          }`}
        >
          <BarChart3 className="h-4 w-4" />
          <span>Stats</span>
        </button>
        <button
          onClick={() => setActiveTab("widgets")}
          className={`flex items-center gap-2 px-5 py-4 text-sm font-medium border-b-2 transition-all ${
            activeTab === "widgets"
              ? themeStyles.tabActive
              : "border-transparent text-gray-400 hover:text-white"
          }`}
        >
          <Sparkles className="h-4 w-4" />
          <span>Widgets</span>
        </button>
        <button
          onClick={() => setActiveTab("extras")}
          className={`flex items-center gap-2 px-5 py-4 text-sm font-medium border-b-2 transition-all ${
            activeTab === "extras"
              ? themeStyles.tabActive
              : "border-transparent text-gray-400 hover:text-white"
          }`}
        >
          <Coffee className="h-4 w-4" />
          <span>Extras</span>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {activeTab === "general" && (
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="font-outfit font-semibold text-lg">Title & Subtitle</h3>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1">Greeting Title</label>
                  <input
                    type="text"
                    value={data.general.title}
                    onChange={(e) => updateField("general", "title", e.target.value)}
                    className={`w-full px-4 py-2.5 rounded-xl border focus:outline-none text-sm transition-all duration-300 ${themeStyles.input}`}
                    placeholder="Hi, I'm John Doe 👋"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1">Subtitle (Role / Tagline)</label>
                  <input
                    type="text"
                    value={data.general.subtitle}
                    onChange={(e) => updateField("general", "subtitle", e.target.value)}
                    className={`w-full px-4 py-2.5 rounded-xl border focus:outline-none text-sm transition-all duration-300 ${themeStyles.input}`}
                    placeholder="A passionate full-stack developer"
                  />
                </div>
              </div>
            </div>

            <hr className={themeStyles.border} />

            <div className="space-y-4">
              <h3 className="font-outfit font-semibold text-lg">About Me Items</h3>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1">Currently Working On</label>
                  <input
                    type="text"
                    value={data.general.workingOn}
                    onChange={(e) => updateField("general", "workingOn", e.target.value)}
                    className={`w-full px-4 py-2.5 rounded-xl border focus:outline-none text-sm transition-all duration-300 ${themeStyles.input}`}
                    placeholder="a custom web application"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1">Currently Learning</label>
                  <input
                    type="text"
                    value={data.general.learning}
                    onChange={(e) => updateField("general", "learning", e.target.value)}
                    className={`w-full px-4 py-2.5 rounded-xl border focus:outline-none text-sm transition-all duration-300 ${themeStyles.input}`}
                    placeholder="Next.js and WebGL"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1">Looking to Collaborate On</label>
                  <input
                    type="text"
                    value={data.general.collaborateOn}
                    onChange={(e) => updateField("general", "collaborateOn", e.target.value)}
                    className={`w-full px-4 py-2.5 rounded-xl border focus:outline-none text-sm transition-all duration-300 ${themeStyles.input}`}
                    placeholder="open-source projects"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1">Ask Me About</label>
                  <input
                    type="text"
                    value={data.general.askMe}
                    onChange={(e) => updateField("general", "askMe", e.target.value)}
                    className={`w-full px-4 py-2.5 rounded-xl border focus:outline-none text-sm transition-all duration-300 ${themeStyles.input}`}
                    placeholder="React, CSS, performance optimization"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1">How to Reach Me (Email)</label>
                  <input
                    type="text"
                    value={data.general.contactEmail}
                    onChange={(e) => updateField("general", "contactEmail", e.target.value)}
                    className={`w-full px-4 py-2.5 rounded-xl border focus:outline-none text-sm transition-all duration-300 ${themeStyles.input}`}
                    placeholder="johndoe@example.com"
                  />
                </div>
              </div>
            </div>

            <hr className={themeStyles.border} />

            <div className="space-y-4">
              <h3 className="font-outfit font-semibold text-lg">Section Management</h3>
              <p className="text-xs text-gray-400">Choose which sections to display and rearrange their order using the arrows.</p>
              <div className="space-y-2">
                {sections.map((section, idx) => (
                  <div key={section.id} className={`flex items-center justify-between p-3 bg-black/10 border ${themeStyles.border} rounded-xl`}>
                    <span className="text-sm font-medium">{section.name}</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onSectionToggle(section.id)}
                        className={`p-1.5 rounded-lg border transition-all ${
                          section.visible
                            ? "bg-indigo-500/20 border-indigo-500/30 text-indigo-400"
                            : "bg-white/5 border-white/10 text-gray-500"
                        }`}
                      >
                        {section.visible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                      </button>
                      <button
                        disabled={idx === 0}
                        onClick={() => onSectionOrderChange(idx, "up")}
                        className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-white disabled:opacity-40 disabled:hover:text-gray-400 transition-all"
                      >
                        <ChevronUp className="h-4 w-4" />
                      </button>
                      <button
                        disabled={idx === sections.length - 1}
                        onClick={() => onSectionOrderChange(idx, "down")}
                        className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-white disabled:opacity-40 disabled:hover:text-gray-400 transition-all"
                      >
                        <ChevronDown className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "socials" && (
          <div className="space-y-4">
            <h3 className="font-outfit font-semibold text-lg">Social Media Usernames</h3>
            <p className="text-xs text-gray-400">Simply fill in your usernames. Badges will be generated automatically.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">GitHub Username</label>
                <input
                  type="text"
                  value={data.social.github}
                  onChange={(e) => updateField("social", "github", e.target.value)}
                  className={`w-full px-4 py-2.5 rounded-xl border focus:outline-none text-sm transition-all duration-300 ${themeStyles.input}`}
                  placeholder="github_username"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">LinkedIn Username</label>
                <input
                  type="text"
                  value={data.social.linkedin}
                  onChange={(e) => updateField("social", "linkedin", e.target.value)}
                  className={`w-full px-4 py-2.5 rounded-xl border focus:outline-none text-sm transition-all duration-300 ${themeStyles.input}`}
                  placeholder="linkedin_username"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">Twitter / X Username</label>
                <input
                  type="text"
                  value={data.social.twitter}
                  onChange={(e) => updateField("social", "twitter", e.target.value)}
                  className={`w-full px-4 py-2.5 rounded-xl border focus:outline-none text-sm transition-all duration-300 ${themeStyles.input}`}
                  placeholder="twitter_username"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">Personal Portfolio Link</label>
                <input
                  type="text"
                  value={data.social.portfolio}
                  onChange={(e) => updateField("social", "portfolio", e.target.value)}
                  className={`w-full px-4 py-2.5 rounded-xl border focus:outline-none text-sm transition-all duration-300 ${themeStyles.input}`}
                  placeholder="https://mywebsite.com"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">Medium Username</label>
                <input
                  type="text"
                  value={data.social.medium}
                  onChange={(e) => updateField("social", "medium", e.target.value)}
                  className={`w-full px-4 py-2.5 rounded-xl border focus:outline-none text-sm transition-all duration-300 ${themeStyles.input}`}
                  placeholder="@username"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">Dev.to Username</label>
                <input
                  type="text"
                  value={data.social.devto}
                  onChange={(e) => updateField("social", "devto", e.target.value)}
                  className={`w-full px-4 py-2.5 rounded-xl border focus:outline-none text-sm transition-all duration-300 ${themeStyles.input}`}
                  placeholder="username"
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === "techs" && (
          <div className="space-y-6">
            <div>
              <h3 className="font-outfit font-semibold text-lg">Technologies & Languages</h3>
              <p className="text-xs text-gray-400">Select the languages and tools you use in your projects.</p>
            </div>
            {categories.map((category) => (
              <div key={category.id} className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-400">{category.name}</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {category.items.map((tech) => {
                    const isSelected = data.technologies.selected.includes(tech.id);
                    return (
                      <button
                        key={tech.id}
                        onClick={() => handleTechToggle(tech.id)}
                        className={`flex items-center gap-2 p-2.5 rounded-xl border text-left text-xs font-medium transition-all ${
                          isSelected
                            ? "bg-indigo-500/10 border-indigo-500 text-indigo-400"
                            : "bg-black/10 border-white/5 text-gray-400 hover:border-white/10 hover:text-white"
                        }`}
                      >
                        <div className={`h-2.5 w-2.5 rounded-full ${isSelected ? 'bg-indigo-500' : 'bg-transparent border border-gray-600'}`}></div>
                        <span>{tech.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "stats" && (
          <div className="space-y-6">
            <div>
              <h3 className="font-outfit font-semibold text-lg">GitHub Stats Cards</h3>
              <p className="text-xs text-gray-400">Integrate dynamic GitHub stats widgets. (Make sure you filled your GitHub username under Socials tab).</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">Card Theme</label>
                <select
                  value={data.stats.theme}
                  onChange={(e) => updateField("stats", "theme", e.target.value)}
                  className={`w-full px-4 py-2.5 rounded-xl border focus:outline-none text-sm transition-all duration-300 ${themeStyles.input}`}
                >
                  <option value="default">Default</option>
                  <option value="radical">Radical</option>
                  <option value="merko">Merko</option>
                  <option value="gruvbox">Gruvbox</option>
                  <option value="tokyonight">Tokyo Night</option>
                  <option value="onedark">One Dark</option>
                  <option value="dracula">Dracula</option>
                  <option value="synthwave">Synthwave</option>
                </select>
              </div>

              <div className="space-y-3">
                <label className={`flex items-center gap-3 p-3 bg-black/10 border ${themeStyles.border} rounded-xl cursor-pointer hover:border-white/10 transition-all`}>
                  <input
                    type="checkbox"
                    checked={data.stats.showGeneral}
                    onChange={(e) => updateField("stats", "showGeneral", e.target.checked)}
                    className="accent-indigo-500 h-4 w-4"
                  />
                  <div>
                    <span className="text-sm font-medium block">Show General Stats</span>
                    <span className="text-xs text-gray-500">Stars, commits, PRs, and other general contributions.</span>
                  </div>
                </label>

                <label className={`flex items-center gap-3 p-3 bg-black/10 border ${themeStyles.border} rounded-xl cursor-pointer hover:border-white/10 transition-all`}>
                  <input
                    type="checkbox"
                    checked={data.stats.showLanguages}
                    onChange={(e) => updateField("stats", "showLanguages", e.target.checked)}
                    className="accent-indigo-500 h-4 w-4"
                  />
                  <div>
                    <span className="text-sm font-medium block">Show Most Used Languages</span>
                    <span className="text-xs text-gray-500">Visual percentage breakdown of your repository languages.</span>
                  </div>
                </label>

                <label className={`flex items-center gap-3 p-3 bg-black/10 border ${themeStyles.border} rounded-xl cursor-pointer hover:border-white/10 transition-all`}>
                  <input
                    type="checkbox"
                    checked={data.stats.showStreak}
                    onChange={(e) => updateField("stats", "showStreak", e.target.checked)}
                    className="accent-indigo-500 h-4 w-4"
                  />
                  <div>
                    <span className="text-sm font-medium block">Show GitHub Streak Stats</span>
                    <span className="text-xs text-gray-500">Your longest streak of consecutive contribution days.</span>
                  </div>
                </label>
              </div>
            </div>
          </div>
        )}

        {activeTab === "widgets" && (
          <div className="space-y-6 animate-fadeIn">
            <div>
              <h3 className="font-outfit font-semibold text-lg">Premium Banner & Text Animations</h3>
              <p className="text-xs text-gray-400">Make your profile extremely custom with animated titles and SVG trophies.</p>
            </div>

            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-brand-secondary">Animated Dalgalı Header Banner (Capsule Render)</h4>
              <label className={`flex items-center gap-3 p-3 bg-black/10 border ${themeStyles.border} rounded-xl cursor-pointer hover:border-white/10 transition-all`}>
                <input
                  type="checkbox"
                  checked={data.widgets.showBanner}
                  onChange={(e) => updateField("widgets", "showBanner", e.target.checked)}
                  className="accent-indigo-500 h-4 w-4"
                />
                <div>
                  <span className="text-sm font-medium block">Enable Animated Banner</span>
                  <span className="text-xs text-gray-500">Replaces simple title with waving animated SVG banner.</span>
                </div>
              </label>

              {data.widgets.showBanner && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-black/20 rounded-xl border border-white/5">
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 mb-1">Banner Type</label>
                    <select
                      value={data.widgets.bannerType}
                      onChange={(e) => updateField("widgets", "bannerType", e.target.value)}
                      className={`w-full px-4 py-2.5 rounded-xl border focus:outline-none text-sm transition-all duration-300 ${themeStyles.input}`}
                    >
                      <option value="waving">Waving (Dalgalı)</option>
                      <option value="transparent">Transparent</option>
                      <option value="soft">Soft</option>
                      <option value="slice">Slice (Eğik)</option>
                      <option value="rect">Rectangle</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 mb-1">Banner Theme</label>
                    <select
                      value={data.widgets.bannerTheme}
                      onChange={(e) => updateField("widgets", "bannerTheme", e.target.value)}
                      className={`w-full px-4 py-2.5 rounded-xl border focus:outline-none text-sm transition-all duration-300 ${themeStyles.input}`}
                    >
                      <option value="default">Default</option>
                      <option value="tokyonight">Tokyo Night</option>
                      <option value="radical">Radical</option>
                      <option value="dracula">Dracula</option>
                      <option value="gruvbox">Gruvbox</option>
                      <option value="synthwave">Synthwave</option>
                    </select>
                  </div>
                </div>
              )}

              <hr className={themeStyles.border} />

              <h4 className="text-sm font-semibold text-brand-secondary">Typing Text Animation (Typing SVG)</h4>
              <label className={`flex items-center gap-3 p-3 bg-black/10 border ${themeStyles.border} rounded-xl cursor-pointer hover:border-white/10 transition-all`}>
                <input
                  type="checkbox"
                  checked={data.widgets.showTyping}
                  onChange={(e) => updateField("widgets", "showTyping", e.target.checked)}
                  className="accent-indigo-500 h-4 w-4"
                />
                <div>
                  <span className="text-sm font-medium block">Enable Typing Text Animation</span>
                  <span className="text-xs text-gray-500">Shows typed and auto-deleting animated subheadings.</span>
                </div>
              </label>

              {data.widgets.showTyping && (
                <div className="p-4 bg-black/20 rounded-xl border border-white/5">
                  <label className="block text-xs font-semibold text-gray-400 mb-1">Animated Phrases (Comma-separated)</label>
                  <input
                    type="text"
                    value={data.widgets.typingText}
                    onChange={(e) => updateField("widgets", "typingText", e.target.value)}
                    className={`w-full px-4 py-2.5 rounded-xl border focus:outline-none text-sm transition-all duration-300 ${themeStyles.input}`}
                    placeholder="Full Stack Developer, Open Source Enthusiast"
                  />
                  <p className="text-[10px] text-gray-500 mt-1">Separate different phrases with commas.</p>
                </div>
              )}

              <hr className={themeStyles.border} />

              <h4 className="text-sm font-semibold text-brand-secondary">3D-Style GitHub Trophies</h4>
              <label className={`flex items-center gap-3 p-3 bg-black/10 border ${themeStyles.border} rounded-xl cursor-pointer hover:border-white/10 transition-all`}>
                <input
                  type="checkbox"
                  checked={data.widgets.showTrophies}
                  onChange={(e) => updateField("widgets", "showTrophies", e.target.checked)}
                  className="accent-indigo-500 h-4 w-4"
                />
                <div>
                  <span className="text-sm font-medium block">Show Profile Trophies</span>
                  <span className="text-xs text-gray-500">Show dynamic trophy badges for your commits, stars, repos, etc.</span>
                </div>
              </label>

              {data.widgets.showTrophies && (
                <div className="p-4 bg-black/20 rounded-xl border border-white/5">
                  <label className="block text-xs font-semibold text-gray-400 mb-1">Trophy Theme</label>
                  <select
                    value={data.widgets.trophyTheme}
                    onChange={(e) => updateField("widgets", "trophyTheme", e.target.value)}
                    className={`w-full px-4 py-2.5 rounded-xl border focus:outline-none text-sm transition-all duration-300 ${themeStyles.input}`}
                  >
                    <option value="radical">Radical</option>
                    <option value="tokyonight">Tokyo Night</option>
                    <option value="dracula">Dracula</option>
                    <option value="gruvbox">Gruvbox</option>
                    <option value="juicyfresh">Juicy Fresh</option>
                    <option value="merko">Merko</option>
                  </select>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "extras" && (
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="font-outfit font-semibold text-lg">Extra Badges & Services</h3>
              <div className="space-y-3">
                <label className={`flex items-center gap-3 p-3 bg-black/10 border ${themeStyles.border} rounded-xl cursor-pointer hover:border-white/10 transition-all`}>
                  <input
                    type="checkbox"
                    checked={data.extras.visitorBadge}
                    onChange={(e) => updateField("extras", "visitorBadge", e.target.checked)}
                    className="accent-indigo-500 h-4 w-4"
                  />
                  <div>
                    <span className="text-sm font-medium block">Add Visitor Counter Badge</span>
                    <span className="text-xs text-gray-500">Track and display your profile views with a dynamic badge.</span>
                  </div>
                </label>
              </div>
            </div>

            <hr className={themeStyles.border} />

            <div className="space-y-4">
              <h3 className="font-outfit font-semibold text-lg">Support Me (Coffee Badge)</h3>
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">Buy Me a Coffee Username</label>
                <input
                  type="text"
                  value={data.extras.coffee}
                  onChange={(e) => updateField("extras", "coffee", e.target.value)}
                  className={`w-full px-4 py-2.5 rounded-xl border focus:outline-none text-sm transition-all duration-300 ${themeStyles.input}`}
                  placeholder="coffee_username"
                />
              </div>
            </div>

            <hr className={themeStyles.border} />

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-outfit font-semibold text-lg">Projects Section</h3>
                <button
                  onClick={addCustomProject}
                  className={`flex items-center gap-1 text-xs font-semibold ${themeStyles.btnPrimary} text-white px-3 py-1.5 rounded-lg transition-all shadow-md`}
                >
                  <Plus className="h-3.5 w-3.5" />
                  <span>Add Project</span>
                </button>
              </div>

              <div className="space-y-3">
                {data.projects.list.length === 0 ? (
                  <p className="text-xs text-gray-500 italic">No custom projects added yet. Click Add Project button to create one.</p>
                ) : (
                  data.projects.list.map((proj, idx) => (
                    <div key={idx} className={`p-4 bg-black/10 border ${themeStyles.border} rounded-xl space-y-3 relative group`}>
                      <button
                        onClick={() => deleteCustomProject(idx)}
                        className={`absolute top-3 right-3 p-1 rounded-lg text-gray-500 hover:text-red-400 bg-white/5 border ${themeStyles.border} hover:border-red-500/20 hover:bg-red-500/5 transition-all opacity-0 group-hover:opacity-100`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                      <div>
                        <label className="block text-[10px] font-semibold text-gray-400 mb-1">Project Name</label>
                        <input
                          type="text"
                          value={proj.name}
                          onChange={(e) => updateCustomProject(idx, "name", e.target.value)}
                          className={`w-[calc(100%-2rem)] px-3 py-1.5 rounded-lg border focus:outline-none text-xs transition-all duration-300 ${themeStyles.input}`}
                          placeholder="My Awesome App"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-semibold text-gray-400 mb-1">Project Description</label>
                        <input
                          type="text"
                          value={proj.description}
                          onChange={(e) => updateCustomProject(idx, "description", e.target.value)}
                          className={`w-full px-3 py-1.5 rounded-lg border focus:outline-none text-xs transition-all duration-300 ${themeStyles.input}`}
                          placeholder="A React web app built to solve user issues"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-semibold text-gray-400 mb-1">Project Link</label>
                        <input
                          type="text"
                          value={proj.link}
                          onChange={(e) => updateCustomProject(idx, "link", e.target.value)}
                          className={`w-full px-3 py-1.5 rounded-lg border focus:outline-none text-xs transition-all duration-300 ${themeStyles.input}`}
                          placeholder="https://github.com/myusername/myapp"
                        />
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
