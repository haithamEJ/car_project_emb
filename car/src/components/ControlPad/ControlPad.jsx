import { useState } from "react";
import "./ControlPad.css";

const SIZE = 110;   // outer circle diameter px
const KNOB = 36;    // inner knob diameter px
const MAX  = (SIZE - KNOB) / 2;  // max knob travel

function getDirection(dx, dy) {
  if (Math.abs(dx) < 8 && Math.abs(dy) < 8) return null;
  const angle = Math.atan2(dy, dx) * (180 / Math.PI);
  if (angle > -45  && angle <= 45)  return "TURN_RIGHT";
  if (angle > 45   && angle <= 135) return "MOVE_BACK";
  if (angle > 135  || angle <= -135) return "TURN_LEFT";
  return "MOVE_FORWARD";
}

export default function ControlPad({ dispatch, mode, setMode }) {
  const [knob, setKnob] = useState({ x: 0, y: 0 });
  const enabled = mode === "manual";

  function handleClick(e) {
    if (!enabled) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const scale = Math.min(dist, MAX) / dist || 0;
    const kx = dx * scale;
    const ky = dy * scale;
    setKnob({ x: kx, y: ky });

    const dir = getDirection(dx, dy);
    if (dir) dispatch({ type: dir });

    // snap back after 300ms
    setTimeout(() => setKnob({ x: 0, y: 0 }), 300);
  }

  return (
    <div className="panel">
      <div className="panel-label">Directional Control</div>
      <div className="joystick-wrap">
        <div
          className={`joystick-base ${!enabled ? "joystick-base--off" : ""}`}
          onClick={handleClick}
        >
          <div
            className="joystick-knob"
            style={{ transform: `translate(${knob.x}px, ${knob.y}px)` }}
          />
        </div>
      </div>

      {/* Auto / Manual radio */}
      <div className="drive-mode">
        <label className="radio-opt">
          <input
            type="radio"
            name="drivemode"
            value="auto"
            checked={mode !== "manual"}
            onChange={() => { dispatch({ type: "SET_MODE_AUTO" }); setMode("idle"); }}
          />
          <span>Auto</span>
        </label>
        <label className="radio-opt">
          <input
            type="radio"
            name="drivemode"
            value="manual"
            checked={mode === "manual"}
          onChange={() => { dispatch({ type: "SET_MODE_MANUAL" }); setMode("manual"); }}
          />
          <span>Manual</span>
        </label>
      </div>
    </div>
  );
}