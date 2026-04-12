import "./ControlPad.css";

const BUTTONS = [
  { id: "fwd",  label: "↑", action: "MOVE_FORWARD", pos: "up" },
  { id: "lft",  label: "←", action: "TURN_LEFT",    pos: "left" },
  { id: "stp",  label: "⏹", action: "STOP",         pos: "center", isStop: true },
  { id: "rgt",  label: "→", action: "TURN_RIGHT",   pos: "right" },
  { id: "bck",  label: "↓", action: "MOVE_BACK",    pos: "bottom" },
];

export default function ControlPad({ dispatch, mode }) {
  const enabled = mode === "manual";

  return (
    <div className="panel">
      <div className="panel-label">Directional Control</div>
      <div className="dpad-wrap">
        <div className="dpad">
          {BUTTONS.map(btn => (
            <button
              key={btn.id}
              className={`dpad-btn dpad-btn--${btn.pos} ${btn.isStop ? "dpad-btn--stop" : ""} ${!enabled ? "dpad-btn--disabled" : ""}`}
              onClick={() => enabled && dispatch({ type: btn.action })}
              disabled={!enabled}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}