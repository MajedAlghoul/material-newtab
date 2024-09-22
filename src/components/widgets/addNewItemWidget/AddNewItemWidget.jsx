import "./AddNewItemWidget.css";
import WidgetTemplate from "../../widgetTemplate/WidgetTemplate.jsx";
import PropTypes from "prop-types";
import { useState } from "react";
import { useGridsWH } from "../../../hooks/useGridsWH.js";
import { useGridsContent } from "../../../hooks/useGridsContent.js";
import { AddMenu } from "../../menus/addMenu/AddMenu.jsx";

export function AddNewItemWidget({ id }) {
  const [layout, setLayout] = useState({ x: null, y: null, w: null, h: null });
  const { gridsWH } = useGridsWH();
  const [classes, setClasses] = useState("add-new-item-widget");
  const {
    leftItems,
    centerItems,
    RightItems,
    HiddenItems,
    addItems,
    removeItems,
    centerWidget,
    rightWidget,
    flushMenu,
    isMenuVisible,
    currentClass,
  } = useGridsContent();
  const handleOnClick = () => {
    const w = gridsWH["rw"];
    if (w) {
      flushMenu();
      if (!isMenuVisible() || currentClass() !== "add-new-item-widget") {
        addItems(
          "rightW",
          <AddMenu setClasses={setClasses} key={"add-menu"}></AddMenu>,
          setClasses,
          "add-new-item-widget"
        );
        setClasses("add-new-item-widget add-new-item-widget-active");
      }
    }
  };
  return (
    <WidgetTemplate
      className={classes}
      id={id}
      sizes={AddNewItemWidgetSizes}
      layout={layout}
      setLayout={setLayout}
    >
      <button className="add-new-item-widget-button" onClick={handleOnClick}>
        <svg
          width="26"
          stroke="var(--widget-text-color)"
          height="26"
          viewBox="0 0 26 26"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M13 24L13 2" strokeWidth="3.09375" strokeLinecap="round" />
          <path d="M2 13L24 13" strokeWidth="3.09375" strokeLinecap="round" />
        </svg>
      </button>
    </WidgetTemplate>
  );
}

AddNewItemWidget.propTypes = {
  id: PropTypes.string,
};

export const AddNewItemWidgetSizes = {
  sizesCount: 1,
  sizes: [{ w: 1, h: 1 }],
};
