import { useGridsWH } from "../../../hooks/useGridsWH.jsx";
import "./WidgetsMenu.css";
import { useWidgets } from "../../../hooks/useWidgets.jsx";
import { useGridsContent } from "../../../hooks/useGridsContent.jsx";
import { useEffect, useState, useRef } from "react";
import { useGridRepresentation } from "../../../hooks/useGridRepresentation.jsx";
import { useWidgetsBlueprints } from "../../../hooks/useWidgetsBlueprints.jsx";
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

  const weatherRef = useRef(null);
  const searchRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState([false, false]);
  const [canScrollRight, setCanScrollRight] = useState([false, false]);
  let weatherScrollInterval = 0;
  let searchScrollInterval = 0;

  const widgetPlaceable = (x, y, w, h) => {
    return isSpaceAvailable("gh", x, y, w, h);
  };

  const closeMenu = () => {
    hardFlushMenu();
  };

  const scrollNext = (whichContainer) => {
    if (whichContainer === "weather") {
      if (weatherRef.current) {
        weatherRef.current.scrollLeft += weatherScrollInterval;
      }
    } else {
      if (searchRef.current) {
        searchRef.current.scrollLeft += searchScrollInterval;
      }
    }
  };

  const scrollPrev = (whichContainer) => {
    if (whichContainer === "weather") {
      if (weatherRef.current) {
        weatherRef.current.scrollLeft -= weatherScrollInterval;
      }
    } else {
      if (searchRef.current) {
        searchRef.current.scrollLeft -= searchScrollInterval;
      }
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
      if (weatherRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = weatherRef.current;
        if (canScrollLeft[0] !== scrollLeft > 0) {
          setCanScrollLeft((prev) => {
            return [scrollLeft > 0, prev[1]];
          });
        }
        if (canScrollRight[0] !== scrollLeft < scrollWidth - clientWidth) {
          setCanScrollRight((prev) => {
            return [scrollLeft < scrollWidth - clientWidth, prev[1]];
          });
        }
        weatherScrollInterval = clientWidth;
      }
      if (searchRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = searchRef.current;
        if (canScrollLeft[1] !== scrollLeft > 0) {
          setCanScrollLeft((prev) => {
            return [prev[0], scrollLeft > 0];
          });
        }
        if (canScrollRight[1] !== scrollLeft < scrollWidth - clientWidth) {
          setCanScrollRight((prev) => {
            return [prev[0], scrollLeft < scrollWidth - clientWidth];
          });
        }

        searchScrollInterval = clientWidth;
      }
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
              {Object.entries(data).map(([outerKey, outerObject]) => (
                <div key={outerKey} className="outer-div-class">
                  {Object.entries(outerObject).map(
                    ([innerKey, innerObject]) => (
                      <svg key={innerKey} className="inner-svg-class">
                        {/* Render your SVG content here */}
                        {/* You can use innerObject properties if needed */}
                      </svg>
                    )
                  )}
                </div>
              ))}

              <div
                className="widget-menu-item-weather-container"
                style={{ height: "172px" }}
              >
                <div className="widget-menu-item-title">Weather</div>
                <div className="widget-menu-item-weather-body">
                  <div
                    className="widget-menu-item-weather-horizontal-viewer"
                    ref={weatherRef}
                  >
                    <div className="add-weather-containers">
                      <button className="weather-buttons">
                        {blueprints["Weather"].sizes.images[3]}
                      </button>
                      <div className="widget-dimensions-text">3x3</div>
                    </div>
                    <div className="add-weather-containers">
                      <button className="weather-buttons">
                        {blueprints["Weather"].sizes.images[2]}
                      </button>
                      <div className="widget-dimensions-text">3x2</div>
                    </div>
                    <div className="add-weather-containers">
                      <button className="weather-buttons">
                        {blueprints["Weather"].sizes.images[1]}
                      </button>
                      <div className="widget-dimensions-text">2x2</div>
                    </div>
                    <div className="add-weather-containers last-widget-margin">
                      <button className="weather-buttons">
                        {blueprints["Weather"].sizes.images[0]}
                      </button>
                      <div className="widget-dimensions-text">1x1</div>
                    </div>
                  </div>
                  {canScrollLeft[0] && (
                    <div className="scroll-button-containers scroll-button-previous">
                      <button
                        className="scroll-buttons"
                        onClick={() => {
                          scrollPrev("weather");
                        }}
                      >
                        {BackArrow()}
                      </button>
                    </div>
                  )}
                  {canScrollRight[0] && (
                    <div className="scroll-button-containers scroll-button-next">
                      <button
                        className="scroll-buttons"
                        onClick={() => {
                          scrollNext("weather");
                        }}
                      >
                        {ForwardArrow()}
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <div
                className="widget-menu-item-weather-container"
                style={{ height: "82px" }}
              >
                <div className="widget-menu-item-title">Search</div>
                <div className="widget-menu-item-weather-body">
                  <div
                    className="widget-menu-item-weather-horizontal-viewer"
                    ref={searchRef}
                  >
                    <div className="add-weather-containers">
                      <button className="weather-buttons">
                        {blueprints["Search"].sizes.images[2]}
                      </button>
                      <div className="widget-dimensions-text">5x1</div>
                    </div>
                    <div className="add-weather-containers">
                      <button className="weather-buttons">
                        {blueprints["Search"].sizes.images[1]}
                      </button>
                      <div className="widget-dimensions-text">3x1</div>
                    </div>
                    <div className="add-weather-containers last-widget-margin">
                      <button className="weather-buttons">
                        {blueprints["Search"].sizes.images[0]}
                      </button>
                      <div className="widget-dimensions-text">1x1</div>
                    </div>
                  </div>
                  {canScrollLeft[1] && (
                    <div className="scroll-button-containers scroll-button-previous">
                      <button
                        className="scroll-buttons"
                        onClick={() => {
                          scrollPrev("search");
                        }}
                      >
                        {BackArrow()}
                      </button>
                    </div>
                  )}
                  {canScrollRight[1] && (
                    <div className="scroll-button-containers scroll-button-next">
                      <button
                        className="scroll-buttons"
                        onClick={() => {
                          scrollNext("search");
                        }}
                      >
                        {ForwardArrow()}
                      </button>
                    </div>
                  )}
                </div>
              </div>
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
      if (weatherRef.current) {
        handleScroll();
        weatherRef.current.addEventListener("scroll", handleScroll);
      }
      if (searchRef.current) {
        handleScroll();
        searchRef.current.addEventListener("scroll", handleScroll);
      }
    }, 0);
    return () => {
      if (weatherRef.current) {
        weatherRef.current.removeEventListener("scroll", handleScroll);
      }
      if (searchRef.current) {
        searchRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, [weatherRef, searchRef, canScrollLeft, canScrollRight]);
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

const BackArrow = () => {
  return (
    <svg
      width="13"
      height="11"
      viewBox="0 0 13 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 5.32324H11.67"
        stroke="white"
        strokeWidth="1.51274"
        strokeLinecap="round"
      />
      <path
        d="M1 5.32324L5.26594 1.0003"
        stroke="white"
        strokeWidth="1.51274"
        strokeLinecap="round"
      />
      <path
        d="M1 5.32324L5.24457 9.66819"
        stroke="white"
        strokeWidth="1.51274"
        strokeLinecap="round"
      />
    </svg>
  );
};

const ForwardArrow = () => {
  return (
    <svg
      width="14"
      height="12"
      viewBox="0 0 14 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.333 5.95898H1.66634"
        stroke="white"
        strokeWidth="1.51274"
        strokeLinecap="round"
      />
      <path
        d="M12.333 5.95898L8.0684 1.63604"
        stroke="white"
        strokeWidth="1.51274"
        strokeLinecap="round"
      />
      <path
        d="M12.333 5.95898L8.08976 10.3039"
        stroke="white"
        strokeWidth="1.51274"
        strokeLinecap="round"
      />
    </svg>
  );
};
