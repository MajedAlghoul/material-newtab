import styles from "./CustomizeWidget.module.scss";
import WidgetTemplate from "../../widgetTemplate/WidgetTemplate.jsx";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useGridsWH } from "../../../hooks/useGridsWH.jsx";
import { CustomizeMenu } from "../../menus/customizeMenu/CustomizeMenu.jsx";
import { useGridsContent } from "../../../hooks/useGridsContent.jsx";
import { customizeSvg } from "../../../app/Svgs.jsx";
export function CustomizeWidget({ id }) {
  const [layout, setLayout] = useState({ x: null, y: null, w: null, h: null });

  const [content, setContent] = useState(null);

  const { gridsWH } = useGridsWH();
  const [classes, setClasses] = useState(styles.widget);
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
      if (!isMenuVisible() || currentClass() !== styles.widget) {
        if (w === 1) {
          addItems(
            "centerW",
            <CustomizeMenu key={"customize-menu"}></CustomizeMenu>,
            setClasses,
            styles.widget
          );
        } else {
          addItems(
            "rightW",
            <CustomizeMenu key={"customize-menu"}></CustomizeMenu>,
            setClasses,
            styles.widget
          );
        }
        setClasses(
          `${styles.widget} ${styles.active} ${w > 1 ? styles.noshadow : ""}`
        );
      }
    }
  };

  useEffect(() => {
    if (layout.w === 1 && layout.h === 1) {
      setContent(() => {
        return customizeSvg;
      });
    } else {
      setContent(() => {
        return (
          <div className={styles.bigOuterDiv}>
            {customizeSvg}
            <div className={styles.bigText}>Customize</div>
          </div>
        );
      });
    }
  }, [layout.w, layout.h]);

  return (
    <WidgetTemplate
      className={classes}
      id={id}
      layout={layout}
      setLayout={setLayout}
    >
      <button className={styles.button} onClick={handleOnClick}>
        {content}
      </button>
    </WidgetTemplate>
  );
}

CustomizeWidget.propTypes = {
  id: PropTypes.string,
};
