import "./WeatherWidget.css";
import WidgetTemplate from "../../widgetTemplate/WidgetTemplate.jsx";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";

export function WeatherWidget({ id }) {
  const [layout, setLayout] = useState({ x: null, y: null, w: null, h: null });

  const [content, setContent] = useState(null);

  return (
    <WidgetTemplate
      className="weather-widget"
      id={id}
      sizes={WeatherWidgetSizes}
      layout={layout}
      setLayout={setLayout}
    >
      {content}
    </WidgetTemplate>
  );
}

WeatherWidget.propTypes = {
  id: PropTypes.string,
};

export const WeatherWidgetSizes = {
  sizesCount: 3,
  sizes: [
    { w: 1, h: 1 },
    { w: 2, h: 2 },
    { w: 3, h: 2 },
  ],
};
