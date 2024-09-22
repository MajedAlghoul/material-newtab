import { useGridsWH } from "../../../hooks/useGridsWH.js";
import "./CustomizeMenu.css";
import { useWidgets } from "../../../hooks/useWidgets.js";
import { useGridsContent } from "../../../hooks/useGridsContent.js";
import { useEffect, useState, useRef } from "react";
import { useGridRepresentation } from "../../../hooks/useGridRepresentation.js";

export function CustomizeMenu({ setClasses }) {
  const [layout, setLayout] = useState({ x: null, y: null, w: null, h: null });

  const [content, setContent] = useState(null);

  const { gridsWH } = useGridsWH();

  const isInitialMount = useRef(true);
  const { flushMenu } = useGridsContent();
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else if (gridsWH) {
      setClasses("customize-widget");
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
              <div className="actual-customize-menu"></div>
              <svg
                width="312"
                height="416"
                viewBox="0 0 312 416"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="customize-menu-shadow-1"
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
              <div className="actual-customize-menu"></div>
              <svg
                width="520"
                height="415"
                viewBox="0 0 520 415"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="customize-menu-shadow-1"
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
            <div className="actual-customize-menu"></div>
            <svg
              width="312"
              height="519"
              viewBox="0 0 312 519"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="customize-menu-shadow"
            >
              <path
                d="M312 39C312 17.4609 294.539 0 273 0H39C17.4609 0 0 17.4609 0 39V377C0 398.539 17.4609 416 39 416H65C86.5391 416 104 433.461 104 455V480C104 501.539 121.461 519 143 519H273C294.539 519 312 501.539 312 480V39Z"
                fill="var(--highlight-color)"
              />
            </svg>
            <svg
              width="312"
              height="519"
              viewBox="0 0 312 519"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M312 39C312 17.4609 294.539 0 273 0H39C17.4609 0 0 17.4609 0 39V375C0 396.539 17.4609 414 39 414H65C86.5391 414 104 431.461 104 453V480C104 501.539 121.461 519 143 519H273C294.539 519 312 501.539 312 480V39Z" />
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
