import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./app/App.jsx";
import { GridsWHProvider } from "./hooks/useGridsWH.js";
import { WidgetsProvider } from "./hooks/useWidgets.js";
import { GridRepresentationProvider } from "./hooks/useGridRepresentation.js";
import { GridsContentProvider } from "./hooks/useGridsContent.js";
//import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <GridsWHProvider>
    <WidgetsProvider>
      <GridsContentProvider>
        <GridRepresentationProvider>
          <App />
        </GridRepresentationProvider>
      </GridsContentProvider>
    </WidgetsProvider>
  </GridsWHProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
