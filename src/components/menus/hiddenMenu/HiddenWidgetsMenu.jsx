import { useGridsWH } from "../../../hooks/useGridsWH.jsx";
import styles from "./HiddenWidgetsMenu.module.css";
import { useWidgets } from "../../../hooks/useWidgets.jsx";
import { useGridsContent } from "../../../hooks/useGridsContent.jsx";
import { useEffect, useState, useRef } from "react";
import { useGridRepresentation } from "../../../hooks/useGridRepresentation.jsx";
import DefaultMenu from "../../defaultMenu/DefaultMenu.jsx";
import { hiddenWidgetsMenuShadow } from "../../../app/Svgs.jsx";

export function HiddenWidgetsMenu() {
  const [content, setContent] = useState(null);
  const { gridsWH } = useGridsWH();
  const {
    leftItems,
    centerItems,
    RightItems,
    HiddenItems,
    addItems,
    removeItems,
    centerWidget,
    rightWidget,
    removePlaceHolders,
  } = useGridsContent();
  const { widgets, addWidget, removeWidget, editWidget, getComponent } =
    useWidgets();

  useEffect(() => {
    const rw = gridsWH["rw"];
    const cw = gridsWH["cw"];
    if (rw) {
      if (Object.keys(HiddenItems).length > 0) {
        setContent(
          <div
            className={`${styles["hidden-grid"]} ${
              rw === 1 && cw === 5 ? styles["expanded-grid"] : ""
            }`}
          >
            {Object.keys(HiddenItems).map((key) => {
              const WidgetComponent = getComponent(widgets[key].wComponent);
              return <WidgetComponent key={key} id={key} />;
            })}
          </div>
        );
      } else {
        setContent(
          <div className={styles["no-hidden-widgets"]}>No hidden widgets</div>
        );
      }
    }
  }, [gridsWH, HiddenItems, getComponent, widgets]);

  return (
    <DefaultMenu
      cShadow={hiddenWidgetsMenuShadow}
      shiftX={4}
      title={"Hidden widgets"}
    >
      {content}
    </DefaultMenu>
  );
}
