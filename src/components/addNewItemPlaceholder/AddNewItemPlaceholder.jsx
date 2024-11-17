import "./AddNewItemPlaceholder.css";
import WidgetTemplate from "../widgetTemplate/WidgetTemplate.jsx";
import PropTypes from "prop-types";
import { useState } from "react";
import { useGridsWH } from "../../hooks/useGridsWH.jsx";
import { useGridsContent } from "../../hooks/useGridsContent.jsx";
import { placeholderPlusSvg } from "../../app/Svgs.jsx";
import { generateUUID } from "../../app/utility.js";

export function AddNewItemPlaceholder({ x, y }) {
  const [layout, setLayout] = useState({ x: x, y: y, w: 1, h: 1 });
  const { gridsWH } = useGridsWH();
  const [classes, setClasses] = useState("add-new-item-placeholder");
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
  const handleOnClick = () => {};
  return (
    <WidgetTemplate
      className={classes}
      id={generateUUID()}
      layout={layout}
      setLayout={setLayout}
    >
      <button
        className="add-new-item-placeholder-widget-button"
        onClick={handleOnClick}
      >
        {placeholderPlusSvg}
      </button>
    </WidgetTemplate>
  );
}

AddNewItemPlaceholder.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
};
