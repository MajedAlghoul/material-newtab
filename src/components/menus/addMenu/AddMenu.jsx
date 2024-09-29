import { useGridsWH } from "../../../hooks/useGridsWH.jsx";
import "./AddMenu.css";
import { useWidgets } from "../../../hooks/useWidgets.jsx";
import { useGridsContent } from "../../../hooks/useGridsContent.jsx";
import { useEffect, useState, useRef } from "react";
import { useGridRepresentation } from "../../../hooks/useGridRepresentation.jsx";
import { WidgetsMenu } from "../widgetsMenu/WidgetsMenu.jsx";

export function AddMenu({ setClasses }) {
  const [layout, setLayout] = useState({ x: null, y: null, w: null, h: null });

  const [content, setContent] = useState(null);

  const { gridsWH } = useGridsWH();

  const isInitialMount = useRef(true);
  const { hardFlushMenu, softFlushMenu, addItems } = useGridsContent();

  const handleAddWidget = () => {
    const w = gridsWH["cw"];
    if (w) {
      softFlushMenu();
      addItems(
        "centerW",
        <WidgetsMenu setClasses={setClasses} key={"add-menu"}></WidgetsMenu>,
        setClasses,
        "add-new-item-widget"
      );
      /*
      flushMenu();
      if (!isMenuVisible() || currentClass() !== "add-new-item-widget") {
        addItems(
          "rightW",
          <AddMenu setClasses={setClasses} key={"add-menu"}></AddMenu>,
          setClasses,
          "add-new-item-widget"
        );
        setClasses("add-new-item-widget add-new-item-widget-active");
      }*/
    }
  };

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else if (gridsWH) {
      setClasses("add-new-item-widget");
      hardFlushMenu();
    }
  }, [gridsWH]);
  useEffect(() => {
    const w = gridsWH["rw"];
    if (w) {
      if (w === 1) {
        setLayout({
          x: 2,
          y: 1,
          w: 1,
          h: 2,
        });

        setContent(
          <>
            <div className="actual-add-menu">
              <div className="actual-add-menu-inner">
                <button className="add-app-button">
                  <div className="add-menu-item-inner4">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect width="24" height="24" rx="6" fill="white" />
                      <rect
                        y="12.0938"
                        width="0.1875"
                        height="24"
                        transform="rotate(-90 0 12.0938)"
                        fill="black"
                        fillOpacity="0.1"
                      />
                      <rect
                        x="0.046875"
                        y="12.0469"
                        width="0.09375"
                        height="23.9062"
                        transform="rotate(-90 0.046875 12.0469)"
                        stroke="black"
                        strokeOpacity="0.1"
                        strokeWidth="0.09375"
                      />
                      <rect
                        y="16.7812"
                        width="0.1875"
                        height="24"
                        transform="rotate(-90 0 16.7812)"
                        fill="black"
                        fillOpacity="0.1"
                      />
                      <rect
                        x="0.046875"
                        y="16.7344"
                        width="0.09375"
                        height="23.9062"
                        transform="rotate(-90 0.046875 16.7344)"
                        stroke="black"
                        strokeOpacity="0.1"
                        strokeWidth="0.09375"
                      />
                      <rect
                        y="7.40625"
                        width="0.1875"
                        height="24"
                        transform="rotate(-90 0 7.40625)"
                        fill="black"
                        fillOpacity="0.1"
                      />
                      <rect
                        x="0.046875"
                        y="7.35938"
                        width="0.09375"
                        height="23.9062"
                        transform="rotate(-90 0.046875 7.35938)"
                        stroke="black"
                        strokeOpacity="0.1"
                        strokeWidth="0.09375"
                      />
                      <rect
                        x="11.9062"
                        width="0.1875"
                        height="24"
                        fill="black"
                        fillOpacity="0.1"
                      />
                      <rect
                        x="11.9531"
                        y="0.046875"
                        width="0.09375"
                        height="23.9062"
                        stroke="black"
                        strokeOpacity="0.1"
                        strokeWidth="0.09375"
                      />
                      <rect
                        x="7.21875"
                        width="0.1875"
                        height="24"
                        fill="black"
                        fillOpacity="0.1"
                      />
                      <rect
                        x="7.26562"
                        y="0.046875"
                        width="0.09375"
                        height="23.9062"
                        stroke="black"
                        strokeOpacity="0.1"
                        strokeWidth="0.09375"
                      />
                      <rect
                        x="16.5938"
                        width="0.1875"
                        height="24"
                        fill="black"
                        fillOpacity="0.1"
                      />
                      <rect
                        x="16.6406"
                        y="0.046875"
                        width="0.09375"
                        height="23.9062"
                        stroke="black"
                        strokeOpacity="0.1"
                        strokeWidth="0.09375"
                      />
                      <path
                        d="M22.125 1.78125H22.2656L22.3125 1.82812V22.1719L22.2656 22.2188H22.125V1.78125Z"
                        fill="black"
                        fillOpacity="0.1"
                      />
                      <path
                        d="M22.2462 1.82812L22.2656 1.84754V22.1525L22.2462 22.1719H22.1719V1.82812H22.2462Z"
                        stroke="black"
                        strokeOpacity="0.1"
                        strokeWidth="0.09375"
                      />
                      <path
                        d="M1.78125 1.875V1.73438L1.82812 1.6875L22.1719 1.6875L22.2188 1.73437V1.875L1.78125 1.875Z"
                        fill="black"
                        fillOpacity="0.1"
                      />
                      <path
                        d="M1.82812 1.75379L1.84754 1.73438L22.1525 1.73437L22.1719 1.75379V1.82812L1.82812 1.82812V1.75379Z"
                        stroke="black"
                        strokeOpacity="0.1"
                        strokeWidth="0.09375"
                      />
                      <path
                        d="M1.78125 22.125V22.2656L1.82812 22.3125L22.1719 22.3125L22.2188 22.2656V22.125L1.78125 22.125Z"
                        fill="black"
                        fillOpacity="0.1"
                      />
                      <path
                        d="M1.82812 22.2462L1.84754 22.2656L22.1525 22.2656L22.1719 22.2462V22.1719L1.82812 22.1719V22.2462Z"
                        stroke="black"
                        strokeOpacity="0.1"
                        strokeWidth="0.09375"
                      />
                      <path
                        d="M1.875 1.78125H1.73438L1.6875 1.82812V22.1719L1.73438 22.2188H1.875V1.78125Z"
                        fill="black"
                        fillOpacity="0.1"
                      />
                      <path
                        d="M1.75379 1.82812L1.73438 1.84754V22.1525L1.75379 22.1719H1.82812V1.82812H1.75379Z"
                        stroke="black"
                        strokeOpacity="0.1"
                        strokeWidth="0.09375"
                      />
                      <rect
                        x="1.69141"
                        y="1.82422"
                        width="0.1875"
                        height="28.9695"
                        transform="rotate(-45 1.69141 1.82422)"
                        fill="black"
                        fillOpacity="0.1"
                      />
                      <rect
                        x="1.7577"
                        y="1.82422"
                        width="0.09375"
                        height="28.8758"
                        transform="rotate(-45 1.7577 1.82422)"
                        stroke="black"
                        strokeOpacity="0.1"
                        strokeWidth="0.09375"
                      />
                      <rect
                        x="22.1768"
                        y="1.69141"
                        width="0.1875"
                        height="28.9695"
                        transform="rotate(45 22.1768 1.69141)"
                        fill="black"
                        fillOpacity="0.1"
                      />
                      <rect
                        x="22.1768"
                        y="1.7577"
                        width="0.09375"
                        height="28.8758"
                        transform="rotate(45 22.1768 1.7577)"
                        stroke="black"
                        strokeOpacity="0.1"
                        strokeWidth="0.09375"
                      />
                      <circle
                        cx="12"
                        cy="12"
                        r="6.65625"
                        stroke="black"
                        strokeOpacity="0.1"
                        strokeWidth="0.1875"
                      />
                      <circle
                        cx="12"
                        cy="12"
                        r="10.2188"
                        stroke="black"
                        strokeOpacity="0.1"
                        strokeWidth="0.1875"
                      />
                      <path
                        d="M12.2051 11.5879C12.1738 11.4473 12.1318 11.2549 12.0791 11.0107L11.9473 10.4277L11.8154 11.0107C11.7627 11.2549 11.7207 11.4473 11.6895 11.5879L11.0713 14.125H10.2012L9.12598 9.87695H9.70898L10.248 12.042L10.6436 13.5918L11.0273 12.042L11.5605 9.87695H12.3311L12.8643 12.042L13.248 13.5918L13.6436 12.042L14.1826 9.87695H14.7656L13.6934 14.125H12.8232L12.2051 11.5879Z"
                        fill="black"
                      />
                      <path
                        d="M6.29883 11.5879C6.26758 11.4473 6.22559 11.2549 6.17285 11.0107L6.04102 10.4277L5.90918 11.0107C5.85645 11.2549 5.81445 11.4473 5.7832 11.5879L5.16504 14.125H4.29492L3.21973 9.87695H3.80273L4.3418 12.042L4.7373 13.5918L5.12109 12.042L5.6543 9.87695H6.4248L6.95801 12.042L7.3418 13.5918L7.7373 12.042L8.27637 9.87695H8.85938L7.78711 14.125H6.91699L6.29883 11.5879Z"
                        fill="black"
                      />
                      <path
                        d="M18.1113 11.5879C18.0801 11.4473 18.0381 11.2549 17.9854 11.0107L17.8535 10.4277L17.7217 11.0107C17.6689 11.2549 17.627 11.4473 17.5957 11.5879L16.9775 14.125H16.1074L15.0322 9.87695H15.6152L16.1543 12.042L16.5498 13.5918L16.9336 12.042L17.4668 9.87695H18.2373L18.7705 12.042L19.1543 13.5918L19.5498 12.042L20.0889 9.87695H20.6719L19.5996 14.125H18.7295L18.1113 11.5879Z"
                        fill="black"
                      />
                    </svg>
                  </div>
                </button>
                <div className="menu-separator">
                  <div className="separator-dark-part"></div>
                  <div className="separator-light-part"></div>
                </div>
                <button
                  className="add-app-button add-widgets-button"
                  onClick={handleAddWidget}
                >
                  <div className="add-menu-item-inner4">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        x="12.375"
                        y="12.375"
                        width="11.625"
                        height="11.625"
                        rx="2.625"
                        fill="white"
                      />
                      <rect
                        width="11.625"
                        height="11.625"
                        rx="2.625"
                        fill="white"
                      />
                      <circle
                        cx="5.8125"
                        cy="18.1875"
                        r="5.8125"
                        fill="white"
                      />
                      <circle
                        cx="18.1875"
                        cy="5.8125"
                        r="5.8125"
                        fill="white"
                      />
                    </svg>
                  </div>
                </button>
                <div className="menu-separator">
                  <div className="separator-dark-part"></div>
                  <div className="separator-light-part"></div>
                </div>

                <button className="add-app-button edit-layout-button">
                  <div className="add-menu-item-inner4">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        y="5.35547"
                        width="11.838"
                        height="9.10187"
                        rx="2.05075"
                        fill="white"
                      />
                      <rect
                        x="13.3086"
                        y="5.35547"
                        width="5.44108"
                        height="9.10187"
                        rx="2.05075"
                        fill="white"
                      />
                      <rect
                        x="6.98535"
                        y="14.8979"
                        width="11.838"
                        height="9.10187"
                        rx="2.05075"
                        fill="white"
                      />
                      <rect
                        y="14.8979"
                        width="5.44108"
                        height="9.10187"
                        rx="2.05075"
                        fill="white"
                      />
                      <ellipse
                        cx="18.353"
                        cy="5.63729"
                        rx="5.64696"
                        ry="5.63729"
                        fill="#DADADA"
                      />
                      <path
                        d="M20.1758 2.93066L21.0692 3.82259L16.6358 8.24846C16.5412 8.3429 16.3878 8.3429 16.2932 8.24846L15.7423 7.69853C15.6477 7.60409 15.6477 7.45097 15.7423 7.35653L20.1758 2.93066Z"
                        fill="white"
                      />
                      <path
                        d="M20.543 2.55973C20.7897 2.31343 21.1898 2.31343 21.4365 2.55973V2.55973C21.6832 2.80603 21.6832 3.20536 21.4365 3.45166L21.1959 3.6918L20.3025 2.79987L20.543 2.55973Z"
                        fill="white"
                      />
                      <path
                        d="M15.5277 8.59958C15.4354 8.62603 15.3505 8.53978 15.3785 8.44806L15.684 7.44891C15.7106 7.36164 15.8208 7.33419 15.8855 7.39871L16.5951 8.10715C16.6604 8.1723 16.6316 8.28347 16.5429 8.30888L15.5277 8.59958Z"
                        fill="white"
                      />
                    </svg>
                  </div>
                </button>
              </div>
            </div>
            <svg
              width="104"
              height="311"
              viewBox="0 0 104 311"
              fill="none"
              className="add-menu-shadow-1"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                width="104"
                height="311"
                rx="39"
                fill="var(--highlight-color)"
              />
            </svg>
          </>
        );
      } else {
        setLayout({
          x: 1,
          y: 2,
          w: 2,
          h: 2,
        });
        setContent(
          <>
            <div className="actual-add-menu">
              <div className="actual-add-menu-inner">
                <button className="add-app-button">
                  <div className="add-menu-item-inner">
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 22 22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect width="22" height="22" rx="5.5" fill="white" />
                      <rect
                        y="11.0859"
                        width="0.171875"
                        height="22"
                        transform="rotate(-90 0 11.0859)"
                        fill="black"
                        fillOpacity="0.1"
                      />
                      <rect
                        x="0.0429688"
                        y="11.043"
                        width="0.0859375"
                        height="21.9141"
                        transform="rotate(-90 0.0429688 11.043)"
                        stroke="black"
                        strokeOpacity="0.1"
                        strokeWidth="0.0859375"
                      />
                      <rect
                        y="15.3828"
                        width="0.171875"
                        height="22"
                        transform="rotate(-90 0 15.3828)"
                        fill="black"
                        fillOpacity="0.1"
                      />
                      <rect
                        x="0.0429688"
                        y="15.3398"
                        width="0.0859375"
                        height="21.9141"
                        transform="rotate(-90 0.0429688 15.3398)"
                        stroke="black"
                        strokeOpacity="0.1"
                        strokeWidth="0.0859375"
                      />
                      <rect
                        y="6.78906"
                        width="0.171875"
                        height="22"
                        transform="rotate(-90 0 6.78906)"
                        fill="black"
                        fillOpacity="0.1"
                      />
                      <rect
                        x="0.0429688"
                        y="6.74609"
                        width="0.0859375"
                        height="21.9141"
                        transform="rotate(-90 0.0429688 6.74609)"
                        stroke="black"
                        strokeOpacity="0.1"
                        strokeWidth="0.0859375"
                      />
                      <rect
                        x="10.9141"
                        width="0.171875"
                        height="22"
                        fill="black"
                        fillOpacity="0.1"
                      />
                      <rect
                        x="10.957"
                        y="0.0429688"
                        width="0.0859375"
                        height="21.9141"
                        stroke="black"
                        strokeOpacity="0.1"
                        strokeWidth="0.0859375"
                      />
                      <rect
                        x="6.61719"
                        width="0.171875"
                        height="22"
                        fill="black"
                        fillOpacity="0.1"
                      />
                      <rect
                        x="6.66016"
                        y="0.0429688"
                        width="0.0859375"
                        height="21.9141"
                        stroke="black"
                        strokeOpacity="0.1"
                        strokeWidth="0.0859375"
                      />
                      <rect
                        x="15.2109"
                        width="0.171875"
                        height="22"
                        fill="black"
                        fillOpacity="0.1"
                      />
                      <rect
                        x="15.2539"
                        y="0.0429688"
                        width="0.0859375"
                        height="21.9141"
                        stroke="black"
                        strokeOpacity="0.1"
                        strokeWidth="0.0859375"
                      />
                      <path
                        d="M20.2812 1.63281H20.4102L20.4531 1.67578V20.3242L20.4102 20.3672H20.2812V1.63281Z"
                        fill="black"
                        fillOpacity="0.1"
                      />
                      <path
                        d="M20.3924 1.67578L20.4102 1.69358V20.3064L20.3924 20.3242H20.3242V1.67578H20.3924Z"
                        stroke="black"
                        strokeOpacity="0.1"
                        strokeWidth="0.0859375"
                      />
                      <path
                        d="M1.63281 1.71875V1.58984L1.67578 1.54688L20.3242 1.54687L20.3672 1.58984V1.71875L1.63281 1.71875Z"
                        fill="black"
                        fillOpacity="0.1"
                      />
                      <path
                        d="M1.67578 1.60764L1.69358 1.58984L20.3064 1.58984L20.3242 1.60764V1.67578L1.67578 1.67578V1.60764Z"
                        stroke="black"
                        strokeOpacity="0.1"
                        strokeWidth="0.0859375"
                      />
                      <path
                        d="M1.63281 20.2812V20.4102L1.67578 20.4531L20.3242 20.4531L20.3672 20.4102V20.2812L1.63281 20.2812Z"
                        fill="black"
                        fillOpacity="0.1"
                      />
                      <path
                        d="M1.67578 20.3924L1.69358 20.4102L20.3064 20.4102L20.3242 20.3924V20.3242L1.67578 20.3242V20.3924Z"
                        stroke="black"
                        strokeOpacity="0.1"
                        strokeWidth="0.0859375"
                      />
                      <path
                        d="M1.71875 1.63281H1.58984L1.54688 1.67578V20.3242L1.58984 20.3672H1.71875V1.63281Z"
                        fill="black"
                        fillOpacity="0.1"
                      />
                      <path
                        d="M1.60764 1.67578L1.58984 1.69358V20.3064L1.60764 20.3242H1.67578V1.67578H1.60764Z"
                        stroke="black"
                        strokeOpacity="0.1"
                        strokeWidth="0.0859375"
                      />
                      <rect
                        x="1.55078"
                        y="1.67188"
                        width="0.171875"
                        height="26.5554"
                        transform="rotate(-45 1.55078 1.67188)"
                        fill="black"
                        fillOpacity="0.1"
                      />
                      <rect
                        x="1.61155"
                        y="1.67188"
                        width="0.0859375"
                        height="26.4695"
                        transform="rotate(-45 1.61155 1.67188)"
                        stroke="black"
                        strokeOpacity="0.1"
                        strokeWidth="0.0859375"
                      />
                      <rect
                        x="20.3286"
                        y="1.55078"
                        width="0.171875"
                        height="26.5554"
                        transform="rotate(45 20.3286 1.55078)"
                        fill="black"
                        fillOpacity="0.1"
                      />
                      <rect
                        x="20.3286"
                        y="1.61155"
                        width="0.0859375"
                        height="26.4695"
                        transform="rotate(45 20.3286 1.61155)"
                        stroke="black"
                        strokeOpacity="0.1"
                        strokeWidth="0.0859375"
                      />
                      <circle
                        cx="11"
                        cy="11"
                        r="6.10156"
                        stroke="black"
                        strokeOpacity="0.1"
                        strokeWidth="0.171875"
                      />
                      <circle
                        cx="11"
                        cy="11"
                        r="9.36719"
                        stroke="black"
                        strokeOpacity="0.1"
                        strokeWidth="0.171875"
                      />
                      <path
                        d="M11.188 10.2056C11.1593 10.0767 11.1208 9.90031 11.0725 9.67651L10.9517 9.14209L10.8308 9.67651C10.7825 9.90031 10.744 10.0767 10.7153 10.2056L10.1487 12.5312H9.35107L8.36548 8.63721H8.8999L9.39404 10.6218L9.75659 12.0425L10.1084 10.6218L10.5972 8.63721H11.3035L11.7922 10.6218L12.144 12.0425L12.5066 10.6218L13.0007 8.63721H13.5352L12.5522 12.5312H11.7546L11.188 10.2056Z"
                        fill="black"
                      />
                      <path
                        d="M5.77393 10.2056C5.74528 10.0767 5.70679 9.90031 5.65845 9.67651L5.5376 9.14209L5.41675 9.67651C5.36841 9.90031 5.32992 10.0767 5.30127 10.2056L4.73462 12.5312H3.93701L2.95142 8.63721H3.48584L3.97998 10.6218L4.34253 12.0425L4.69434 10.6218L5.18311 8.63721H5.8894L6.37817 10.6218L6.72998 12.0425L7.09253 10.6218L7.58667 8.63721H8.12109L7.13818 12.5312H6.34058L5.77393 10.2056Z"
                        fill="black"
                      />
                      <path
                        d="M16.6021 10.2056C16.5734 10.0767 16.5349 9.90031 16.4866 9.67651L16.3657 9.14209L16.2449 9.67651C16.1965 9.90031 16.158 10.0767 16.1294 10.2056L15.5627 12.5312H14.7651L13.7795 8.63721H14.314L14.8081 10.6218L15.1707 12.0425L15.5225 10.6218L16.0112 8.63721H16.7175L17.2063 10.6218L17.5581 12.0425L17.9207 10.6218L18.4148 8.63721H18.9492L17.9663 12.5312H17.1687L16.6021 10.2056Z"
                        fill="black"
                      />
                    </svg>
                    <div className="add-menu-text">Add App</div>
                  </div>
                </button>
                <div className="menu-separator">
                  <div className="separator-dark-part"></div>
                  <div className="separator-light-part"></div>
                </div>
                <button
                  className="add-app-button add-widgets-button"
                  onClick={handleAddWidget}
                >
                  <div className="add-menu-item-inner2">
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 22 22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        x="11.3438"
                        y="11.3438"
                        width="10.6562"
                        height="10.6562"
                        rx="2.40625"
                        fill="white"
                      />
                      <rect
                        width="10.6562"
                        height="10.6562"
                        rx="2.40625"
                        fill="white"
                      />
                      <circle
                        cx="5.32812"
                        cy="16.6719"
                        r="5.32812"
                        fill="white"
                      />
                      <circle
                        cx="16.6719"
                        cy="5.32812"
                        r="5.32812"
                        fill="white"
                      />
                    </svg>
                    <div className="add-menu-text">Add Widget</div>
                  </div>
                </button>
                <div className="menu-separator">
                  <div className="separator-dark-part"></div>
                  <div className="separator-light-part"></div>
                </div>

                <button className="add-app-button edit-layout-button">
                  <div className="add-menu-item-inner3">
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 22 22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        y="4.90918"
                        width="10.8515"
                        height="8.34338"
                        rx="1.87985"
                        fill="white"
                      />
                      <rect
                        x="12.1997"
                        y="4.90918"
                        width="4.98766"
                        height="8.34338"
                        rx="1.87985"
                        fill="white"
                      />
                      <rect
                        x="6.40283"
                        y="13.6562"
                        width="10.8515"
                        height="8.34338"
                        rx="1.87985"
                        fill="white"
                      />
                      <rect
                        y="13.6562"
                        width="4.98766"
                        height="8.34338"
                        rx="1.87985"
                        fill="white"
                      />
                      <ellipse
                        cx="16.8238"
                        cy="5.16752"
                        rx="5.17638"
                        ry="5.16752"
                        fill="#DADADA"
                      />
                      <path
                        d="M18.4946 2.68652L19.3136 3.50413L15.2496 7.56117C15.1629 7.64774 15.0223 7.64774 14.9356 7.56117L14.4306 7.05707C14.3439 6.9705 14.3439 6.83014 14.4306 6.74357L18.4946 2.68652Z"
                        fill="white"
                      />
                      <path
                        d="M18.8312 2.34679C19.0574 2.12101 19.4241 2.12101 19.6502 2.34679V2.34679C19.8764 2.57256 19.8764 2.93862 19.6502 3.16439L19.4297 3.38452L18.6107 2.56691L18.8312 2.34679Z"
                        fill="white"
                      />
                      <path
                        d="M14.2339 7.88336C14.1493 7.9076 14.0714 7.82854 14.0971 7.74446L14.3771 6.82857C14.4016 6.74858 14.5026 6.72341 14.5618 6.78255L15.2124 7.43196C15.2722 7.49169 15.2458 7.59359 15.1645 7.61688L14.2339 7.88336Z"
                        fill="white"
                      />
                    </svg>
                    <div className="add-menu-text">Edit Layout</div>
                  </div>
                </button>
              </div>
            </div>

            <svg
              width="312"
              height="207"
              viewBox="0 0 312 207"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="add-menu-shadow"
            >
              <path
                d="M0 39C0 17.4609 17.4609 0 39 0H273C294.539 0 312 17.4609 312 39V66C312 87.5391 294.539 105 273 105H247C225.461 105 208 122.461 208 144V168C208 189.539 190.539 207 169 207H39C17.4609 207 0 189.539 0 168V39Z"
                fill="var(--highlight-color)"
              />
            </svg>
          </>
        );
      }
    }
  }, []);
  return (
    <div
      className={`menu-template`}
      style={{
        gridRow: `${layout.x} / ${layout.x + layout.h}`,
        gridColumn: `${layout.y} / ${layout.y + layout.w}`,
        width: `${layout.w * 76 + (layout.w - 1) * 28}px`,
        height: `${layout.h * 76 + (layout.h - 1) * 28}px`,
      }}
    >
      {content}
    </div>
  );
}
