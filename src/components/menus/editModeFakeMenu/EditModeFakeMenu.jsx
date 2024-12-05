import { useGridsWH } from "../../../hooks/useGridsWH.jsx";
import { useWidgets } from "../../../hooks/useWidgets.jsx";
import { useGridsContent } from "../../../hooks/useGridsContent.jsx";
import { useEffect, useState, useRef } from "react";
import { useGridRepresentation } from "../../../hooks/useGridRepresentation.jsx";
import { useWidgetsBlueprints } from "../../../hooks/useWidgetsBlueprints.jsx";
import {
  sliderBackArrow,
  sliderForwardArrow,
  closeXSvg,
} from "../../../app/Svgs.jsx";

export function EditModeFakeMenu() {
  const { gridsWH } = useGridsWH();
  const isInitialMount = useRef(true);
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
  } = useGridsContent();
  const { addPlaceHolders } = useGridRepresentation();

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else if (gridsWH) {
      //setClasses("add-new-item-widget");
      //softFlushMenu();
      removePlaceHolders();
      setTimeout(() => {
        addPlaceHolders();
      }, 1);
    }
  }, [gridsWH]);
  return <></>;
}
