import { object } from "prop-types";
import React, { createContext, useContext, useState, useRef } from "react";
import { useWidgetDropper } from "./useWidgetDropper.jsx";

const GridsContentContext = createContext();

export function GridsContentProvider({ children }) {
  const [leftItems, setLeftItems] = useState({});
  const [centerItems, setCenterItems] = useState({});
  const [RightItems, setRightItems] = useState({});
  const [HiddenItems, setHiddenItems] = useState({});
  const [centerWidget, setCenterWidget] = useState([]);
  const [rightWidget, setRightWidget] = useState([]);
  const [placeholders, setPlaceholders] = useState({
    left: [],
    center: [],
    right: [],
  });
  const classSetter = useRef([null, ""]);
  const { emptyDropper } = useWidgetDropper();
  const removeItems = (gridType, widget) => {
    if (gridType === "left") {
      setLeftItems((prev) => {
        let temp = { ...prev };
        delete temp[widget];
        return temp;
      });
    } else if (gridType === "right") {
      setRightItems((prev) => {
        let temp = { ...prev };
        delete temp[widget];
        return temp;
      });
    } else if (gridType === "center") {
      setCenterItems((prev) => {
        let temp = { ...prev };
        delete temp[widget];
        return temp;
      });
    } else if (gridType === "hidden") {
      setHiddenItems((prev) => {
        let temp = { ...prev };
        delete temp[widget];
        return temp;
      });
    } else {
      console.log("Invalid Grid Type");
    }
  };

  const addItems = (gridType, widget, setClass, classs) => {
    if (gridType === "left") {
      setLeftItems((prev) => ({ ...prev, [widget]: null }));
    } else if (gridType === "right") {
      setRightItems((prev) => ({ ...prev, [widget]: null }));
    } else if (gridType === "center") {
      setCenterItems((prev) => ({ ...prev, [widget]: null }));
    } else if (gridType === "hidden") {
      setHiddenItems((prev) => ({ ...prev, [widget]: null }));
    } else if (gridType === "leftP") {
      setPlaceholders((prev) => {
        let temp = { ...prev };
        temp.left = [...prev.left, widget];
        return temp;
      });
    } else if (gridType === "centerP") {
      setPlaceholders((prev) => {
        let temp = { ...prev };
        temp.center = [...prev.center, widget];
        return temp;
      });
    } else if (gridType === "rightP") {
      setPlaceholders((prev) => {
        let temp = { ...prev };
        temp.right = [...prev.right, widget];
        return temp;
      });
    } else if (gridType === "centerW") {
      setCenterWidget([widget]);
      classSetter.current = [setClass, classs];
      setRightWidget([]);
    } else if (gridType === "rightW") {
      setRightWidget([widget]);
      classSetter.current = [setClass, classs];
      setCenterWidget([]);
    } else {
      console.log("Invalid Grid Type");
    }
  };

  const hardFlushMenu = () => {
    if (classSetter.current[0]) {
      classSetter.current[0](classSetter.current[1]);
      softFlushMenu();
      removePlaceHolders();
      emptyDropper();
    }
  };

  const softFlushMenu = () => {
    setCenterWidget([]);
    setRightWidget([]);
  };

  const currentClass = () => {
    return classSetter.current[1];
  };

  const isMenuVisible = () => centerWidget.length > 0 || rightWidget.length > 0;

  const removePlaceHolders = () => {
    setPlaceholders((prev) => {
      let temp = { ...prev };
      temp.left = [];
      temp.center = [];
      temp.right = [];
      return temp;
    });
  };

  return (
    <GridsContentContext.Provider
      value={{
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
        placeholders,
      }}
    >
      {children}
    </GridsContentContext.Provider>
  );
}

export function useGridsContent() {
  return useContext(GridsContentContext);
}
