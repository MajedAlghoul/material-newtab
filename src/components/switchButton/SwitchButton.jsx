import { useState } from "react";
import styles from "./SwitchButton.module.css";

export function SwitchButton() {
  const [active, setActive] = useState(false);

  return (
    <button
      onClick={() => setActive(!active)}
      className={`${styles["switch-button"]} ${active && styles["active"]}`}
    ></button>
  );
}
