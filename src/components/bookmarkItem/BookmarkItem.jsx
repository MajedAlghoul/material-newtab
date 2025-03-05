import styles from "./BookmarkItem.module.css";
import WidgetTemplate from "../widgetTemplate/WidgetTemplate.jsx";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useGridsWH } from "../../hooks/useGridsWH.jsx";
import { useGridsContent } from "../../hooks/useGridsContent.jsx";
import { placeholderPlusSvg } from "../../app/Svgs.jsx";
import { generateUUID } from "../../app/utility.js";
import { useWidgetDropper } from "../../hooks/useWidgetDropper.jsx";
import { useGridRepresentation } from "../../hooks/useGridRepresentation.jsx";
import { useWidgets } from "../../hooks/useWidgets.jsx";
import { useBookmarks } from "../../hooks/useBookmarks.jsx";
import {
  bookmarkFolderSvg,
  bookmarkDownArrowSvg,
  bookmarkRightArrowSvg,
} from "../../app/Svgs.jsx";
import { formatUrl } from "../../app/utility.js";
export function BookmarkItem({
  title,
  url = null,
  setV,
  self,
  children,
  level = 0,
  isActive = false,
  inRightPanel = false,
  activeBookmark = null,
  parentBookmark = null,
  isInExpanded = false,
}) {
  const [isOpened, setIsOpened] = useState(false);
  const { gridsWH } = useGridsWH();
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
  const { widgets, addWidget } = useWidgets();
  const { isFolder } = useBookmarks();

  useEffect(() => {
    if (isActive) {
      setIsOpened(true);
    } else if (inRightPanel && parentBookmark !== activeBookmark) {
      setIsOpened(false);
    }
  }, [isActive, activeBookmark, parentBookmark, inRightPanel]);

  const handleOnClick = () => {
    if (url === null) {
      const newOpenState = !isOpened;
      setIsOpened(newOpenState);
      if (setV) {
        setV(self, !newOpenState, parentBookmark);
      }
    } else {
      window.open(url, "_self");
    }
  };

  const shouldShowChildren = () => {
    if (inRightPanel) {
      return isOpened;
    }
    return isOpened && !isActive;
  };

  const renderChildren = () => {
    if (children) {
      return Object.values(children).map((child) => {
        if (isFolder(child)) {
          return (
            <BookmarkItem
              key={child.id}
              title={child.title}
              level={level + 1}
              setV={setV}
              self={child}
              isActive={child === activeBookmark}
              inRightPanel={inRightPanel}
              activeBookmark={activeBookmark}
              parentBookmark={self}
              isInExpanded={isInExpanded}
            >
              {child.children}
            </BookmarkItem>
          );
        }
        return (
          <BookmarkItem
            key={child.id}
            title={child.title}
            url={child.url}
            level={level + 1}
            isInExpanded={isInExpanded}
            inRightPanel={inRightPanel}
          />
        );
      });
    }
    return null;
  };

  return (
    <>
      <div
        className={`${styles["bookmark-item-container"]} ${
          isOpened ? styles["bookmark-item-container-opened"] : ""
        } ${isActive && !inRightPanel ? styles["bookmark-item-active"] : ""} ${
          isInExpanded
            ? inRightPanel
              ? styles["bookmark-item-container-right"]
              : styles["bookmark-item-container-left"]
            : ""
        }`}
      >
        <div
          className={styles["bookmark-item-wrapper"]}
          style={{ paddingLeft: `${18 + level * 6}px` }}
        >
          <button
            onClick={handleOnClick}
            className={styles["bookmark-item-button"]}
          >
            <div className={styles["bookmark-item-container-inner"]}>
              <div className={styles["bookmark-item-container-left"]}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <div
                    style={{
                      width: "18px",
                      height: "18px",
                      marginRight: "16px",
                    }}
                  >
                    {url === null ? (
                      <>
                        {React.cloneElement(bookmarkFolderSvg, {
                          style: { width: "100%", height: "100%" },
                        })}
                      </>
                    ) : (
                      <img
                        src={`https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${formatUrl(
                          url
                        )}&size=256`}
                        width={"100%"}
                        height={"100%"}
                        alt=""
                      />
                    )}
                  </div>
                </div>
                <div>{title}</div>
              </div>
              {url === null ? (
                <div style={{ width: "14px", height: "14px" }}>
                  {isOpened
                    ? React.cloneElement(bookmarkDownArrowSvg, {
                        width: "14",
                        height: "14",
                        style: { width: "100%", height: "100%" },
                      })
                    : React.cloneElement(bookmarkRightArrowSvg, {
                        width: "14",
                        height: "14",
                        style: { width: "100%", height: "100%" },
                      })}
                </div>
              ) : (
                ""
              )}
            </div>
          </button>
        </div>
      </div>
      {shouldShowChildren() && renderChildren()}
    </>
  );
}
