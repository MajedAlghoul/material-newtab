import Grid from "../components/grid/Grid.jsx";

import { AddNewItemWidget } from "../components/widgets/addNewItemWidget/AddNewItemWidget.jsx";
import CustomizeWidget from "../components/widgets/customizeWidget/CustomizeWidget.jsx";
import BookmarksWidget from "../components/widgets/bookmarksWidget/BookmarksWidget.jsx";
import HiddenWidgetsWidget from "../components/widgets/hiddenWidgetsWidget/hiddenWidgetsWidget.jsx";

import "./App.css";
import * as utility from "./utility.js";
import WidgetBackend from "./WidgetBackend.js";
import { useEffect, useState } from "react";
import { useGridsContent } from "../hooks/useGridsContent.jsx";
import { useGridsWH } from "../hooks/useGridsWH.jsx";

//import { type } from "@testing-library/user-event/dist/type/index.js";
import AddNewItemPlaceholder from "../components/addNewItemPlaceholder/AddNewItemPlaceholder.jsx";
import SearchWidget from "../components/widgets/searchWidget/SearchWidget.jsx";
import WeatherWidget from "../components/widgets/weatherWidget/WeatherWidget.jsx";
import { useWidgets } from "../hooks/useWidgets.jsx";

function App() {
  const {
    leftItems,
    centerItems,
    RightItems,
    HiddenItems,
    addItems,
    removeItems,
    centerWidget,
    rightWidget,
  } = useGridsContent();
  const { widgets, addWidget, removeWidget, editWidget, getComponent } =
    useWidgets();
  const { gridsWH } = useGridsWH();
  const [widgetAndGridReady, setWidgetAndGridReady] = useState(false);

  useEffect(() => {
    if (widgets && gridsWH !== undefined && !widgetAndGridReady) {
      setWidgetAndGridReady(true);
    }
  }, [widgets, gridsWH]);
  useEffect(() => {
    try {
      if (widgetAndGridReady) {
        if (widgets && gridsWH !== undefined) {
          for (const [key, value] of Object.entries(widgets)) {
            addItems(value.layouts.gridType, key);
          }
        }
      }
    } catch (err) {
      console.log(err);
    }
  }, [widgetAndGridReady]);

  return (
    <div className="app-container">
      <div className="grids-container">
        <Grid gridType="left">
          {Object.keys(leftItems).map((key) => {
            const WidgetComponent = getComponent(widgets[key].wComponent);
            return <WidgetComponent key={key} id={key} />;
          })}
        </Grid>
        <Grid gridType="center">
          {Object.keys(centerItems).map((key) => {
            const WidgetComponent = getComponent(widgets[key].wComponent);
            return <WidgetComponent key={key} id={key} />;
          })}
          {centerWidget}
        </Grid>
        <Grid gridType="right">
          {Object.keys(RightItems).map((key) => {
            const WidgetComponent = getComponent(widgets[key].wComponent);
            return <WidgetComponent key={key} id={key} />;
          })}
          {rightWidget}
        </Grid>
        <Grid gridType="hidden">
          {Object.keys(HiddenItems).map((key) => {
            const WidgetComponent = getComponent(widgets[key].wComponent);
            return <WidgetComponent key={key} id={key} />;
          })}
        </Grid>
      </div>
    </div>
  );
}

export default App;
