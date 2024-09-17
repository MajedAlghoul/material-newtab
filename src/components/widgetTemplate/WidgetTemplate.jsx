import { useGridsWH } from "../../hooks/useGridsWH.js";
import "./WidgetTemplate.css";
import { useWidgets } from "../../hooks/useWidgets.js";
import { useGridsContent } from "../../hooks/useGridsContent.js";
import { useEffect, useState, useRef } from "react";
import { useGridRepresentation } from "../../hooks/useGridRepresentation.js";

function WidgetTemplate({ className, id, sizes, layout, setLayout, children }) {
  const { gridsWH } = useGridsWH();
  const {
    leftItems,
    centerItems,
    RightItems,
    HiddenItems,
    addItems,
    removeItems,
  } = useGridsContent();
  const { widgets, editWidget } = useWidgets();
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
        await calculateChanges(id, sizes);
      if (outOfBoundFactor === "falling") {
        setTimeout(async () => {
          //thequeue.current = [...thequeue.current, id];
          //console.log("queue", thequeue.current);
          await scheduleFalling(id, sizes, layout, setLayout);
        }, 0);
      } else {
        await scheduleFalling(id, sizes, layout, setLayout);
      }
    }
    if (setWidgetAndGridReady) {
      //setTimeout(() => {
      innerEffect();
      //console.log("after", gridRepresentation, HiddenItems);
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
