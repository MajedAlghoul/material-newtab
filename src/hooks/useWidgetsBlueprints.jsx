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
import {
  weatherSize0Svg,
  weatherSize1Svg,
  weatherSize2Svg,
  weatherSize3Svg,
  searchSize0Svg,
  searchSize1Svg,
  searchSize2Svg,
} from "../app/Svgs.jsx";

const WidgetsBlueprintsContext = createContext();

export function WidgetsBlueprintsProvider({ children }) {
  const [blueprints, setBlueprints] = useState(null);
  /*
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
*/
  const addBlueprint = (id, blueprint) => {
    setBlueprints({ ...blueprints, [id]: blueprint });
  };
  const removeBlueprint = (id) => {
    setBlueprints((prev) => {
      const temp = { ...prev };
      delete temp[id];
      return temp;
    });
  };
  /*
  const editWidget = (id, property1, property2, edited) => {
    return new Promise((resolve) => {
      setBlueprints((prev) => {
        const temp = { ...prev };
        temp[id] = { ...temp[id] };
        temp[id][property1][property2] = edited;
        return temp;
      });
      resolve();
    });
  };*/

  useEffect(() => {
    if (!blueprints) {
      setBlueprints(defaultWidgetsBlueprints());
    }
    /*
    async function innerEffect() {
      let storage = await pullStorage("widgets");
      if (!storage || Object.keys(storage).length > 0) {
        await setStorage("widgets", defaultWidgets());
        storage = await pullStorage("widgets");
      }
      setWidgets(storage);
    }
    innerEffect();*/
  }, []);
  /*
  useEffect(() => {
    async function innerEffect() {
      if (widgets) {
        await setStorage("widgets", widgets);
        //console.log(widgets);
      }
    }
    innerEffect();
  }, [widgets]);*/
  return (
    <WidgetsBlueprintsContext.Provider
      value={{ blueprints, addBlueprint, removeBlueprint }}
    >
      {children}
    </WidgetsBlueprintsContext.Provider>
  );
}

export function useWidgetsBlueprints() {
  return useContext(WidgetsBlueprintsContext);
}

function defaultWidgetsBlueprints() {
  return {
    "Add New Item": new WidgetBackend(
      "AddNewItemWidget",
      {
        gridType: "right",
        regularX: 1,
        regularY: 1,
        minimizedX: null,
        minimizedY: null,
        sizeIndex: 0,
      },
      null,
      {
        sizesCount: 1,
        sizes: [{ w: 1, h: 1 }],
        images: null,
      }
    ),
    Bookmarks: new WidgetBackend(
      "BookmarksWidget",
      {
        gridType: "right",
        regularX: 1,
        regularY: 2,
        minimizedX: 2,
        minimizedY: 1,
        sizeIndex: 1,
      },
      null,
      {
        sizesCount: 2,
        sizes: [
          { w: 1, h: 1 },
          { w: 2, h: 1 },
        ],
        images: null,
      }
    ),
    "Hidden Widgets": new WidgetBackend(
      "HiddenWidgetsWidget",
      {
        gridType: "right",
        regularX: 5,
        regularY: 3,
        minimizedX: 4,
        minimizedY: 1,
        sizeIndex: 0,
      },
      null,
      {
        sizesCount: 1,
        sizes: [{ w: 1, h: 1 }],
        images: null,
      }
    ),
    Customize: new WidgetBackend(
      "CustomizeWidget",
      {
        gridType: "right",
        regularX: 5,
        regularY: 1,
        minimizedX: null,
        minimizedY: null,
        sizeIndex: 1,
      },
      null,
      {
        sizesCount: 2,
        sizes: [
          { w: 1, h: 1 },
          { w: 2, h: 1 },
        ],
        images: null,
      }
    ),
    Weather: new WidgetBackend(
      "WeatherWidget",
      {
        gridType: "left",
        regularX: 1,
        regularY: 1,
        minimizedX: null,
        minimizedY: null,
        sizeIndex: 2,
      },
      { city: "" },
      {
        sizesCount: 3,
        sizes: [
          { w: 1, h: 1 },
          { w: 2, h: 2 },
          { w: 3, h: 2 },
          { w: 3, h: 3 },
        ],
        images: [
          weatherSize0Svg,
          weatherSize1Svg,
          weatherSize2Svg,
          weatherSize3Svg,
        ],
      }
    ),

    Search: new WidgetBackend(
      "SearchWidget",
      {
        gridType: "center",
        regularX: 3,
        regularY: 1,
        minimizedX: null,
        minimizedY: null,
        sizeIndex: 2,
      },
      null,
      {
        sizesCount: 3,
        sizes: [
          { w: 1, h: 1 },
          { w: 3, h: 1 },
          { w: 5, h: 1 },
        ],
        images: [searchSize0Svg, searchSize1Svg, searchSize2Svg],
      }
    ),
    App: new WidgetBackend(
      "AppWidget",
      {
        gridType: "center",
        regularX: 4,
        regularY: 1,
        minimizedX: null,
        minimizedY: null,
        sizeIndex: 0,
      },
      {
        icon: null,
        name: "",
        url: null,
      },
      {
        sizesCount: 1,
        sizes: [{ w: 1, h: 1 }],
        images: null,
      }
    ),
  };
}
