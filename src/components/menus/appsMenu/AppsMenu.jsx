import { useGridsWH } from "../../../hooks/useGridsWH.jsx";
import "./AppsMenu.css";
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
import { WeatherWidget } from "../../widgets/weatherWidget/WeatherWidget.jsx";

import DefaultMenu from "../../defaultMenu/DefaultMenu.jsx";
export function AppsMenu() {
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

  const [canScrollLeft, setCanScrollLeft] = useState([]);
  const [canScrollRight, setCanScrollRight] = useState([]);
  const [scrollIntervals, setScrollIntervals] = useState([]);

  const widgetPlaceable = (w, h) => {
    let resultLeft =
      findAvailibleSpace("left", w, h, "") == null ? false : true;
    let resultCenter =
      findAvailibleSpace("center", w, h, "") == null ? false : true;
    let resultRight =
      findAvailibleSpace("right", w, h, "") == null ? false : true;
    return resultLeft || resultCenter || resultRight;
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
        <>
          <div className="widget-menu-search-container">
            <input
              className="widget-menu-search-bar"
              placeholder="Search Widgets"
              type="text"
            />
          </div>
          <label htmlFor="app-name-input">Name</label>
          <input
            id="app-name-input"
            className="widget-menu-search-bar"
            placeholder="App Name"
            type="text"
          />
          <label htmlFor="app-url-input">Url</label>
          <input
            id="app-url-input"
            className="widget-menu-search-bar"
            placeholder="App URL"
            type="text"
          />
          <div>
            <button className="form-add-button">Add</button>
            <WeatherWidget></WeatherWidget>
          </div>
        </>,
      ]);
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
  return <DefaultMenu title="Add an App">{content}</DefaultMenu>;
}
