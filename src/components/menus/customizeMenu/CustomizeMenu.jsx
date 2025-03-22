import { useGridsWH } from "../../../hooks/useGridsWH.jsx";
import styles from "./CustomizeMenu.module.scss";
import { useWidgets } from "../../../hooks/useWidgets.jsx";
import { useGridsContent } from "../../../hooks/useGridsContent.jsx";
import React, { useEffect, useState, useRef } from "react";
import { useGridRepresentation } from "../../../hooks/useGridRepresentation.jsx";
import DefaultMenu from "../../defaultMenu/DefaultMenu.jsx";
import { customizeMenuShadow } from "../../../app/Svgs.jsx";
import { render } from "@testing-library/react";
import { SwitchButton } from "../../switchButton/SwitchButton.jsx";
import { ColorSelector } from "../../colorSelector/ColorSelector.jsx";
import { useTheme } from "../../../hooks/useTheme.jsx";
import { questionSvg } from "../../../app/Svgs.jsx";

export function CustomizeMenu() {
  //const [content, setContent] = useState(null);
  const { gridsWH } = useGridsWH();
  const {
    leftItems,
    centerItems,
    RightItems,
    HiddenItems,
    addItems,
    removeItems,
    centerWidget,
    rightWidget,
    removePlaceHolders,
  } = useGridsContent();
  const { widgets, addWidget, removeWidget, editWidget, getComponent } =
    useWidgets();
  const { theme, isMonochrome, setIsMonochrome, generateTheme } = useTheme();

  const renderContent = () => {
    return (
      <div className={styles["customize-outer-container"]}>
        <div className={styles["customize-subject-container"]}>
          <span className={styles["customize-subject-title"]}>Theme</span>
          <div className={styles["customize-subject-container-inner"]}>
            <div className={styles["customize-box"]}>
              <span>Monochrome Mode</span>
              <SwitchButton
                trigger={setIsMonochrome}
                defaultValue={isMonochrome}
              ></SwitchButton>
            </div>
            <div
              className={`${styles["customize-box-large"]} ${
                isMonochrome && styles["setting-disabled"]
              }`}
            >
              <div className={styles["customize-box-inner"]}>
                <span>Primary Color</span>
                <ColorSelector label={"--primary-color"}></ColorSelector>
              </div>
              <div className={styles["customize-box-separator"]}>
                <div className={styles["customize-box-separator-dark"]}></div>
                <div className={styles["customize-box-separator-light"]}></div>
              </div>
              <div className={styles["customize-box-inner"]}>
                <span>Secondary Color</span>
                <ColorSelector label={"--secondary-color"}></ColorSelector>
              </div>
            </div>
            <div className={styles["generate-theme-container"]}>
              <button
                className={`${styles["generate-theme-button"]} ${
                  isMonochrome && styles["setting-disabled"]
                }`}
                onClick={generateTheme}
              >
                Generate browser theme
              </button>
              <button
                className={`${styles["question-button"]} ${
                  isMonochrome && styles["setting-disabled"]
                }`}
              >
                <>
                  {React.cloneElement(questionSvg, {
                    style: { width: "16px", height: "16px" },
                  })}
                </>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <DefaultMenu cShadow={customizeMenuShadow} shiftX={4} title={"Customize"}>
      {renderContent()}
    </DefaultMenu>
  );
}
