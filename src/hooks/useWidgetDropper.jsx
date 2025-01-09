import { createContext, useContext, useState, useEffect, useRef } from "react";
import { pullStorage, setStorage } from "../app/utility.js";
import { useGridsWH } from "./useGridsWH.jsx";
import WidgetBackend from "../app/WidgetBackend.js";
import { AddNewItemWidget } from "../components/widgets/addNewItemWidget/AddNewItemWidget.jsx";
import { BookmarksWidget } from "../components/widgets/bookmarksWidget/BookmarksWidget.jsx";
import { HiddenWidgetsWidget } from "../components/widgets/hiddenWidgetsWidget/hiddenWidgetsWidget.jsx";
import { CustomizeWidget } from "../components/widgets/customizeWidget/CustomizeWidget.jsx";
import { WeatherWidget } from "../components/widgets/weatherWidget/WeatherWidget.jsx";
import { SearchWidget } from "../components/widgets/searchWidget/SearchWidget.jsx";
import { useWidgetsBlueprints } from "./useWidgetsBlueprints.jsx";
import { AddNewItemPlaceholder } from "../components/addNewItemPlaceholder/AddNewItemPlaceholder.jsx";

const WidgetDropperContext = createContext();

export function WidgetsDropper({ children }) {
  const [placeholderHover, setPlaceholderHover] = useState({
    x: null,
    y: null,
  });

  const [dropper, setDropper] = useState(null);
  //==================================================================

  const drop = (w, h, sizeIndex, data, widget) => {
    setDropper({ w, h, sizeIndex, data, widget });
  };
  const emptyDropper = () => {
    setDropper(null);
  };
  const isDropperEmpty = () => {
    return dropper === null;
  };
  const getDropper = () => {
    return dropper;
  };

  const updatePlaceholderLocation = (x, y) => {
    setPlaceholderHover(() => ({
      x,
      y,
    }));
  };

  const clearPlaceholderLocation = () => {
    setPlaceholderHover(() => ({ x: null, y: null }));
  };

  const getPlaceholderLocation = (gridType, w, h, id) => {
    return getBestEstimatedPlace(
      gridType,
      placeholderHover.x,
      placeholderHover.y,
      w,
      h,
      id
    );
  };
  return (
    <WidgetDropperContext.Provider
      value={{
        drop,
        emptyDropper,
        isDropperEmpty,
        getDropper,
      }}
    >
      {children}
    </WidgetDropperContext.Provider>
  );
}

export function useWidgetDropper() {
  return useContext(WidgetDropperContext);
}
