import "./Toolbar.css";

export default function Toolbar({ mode, setMode, dispatch }) {
  function handleReset() {
    dispatch({ type: "RESET" });
    setMode("idle");
  }
  function handleStart() {
    dispatch({ type: "START" });
    setMode("running");
  }
  function handleManual() {
    setMode(mode === "manual" ? "idle" : "manual");
  }

  return (
    <nav className="toolbar panel">
      <button className="tbtn tbtn--danger" onClick={handleReset}>↺ Reset</button>
      <button className="tbtn tbtn--primary" onClick={handleStart}>▶ Start</button>
      <button
        className={`tbtn tbtn--secondary ${mode === "manual" ? "tbtn--active-manual" : ""}`}
        onClick={handleManual}
      >
        ⊕ Manual
      </button>
      <button className="tbtn tbtn--ghost">⚙ Settings</button>
    </nav>
  );
}