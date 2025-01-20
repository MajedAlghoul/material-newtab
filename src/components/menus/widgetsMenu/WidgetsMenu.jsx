import { useGridsWH } from "../../../hooks/useGridsWH.jsx";
import styles from "./WidgetsMenu.module.css";
import { useWidgets } from "../../../hooks/useWidgets.jsx";
import { useGridsContent } from "../../../hooks/useGridsContent.jsx";
import { useEffect, useState, useRef } from "react";
import { useGridRepresentation } from "../../../hooks/useGridRepresentation.jsx";
import { useWidgetsBlueprints } from "../../../hooks/useWidgetsBlueprints.jsx";
import {
  sliderBackArrow,
  sliderForwardArrow,
  closeXSvg,
} from "../../../app/Svgs.jsx";
import { useWidgetDropper } from "../../../hooks/useWidgetDropper.jsx";
import { EditModeFakeMenu } from "../editModeFakeMenu/EditModeFakeMenu.jsx";
import DefaultMenu from "../../defaultMenu/DefaultMenu.jsx";
export function WidgetsMenu({ children }) {
  const [layout, setLayout] = useState({ x: null, y: null, w: null, h: null });

  const [content, setContent] = useState([]);

  const { gridsWH } = useGridsWH();

  const { hardFlushMenu, softFlushMenu, addItems } = useGridsContent();
  const { blueprints } = useWidgetsBlueprints();
  const {
    gridRepresentation,
    addWidgetToGridRepresentation,
    removeWidgetFromGridRepresentation,
    isSpaceAvailable,
    getIdFromIndex,
    findAvailibleSpace,
    checkIfOutOfBound,
    findWidgetGridType,
    calculateChanges,
    applyChanges,
    scheduleFalling,
    addPlaceHolders,
  } = useGridRepresentation();
  const { drop, emptyDropper, isDropperEmpty, getDropper } = useWidgetDropper();

  const silderRefs = useRef([]);

  const [canScrollLeft, setCanScrollLeft] = useState([]);
  const [canScrollRight, setCanScrollRight] = useState([]);
  const [scrollIntervals, setScrollIntervals] = useState([]);

  const widgetPlaceable = (w, h) => {
    let resultLeft =
      findAvailibleSpace("left", w, h, "")[0] == null ? false : true;
    let resultCenter =
      findAvailibleSpace("center", w, h, "")[0] == null ? false : true;
    let resultRight =
      findAvailibleSpace("right", w, h, "")[0] == null ? false : true;
    return resultLeft || resultCenter || resultRight;
  };



  const placeWidget = (ww, wh, index, data, widget) => {
    //softFlushMenu();
    addPlaceHolders();
    addItems(
      "centerW",
      <EditModeFakeMenu key={"add-menu"}></EditModeFakeMenu>,
      children,
      "add-new-item-widget"
    );
    drop(ww, wh, index, data, widget);
  };

  const scrollNext = (whichContainer) => {
    if (silderRefs.current[whichContainer]) {
      silderRefs.current[whichContainer].scrollLeft +=
        scrollIntervals[whichContainer];
    }
  };

  const scrollPrev = (whichContainer) => {
    if (silderRefs.current[whichContainer]) {
      silderRefs.current[whichContainer].scrollLeft -=
        scrollIntervals[whichContainer];
    }
  };

  const handleScroll = () => {
    silderRefs.current.forEach((ref, index) => {
      if (ref) {
        const { scrollLeft, scrollWidth, clientWidth } = ref;
        if (canScrollLeft[index] !== scrollLeft > 0) {
          setCanScrollLeft((prev) => {
            let temp = [...prev];
            temp[index] = scrollLeft > 0;
            return temp;
          });
        }
        if (canScrollRight[0] !== scrollLeft < scrollWidth - clientWidth) {
          setCanScrollRight((prev) => {
            let temp = [...prev];
            temp[index] = scrollLeft < scrollWidth - clientWidth;
            return temp;
          });
        }
        setScrollIntervals((prev) => {
          let temp = [...prev];
          temp[index] = clientWidth;
          return temp;
        });
      }
    });
  };

  useEffect(() => {
    setContent(
      <>
        <div className={styles["widget-menu-search-container"]}>
          <input
            className={styles["widget-menu-search-bar"]}
            placeholder="Search Widgets"
            type="text"
          />
        </div>
        {Object.entries(blueprints).map(
          ([blueprintName, blueprintValue], blueprintIndex) => {
            if (!blueprintValue.sizes.images) return null;

            const maxHeight = Math.max(
              ...blueprintValue.sizes.sizes.map((element) => element.h)
            );
            return (
              <div
                key={blueprintName}
                className={styles["widget-menu-item-weather-container"]}
                style={{ height: `${76 + maxHeight * 32}px` }}
              >
                <div className={styles["widget-menu-item-title"]}>
                  {blueprintName}
                </div>
                <div className={styles["widget-menu-item-weather-body"]}>
                  <div
                    className={
                      styles["widget-menu-item-weather-horizontal-viewer"]
                    }
                    ref={(el) => (silderRefs.current[blueprintIndex] = el)}
                  >
                    {[...blueprintValue.sizes.images]
                      .reverse()
                      .map((image, index) => {
                        const ww =
                          blueprintValue.sizes.sizes[
                            blueprintValue.sizes.images.length - 1 - index
                          ].w;
                        const wh =
                          blueprintValue.sizes.sizes[
                            blueprintValue.sizes.images.length - 1 - index
                          ].h;

                        return (
                          <div
                            key={index}
                            className={`${
                              index === blueprintValue.sizes.images.length - 1
                                ? styles["last-widget-margin"]
                                : null
                            } ${styles["add-weather-containers"]}`}
                          >
                            <button
                              onClick={() => {
                                if (widgetPlaceable(ww, wh)) {
                                  placeWidget(
                                    ww,
                                    wh,
                                    blueprintValue.sizes.images.length -
                                      1 -
                                      index,
                                    blueprintValue.otherProps,
                                    blueprintName
                                  );
                                }
                              }}
                              className={`${styles["weather-buttons"]} ${
                                !widgetPlaceable(ww, wh) &&
                                styles["grayed-out-widgets"]
                              }`}
                            >
                              {image}
                            </button>
                            <div className={styles["widget-dimensions-text"]}>
                              {`${ww}x${wh}`}
                            </div>
                          </div>
                        );
                      })}
                  </div>
                  {canScrollLeft[blueprintIndex] && (
                    <div
                      className={`${styles["scroll-button-containers"]} ${styles["scroll-button-previous"]}`}
                    >
                      <button
                        className={styles["scroll-buttons"]}
                        onClick={() => {
                          scrollPrev(blueprintIndex);
                        }}
                      >
                        {sliderBackArrow}
                      </button>
                    </div>
                  )}
                  {canScrollRight[blueprintIndex] && (
                    <div
                      className={`${styles["scroll-button-containers"]} ${styles["scroll-button-next"]}`}
                    >
                      <button
                        className={styles["scroll-buttons"]}
                        onClick={() => {
                          scrollNext(blueprintIndex);
                        }}
                      >
                        {sliderForwardArrow}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          }
        )}
      </>
    );

    setTimeout(() => {
      silderRefs.current.forEach((ref) => {
        if (ref) {
          handleScroll();
          ref.addEventListener("scroll", handleScroll);
        }
      });
    }, 0);
    return () => {
      silderRefs.current.forEach((ref) => {
        if (ref) {
          ref.removeEventListener("scroll", handleScroll);
        }
      });
    };
  }, [silderRefs, canScrollLeft, canScrollRight, scrollIntervals]);
  return <DefaultMenu title="Add a Widget">{content}</DefaultMenu>;
}
