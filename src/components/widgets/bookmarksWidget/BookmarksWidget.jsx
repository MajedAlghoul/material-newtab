import styles from "./BookmarksWidget.module.scss";
import WidgetTemplate from "../../widgetTemplate/WidgetTemplate.jsx";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { BookmarksMenu } from "../../menus/bookmarksMenu/BookmarksMenu.jsx";
import { useGridsContent } from "../../../hooks/useGridsContent.jsx";
import { useGridsWH } from "../../../hooks/useGridsWH.jsx";
import { bookmarkSvg } from "../../../app/Svgs.jsx";

export function BookmarksWidget({ id }) {
  const [layout, setLayout] = useState({ x: null, y: null, w: null, h: null });
  const { gridsWH } = useGridsWH();
  const [content, setContent] = useState(null);
  const [classes, setClasses] = useState(styles.bookmarksWidget);

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
      if (!isMenuVisible() || currentClass() !== styles.bookmarksWidget) {
        if (w === 1) {
          addItems(
            "centerW",
            <BookmarksMenu key={"bookmarks-menu"}></BookmarksMenu>,
            setClasses,
            styles.bookmarksWidget
          );
        } else {
          addItems(
            "rightW",
            <BookmarksMenu key={"bookmarks-menu"}></BookmarksMenu>,
            setClasses,
            styles.bookmarksWidget
          );
        }
        setClasses(
          `${styles.bookmarksWidget} ${styles.bookmarksWidgetActive} ${
            w > 1 ? styles.noshadow : ""
          }`
        );
      }
    }
  };

  useEffect(() => {
    if (layout.w === 1 && layout.h === 1) {
      setContent(() => {
        return bookmarkSvg;
      });
    } else {
      setContent(() => {
        return (
          <div className={styles.bookmarksBigOuterDiv}>
            {bookmarkSvg}
            <div className={styles.bookmarksBigText}>Bookmarks</div>
          </div>
        );
      });
    }
  }, [layout.w, layout.h]);

  return (
    <WidgetTemplate
      className={`${styles.widget} ${classes}`}
      id={id}
      layout={layout}
      setLayout={setLayout}
    >
      <button className={styles.bookmarksWidgetButton} onClick={handleOnClick}>
        {content}
      </button>
    </WidgetTemplate>
  );
}

BookmarksWidget.propTypes = {
  id: PropTypes.string,
};
