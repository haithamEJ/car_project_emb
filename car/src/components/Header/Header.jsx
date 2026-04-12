import "./Header.css";

export default function Header({ darkMode, toggleTheme }) {
  return (
    <header className="header panel">
      <span className="logo-text">RoboCar</span>
      <button className="theme-btn" onClick={toggleTheme}>
        {darkMode ? "☀ LIGHT MODE" : "☾ DARK MODE"}
      </button>
    </header>
  );
}