import "./BookmarksWidget.css";
import WidgetTemplate from "../../widgetTemplate/WidgetTemplate.jsx";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { BookmarksMenu } from "../../menus/bookmarksMenu/bookmarksMenu.jsx";
import { useGridsContent } from "../../../hooks/useGridsContent.jsx";
import { useGridsWH } from "../../../hooks/useGridsWH.jsx";

export function BookmarksWidget({ id }) {
  const [layout, setLayout] = useState({ x: null, y: null, w: null, h: null });
  const { gridsWH } = useGridsWH();
  const [content, setContent] = useState(null);
  const [classes, setClasses] = useState("bookmarks-widget");
  const {
    leftItems,
    centerItems,
    RightItems,
    HiddenItems,
    addItems,
    removeItems,
    centerWidget,
    rightWidget,
    hardFlushMenu,
    softFlushMenu,
    isMenuVisible,
    currentClass,
  } = useGridsContent();
  const handleOnClick = () => {
    const w = gridsWH["rw"];
    if (w) {
      hardFlushMenu();
      if (!isMenuVisible() || currentClass() !== "bookmarks-widget") {
        if (w === 1) {
          addItems(
            "centerW",
            <BookmarksMenu key={"bookmarks-menu"}></BookmarksMenu>,
            setClasses,
            "bookmarks-widget"
          );
        } else {
          addItems(
            "rightW",
            <BookmarksMenu key={"bookmarks-menu"}></BookmarksMenu>,
            setClasses,
            "bookmarks-widget"
          );
        }
        setClasses("bookmarks-widget bookmarks-widget-active");
      }
    }
  };
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
      className={classes}
      id={id}
      layout={layout}
      setLayout={setLayout}
    >
      <button className="bookmarks-widget-button" onClick={handleOnClick}>
        {content}
      </button>
    </WidgetTemplate>
  );
}
BookmarksWidget.propTypes = {
  id: PropTypes.string,
};
