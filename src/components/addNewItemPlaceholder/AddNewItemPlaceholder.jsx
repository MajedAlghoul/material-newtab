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
    <div
      className={`widget-template ${classes}`}
      style={{
        gridRow: `${layout.x} / ${layout.x + layout.h}`,
        gridColumn: `${layout.y} / ${layout.y + layout.w}`,
        width: `${layout.w * 76 + (layout.w - 1) * 28}px`,
        height: `${layout.h * 76 + (layout.h - 1) * 28}px`,
      }}
    >
      <button
        className="add-new-item-placeholder-widget-button"
        onClick={handleOnClick}
      >
        {placeholderPlusSvg}
      </button>
    </div>
  );
}

AddNewItemPlaceholder.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
};
