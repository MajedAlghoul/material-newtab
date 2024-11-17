import "./hiddenWidgetsWidget.css";
import WidgetTemplate from "../../widgetTemplate/WidgetTemplate.jsx";
import PropTypes from "prop-types";
import { useState } from "react";
import { useGridsWH } from "../../../hooks/useGridsWH.jsx";
import { HiddenWidgetsMenu } from "../../menus/hiddenMenu/HiddenWidgetsMenu.jsx";
import { useGridsContent } from "../../../hooks/useGridsContent.jsx";
import { hiddenWidgetsWidgetSvg } from "../../../app/Svgs.jsx";

export function HiddenWidgetsWidget({ id }) {
  const [layout, setLayout] = useState({ x: null, y: null, w: null, h: null });
  const { gridsWH } = useGridsWH();
  const [classes, setClasses] = useState("hidden-widgets-widget");
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
      if (!isMenuVisible() || currentClass() !== "hidden-widgets-widget") {
        if (w === 1) {
          addItems(
            "centerW",
            <HiddenWidgetsMenu key={"hidden-widgets-menu"}></HiddenWidgetsMenu>,
            setClasses,
            "hidden-widgets-widget"
          );
        } else {
          addItems(
            "rightW",
            <HiddenWidgetsMenu key={"hidden-widgets-menu"}></HiddenWidgetsMenu>,
            setClasses,
            "hidden-widgets-widget"
          );
        }
        setClasses("hidden-widgets-widget hidden-widgets-widget-active");
      }
    }
  };
  return (
    <WidgetTemplate
      className={classes}
      id={id}
      layout={layout}
      setLayout={setLayout}
    >
      <button className="hidden-widgets-widget-button" onClick={handleOnClick}>
        {hiddenWidgetsWidgetSvg}
      </button>
    </WidgetTemplate>
  );
}

HiddenWidgetsWidget.propTypes = {
  id: PropTypes.string,
};
