import { useEffect, useState } from "react";
import { useTheme } from "../../hooks/useTheme.jsx";
import styles from "./ColorSelector.module.scss";

export function ColorSelector({ label }) {
  const { theme, updateTheme, isMonochrome } = useTheme();
  const [defaultColor, setDefaultColor] = useState(theme[label]);
  const handleOnChange = (color) => {
    updateTheme({
      [label]: color,
    });
  };

  useEffect(() => {
    if (theme[label] !== "--secondary-color") {
      setDefaultColor(theme[label]);
    }
  }, [theme["--primary-color"]]);
  return (
    <input
      className={`${styles["color-selector"]} ${
        isMonochrome && styles["color-selector-disabled"]
      }`}
      type="color"
      value={defaultColor}
      onChange={(e) => handleOnChange(e.target.value)}
      disabled={isMonochrome}
    />
  );
}
