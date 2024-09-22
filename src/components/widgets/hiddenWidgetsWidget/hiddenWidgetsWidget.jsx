import "./hiddenWidgetsWidget.css";
import WidgetTemplate from "../../widgetTemplate/WidgetTemplate.jsx";
import PropTypes from "prop-types";
import { useState } from "react";
import { useGridsWH } from "../../../hooks/useGridsWH.js";
import { HiddenWidgetsMenu } from "../../menus/hiddenMenu/HiddenWidgetsMenu.jsx";
import { useGridsContent } from "../../../hooks/useGridsContent.js";

export function HiddenWidgetsWidget({ id }) {
  const [layout, setLayout] = useState({ x: null, y: null, w: null, h: null });
  const { gridsWH } = useGridsWH();
  const [classes, setClasses] = useState("hidden-widgets-widget");
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
      if (!isMenuVisible() || currentClass() !== "hidden-widgets-widget") {
        if (w === 1) {
          addItems(
            "centerW",
            <HiddenWidgetsMenu
              setClasses={setClasses}
              key={"hidden-widgets-menu"}
            ></HiddenWidgetsMenu>,
            setClasses,
            "hidden-widgets-widget"
          );
        } else {
          addItems(
            "rightW",
            <HiddenWidgetsMenu
              setClasses={setClasses}
              key={"hidden-widgets-menu"}
            ></HiddenWidgetsMenu>,
            setClasses,
            "hidden-widgets-widget"
          );
        }
        setClasses("hidden-widgets-widget hidden-widgets-widget-active");
      }
    }
  };
  return (
    <WidgetTemplate
      className={classes}
      id={id}
      sizes={HiddenWidgetsWidgetSizes}
      layout={layout}
      setLayout={setLayout}
    >
      <button className="hidden-widgets-widget-button" onClick={handleOnClick}>
        <svg
          width="28"
          height="32"
          viewBox="0 0 28 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M13.7358 29.7359H22.9434C25.4443 29.7359 27.4717 27.7085 27.4717 25.2076V6.79246C27.4717 4.29155 25.4443 2.26416 22.9434 2.26416H13.7358V29.7359Z"
            fill="black"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M4.5283 2.26416H6.06289V3.26416V4.26416H4.5283C4.1818 4.26416 3.85636 4.33275 3.56103 4.45522L3.17798 3.5315L2.79492 2.60777C3.32885 2.38636 3.9143 2.26416 4.5283 2.26416ZM1 23.673H0V25.2076C0 25.8216 0.122202 26.407 0.343611 26.9409L1.26734 26.5579L2.19106 26.1748C2.06859 25.8795 2 25.5541 2 25.2076V23.673H1ZM9.13208 3.26416V2.26416H12.2013V3.26416V4.26416H9.13208V3.26416ZM12.2013 28.7359V29.7359H9.13208V28.7359V27.7359H12.2013V28.7359ZM6.0629 28.7359V29.7359H4.52831C3.91431 29.7359 3.32885 29.6137 2.79493 29.3922L3.17798 28.4685L3.56103 27.5448C3.85637 27.6673 4.1818 27.7359 4.52831 27.7359H6.0629V28.7359ZM1 20.6038H0V17.5346H1H2V20.6038H1ZM1 14.4654H0V11.3962H1H2V14.4654H1ZM1 8.32706H0V6.79247C0 6.17847 0.122202 5.59301 0.34361 5.05909L1.26734 5.44214L2.19106 5.82519C2.06859 6.12053 2 6.44596 2 6.79247V8.32706H1Z"
            fill="black"
          />
          <mask id="path-3-inside-1_104_327" fill="white">
            <path d="M12.0757 0.603773C12.0757 0.270318 12.346 0 12.6795 0H14.7927C15.1261 0 15.3964 0.270319 15.3964 0.603774V31.3962C15.3964 31.7297 15.1261 32 14.7927 32H12.6795C12.346 32 12.0757 31.7297 12.0757 31.3962V0.603773Z" />
          </mask>
          <path
            d="M12.0757 0.603773C12.0757 0.270318 12.346 0 12.6795 0H14.7927C15.1261 0 15.3964 0.270319 15.3964 0.603774V31.3962C15.3964 31.7297 15.1261 32 14.7927 32H12.6795C12.346 32 12.0757 31.7297 12.0757 31.3962V0.603773Z"
            fill="#272727"
          />
          <path
            d="M12.6795 0.0754717H14.7927V-0.0754717H12.6795V0.0754717ZM15.321 0.603774V31.3962H15.4719V0.603774H15.321ZM14.7927 31.9245H12.6795V32.0755H14.7927V31.9245ZM12.1512 31.3962V0.603773H12.0002V31.3962H12.1512ZM12.6795 31.9245C12.3877 31.9245 12.1512 31.688 12.1512 31.3962H12.0002C12.0002 31.7714 12.3043 32.0755 12.6795 32.0755V31.9245ZM15.321 31.3962C15.321 31.688 15.0844 31.9245 14.7927 31.9245V32.0755C15.1678 32.0755 15.4719 31.7714 15.4719 31.3962H15.321ZM14.7927 0.0754717C15.0844 0.0754717 15.321 0.312001 15.321 0.603774H15.4719C15.4719 0.228637 15.1678 -0.0754717 14.7927 -0.0754717V0.0754717ZM12.6795 -0.0754717C12.3043 -0.0754717 12.0002 0.228636 12.0002 0.603773H12.1512C12.1512 0.312 12.3877 0.0754717 12.6795 0.0754717V-0.0754717Z"
            fill="white"
            fillOpacity="0.26"
            mask="url(#path-3-inside-1_104_327)"
          />
        </svg>
      </button>
    </WidgetTemplate>
  );
}

HiddenWidgetsWidget.propTypes = {
  id: PropTypes.string,
};

export const HiddenWidgetsWidgetSizes = {
  sizesCount: 1,
  sizes: [{ w: 1, h: 1 }],
};
