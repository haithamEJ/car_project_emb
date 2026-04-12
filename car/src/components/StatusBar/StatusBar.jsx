import "./StatusBar.css";

const STATS = [
  { label: "Battery",    key: "battery",     unit: "%",  color: (v) => v > 30 ? "var(--grn)" : "var(--red)" },
  { label: "Signal",     key: "signal",      unit: "%",  color: () => "var(--cyan)" },
  { label: "Motor Temp", key: "temperature", unit: "°C", color: (v) => v > 60 ? "var(--red)" : "var(--amb)" },
];

export default function StatusBar({ robotState }) {
  return (
    <div className="panel">
      <div className="panel-label">System Status</div>
      <div className="status-body">
        {STATS.map(stat => {
          const value = robotState[stat.key];
          const color = stat.color(value);
          const pct = stat.unit === "%" ? value : (value / 100) * 100;
          return (
            <div key={stat.key} className="stat-item">
              <div className="stat-row">
                <span className="stat-label">{stat.label}</span>
                <span className="stat-value" style={{ color }}>{value}{stat.unit}</span>
              </div>
              <div className="stat-track">
                <div className="stat-fill" style={{ width: `${pct}%`, background: color }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}