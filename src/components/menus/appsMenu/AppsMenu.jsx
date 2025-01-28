import React from "react";
import { useGridsWH } from "../../../hooks/useGridsWH.jsx";
import styles from "./AppsMenu.module.css";
import { useWidgets } from "../../../hooks/useWidgets.jsx";
import { useGridsContent } from "../../../hooks/useGridsContent.jsx";
import { useEffect, useState, useRef } from "react";
import { useGridRepresentation } from "../../../hooks/useGridRepresentation.jsx";
import { useWidgetsBlueprints } from "../../../hooks/useWidgetsBlueprints.jsx";
import {
  sliderBackArrow,
  sliderForwardArrow,
  closeXSvg,
  genericAppSvg,
} from "../../../app/Svgs.jsx";
import { WeatherWidget } from "../../widgets/weatherWidget/WeatherWidget.jsx";

import DefaultMenu from "../../defaultMenu/DefaultMenu.jsx";
import { AppWidget } from "../../widgets/appWidget/AppWidget.jsx";
import { use } from "react";
import { useWidgetDropper } from "../../../hooks/useWidgetDropper.jsx";
import { EditModeFakeMenu } from "../editModeFakeMenu/EditModeFakeMenu.jsx";
export function AppsMenu({ children }) {
  const [content, setContent] = useState([]);
  const appName = useRef(null);
  const appUrl = useRef(null);

  const { gridsWH } = useGridsWH();

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
    addPlaceHolders,
  } = useGridRepresentation();
  const { drop, emptyDropper, isDropperEmpty, getDropper } = useWidgetDropper();
  const { addItems, toggleEditMode } = useGridsContent();

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

  const handleOnClick = () => {
    const name = appName.current.value;
    const url = appUrl.current.value;
    if (name.length > 0 && url.length > 0) {
      const fUrl = formatUrl(url);
      placeWidget(1, 1, 0, { name: name, url: fUrl }, "App");
    }
  };

  const formatUrl = (url) => {
    url = url.trim();
    if (!/^https?:\/\//i.test(url)) {
      url = "https://" + url;
    }
    if (!/https?:\/\/www\./i.test(url)) {
      url = url.replace(/(https?:\/\/)/i, "$1www.");
    }

    return url;
  };

  useEffect(() => {
    let w = gridsWH["cw"];
    if (w) {
      setContent(
        <div className={styles["add-app-container"]}>
          <div className={styles["widget-menu-search-container"]}>
            <input
              className={styles["widget-menu-search-bar"]}
              placeholder="Search Widgets"
              type="text"
            />
          </div>

          <div className={styles["app-look-container"]}>
            <div className={styles["app-look"]}>
              {React.cloneElement(genericAppSvg, { width: 32, height: 32 })}
            </div>
            <input
              id="app-name-input"
              className={styles["app-look-name"]}
              placeholder="App Name"
              type="text"
              ref={appName}
            />
          </div>

          <div
            className={`
              ${styles["url-submit-container"]}
              ${w < 5 ? styles["url-submit-container-m"] : ""}
            `}
          >
            <input
              id="app-url-input"
              className={`${styles["app-url"]} ${
                w < 5 ? styles["app-url-m"] : ""
              }`}
              placeholder="www.website.com"
              type="text"
              ref={appUrl}
            />
            <button
              className={`${styles["form-add-button"]} ${
                w < 5 ? styles["form-add-button-m"] : ""
              }`}
              onClick={handleOnClick}
            >
              Add
            </button>
          </div>
        </div>
      );
    }
  }, [gridsWH]);
  return <DefaultMenu title="Add an App">{content}</DefaultMenu>;
}
