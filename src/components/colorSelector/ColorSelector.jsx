import styles from "./ColorSelector.module.scss";

export function ColorSelector({ defaultColor = "#ff0000" }) {
  return (
    <input
      className={styles["color-selector"]}
      type="color"
      defaultValue={defaultColor}
    />
  );
}
