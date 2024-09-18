import { createContext, useContext, useState, useEffect, useRef } from "react";
import { useGridsWH } from "./useGridsWH";
import { useWidgets } from "./useWidgets";
import { useGridsContent } from "./useGridsContent";
import Mutex from "../app/Mutex";

const mutex = new Mutex();

const GridRepresentationContext = createContext();
export function GridRepresentationProvider({ children }) {
  const { widgets, addWidget, removeWidget, editWidget, getComponent } =
    useWidgets();
  const gridRepresentation = useRef({
    left: [
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
    ],
    center: [
      [null, null, null, null, null],
      [null, null, null, null, null],
      [null, null, null, null, null],
      [null, null, null, null, null],
      [null, null, null, null, null],
      [null, null, null, null, null],
      [null, null, null, null, null],
      [null, null, null, null, null],
    ],
    right: [
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
    ],
  });

  const { gridsWH } = useGridsWH();
  const {
    leftItems,
    centerItems,
    RightItems,
    HiddenItems,
    addItems,
    removeItems,
  } = useGridsContent();
  //===============================================================================================================================
  const isSpaceAvailable = (gridType, x, y, w, h, id) => {
    //console.log(gridRepresentation.current);
    let requiredGrid = gridRepresentation.current[gridType];
    let currentGridX = gridsWH[translateGridType(gridType)],
      currentGridY = gridsWH["gh"];

    if (
      requiredGrid.length < x ||
      requiredGrid[0].length < y ||
      w + y - 1 > currentGridX ||
      h + x - 1 > currentGridY
    ) {
      return false;
    }
    for (let i = 0; i < h; i++) {
      for (let j = 0; j < w; j++) {
        if (
          requiredGrid[i + x - 1][j + y - 1] !== null &&
          id !== requiredGrid[i + x - 1][j + y - 1]
        ) {
          if (
            !(
              (id === "dbaad026-e60b-4550-9f20-05cb608f429d" &&
                currentGridX === 1 &&
                i + x - 1 === 1) ||
              (id === "a0750c28-1f1e-4a91-80e7-1a7bafa515f5" &&
                currentGridX === 1 &&
                i + x - 1 === 3) ||
              (id === "65b172c0-ff13-4aa6-b7eb-32d55bd107fb" &&
                currentGridX === 1 &&
                i + x - 1 === 4)
            )
          ) {
            return false;
          }
        }
      }
    }
    return true;
  };

  const translateGridType = (gridType) => {
    switch (gridType) {
      case "left":
        return "lw";
      case "right":
        return "rw";
      case "center":
        return "cw";
      default:
        return null;
    }
  };

  const findAvailibleSpace = (gridType, w, h, id) => {
    let requiredGrid = gridRepresentation.current[gridType];
    let possibleX = 0,
      possibleY = 0;
    let currentGridX = gridsWH[translateGridType(gridType)],
      currentGridY = gridsWH["gh"];
    if (currentGridX < w || currentGridY < h) {
      return [null, null];
    }

    for (let i = possibleX; i < possibleX + h; i++) {
      for (let j = possibleY; j < possibleY + w; j++) {
        if (
          (requiredGrid[i][j] !== null && requiredGrid[i][j] !== id) ||
          (id !== "dbaad026-e60b-4550-9f20-05cb608f429d" &&
            currentGridX === 1 &&
            i === 1) ||
          (id !== "a0750c28-1f1e-4a91-80e7-1a7bafa515f5" &&
            currentGridX === 1 &&
            currentGridY === 5 &&
            i === 3) ||
          (id !== "65b172c0-ff13-4aa6-b7eb-32d55bd107fb" &&
            currentGridX === 1 &&
            currentGridY === 5 &&
            i === 4) ||
          (id !== "a0750c28-1f1e-4a91-80e7-1a7bafa515f5" &&
            currentGridX === 1 &&
            i === 6)
        ) {
          if (currentGridX - (w + j + 1) < 0) {
            if (currentGridY - (h + i + 1) >= 0) {
              i = possibleX;
              possibleX++;
              possibleY = 0;
              break;
            } else {
              return [null, null];
            }
          } else {
            i = possibleX;
            i--;
            possibleY = j + 1;
            break;
          }
        }
      }
    }
    return [possibleX + 1, possibleY + 1];
  };

  const addWidgetToGridRepresentation = (gridType, x, y, w, h, id) => {
    if (gridType !== "hidden") {
      if (isSpaceAvailable(gridType, x, y, w, h, id)) {
        const temp = { ...gridRepresentation.current };
        let requiredGrid = temp[gridType];
        for (let i = 0; i < h; i++) {
          for (let j = 0; j < w; j++) {
            requiredGrid[i + x - 1][j + y - 1] = id;
          }
        }
        temp[gridType] = [...requiredGrid];
        gridRepresentation.current = temp;
        return true;
      } else {
        return false;
      }
    }
    return true;
  };

  const getIdFromIndex = (gridType, x, y) => {
    return gridRepresentation.current[gridType][x - 1][y - 1];
  };
  const removeWidgetFromGridRepresentation = (gridType, x, y, w, h) => {
    if (x !== null) {
      const temp = { ...gridRepresentation.current };
      let requiredGrid = temp[gridType];
      for (let i = 0; i < h; i++) {
        for (let j = 0; j < w; j++) {
          requiredGrid[i + x - 1][j + y - 1] = null;
        }
      }
      temp[gridType] = [...requiredGrid];
      gridRepresentation.current = temp;
    }
  };
  //=======================================================================================
  const checkIfOutOfBound = (x, y, w, h, gridWidth, gridHeight) => {
    const vem = x + h - 1;
    const hem = y + w - 1;
    let outOfBoundFactor = null;

    if (gridWidth < hem || gridHeight < vem) {
      if (x <= gridHeight && y <= gridWidth) {
        outOfBoundFactor = "edging";
      } else {
        outOfBoundFactor = "falling";
      }
    }

    return [outOfBoundFactor, gridWidth - hem, gridHeight - vem];
  };
  const findWidgetGridType = (id) => {
    try {
      if (leftItems && RightItems && centerItems && HiddenItems) {
        if (leftItems[id] !== undefined) {
          return "left";
        }
        if (RightItems[id] !== undefined) {
          return "right";
        }
        if (centerItems[id] !== undefined) {
          return "center";
        }
        if (HiddenItems[id] !== undefined) {
          return "hidden";
        }
      }

      return null;
    } catch (err) {
      console.log(err);
    }
  };
  const calculateChanges = async (id, sizes, layout) => {
    const gridHeight = gridsWH["gh"];

    const currentWidget = widgets[id];
    const gridWidth =
      gridsWH[translateGridType(currentWidget.layouts.gridType)];
    let localX = currentWidget.layouts.regularX,
      localY = currentWidget.layouts.regularY,
      localW = sizes["sizes"][currentWidget.layouts.sizeIndex]["w"],
      localH = sizes["sizes"][currentWidget.layouts.sizeIndex]["h"],
      gridType = currentWidget.layouts.gridType;

    if (
      id === "a0750c28-1f1e-4a91-80e7-1a7bafa515f5" ||
      id === "65b172c0-ff13-4aa6-b7eb-32d55bd107fb"
    ) {
      if (gridHeight === 8) {
        if (localX && localX !== 8) {
          localX = 8;
        }
      } else {
        if (localX && localX !== 5) {
          localX = 5;
        }
      }
    }

    const [outOfBoundFactor, hem, vem] = checkIfOutOfBound(
      localX,
      localY,
      localW,
      localH,
      gridWidth,
      gridHeight
    );
    //========================================================================
    switch (outOfBoundFactor) {
      case "edging":
        //console.log(id, " is edging");
        let maximumW = hem >= 0 ? localW : localW + hem,
          maximumH = vem >= 0 ? localH : localH + vem;
        for (let i = currentWidget.layouts.sizeIndex - 1; i >= 0; i--) {
          if (
            sizes["sizes"][i]["w"] <= maximumW &&
            sizes["sizes"][i]["h"] <= maximumH
          ) {
            localW = sizes["sizes"][i]["w"];
            localH = sizes["sizes"][i]["h"];
            break;
          }
        }
        break;
      case "falling":
        //console.log(id, " is falling");
        localX = currentWidget.layouts.minimizedX;
        localY = currentWidget.layouts.minimizedY;
        localW = sizes["sizes"][0]["w"];
        localH = sizes["sizes"][0]["h"];

        if (id === "a0750c28-1f1e-4a91-80e7-1a7bafa515f5") {
          if (gridHeight === 8) {
            if (!localX || (localX && localX !== 7)) {
              localX = 7;
            }
          } else {
            if (!localX || (localX && localX !== 4)) {
              localX = 4;
            }
          }
        }

        if (
          localX === null ||
          !isSpaceAvailable("right", localX, localY, localW, localH, id)
        ) {
          const [foundX, foundY] = findAvailibleSpace(
            "right",
            localW,
            localH,
            id
          );
          //console.log("found sssss", foundX, foundY, id);
          let flagg = false;
          if (gridsWH["rw"] !== 1) {
            flagg = true;
          }
          if (foundX !== null) {
            localX = foundX;
            localY = foundY;
            gridType = "right";
          } else {
            localX = null;
            localY = null;
            gridType = "hidden";
          }
          if (flagg) {
            flagg = false;
            let tempX = widgets[id]["layouts"]["minimizedX"];
            let tempY = widgets[id]["layouts"]["minimizedY"];
            if (tempX !== localX || tempY !== localY) {
              //console.log("minimized is getting edited ", localX, localY, id);
              editWidget(id, "layouts", "minimizedX", localX);
              editWidget(id, "layouts", "minimizedY", localY);
            }
          }
        } else {
          gridType = "right";
        }
        break;
    }
    return [gridType, localX, localY, localW, localH, outOfBoundFactor];
  };

  const applyChanges = (
    gridType,
    localX,
    localY,
    localW,
    localH,
    layout,
    setLayout,
    id
  ) => {
    const foundGridSelector = findWidgetGridType(id);
    if (localX === null) {
      localX = layout.x;
      localY = layout.y;
    }
    const layoutAlign =
      layout.x === null ||
      localX !== layout.x ||
      localY !== layout.y ||
      localW !== layout.w ||
      localH !== layout.h
        ? false
        : true;
    const gridAlign =
      foundGridSelector && gridType !== foundGridSelector ? false : true;
    if (!layoutAlign || !gridAlign) {
      if (
        layout.x &&
        getIdFromIndex(foundGridSelector, layout.x, layout.y) === id
      ) {
        removeWidgetFromGridRepresentation(
          foundGridSelector,
          layout.x,
          layout.y,
          layout.w,
          layout.h
        );
      }

      if (!gridAlign) {
        //console.log("actual removing ", foundGridSelector, id);
        removeItems(foundGridSelector, id);
        //console.log("actual adding ", gridType, id);
        addItems(gridType, id);
      }
      if (!layoutAlign) {
        setLayout({ x: localX, y: localY, w: localW, h: localH });
      }
      addWidgetToGridRepresentation(
        gridType,
        localX,
        localY,
        localW,
        localH,
        id
      );
    }
  };

  const scheduleFalling = async (id, sizes, layout, setLayout) => {
    //await mutex.lock();

    const [gridType, localX, localY, localW, localH, outOfBoundFactor] =
      await calculateChanges(id, sizes, layout);
    applyChanges(
      gridType,
      localX,
      localY,
      localW,
      localH,
      layout,
      setLayout,
      id
    );
    //mutex.unlock();
  };
  return (
    <GridRepresentationContext.Provider
      value={{
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
      }}
    >
      {children}
    </GridRepresentationContext.Provider>
  );
}

export function useGridRepresentation() {
  return useContext(GridRepresentationContext);
}
