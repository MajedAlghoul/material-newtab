import { useGridsWH } from "../../../hooks/useGridsWH.jsx";
import "./WidgetsMenu.css";
import { useWidgets } from "../../../hooks/useWidgets.jsx";
import { useGridsContent } from "../../../hooks/useGridsContent.jsx";
import { useEffect, useState, useRef } from "react";
import { useGridRepresentation } from "../../../hooks/useGridRepresentation.jsx";
import { useWidgetsBlueprints } from "../../../hooks/useWidgetsBlueprints.jsx";
import { sliderBackArrow, sliderForwardArrow } from "../../../app/Svgs.jsx";

export function WidgetsMenu() {
  const [layout, setLayout] = useState({ x: null, y: null, w: null, h: null });

  const [content, setContent] = useState([]);

  const { gridsWH } = useGridsWH();

  const isInitialMount = useRef(true);
  const { hardFlushMenu, softFlushMenu } = useGridsContent();
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
  } = useGridRepresentation();

  const silderRefs = useRef([]);

  const weatherRef = useRef(null);
  const searchRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState([]);
  const [canScrollRight, setCanScrollRight] = useState([]);
  const [scrollIntervals, setScrollIntervals] = useState([]);

  let weatherScrollInterval = 0;
  let searchScrollInterval = 0;

  const widgetPlaceable = (x, y, w, h) => {
    return isSpaceAvailable("gh", x, y, w, h);
  };

  const closeMenu = () => {
    hardFlushMenu();
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

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else if (gridsWH) {
      //setClasses("add-new-item-widget");
      hardFlushMenu();
    }
  }, [gridsWH]);

  useEffect(() => {
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

    let w = gridsWH["cw"];
    if (w) {
      setContent([
        <div key={"widget-menu-content"} className="actual-widgets-menu">
          <div className="actual-widgets-menu-inner">
            <div className="top-widget-menu-container">
              <div className="widget-menu-title-bar">
                <div className="widget-menu-title-text">Add a Widget</div>
                <button
                  className="widget-menu-title-x-button"
                  onClick={closeMenu}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2 2L14 14"
                      stroke="white"
                      strokeWidth="2.38648"
                      strokeLinecap="round"
                    />
                    <path
                      d="M2 14L14 2"
                      stroke="white"
                      strokeWidth="2.38648"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </div>
              <div className="widget-menu-search-container">
                <input
                  className="widget-menu-search-bar"
                  placeholder="Search Widgets"
                  type="text"
                />
              </div>
            </div>
            <div className="bottom-widget-menu-container">
              {Object.entries(blueprints).map(
                ([blueprintName, blueprintValue], blueprintIndex) => {
                  if (!blueprintValue.sizes.images) return null;

                  const maxHeight = Math.max(
                    ...blueprintValue.sizes.sizes.map((element) => element.h)
                  );
                  return (
                    <div
                      key={blueprintName}
                      className="widget-menu-item-weather-container"
                      style={{ height: `${76 + maxHeight * 32}px` }}
                    >
                      <div className="widget-menu-item-title">
                        {blueprintName}
                      </div>
                      <div className="widget-menu-item-weather-body">
                        <div
                          className="widget-menu-item-weather-horizontal-viewer"
                          ref={(el) =>
                            (silderRefs.current[blueprintIndex] = el)
                          }
                        >
                          {[...blueprintValue.sizes.images]
                            .reverse()
                            .map((image, index) => (
                              <div
                                className={`${
                                  index ===
                                  blueprintValue.sizes.images.length - 1
                                    ? "last-widget-margin"
                                    : null
                                } add-weather-containers`}
                              >
                                <button className="weather-buttons">
                                  {image}
                                </button>
                                <div className="widget-dimensions-text">
                                  {`${
                                    blueprintValue.sizes.sizes[
                                      blueprintValue.sizes.images.length -
                                        1 -
                                        index
                                    ].w
                                  }x${
                                    blueprintValue.sizes.sizes[
                                      blueprintValue.sizes.images.length -
                                        1 -
                                        index
                                    ].h
                                  }`}
                                </div>
                              </div>
                            ))}
                        </div>
                        {canScrollLeft[blueprintIndex] && (
                          <div className="scroll-button-containers scroll-button-previous">
                            <button
                              className="scroll-buttons"
                              onClick={() => {
                                scrollPrev(blueprintIndex);
                              }}
                            >
                              {sliderBackArrow}
                            </button>
                          </div>
                        )}
                        {canScrollRight[blueprintIndex] && (
                          <div className="scroll-button-containers scroll-button-next">
                            <button
                              className="scroll-buttons"
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
            </div>
          </div>
        </div>,
      ]);
      if (w === 3) {
        setLayout({
          x: 1,
          y: 1,
          w: 3,
          h: 4,
        });
        setContent((prev) => {
          return [
            ...prev,
            <svg
              width="312"
              height="416"
              viewBox="0 0 312 416"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="widgets-menu-shadow"
              key={"widget-menu-shadow"}
            >
              <rect
                width="312"
                height="416"
                rx="39"
                fill="var(--highlight-color)"
              />
            </svg>,
          ];
        });
      } else {
        setLayout({
          x: 1,
          y: 1,
          w: 5,
          h: 4,
        });
        setContent((prev) => {
          return [
            ...prev,
            <svg
              width="520"
              height="415"
              viewBox="0 0 520 415"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="widgets-menu-shadow"
              key={"widget-menu-shadow"}
            >
              <rect
                width="520"
                height="415"
                rx="39"
                fill="var(--highlight-color)"
              />
            </svg>,
          ];
        });
      }
    }

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
