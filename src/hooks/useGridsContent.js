import React, { createContext, useContext, useState, useRef } from "react";

const GridsContentContext = createContext();

export function GridsContentProvider({ children }) {
  const [leftItems, setLeftItems] = useState({});
  const [centerItems, setCenterItems] = useState({});
  const [RightItems, setRightItems] = useState({});
  const [HiddenItems, setHiddenItems] = useState({});
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

  const addItems = (gridType, widget) => {
    if (gridType === "left") {
      setLeftItems((prev) => ({ ...prev, [widget]: null }));
    } else if (gridType === "right") {
      setRightItems((prev) => ({ ...prev, [widget]: null }));
    } else if (gridType === "center") {
      setCenterItems((prev) => ({ ...prev, [widget]: null }));
    } else if (gridType === "hidden") {
      setHiddenItems((prev) => ({ ...prev, [widget]: null }));
    } else {
      console.log("Invalid Grid Type");
    }
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
      }}
    >
      {children}
    </GridsContentContext.Provider>
  );
}

export function useGridsContent() {
  return useContext(GridsContentContext);
}
