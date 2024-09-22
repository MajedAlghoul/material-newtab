import "./CustomizeWidget.css";
import WidgetTemplate from "../../widgetTemplate/WidgetTemplate.jsx";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useGridsWH } from "../../../hooks/useGridsWH.js";
import { CustomizeMenu } from "../../menus/customizeMenu/CustomizeMenu.jsx";
import { useGridsContent } from "../../../hooks/useGridsContent.js";
export function CustomizeWidget({ id }) {
  const [layout, setLayout] = useState({ x: null, y: null, w: null, h: null });

  const [content, setContent] = useState(null);

  const { gridsWH } = useGridsWH();
  const [classes, setClasses] = useState("customize-widget");
  const {
    leftItems,
    centerItems,
    RightItems,
    HiddenItems,
    addItems,
    removeItems,
    centerWidget,
    rightWidget,
    flushMenu,
    isMenuVisible,
    currentClass,
  } = useGridsContent();
  const handleOnClick = () => {
    const w = gridsWH["rw"];
    if (w) {
      flushMenu();
      if (!isMenuVisible() || currentClass() !== "customize-widget") {
        if (w === 1) {
          addItems(
            "centerW",
            <CustomizeMenu
              setClasses={setClasses}
              key={"customize-menu"}
            ></CustomizeMenu>,
            setClasses,
            "customize-widget"
          );
        } else {
          addItems(
            "rightW",
            <CustomizeMenu
              setClasses={setClasses}
              key={"customize-menu"}
            ></CustomizeMenu>,
            setClasses,
            "customize-widget"
          );
        }
        setClasses("customize-widget customize-widget-active");
      }
    }
  };

  useEffect(() => {
    if (layout.w === 1 && layout.h === 1) {
      setContent(() => {
        return (
          <>
            <svg
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.6777 2.54736L19.4624 5.32865L5.64648 19.1278C5.35054 19.4234 4.87073 19.4234 4.5748 19.1278L2.8618 17.4169C2.56587 17.1213 2.56587 16.6421 2.8618 16.3465L16.6777 2.54736Z"
                fill="black"
              />
              <path
                d="M17.8225 1.39065C18.5915 0.622613 19.8382 0.622613 20.6072 1.39064C21.3761 2.15868 21.3761 3.4039 20.6072 4.17193L19.8575 4.92074L17.0728 2.13945L17.8225 1.39065Z"
                fill="black"
              />
              <path
                d="M2.19389 20.2239C1.90505 20.3066 1.63931 20.0367 1.72702 19.7496L2.67764 16.6386C2.76109 16.3655 3.10578 16.2796 3.30795 16.4815L5.51648 18.6874C5.72064 18.8913 5.63057 19.2392 5.35304 19.3187L2.19389 20.2239Z"
                fill="black"
              />
            </svg>
          </>
        );
      });
    } else {
      setContent(() => {
        return (
          <div className="customize-big-outer-div">
            <svg
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.6777 2.54736L19.4624 5.32865L5.64648 19.1278C5.35054 19.4234 4.87073 19.4234 4.5748 19.1278L2.8618 17.4169C2.56587 17.1213 2.56587 16.6421 2.8618 16.3465L16.6777 2.54736Z"
                fill="black"
              />
              <path
                d="M17.8225 1.39065C18.5915 0.622613 19.8382 0.622613 20.6072 1.39064C21.3761 2.15868 21.3761 3.4039 20.6072 4.17193L19.8575 4.92074L17.0728 2.13945L17.8225 1.39065Z"
                fill="black"
              />
              <path
                d="M2.19389 20.2239C1.90505 20.3066 1.63931 20.0367 1.72702 19.7496L2.67764 16.6386C2.76109 16.3655 3.10578 16.2796 3.30795 16.4815L5.51648 18.6874C5.72064 18.8913 5.63057 19.2392 5.35304 19.3187L2.19389 20.2239Z"
                fill="black"
              />
            </svg>
            <div className="customize-big-text">Customize</div>
          </div>
        );
      });
    }
  }, [layout.w, layout.h]);

  return (
    <WidgetTemplate
      className={classes}
      id={id}
      sizes={CustomizeWidgetSizes}
      layout={layout}
      setLayout={setLayout}
    >
      <button className="customize-widget-button" onClick={handleOnClick}>
        {content}
      </button>
    </WidgetTemplate>
  );
}

CustomizeWidget.propTypes = {
  id: PropTypes.string,
};

export const CustomizeWidgetSizes = {
  sizesCount: 2,
  sizes: [
    { w: 1, h: 1 },
    { w: 2, h: 1 },
  ],
};
