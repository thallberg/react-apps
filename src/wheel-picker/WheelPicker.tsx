import React, { useState } from "react";
import "./WheelPicker.css";

const WheelPicker = () => {
  const items = Array.from({ length: 10 }, (_, i) => i); // 0–9
const angleStep = 250 / items.length;

  const [selectedIndex, setSelectedIndex] = useState(0);

  const rotateWheel = (direction: "up" | "down") => {
    setSelectedIndex((prev) => {
      const next = direction === "up" ? prev - 1 : prev + 1;
      return (next + items.length) % items.length;
    });
  };

  return (
    <div className="container">
      <div
        className="wheel"
        style={{ transform: `rotateX(-${selectedIndex * angleStep}deg)` }}
      >
        {items.map((item, index) => {
          const angle = index * angleStep;
          const distance = Math.abs(index - selectedIndex);
          const opacity = distance === 0 ? 1 : 0.4;
          const blur = distance === 0 ? "0px" : "2px";

          return (
            <div
              key={index}
              className="item"
              style={{
                "--angle": `${angle}deg`,
                "--opacity": opacity,
                "--blur": blur,
              } as React.CSSProperties}
            >
              {item}
            </div>
          );
        })}
      </div>

      <div className="controls">
        <button onClick={() => rotateWheel("up")}>▲</button>
        <button onClick={() => rotateWheel("down")}>▼</button>
      </div>
    </div>
  );
};

export default WheelPicker;
