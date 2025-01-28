import styles from "./AppWidget.module.css";
import WidgetTemplate from "../../widgetTemplate/WidgetTemplate.jsx";
import PropTypes from "prop-types";
import { useRef, useState, useEffect } from "react";
import { useGridsWH } from "../../../hooks/useGridsWH.jsx";
import { useGridsContent } from "../../../hooks/useGridsContent.jsx";
import { AddMenu } from "../../menus/addMenu/AddMenu.jsx";
import { useGridRepresentation } from "../../../hooks/useGridRepresentation.jsx";
import { useWidgets } from "../../../hooks/useWidgets.jsx";
import { useWidgetDropper } from "../../../hooks/useWidgetDropper.jsx";

export function AppWidget({ id }) {
  const [layout, setLayout] = useState({ x: null, y: null, w: null, h: null });
  const [classes, setClasses] = useState("app-widget");
  const [info, setInfo] = useState({
    name: "",
    link: "",
  });
  const isInitialMount = useRef(true);

  const { widgets } = useWidgets();
  const { gridsWH } = useGridsWH();
  const { addPlaceHolders } = useGridRepresentation();
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
    removePlaceHolders,
    isEditModeOn,
  } = useGridsContent();

  const { isDropperEmpty } = useWidgetDropper();

  useEffect(() => {
    const widget = widgets[id].otherProps;
    if (widget.url !== null) {
      setInfo({
        name: widget.name,
        link: widget.url,
      });
    }
  }, [widgets]);

  return (
    <WidgetTemplate
      className={`${classes} ${styles[classes]}`}
      cla
      id={id}
      layout={layout}
      setLayout={setLayout}
    >
      <button
        className={`${styles["app-button"]} ${
          (isEditModeOn() || !isDropperEmpty()) && styles["app-button-hovered"]
        }`}
        onClick={() => window.open(info.link, "_self")}
      >
        <div
          className={`${styles["app-actual-box"]} ${
            (isEditModeOn() || !isDropperEmpty()) &&
            styles["app-actual-box-hovered"]
          }`}
        >
          <img
            src={`https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${info.link}&size=256`}
            width={"32px"}
            height={"32px"}
          />
        </div>
        <div
          className={`${styles["app-name"]} ${
            (isEditModeOn() || !isDropperEmpty()) && styles["app-name-hovered"]
          }`}
        >
          {info.name}
        </div>
      </button>
    </WidgetTemplate>
  );
}

AppWidget.propTypes = {
  id: PropTypes.string,
};
