import "./BookmarksWidget.css";
import WidgetTemplate from "../../widgetTemplate/WidgetTemplate.jsx";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";

export function BookmarksWidget({ id }) {
  const [layout, setLayout] = useState({ x: null, y: null, w: null, h: null });

  const [content, setContent] = useState(null);

  useEffect(() => {
    if (layout.w === 1 && layout.h === 1) {
      setContent(() => {
        return (
          <>
            <svg
              width="15"
              height="22"
              viewBox="0 0 15 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.6667 22L7.33333 15.5833L0 22V1.83333C0 0.820417 0.820417 0 1.83333 0H12.8333C13.8463 0 14.6667 0.820417 14.6667 1.83333V22Z"
                fill="black"
              />
            </svg>
          </>
        );
      });
    } else {
      setContent(() => {
        return (
          <div className="bookmarks-big-outer-div">
            <svg
              width="15"
              height="22"
              viewBox="0 0 15 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.6667 22L7.33333 15.5833L0 22V1.83333C0 0.820417 0.820417 0 1.83333 0H12.8333C13.8463 0 14.6667 0.820417 14.6667 1.83333V22Z"
                fill="black"
              />
            </svg>
            <div className="bookmarks-big-text">Bookmarks</div>
          </div>
        );
      });
    }
  }, [layout.w, layout.h]);
  return (
    <WidgetTemplate
      className="bookmarks-widget"
      id={id}
      sizes={BookmarksWidgetSizes}
      layout={layout}
      setLayout={setLayout}
    >
      {content}
    </WidgetTemplate>
  );
}
BookmarksWidget.propTypes = {
  id: PropTypes.string,
};

export const BookmarksWidgetSizes = {
  sizesCount: 2,
  sizes: [
    { w: 1, h: 1 },
    { w: 2, h: 1 },
  ],
};
