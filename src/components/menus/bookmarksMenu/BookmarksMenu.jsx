import { useGridsWH } from "../../../hooks/useGridsWH.jsx";
import "./BookmarksMenu.css";
import { useWidgets } from "../../../hooks/useWidgets.jsx";
import { useGridsContent } from "../../../hooks/useGridsContent.jsx";
import { useEffect, useState, useRef } from "react";
import { useGridRepresentation } from "../../../hooks/useGridRepresentation.jsx";

export function BookmarksMenu({ setClasses }) {
  const [layout, setLayout] = useState({ x: null, y: null, w: null, h: null });

  const [content, setContent] = useState(null);

  const { gridsWH } = useGridsWH();

  const isInitialMount = useRef(true);
  const { hardFlushMenu, softFlushMenu } = useGridsContent();
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else if (gridsWH) {
      setClasses("bookmarks-widget");
      hardFlushMenu();
    }
  }, [gridsWH]);
  useEffect(() => {
    let w = gridsWH["rw"];
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
              <div className="actual-bookmarks-menu"></div>
              <svg
                width="312"
                height="416"
                viewBox="0 0 312 416"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="bookmarks-menu-shadow-1"
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
              <div className="actual-bookmarks-menu"></div>
              <svg
                width="520"
                height="415"
                viewBox="0 0 520 415"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="bookmarks-menu-shadow-1"
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
        setLayout({
          x: 2,
          y: 1,
          w: 3,
          h: 4,
        });
        setContent(
          <>
            <div className="actual-bookmarks-menu"></div>
            <svg
              width="312"
              height="519"
              viewBox="0 0 312 519"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="bookmarks-menu-shadow"
            >
              <path
                d="M0 480C0 501.539 17.4609 519 39 519H273C294.539 519 312 501.539 312 480V144C312 122.461 294.539 105 273 105H247C225.461 105 208 87.5391 208 66V39C208 17.4609 190.539 0 169 0H39C17.4609 0 0 17.4609 0 39V480Z"
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
