import WidgetTemplate from "../../widgetTemplate/WidgetTemplate.jsx";
import PropTypes from "prop-types";
import { useRef, useState, useEffect } from "react";
import { useGridsWH } from "../../../hooks/useGridsWH.jsx";
import { useGridsContent } from "../../../hooks/useGridsContent.jsx";
import { AddMenu } from "../../menus/addMenu/AddMenu.jsx";
import { useGridRepresentation } from "../../../hooks/useGridRepresentation.jsx";
import styles from "./AddNewItemWidget.module.scss";

export function AddNewItemWidget({ id }) {
  const [layout, setLayout] = useState({ x: null, y: null, w: null, h: null });
  const { gridsWH } = useGridsWH();
  const [classes, setClasses] = useState(styles.addNewItemWidget);
  const isInitialMount = useRef(true);
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
    toggleEditMode,
  } = useGridsContent();

  const handleOnClick = () => {
    const w = gridsWH["rw"];
    if (w) {
      hardFlushMenu();
      if (!isMenuVisible() || currentClass() !== styles.addNewItemWidget) {
        addItems(
          "rightW",
          <AddMenu setClasses={setClasses} key={"add-menu"}></AddMenu>,
          setClasses,
          styles.addNewItemWidget
        );
        setClasses(
          `${styles.addNewItemWidget} ${styles.addNewItemActive} ${
            w > 1 ? styles.noshadow : ""
          }`
        );
      }
    }
  };

  return (
    <WidgetTemplate
      className={`${styles.widget} ${classes}`}
      id={id}
      layout={layout}
      setLayout={setLayout}
    >
      <button className={styles.addNewItemButton} onClick={handleOnClick}>
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
