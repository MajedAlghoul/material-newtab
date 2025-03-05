import { useGridsWH } from "../../../hooks/useGridsWH.jsx";
import styles from "./BookmarksMenu.module.css";
import { useWidgets } from "../../../hooks/useWidgets.jsx";
import { useGridsContent } from "../../../hooks/useGridsContent.jsx";
import { useEffect, useState, useRef } from "react";
import { useGridRepresentation } from "../../../hooks/useGridRepresentation.jsx";
import DefaultMenu from "../../defaultMenu/DefaultMenu.jsx";
import { bookmarksMenuShadow } from "../../../app/Svgs.jsx";
import { useBookmarks } from "../../../hooks/useBookmarks.jsx";
import { BookmarkItem } from "../../bookmarkItem/BookmarkItem.jsx";
import { render } from "@testing-library/react";
export function BookmarksMenu() {
  //const [layout, setLayout] = useState({ x: null, y: null, w: null, h: null });

  const [content, setContent] = useState(null);

  const { gridsWH } = useGridsWH();

  const isInitialMount = useRef(true);
  const {
    hardFlushMenu,
    softFlushMenu,
    leftItems,
    centerItems,
    RightItems,
    HiddenItems,
    addItems,
    removeItems,
    centerWidget,
    rightWidget,
    removePlaceHolders,
  } = useGridsContent();
  const { widgets, addWidget, removeWidget, editWidget, getComponent } =
    useWidgets();
  const { bookmarks, isFolder } = useBookmarks();
  const [viewedBookmark, setViewedBookmark] = useState(null);

  const handleViewBookmark = (bookmark, isClosing = false, parent) => {
    //console.log("ddfc", viewedBookmark, bookmark, previousBookmark);
    if (isClosing) {
      // If closing current folder, go back to previous
      //if (bookmark.id === previousBookmark.id) {
      //  setViewedBookmark(null);
      //} else {
      setViewedBookmark(parent);
      //}
    } else if (!viewedBookmark || bookmark.id !== viewedBookmark.id) {
      setViewedBookmark(bookmark);
    }
  };

  /*
  useEffect(() => {
    console.log("changed", viewedBookmark);
  }, [viewedBookmark]);
*/
  const renderContent = () => {
    const rw = gridsWH["rw"];
    const cw = gridsWH["cw"];
    if (rw) {
      if (Object.keys(bookmarks).length > 0) {
        if (rw === 1 && cw === 5) {
          return (
            <div className={`${styles["bookmarks-list-expanded"]}`}>
              <div className={`${styles["bookmarks-left-houser"]}`}>
                {Object.values(bookmarks[0].children).map((value) => {
                  if (isFolder(value)) {
                    return (
                      <BookmarkItem
                        key={value.id}
                        title={value.title}
                        setV={handleViewBookmark}
                        self={value}
                        parentBookmark={bookmarks[0]}
                        isActive={value === viewedBookmark}
                        activeBookmark={viewedBookmark}
                        isInExpanded={true}
                      >
                        {value.children}
                      </BookmarkItem>
                    );
                  }
                  return (
                    <BookmarkItem
                      key={value.id}
                      title={value.title}
                      url={value.url}
                      isInExpanded={true}
                    />
                  );
                })}
                <BookmarkItem
                  key={bookmarks[1].id}
                  title={bookmarks[1].title}
                  setV={handleViewBookmark}
                  self={bookmarks[1]}
                  isActive={bookmarks[1] === viewedBookmark}
                  activeBookmark={viewedBookmark}
                  isInExpanded={true}
                >
                  {bookmarks[1].children}
                </BookmarkItem>
              </div>
              <div className={`${styles["bookmarks-list-separator"]}`}></div>
              <div className={`${styles["bookmarks-right-houser"]}`}>
                {viewedBookmark && (
                  <div className={styles["bookmarks-folder-content"]}>
                    <div className={styles["folder-title"]}>
                      {viewedBookmark.title}
                    </div>
                    {Object.values(viewedBookmark.children).map((value) => {
                      if (isFolder(value)) {
                        return (
                          <BookmarkItem
                            key={value.id}
                            title={value.title}
                            setV={handleViewBookmark}
                            self={value}
                            inRightPanel={true}
                            parentBookmark={viewedBookmark}
                            activeBookmark={viewedBookmark}
                            isInExpanded={true}
                          >
                            {value.children}
                          </BookmarkItem>
                        );
                      }
                      return (
                        <BookmarkItem
                          key={value.id}
                          title={value.title}
                          url={value.url}
                          isInExpanded={true}
                          inRightPanel={true}
                        />
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          );
        } else {
          return (
            <div className={`${styles["bookmarks-list"]}`}>
              {Object.values(bookmarks[0].children).map((value) => {
                if (isFolder(value)) {
                  return (
                    <BookmarkItem key={value.id} title={value.title}>
                      {value.children}
                    </BookmarkItem>
                  );
                }
                return (
                  <BookmarkItem
                    key={value.id}
                    title={value.title}
                    url={value.url}
                  ></BookmarkItem>
                );
              })}
              <BookmarkItem key={bookmarks[1].id} title={bookmarks[1].title}>
                {bookmarks[1].children}
              </BookmarkItem>
            </div>
          );
        }
      } else {
        return (
          <div className={styles["no-hidden-widgets"]}>No hidden widgets</div>
        );
      }
    }
  };

  return (
    <DefaultMenu
      cShadow={bookmarksMenuShadow}
      shiftX={0}
      cX={2}
      cStyle="bookmarks-menu-shadow"
      title={"Bookmarks"}
    >
      {renderContent()}
    </DefaultMenu>
  );
}
