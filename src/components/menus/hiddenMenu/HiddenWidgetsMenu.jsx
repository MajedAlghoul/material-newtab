import { useGridsWH } from "../../../hooks/useGridsWH.js";
import "./HiddenWidgetsMenu.css";
import { useWidgets } from "../../../hooks/useWidgets.js";
import { useGridsContent } from "../../../hooks/useGridsContent.js";
import { useEffect, useState, useRef } from "react";
import { useGridRepresentation } from "../../../hooks/useGridRepresentation.js";

export function HiddenWidgetsMenu({ setClasses }) {
  const [layout, setLayout] = useState({ x: null, y: null, w: null, h: null });

  const [content, setContent] = useState(null);

  const { gridsWH } = useGridsWH();

  const isInitialMount = useRef(true);
  const { flushMenu } = useGridsContent();
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else if (gridsWH) {
      setClasses("hidden-widgets-widget");
      flushMenu();
    }
  }, [gridsWH]);
  useEffect(() => {
    let w = gridsWH["rw"];
    const h = gridsWH["gh"];
    if (w) {
      if (w === 1) {
        w = gridsWH["cw"];
        if (w === 3) {
          setLayout({
            x: 1,
            y: 1,
            w: 3,
            h: 4,
          });
          setContent(
            <>
              <div className="actual-hidden-widgets-menu"></div>
              <svg
                width="312"
                height="416"
                viewBox="0 0 312 416"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="hidden-widgets-menu-shadow-1"
              >
                <rect
                  width="312"
                  height="416"
                  rx="39"
                  fill="var(--highlight-color)"
                />
              </svg>
            </>
          );
        } else {
          setLayout({
            x: 1,
            y: 1,
            w: 5,
            h: 4,
          });
          setContent(
            <>
              <div className="actual-hidden-widgets-menu"></div>
              <svg
                width="520"
                height="415"
                viewBox="0 0 520 415"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="hidden-widgets-menu-shadow-1"
              >
                <rect
                  width="520"
                  height="415"
                  rx="39"
                  fill="var(--highlight-color)"
                />
              </svg>
            </>
          );
        }
      } else {
        if (h === 5) {
          setLayout({
            x: 1,
            y: 1,
            w: 3,
            h: 4,
          });
        } else {
          setLayout({
            x: 4,
            y: 1,
            w: 3,
            h: 4,
          });
        }

        setContent(
          <>
            <div className="actual-hidden-widgets-menu"></div>
            <svg
              width="312"
              height="520"
              viewBox="0 0 312 520"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="hidden-widgets-menu-shadow"
            >
              <path
                d="M0 39C0 17.4609 17.4609 0 39 0H273C294.539 0 312 17.4609 312 39V379C312 400.539 294.539 418 273 418H143C121.461 418 104 435.461 104 457V481C104 502.539 86.5391 520 65 520H39C17.4609 520 0 502.539 0 481V39Z"
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
