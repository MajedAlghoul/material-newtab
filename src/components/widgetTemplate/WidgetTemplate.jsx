import { useGridsWH } from "../../hooks/useGridsWH.jsx";
import "./WidgetTemplate.css";
import { useWidgets } from "../../hooks/useWidgets.jsx";
import { useGridsContent } from "../../hooks/useGridsContent.jsx";
import { useEffect, useState, useRef } from "react";
import { useGridRepresentation } from "../../hooks/useGridRepresentation.jsx";
import { useWidgetDropper } from "../../hooks/useWidgetDropper.jsx";
import {
  widgetOverlayXSvg,
  widgetOverlayMinusSvg,
  widgetOverlayEditSvg,
} from "../../app/Svgs.jsx";
function WidgetTemplate({ className, id, layout, setLayout, children }) {
  const { gridsWH } = useGridsWH();
  const {
    leftItems,
    centerItems,
    RightItems,
    HiddenItems,
    addItems,
    removeItems,
    isEditModeOn,
    toggleEditMode,
    removePlaceHolders,
  } = useGridsContent();
  const {
    widgets,
    addWidget,
    removeWidget,
    editWidget,
    getComponent,
    defaultWidgetIDs,
  } = useWidgets();
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
    addPlaceHolders,
    placeholderHover,
    updatePlaceholderLocation,
    clearPlaceholderLocation,
    getPlaceholderLocation,
  } = useGridRepresentation();

  const { getDropper, isDropperEmpty } = useWidgetDropper();

  const [widgetAndGridReady, setWidgetAndGridReady] = useState(false);
  const [widgetHeld, setWidgetHeld] = useState(false);
  const [originalLocation, setOriginalLocation] = useState({
    x: layout.x,
    y: layout.y,
  });
  //=====================================================================

  useEffect(() => {
    if (widgets && gridsWH !== undefined && !widgetAndGridReady) {
      setWidgetAndGridReady(true);
    }
  }, [gridsWH]);

  const triggerWidgetHold = (stat) => {
    setWidgetHeld(stat);
  };
  useEffect(() => {
    const handleMouseUp = () => setWidgetHeld(false);

    // Listen for mouseup anywhere in the document
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  const determineGridWidthFromGridType = (gridType) => {
    if (gridType === "left") {
      return gridsWH["lw"];
    } else if (gridType === "right") {
      return gridsWH["rw"];
    } else {
      return gridsWH["cw"];
    }
  };

  const handleWidgetDelete = () => {
    const gType = findWidgetGridType(id);
    removeWidgetFromGridRepresentation(
      gType,
      layout.x,
      layout.y,
      layout.w,
      layout.h
    );
    removeItems(gType, id);
    removeWidget(id);

    //removePlaceHolders();
    addPlaceHolders();
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

  useEffect(() => {
    if (widgetHeld && layout && layout.x !== null) {
      console.log(layout, placeholderHover);
      const gType = findWidgetGridType(id);
      console.log("wtf???", layout.w, layout.h);
      const [tempX, tempY] = [
        ...getPlaceholderLocation(gType, layout.w, layout.h, id),
      ];
      console.log("dds ", tempX, tempY, id);
      if (tempX !== null) {
        //console.log("special ", originalLocation.x, originalLocation.y);
        //layout.x = originalLocation.x;
        //layout.y = originalLocation.y;
        setLayout({ ...layout, x: tempX, y: tempY });
      }
      //} else {
      //setOriginalLocation({ x: layout.x, y: layout.y });
      //setLayout({ ...layout, x: tempX, y: tempY });
      //}
    }
  }, [widgetHeld, placeholderHover, originalLocation]);

  return (
    <div
      onMouseDown={() => triggerWidgetHold(true)}
      //onMouseUp={() => triggerWidgetHold(false)}
      className={`widget-template ${className} ${
        isEditModeOn() && widgetHeld && "transparent-held-widget"
      }`}
      style={{
        gridRow: `${layout.x} / ${layout.x + layout.h}`,
        gridColumn: `${layout.y} / ${layout.y + layout.w}`,
        width: `${layout.w * 76 + (layout.w - 1) * 28}px`,
        height: `${layout.h * 76 + (layout.h - 1) * 28}px`,
      }}
    >
      {!widgetHeld && isEditModeOn() && !defaultWidgetIDs.includes(id) && (
        <div className="widget-template-buttons-container">
          <button
            className="widget-template-buttons"
            onClick={handleWidgetDelete}
          >
            {className.includes("app-widget")
              ? widgetOverlayXSvg
              : widgetOverlayMinusSvg}
          </button>
          <button className="widget-template-buttons">
            {widgetOverlayEditSvg}
          </button>
        </div>
      )}
      {children}
    </div>
  );
}

export default WidgetTemplate;
