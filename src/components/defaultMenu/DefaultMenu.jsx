import { useGridsWH } from "../../hooks/useGridsWH.jsx";
import styles from "./DefaultMenu.module.css";
import { useGridsContent } from "../../hooks/useGridsContent.jsx";
import { useEffect, useState, useRef } from "react";
import { useGridRepresentation } from "../../hooks/useGridRepresentation.jsx";
import { useWidgetsBlueprints } from "../../hooks/useWidgetsBlueprints.jsx";
import {
  sliderBackArrow,
  sliderForwardArrow,
  closeXSvg,
  hiddenWidgetsMenuShadow,
} from "../../app/Svgs.jsx";
function DefaultMenu({ shiftX = null, cShadow = null, title, children }) {
  const [layout, setLayout] = useState({ x: null, y: null, w: null, h: null });

  const [content, setContent] = useState([]);

  const { gridsWH } = useGridsWH();

  const isInitialMount = useRef(true);
  const { hardFlushMenu, softFlushMenu, addItems, centerWidget, rightWidget } =
    useGridsContent();

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else if (gridsWH) {
      //setClasses("add-new-item-widget");
      hardFlushMenu();
    }
  }, [gridsWH]);

  const closeMenu = () => {
    hardFlushMenu();
  };

  useEffect(() => {
    const g = centerWidget.length === 0 ? "rw" : "cw";
    let w = gridsWH[g];
    if (w) {
      setContent([
        <div
          key={"widget-menu-content"}
          className={styles["actual-widgets-menu"]}
        >
          <div className={styles["actual-widgets-menu-inner"]}>
            <div className={styles["top-widget-menu-container"]}>
              <div className={styles["widget-menu-title-text"]}>{title}</div>
              <button
                className={styles["widget-menu-title-x-button"]}
                onClick={closeMenu}
              >
                {closeXSvg}
              </button>
            </div>
            <div className={styles["bottom-widget-menu-container"]}>
              {children}
            </div>
          </div>
        </div>,
      ]);

      if (w === 5) {
        setLayout({
          x: 1,
          y: 1,
          w: 5,
          h: 4,
        });
        setContent((prev) => {
          return [
            ...prev,
            <svg
              width="520"
              height="415"
              viewBox="0 0 520 415"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={styles["widgets-menu-shadow"]}
              key={"widget-menu-shadow"}
            >
              <rect
                width="520"
                height="415"
                rx="39"
                fill="var(--highlight-color)"
              />
            </svg>,
          ];
        });
      } else {
        setLayout({
          x: 1,
          y: 1,
          w: 3,
          h: 4,
        });
        setContent((prev) => {
          return [
            ...prev,
            <svg
              width="312"
              height="416"
              viewBox="0 0 312 416"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={styles["widgets-menu-shadow"]}
              key={"widget-menu-shadow"}
            >
              <rect
                width="312"
                height="416"
                rx="39"
                fill="var(--highlight-color)"
              />
            </svg>,
          ];
        });
      }
      if (rightWidget.length > 0 && gridsWH["gh"] > 5 && shiftX) {
        setLayout((prev) => {
          let temp = { ...prev };
          temp.x = shiftX;
          return temp;
        });
      }
    }
  }, [children]);

  return (
    <div
      className={`menu-template`}
      style={{
        gridRow: `${layout.x} / ${layout.x + layout.h}`,
        gridColumn: `${layout.y} / ${layout.y + layout.w}`,
        width: `${layout.w * 76 + (layout.w - 1) * 28}px`,
        height: `${layout.h * 76 + (layout.h - 1) * 28}px`,
      }}
    >
      {content}
      {rightWidget.length > 0 ? cShadow : null}
    </div>
  );
}

export default DefaultMenu;
