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

  useEffect(() => {
    const rw = gridsWH["rw"];
    const cw = gridsWH["cw"];
    if (rw) {
      if (rw === 1 && cw === 5) {
      } else {
        setContent(<div className={styles["hidden-grid"]}></div>);
      }
    }
  }, [gridsWH]);

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
