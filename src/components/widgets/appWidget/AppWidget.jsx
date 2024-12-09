import "./AppWidget.css";
import WidgetTemplate from "../../widgetTemplate/WidgetTemplate.jsx";
import PropTypes from "prop-types";
import { useRef, useState, useEffect } from "react";
import { useGridsWH } from "../../../hooks/useGridsWH.jsx";
import { useGridsContent } from "../../../hooks/useGridsContent.jsx";
import { AddMenu } from "../../menus/addMenu/AddMenu.jsx";
import { useGridRepresentation } from "../../../hooks/useGridRepresentation.jsx";

export function AppWidget({ id }) {
  const [layout, setLayout] = useState({ x: null, y: null, w: null, h: null });
  const { gridsWH } = useGridsWH();
  const [classes, setClasses] = useState("add-new-item-widget");
  const isInitialMount = useRef(true);
  const { addPlaceHolders } = useGridRepresentation();
  const {
    leftItems,
    centerItems,
    RightItems,
    HiddenItems,
    addItems,
    removeItems,
    centerWidget,
    rightWidget,
    hardFlushMenu,
    softFlushMenu,
    isMenuVisible,
    currentClass,
    removePlaceHolders,
  } = useGridsContent();

  return (
    <WidgetTemplate
      className={classes}
      id={id}
      layout={layout}
      setLayout={setLayout}
    >
      <button className="add-new-item-widget-button">
        <svg
          width="26"
          height="26"
          viewBox="0 0 26 26"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13 26C20.1797 26 26 20.1797 26 13C26 5.8203 20.1797 0 13 0C5.8203 0 0 5.8203 0 13C0 20.1797 5.8203 26 13 26Z"
            fill="#E60023"
          />
          <path
            d="M13.2896 4.82047C7.67857 4.82047 4.69957 8.58697 4.69957 12.6875C4.69957 14.5945 5.71456 16.968 7.33857 17.7239C7.58454 17.8385 7.71658 17.789 7.77307 17.5505C7.81655 17.3695 8.03554 16.4865 8.13405 16.076C8.16555 15.945 8.15008 15.8325 8.04408 15.7034C7.50655 15.0515 7.07657 13.8535 7.07657 12.7365C7.07657 9.86896 9.24755 7.09448 12.9461 7.09448C16.1396 7.09448 18.3756 9.27097 18.3756 12.3835C18.3756 15.8999 16.5996 18.3365 14.2891 18.3365C13.0131 18.3365 12.0576 17.281 12.3641 15.9865C12.7316 14.4415 13.4411 12.7745 13.4411 11.6585C13.4411 10.6605 12.9061 9.82746 11.7966 9.82746C10.492 9.82746 9.44457 11.1765 9.44457 12.9845C9.44457 14.135 9.83356 14.914 9.83356 14.914C9.83356 14.914 8.54506 20.362 8.30905 21.3759C8.04776 22.4954 8.1496 24.068 8.26267 25.0962C8.55589 25.2111 8.84923 25.3261 9.15238 25.4199C9.68336 24.5568 10.4751 23.1412 10.7686 22.0125C10.9271 21.404 11.579 18.9219 11.579 18.9219C12.0026 19.7305 13.2405 20.415 14.5581 20.415C18.4785 20.415 21.3041 16.8094 21.3041 12.329C21.3041 8.03345 17.7995 4.82047 13.2896 4.82047Z"
            fill="white"
          />
        </svg>
      </button>
    </WidgetTemplate>
  );
}

AddNewItemWidget.propTypes = {
  id: PropTypes.string,
};
