import { useEffect, useState } from "react";
import './App.css';
import Header from "./components/Header"; // adjust the path if needed

function App() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    // Add or remove the "dark" class on <html>
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === "light" ? "dark" : "light"));
  };

  return (
    <>
      <Header toggleTheme={toggleTheme} theme={theme} />

      <div className="p-6 min-h-screen bg-white text-black dark:bg-gray-800 dark:text-white transition-colors duration-300">
        <h1 className="text-4xl font-bold text-red-500 dark:text-yellow-400">
          Tailwind Works!
        </h1>
        <p className="mt-4">
          This is an example of dark/light theme using Tailwind CSS and React.
        </p>
      </div>
    </>
  );
}

export default App;
