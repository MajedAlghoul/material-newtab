import React, { createContext, useContext, useState, useEffect } from "react";
import JSZip from "jszip";
const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState({
    "--primary-color": "#ffc15a",
    "--secondary-color": "#ffe9d1",
    "--highlight-color": "#f0dcc6",
    "--widget-background-color": "#232626",
    "--widget-background-inner-color": "#3a3a3a",
    "--widget-menu-highlight-color": "#2e3030",
    "--text-color": "#ffffff",
    "--placeholder-background-color": "#e0ceb9",
    "--widget-text-color": "#000000",
    "--widget-depth-color": "#ffb539",
    "--widget-inner-depth-color": "#f3ae3c",
    "--widget-inner-depth-wall-color": "#d38c00",
    "--separator-light-color": "#404141",
    "--separator-dark-color": "#0d0e0e",
  });
  const [isMonochrome, setIsMonochrome] = useState(false);
  const [recoveryTheme, setRecoveryTheme] = useState(theme);
  useEffect(() => {
    if (isMonochrome) {
      setRecoveryTheme(theme);
      setTheme((prev) => {
        let temp = { ...prev };
        temp["--primary-color"] = "rgba(255, 255, 255, 0.2)";
        temp["--secondary-color"] = "rgba(255, 255, 255, 0.19)";
        temp["--highlight-color"] = "rgba(255, 255, 255, 0.125)";
        temp["--widget-background-color"] = "#232626";
        temp["--widget-background-inner-color"] = "#3a3a3a";
        temp["--widget-menu-highlight-color"] = "rgba(255, 255, 255, 0.125)";
        temp["--text-color"] = "#ffffff";
        temp["--placeholder-background-color"] = "rgba(255, 255, 255, 0.063)";
        temp["--widget-text-color"] = "#ffffff";
        temp["--widget-depth-color"] = "rgba(255, 255, 255, 0.063)";
        temp["--widget-inner-depth-color"] = "rgba(255, 255, 255, 0.19)";
        temp["--widget-inner-depth-wall-color"] = "rgba(255, 255, 255, 0.125)";
        temp["--separator-light-color"] = "#404141";
        temp["--separator-dark-color"] = "#0d0e0e";
        return temp;
      });
    } else {
      setTheme(recoveryTheme);
    }
  }, [isMonochrome]);

  useEffect(() => {
    const root = document.documentElement;
    Object.keys(theme).forEach((key) => {
      root.style.setProperty(key, theme[key]);
    });
  }, [theme]);

  const updateTheme = (newTheme) => {
    if (newTheme["--secondary-color"]) {
      newTheme["--highlight-color"] = generateVariantColor(
        newTheme["--secondary-color"],
        "highlight"
      );

      newTheme["--placeholder-background-color"] = generateVariantColor(
        newTheme["--secondary-color"],
        "placeholder"
      );
    } else if (newTheme["--primary-color"]) {
      newTheme["--widget-depth-color"] = generateVariantColor(
        newTheme["--primary-color"],
        "widgetDepth"
      );

      newTheme["--widget-inner-depth-color"] = generateVariantColor(
        newTheme["--primary-color"],
        "widgetInnerDepth"
      );

      newTheme["--widget-inner-depth-wall-color"] = generateVariantColor(
        newTheme["--primary-color"],
        "widgetInnerDepthWall"
      );

      newTheme["--widget-text-color"] = generateVariantColor(
        newTheme["--primary-color"],
        "textContrast"
      );

      updateTheme({
        "--secondary-color": generateVariantColor(
          newTheme["--primary-color"],
          "secondary"
        ),
      });
    }

    setTheme((prevTheme) => ({ ...prevTheme, ...newTheme }));
  };

  const hexToRgbArray = (hex) => {
    const bigint = parseInt(hex.slice(1), 16);
    return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255];
  };

  const generateTheme = async () => {
    if (isMonochrome) return;
    const btheme = {
      theme: {
        colors: {
          frame: hexToRgbArray(theme["--primary-color"]),
          frame_inactive: hexToRgbArray(theme["--primary-color"]),
          toolbar: hexToRgbArray(theme["--secondary-color"]),
          tab_background_text: hexToRgbArray(theme["--widget-text-color"]),
          ntp_background: hexToRgbArray(theme["--secondary-color"]),
          bookmark_text: hexToRgbArray(
            generateVariantColor(theme["--secondary-color"], "textContrast")
          ),
          tab_background_text_inactive: hexToRgbArray(
            theme["--widget-text-color"]
          ),
          toolbar_button_icon: hexToRgbArray(
            generateVariantColor(theme["--secondary-color"], "textContrast")
          ),
          tab_text: hexToRgbArray(
            generateVariantColor(theme["--secondary-color"], "textContrast")
          ),
        },
      },
    };

    const manifest = {
      manifest_version: 3,
      name: "Generated Chrome Theme",
      version: "1.0",
      ...btheme,
    };

    const zip = new JSZip();
    zip.file("manifest.json", JSON.stringify(manifest, null, 2));

    const content = await zip.generateAsync({ type: "blob" });

    const a = document.createElement("a");
    a.href = URL.createObjectURL(content);
    a.download = "chrome_theme.zip";
    a.click();
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        updateTheme,
        isMonochrome,
        setIsMonochrome,
        generateTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

function generateVariantColor(hex, type) {
  const variants = {
    highlight: { lightnessOffset: -5, saturationOffset: 5 },
    placeholder: { lightnessOffset: -10, saturationOffset: -10 },
    widgetDepth: { lightnessOffset: -8, saturationOffset: 0 },
    widgetInnerDepth: { lightnessOffset: -12, saturationOffset: -5 },
    widgetInnerDepthWall: { lightnessOffset: -18, saturationOffset: -10 },
    textContrast: { lightnessOffset: 0, saturationOffset: 0 },
    secondary: { lightnessOffset: 0, saturationOffset: 0 }, // Placeholder, see below.
  };

  if (!variants[type]) {
    throw new Error(`Unknown variant type: ${type}`);
  }

  function hexToHSL(hex) {
    hex = hex.replace(/^#/, "");
    let r = parseInt(hex.substring(0, 2), 16) / 255;
    let g = parseInt(hex.substring(2, 4), 16) / 255;
    let b = parseInt(hex.substring(4, 6), 16) / 255;
    let max = Math.max(r, g, b),
      min = Math.min(r, g, b);
    let h,
      s,
      l = (max + min) / 2;
    if (max === min) {
      h = 0;
      s = 0;
    } else {
      let d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = ((g - b) / d + (g < b ? 6 : 0)) * 60;
          break;
        case g:
          h = ((b - r) / d + 2) * 60;
          break;
        case b:
          h = ((r - g) / d + 4) * 60;
          break;
      }
    }
    return { h, s: s * 100, l: l * 100 };
  }

  function hslToHex(h, s, l) {
    s /= 100;
    l /= 100;
    let c = (1 - Math.abs(2 * l - 1)) * s;
    let x = c * (1 - Math.abs(((h / 60) % 2) - 1));
    let m = l - c / 2;
    let r, g, b;
    if (h < 60) {
      r = c;
      g = x;
      b = 0;
    } else if (h < 120) {
      r = x;
      g = c;
      b = 0;
    } else if (h < 180) {
      r = 0;
      g = c;
      b = x;
    } else if (h < 240) {
      r = 0;
      g = x;
      b = c;
    } else if (h < 300) {
      r = x;
      g = 0;
      b = c;
    } else {
      r = c;
      g = 0;
      b = x;
    }
    r = Math.round((r + m) * 255);
    g = Math.round((g + m) * 255);
    b = Math.round((b + m) * 255);
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
  }

  function hexToRGB(hex) {
    hex = hex.replace(/^#/, "");
    return {
      r: parseInt(hex.substring(0, 2), 16),
      g: parseInt(hex.substring(2, 4), 16),
      b: parseInt(hex.substring(4, 6), 16),
    };
  }

  // textContrast: choose black or white based on the original lightness.
  if (type === "textContrast") {
    const { l } = hexToHSL(hex);
    return l > 50 ? "#000000" : "#FFFFFF";
  }

  // Secondary color generation.
  if (type === "secondary") {
    const { h, s, l } = hexToHSL(hex);
    const rgb = hexToRGB(hex);

    // If the base color is gray, produce a variant that is slightly lighter.
    if (s < 1) {
      let newL = Math.min(100, l + 10); // Increase lightness to get a whiter gray
      return hslToHex(0, 0, newL);
    }

    // Non-gray: use our region-based logic.
    const isOrange = h >= 20 && h <= 45; // Orange/amber region
    const isCoral = h > 0 && h < 20; // Red/coral region
    const isTeal = h >= 170 && h <= 190; // Teal/aqua region

    // Calculate distance to reference colors (weighted RGB distance).
    const distToOrange = colorDistance(rgb, hexToRGB("#ffb130"));
    const distToCoral = colorDistance(rgb, hexToRGB("#ff9170"));
    const distToTeal = colorDistance(rgb, hexToRGB("#00a793"));
    const minDist = Math.min(distToOrange, distToCoral, distToTeal);

    if (minDist === distToOrange || (isOrange && minDist < 150)) {
      return generateTintedColor(hex, "#ffe9d1", h, s, l);
    } else if (minDist === distToCoral || (isCoral && minDist < 150)) {
      return generateTintedColor(hex, "#fedcd2", h, s, l);
    } else if (minDist === distToTeal || (isTeal && minDist < 150)) {
      return generateTintedColor(hex, "#ccf0ec", h, s, l);
    } else {
      // For other colors, target a slightly less saturated and lighter color.
      let targetSaturation, targetLightness;
      if (h >= 0 && h < 60) {
        targetSaturation = 20; // Lower than before
        targetLightness = 95; // Increase lightness for a whiter effect
      } else if (h >= 60 && h < 180) {
        targetSaturation = 15;
        targetLightness = 95;
      } else if (h >= 180 && h < 300) {
        targetSaturation = 10;
        targetLightness = 95;
      } else {
        targetSaturation = 18;
        targetLightness = 95;
      }
      return hslToHex(h, targetSaturation, targetLightness);
    }
  }

  // Helper: calculate weighted color distance.
  function colorDistance(rgb1, rgb2) {
    const rDiff = rgb1.r - rgb2.r;
    const gDiff = rgb1.g - rgb2.g;
    const bDiff = rgb1.b - rgb2.b;
    return Math.sqrt(
      rDiff * rDiff * 0.3 + gDiff * gDiff * 0.59 + bDiff * bDiff * 0.11
    );
  }

  // Helper: generate a tinted color toward a target.
  function generateTintedColor(originalHex, targetHex, h, s, l) {
    const targetHSL = hexToHSL(targetHex);
    // We use the original hue but the target's saturation and lightness.
    return hslToHex(h, targetHSL.s, targetHSL.l);
  }

  // Normal variant generation (for types other than textContrast and secondary).
  let { h, s, l } = hexToHSL(hex);
  const { lightnessOffset, saturationOffset } = variants[type];

  // If the base color is gray, adjust only the lightness.
  if (s < 1) {
    l = Math.min(100, Math.max(0, l + lightnessOffset));
    return hslToHex(0, 0, l);
  }

  s = Math.min(100, Math.max(0, s + saturationOffset));
  l = Math.min(100, Math.max(0, l + lightnessOffset));
  return hslToHex(h, s, l);
}
