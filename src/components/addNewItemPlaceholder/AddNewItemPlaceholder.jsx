import "./AddNewItemPlaceholder.css";
import WidgetTemplate from "../widgetTemplate/WidgetTemplate.jsx";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useGridsWH } from "../../hooks/useGridsWH.jsx";
import { useGridsContent } from "../../hooks/useGridsContent.jsx";
import { placeholderPlusSvg } from "../../app/Svgs.jsx";
import { generateUUID } from "../../app/utility.js";
import { useWidgetDropper } from "../../hooks/useWidgetDropper.jsx";
import { useGridRepresentation } from "../../hooks/useGridRepresentation.jsx";

export function AddNewItemPlaceholder({ gridType, x, y }) {
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
  const { isSpaceAvailable, getBestEstimatedPlace } = useGridRepresentation();
  const { getDropper, isDropperEmpty } = useWidgetDropper();
  const [mouseOn, setMouseOn] = useState(false);

  const handleMouseOn = (stat) => {
    setMouseOn(stat);
  };

  const handleOnClick = () => {};

  useEffect(() => {
    const [dropW, dropH] = isDropperEmpty() ? [null, null] : getDropper();
    const [bestX, bestY] =
      dropW !== null
        ? getBestEstimatedPlace(gridType, x, y, dropW, dropH, "")
        : [null, null];
    if (!isDropperEmpty() && mouseOn && bestX !== null) {
      setLayout({ x: bestX, y: bestY, w: dropW, h: dropH });
      setClasses((prev) => {
        return prev + " supreme-placeholder";
      });
    } else {
      setLayout({ x: x, y: y, w: 1, h: 1 });
      setClasses((prev) => prev.replace(" supreme-placeholder", ""));
    }
  }, [getDropper, mouseOn]);
  return (
    <div
      onMouseEnter={() => handleMouseOn(true)}
      onMouseLeave={() => handleMouseOn(false)}
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
        {classes.includes("supreme-placeholder") && placeholderPlusSvg}
      </button>
    </div>
  );
}

AddNewItemPlaceholder.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
};
