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
  const [dropper, setDropper] = useState([null, null]);

  const drop = (w, h) => {
    setDropper([w, h]);
  };
  const emptyDropper = () => {
    setDropper([null, null]);
  };
  const isDropperEmpty = () => {
    return dropper[0] === null;
  };
  const getDropper = () => {
    return dropper;
  };
  return (
    <WidgetDropperContext.Provider
      value={{ drop, emptyDropper, isDropperEmpty, getDropper }}
    >
      {children}
    </WidgetDropperContext.Provider>
  );
}

export function useWidgetDropper() {
  return useContext(WidgetDropperContext);
}
