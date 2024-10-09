import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./app/App.jsx";
import { GridsWHProvider } from "./hooks/useGridsWH.jsx";
import { WidgetsProvider } from "./hooks/useWidgets.jsx";
import { GridRepresentationProvider } from "./hooks/useGridRepresentation.jsx";
import { GridsContentProvider } from "./hooks/useGridsContent.jsx";
import { WidgetsBlueprintsProvider } from "./hooks/useWidgetsBlueprints.jsx";
//import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <GridsWHProvider>
    <WidgetsBlueprintsProvider>
      <WidgetsProvider>
        <GridsContentProvider>
          <GridRepresentationProvider>
            <App />
          </GridRepresentationProvider>
        </GridsContentProvider>
      </WidgetsProvider>
    </WidgetsBlueprintsProvider>
  </GridsWHProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
