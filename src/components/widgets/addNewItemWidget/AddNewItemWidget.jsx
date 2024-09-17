import "./AddNewItemWidget.css";
import WidgetTemplate from "../../widgetTemplate/WidgetTemplate.jsx";
import PropTypes from "prop-types";
import { useState } from "react";

export function AddNewItemWidget({ id }) {
  const [layout, setLayout] = useState({ x: null, y: null, w: null, h: null });
  return (
    <WidgetTemplate
      className="add-new-item-widget"
      id={id}
      sizes={AddNewItemWidgetSizes}
      layout={layout}
      setLayout={setLayout}
    >
      <svg
        width="26"
        stroke="var(--widget-text-color)"
        height="26"
        viewBox="0 0 26 26"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M13 24L13 2" strokeWidth="3.09375" strokeLinecap="round" />
        <path d="M2 13L24 13" strokeWidth="3.09375" strokeLinecap="round" />
      </svg>
    </WidgetTemplate>
  );
}

AddNewItemWidget.propTypes = {
  id: PropTypes.string,
};

export const AddNewItemWidgetSizes = {
  sizesCount: 1,
  sizes: [{ w: 1, h: 1 }],
};
