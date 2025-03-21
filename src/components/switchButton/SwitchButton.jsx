import { useEffect, useState } from "react";
import styles from "./SwitchButton.module.css";

export function SwitchButton({ trigger, defaultValue = false }) {
  const [active, setActive] = useState(defaultValue);
  useEffect(() => {
    trigger(active);
  }, [active]);
  return (
    <button
      onClick={() => setActive(!active)}
      className={`${styles["switch-button"]} ${active && styles["active"]}`}
    ></button>
  );
}
