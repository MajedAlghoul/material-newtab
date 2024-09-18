import { createContext, useContext, useState, useEffect, useRef } from "react";
import { pullStorage, setStorage } from "../app/utility.js";
import { useGridsWH } from "./useGridsWH.js";
import WidgetBackend from "../app/WidgetBackend.js";
import { AddNewItemWidget } from "../components/widgets/addNewItemWidget/AddNewItemWidget.jsx";
import { BookmarksWidget } from "../components/widgets/bookmarksWidget/BookmarksWidget.jsx";
import { HiddenWidgetsWidget } from "../components/widgets/hiddenWidgetsWidget/hiddenWidgetsWidget.jsx";
import { CustomizeWidget } from "../components/widgets/customizeWidget/CustomizeWidget.jsx";
import { WeatherWidget } from "../components/widgets/weatherWidget/WeatherWidget.jsx";
import { SearchWidget } from "../components/widgets/searchWidget/SearchWidget.jsx";

const WidgetsContext = createContext();

export function WidgetsProvider({ children }) {
  const [widgets, setWidgets] = useState(null);

  const defaultWidgetsList = {
    AddNewItemWidget,
    BookmarksWidget,
    HiddenWidgetsWidget,
    CustomizeWidget,
    WeatherWidget,
    SearchWidget,
  };

  const getComponent = (wComponent) => {
    return defaultWidgetsList[wComponent];
  };

  const addWidget = (id, widget) => {
    setWidgets({ ...widgets, [id]: widget });
  };
  const removeWidget = (id) => {
    setWidgets((prev) => {
      const temp = { ...prev };
      delete temp[id];
      return temp;
    });
  };

  const editWidget = (id, property1, property2, edited) => {
    return new Promise((resolve) => {
      setWidgets((prev) => {
        const temp = { ...prev };
        temp[id] = { ...temp[id] };
        temp[id][property1][property2] = edited;
        return temp;
      });
      resolve();
    });
  };

  useEffect(() => {
    async function innerEffect() {
      let storage = await pullStorage("widgets");
      if (!storage || Object.keys(storage).length > 0) {
        await setStorage("widgets", defaultWidgets());
        storage = await pullStorage("widgets");
      }
      setWidgets(storage);
    }
    innerEffect();
  }, []);

  useEffect(() => {
    async function innerEffect() {
      if (widgets) {
        await setStorage("widgets", widgets);
        //console.log(widgets);
      }
    }
    innerEffect();
  }, [widgets]);
  return (
    <WidgetsContext.Provider
      value={{ widgets, addWidget, removeWidget, editWidget, getComponent }}
    >
      {children}
    </WidgetsContext.Provider>
  );
}

export function useWidgets() {
  return useContext(WidgetsContext);
}

function defaultWidgets() {
  return {
    "771bdc39-8e79-4e34-a30c-00b3393351cd": new WidgetBackend(
      "AddNewItemWidget",
      {
        gridType: "right",
        regularX: 1,
        regularY: 1,
        minimizedX: null,
        minimizedY: null,
        sizeIndex: 0,
      },
      null
    ),
    "dbaad026-e60b-4550-9f20-05cb608f429d": new WidgetBackend(
      "BookmarksWidget",
      {
        gridType: "right",
        regularX: 1,
        regularY: 2,
        minimizedX: 2,
        minimizedY: 1,
        sizeIndex: 1,
      },
      null
    ),
    "a0750c28-1f1e-4a91-80e7-1a7bafa515f5": new WidgetBackend(
      "HiddenWidgetsWidget",
      {
        gridType: "right",
        regularX: 5,
        regularY: 3,
        minimizedX: 4,
        minimizedY: 1,
        sizeIndex: 0,
      },
      null
    ),
    "65b172c0-ff13-4aa6-b7eb-32d55bd107fb": new WidgetBackend(
      "CustomizeWidget",
      {
        gridType: "right",
        regularX: 5,
        regularY: 1,
        minimizedX: null,
        minimizedY: null,
        sizeIndex: 1,
      },
      null
    ),
    xxxxx: new WidgetBackend(
      "WeatherWidget",
      {
        gridType: "left",
        regularX: 1,
        regularY: 1,
        minimizedX: null,
        minimizedY: null,
        sizeIndex: 2,
      },
      { city: "Ramallah" }
    ),
    bbbbbb: new WidgetBackend(
      "WeatherWidget",
      {
        gridType: "left",
        regularX: 3,
        regularY: 1,
        minimizedX: null,
        minimizedY: null,
        sizeIndex: 2,
      },
      { city: "Ramallah" }
    ),
    cccccc: new WidgetBackend(
      "WeatherWidget",
      {
        gridType: "left",
        regularX: 5,
        regularY: 1,
        minimizedX: null,
        minimizedY: null,
        sizeIndex: 1,
      },
      { city: "Ramallah" }
    ),

    yyyyyy: new WidgetBackend(
      "SearchWidget",
      {
        gridType: "center",
        regularX: 3,
        regularY: 1,
        minimizedX: null,
        minimizedY: null,
        sizeIndex: 2,
      },
      null
    ),
  };
}
