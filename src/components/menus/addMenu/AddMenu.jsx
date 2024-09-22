import { useGridsWH } from "../../../hooks/useGridsWH.js";
import "./AddMenu.css";
import { useWidgets } from "../../../hooks/useWidgets.js";
import { useGridsContent } from "../../../hooks/useGridsContent.js";
import { useEffect, useState, useRef } from "react";
import { useGridRepresentation } from "../../../hooks/useGridRepresentation.js";

export function AddMenu({ setClasses }) {
  const [layout, setLayout] = useState({ x: null, y: null, w: null, h: null });

  const [content, setContent] = useState(null);

  const { gridsWH } = useGridsWH();

  const isInitialMount = useRef(true);
  const { flushMenu } = useGridsContent();
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else if (gridsWH) {
      setClasses("add-new-item-widget");
      flushMenu();
    }
  }, [gridsWH]);
  useEffect(() => {
    const w = gridsWH["rw"];
    if (w) {
      if (w === 1) {
        setLayout({
          x: 2,
          y: 1,
          w: 1,
          h: 2,
        });

        setContent(
          <>
            <div className="actual-add-menu"></div>
            <svg
              width="104"
              height="311"
              viewBox="0 0 104 311"
              fill="none"
              className="add-menu-shadow-1"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                width="104"
                height="311"
                rx="39"
                fill="var(--highlight-color)"
              />
            </svg>
          </>
        );
      } else {
        setLayout({
          x: 1,
          y: 2,
          w: 2,
          h: 2,
        });
        setContent(
          <>
            <div className="actual-add-menu"></div>

            <svg
              width="312"
              height="207"
              viewBox="0 0 312 207"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="add-menu-shadow"
            >
              <path
                d="M0 39C0 17.4609 17.4609 0 39 0H273C294.539 0 312 17.4609 312 39V66C312 87.5391 294.539 105 273 105H247C225.461 105 208 122.461 208 144V168C208 189.539 190.539 207 169 207H39C17.4609 207 0 189.539 0 168V39Z"
                fill="var(--highlight-color)"
              />
            </svg>
          </>
        );
      }
    }
  }, []);
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
    </div>
  );
}
