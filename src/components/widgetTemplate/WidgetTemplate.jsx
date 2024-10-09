import { useGridsWH } from "../../hooks/useGridsWH.jsx";
import "./WidgetTemplate.css";
import { useWidgets } from "../../hooks/useWidgets.jsx";
import { useGridsContent } from "../../hooks/useGridsContent.jsx";
import { useEffect, useState, useRef } from "react";
import { useGridRepresentation } from "../../hooks/useGridRepresentation.jsx";

function WidgetTemplate({ className, id, layout, setLayout, children }) {
  const { gridsWH } = useGridsWH();
  const {
    leftItems,
    centerItems,
    RightItems,
    HiddenItems,
    addItems,
    removeItems,
  } = useGridsContent();
  const { widgets, addWidget, removeWidget, editWidget, getComponent } =
    useWidgets();
  const {
    gridRepresentation,
    addWidgetToGridRepresentation,
    removeWidgetFromGridRepresentation,
    isSpaceAvailable,
    getIdFromIndex,
    findAvailibleSpace,
    checkIfOutOfBound,
    findWidgetGridType,
    calculateChanges,
    applyChanges,
    scheduleFalling,
  } = useGridRepresentation();
  const [widgetAndGridReady, setWidgetAndGridReady] = useState(false);
  useEffect(() => {
    if (widgets && gridsWH !== undefined && !widgetAndGridReady) {
      setWidgetAndGridReady(true);
    }
  }, [gridsWH]);

  const determineGridWidthFromGridType = (gridType) => {
    if (gridType === "left") {
      return gridsWH["lw"];
    } else if (gridType === "right") {
      return gridsWH["rw"];
    } else {
      return gridsWH["cw"];
    }
  };

  useEffect(() => {
    async function innerEffect() {
      const [gridType, localX, localY, localW, localH, outOfBoundFactor] =
        await calculateChanges(id, widgets[id].sizes, layout);
      if (outOfBoundFactor === "falling") {
        setTimeout(async () => {
          //thequeue.current = [...thequeue.current, id];
          //console.log("queue", thequeue.current);
          scheduleFalling(id, widgets[id].sizes, layout, setLayout);
        }, 0);
      } else {
        scheduleFalling(id, widgets[id].sizes, layout, setLayout);
      }
    }
    if (setWidgetAndGridReady) {
      //setTimeout(() => {
      innerEffect();
      //console.log("after", gridRepresentation.current, HiddenItems);
      //}, 0);
    }
  }, [gridsWH]);

  return (
    <div
      className={`widget-template ${className}`}
      style={{
        gridRow: `${layout.x} / ${layout.x + layout.h}`,
        gridColumn: `${layout.y} / ${layout.y + layout.w}`,
        width: `${layout.w * 76 + (layout.w - 1) * 28}px`,
        height: `${layout.h * 76 + (layout.h - 1) * 28}px`,
      }}
    >
      {children}
    </div>
  );
}

export default WidgetTemplate;
