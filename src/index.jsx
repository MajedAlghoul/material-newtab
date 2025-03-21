import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./app/App.jsx";
import { GridsWHProvider } from "./hooks/useGridsWH.jsx";
import { WidgetsProvider } from "./hooks/useWidgets.jsx";
import { GridRepresentationProvider } from "./hooks/useGridRepresentation.jsx";
import { GridsContentProvider } from "./hooks/useGridsContent.jsx";
import { WidgetsBlueprintsProvider } from "./hooks/useWidgetsBlueprints.jsx";
import { WidgetsDropper } from "./hooks/useWidgetDropper.jsx";
import { BookmarksProvider } from "./hooks/useBookmarks.jsx";
import { ThemeProvider } from "./hooks/useTheme.jsx";
//import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ThemeProvider>
    <GridsWHProvider>
      <WidgetsBlueprintsProvider>
        <BookmarksProvider>
          <WidgetsProvider>
            <WidgetsDropper>
              <GridsContentProvider>
                <GridRepresentationProvider>
                  <App />
                </GridRepresentationProvider>
              </GridsContentProvider>
            </WidgetsDropper>
          </WidgetsProvider>
        </BookmarksProvider>
      </WidgetsBlueprintsProvider>
    </GridsWHProvider>
  </ThemeProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
