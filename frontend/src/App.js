import { useCallback, useEffect, useState } from "react";
import "./App.css";
import api from "./api";
import ProjectForm from "./components/ProjectForm";
import Dashboard from "./components/Dashboard";

const THEME_KEY = "freelance-tracker-theme";
const THEME_ORDER = ["system", "light", "dark"];

function App() {
  const [projects, setProjects] = useState([]);
  const [theme, setTheme] = useState(() => {
    const stored = localStorage.getItem(THEME_KEY);
    return THEME_ORDER.includes(stored) ? stored : "system";
  });

  const fetchProjects = useCallback(async () => {
    try {
      const response = await api.get("/projects");
      setProjects(response.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  useEffect(() => {
    const root = document.documentElement;

    if (theme === "system") {
      root.removeAttribute("data-theme");
    } else {
      root.setAttribute("data-theme", theme);
    }

    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  const cycleTheme = () => {
    setTheme((current) => {
      const nextIndex = (THEME_ORDER.indexOf(current) + 1) % THEME_ORDER.length;
      return THEME_ORDER[nextIndex];
    });
  };

  return (
    <div className="container">
      <header className="app-header">
        <div className="app-header-text">
          <h1>Freelance Project Tracker</h1>
          <p className="app-subtitle">
            Keep every client, budget and deadline in one place.
          </p>
        </div>

        <button
          type="button"
          className="btn btn-outline theme-toggle"
          onClick={cycleTheme}
          aria-label={`Colour theme: ${theme}. Activate to switch theme.`}
          title={`Theme: ${theme}`}
        >
          {theme === "system"
            ? "Theme: System"
            : theme === "light"
            ? "Theme: Light"
            : "Theme: Dark"}
        </button>
      </header>

      <ProjectForm onProjectAdded={fetchProjects} />

      <Dashboard projects={projects} onRefresh={fetchProjects} />
    </div>
  );
}

export default App;
