import { createContext, useContext, useState, useEffect } from "react";

const GridsWHContext = createContext();

export function GridsWHProvider({ children }) {
  const [gridsWH, setGridsWH] = useState({});

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      let lw, cw, rw, gh;

      if (height >= 868) {
        gh = 8;
      } else {
        gh = 5;
      }

      if (width < 708) {
        lw = 0;
        cw = 3;
        rw = 1;
      } else if (width >= 708 && width < 916) {
        lw = 0;
        cw = 5;
        rw = 1;
      } else if (width >= 916 && width < 1276) {
        lw = 0;
        cw = 5;
        rw = 3;
      } else if (width >= 1276 && width < 1484) {
        lw = 3;
        cw = 5;
        rw = 3;
      } else {
        lw = 4;
        cw = 5;
        rw = 4;
      }

      setGridsWH({
        lw: lw,
        cw: cw,
        rw: rw,
        gh: gh,
      });
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <GridsWHContext.Provider value={{ gridsWH }}>
      {children}
    </GridsWHContext.Provider>
  );
}

export function useGridsWH() {
  return useContext(GridsWHContext);
}
