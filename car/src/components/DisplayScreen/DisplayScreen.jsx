import "./DisplayScreen.css";

export default function DisplayScreen({ robotState }) {
  const speed = robotState.speed;
  const barColor = speed > 70 ? "var(--red)" : speed > 40 ? "var(--amb)" : "var(--cyan)";

  return (
    <section className="display-screen panel">
      <div className="speed-strip">
        <span className="spd-num" style={{ color: barColor }}>{speed}</span>
        <span className="spd-unit">KM/H</span>
        <div className="spd-bar-wrap">
          <div className="spd-bar" style={{ width: `${speed}%`, background: barColor }} />
        </div>
      </div>
      <div className="viz-area">
        <div className="viz-inner">
          <div className="viz-icon">◈</div>
          <p className="viz-label">3D Visualization</p>
          <p className="viz-hint">React Three Fiber goes here</p>
        </div>
      </div>
    </section>
  );
}