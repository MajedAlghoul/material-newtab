import { createContext, useContext, useState, useEffect, useRef } from "react";
import { generateUUID, pullStorage, setStorage } from "../app/utility.js";
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
import { AppWidget } from "../components/widgets/appWidget/AppWidget.jsx";

const WidgetsContext = createContext();

export function WidgetsProvider({ children }) {
  const [widgets, setWidgets] = useState(null);
  const { blueprints } = useWidgetsBlueprints();
  const defaultWidgetsList = {
    AddNewItemWidget,
    BookmarksWidget,
    HiddenWidgetsWidget,
    CustomizeWidget,
    WeatherWidget,
    SearchWidget,
    AddNewItemPlaceholder,
    AppWidget,
  };

  const defaultWidgetIDs = [
    "771bdc39-8e79-4e34-a30c-00b3393351cd",
    "dbaad026-e60b-4550-9f20-05cb608f429d",
    "a0750c28-1f1e-4a91-80e7-1a7bafa515f5",
    "65b172c0-ff13-4aa6-b7eb-32d55bd107fb",
  ];

  const getComponent = (wComponent) => {
    return defaultWidgetsList[wComponent];
  };

  const addWidget = (widget, gridType, x, y, sizeIndex, data) => {
    setWidgets((prev) => {
      const actualWidgetBlueprint = { ...blueprints[widget] };
      const actualWidget = new WidgetBackend(
        actualWidgetBlueprint["wComponent"],
        actualWidgetBlueprint["layouts"],
        actualWidgetBlueprint["otherProps"],
        actualWidgetBlueprint["sizes"]
      );

      actualWidget.layouts.gridType = gridType;
      actualWidget.layouts.regularX = x;
      actualWidget.layouts.regularY = y;
      actualWidget.layouts.sizeIndex = sizeIndex;
      actualWidget.otherProps = data;
      const id = generateUUID();

      const temp = { ...prev, [id]: actualWidget };
      return temp;
    });
  };
  const removeWidget = (id) => {
    setWidgets((prev) => {
      const temp = { ...prev };
      delete temp[id];
      return temp;
    });
  };

  const editWidget = (id, property1, property2, edited) => {
    setWidgets((prev) => {
      const temp = { ...prev };
      temp[id] = { ...prev[id] };
      temp[id][property1][property2] = edited;
      return temp;
    });
  };

  useEffect(() => {
    async function innerEffect() {
      let storage = await pullStorage("widgets");
      // > 0 is set to default to default widgets on page refresh
      // for development purposes
      if (!storage || (Object.keys(storage).length > 0 && blueprints)) {
        await setStorage("widgets", defaultWidgets(blueprints));
        storage = await pullStorage("widgets");
      }
      setWidgets(storage);
    }
    innerEffect();
  }, [blueprints]);

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
      value={{
        widgets,
        addWidget,
        removeWidget,
        editWidget,
        getComponent,
        defaultWidgetIDs,
      }}
    >
      {children}
    </WidgetsContext.Provider>
  );
}

export function useWidgets() {
  return useContext(WidgetsContext);
}

function defaultWidgets(blueprints) {
  if (blueprints) {
    const addCopy = { ...blueprints["Add New Item"] };
    const bookmarksCopy = { ...blueprints["Bookmarks"] };
    const hiddenCopy = { ...blueprints["Hidden Widgets"] };
    const customizeCopy = { ...blueprints["Customize"] };
    const weatherCopy = { ...blueprints["Weather"] };
    const searchCopy = { ...blueprints["Search"] };
    const appCopy = { ...blueprints["App"] };
    return {
      "771bdc39-8e79-4e34-a30c-00b3393351cd": new WidgetBackend(
        addCopy["wComponent"],
        addCopy["layouts"],
        addCopy["otherProps"],
        addCopy["sizes"]
      ),
      "dbaad026-e60b-4550-9f20-05cb608f429d": new WidgetBackend(
        bookmarksCopy["wComponent"],
        bookmarksCopy["layouts"],
        bookmarksCopy["otherProps"],
        bookmarksCopy["sizes"]
      ),
      "a0750c28-1f1e-4a91-80e7-1a7bafa515f5": new WidgetBackend(
        hiddenCopy["wComponent"],
        hiddenCopy["layouts"],
        hiddenCopy["otherProps"],
        hiddenCopy["sizes"]
      ),
      "65b172c0-ff13-4aa6-b7eb-32d55bd107fb": new WidgetBackend(
        customizeCopy["wComponent"],
        customizeCopy["layouts"],
        customizeCopy["otherProps"],
        customizeCopy["sizes"]
      ),
      xxxxx: new WidgetBackend(
        weatherCopy["wComponent"],
        weatherCopy["layouts"],
        weatherCopy["otherProps"],
        weatherCopy["sizes"]
      ),
      bbbbbb: new WidgetBackend(
        weatherCopy["wComponent"],
        weatherCopy["layouts"],
        weatherCopy["otherProps"],
        weatherCopy["sizes"]
      ),
      cccccc: new WidgetBackend(
        weatherCopy["wComponent"],
        weatherCopy["layouts"],
        weatherCopy["otherProps"],
        weatherCopy["sizes"]
      ),
      tttttt: new WidgetBackend(
        weatherCopy["wComponent"],
        weatherCopy["layouts"],
        weatherCopy["otherProps"],
        weatherCopy["sizes"]
      ),
      kkkkkk: new WidgetBackend(
        weatherCopy["wComponent"],
        weatherCopy["layouts"],
        weatherCopy["otherProps"],
        weatherCopy["sizes"]
      ),
      rrrrrr: new WidgetBackend(
        weatherCopy["wComponent"],
        weatherCopy["layouts"],
        weatherCopy["otherProps"],
        weatherCopy["sizes"]
      ),
      qqqqqq: new WidgetBackend(
        weatherCopy["wComponent"],
        weatherCopy["layouts"],
        weatherCopy["otherProps"],
        weatherCopy["sizes"]
      ),

      yyyyyy: new WidgetBackend(
        searchCopy["wComponent"],
        searchCopy["layouts"],
        searchCopy["otherProps"],
        searchCopy["sizes"]
      ),
      /*
      bkbkbk: new WidgetBackend(
        appCopy["wComponent"],
        appCopy["layouts"],
        appCopy["otherProps"],
        appCopy["sizes"]
      ),*/
    };
  }
}
