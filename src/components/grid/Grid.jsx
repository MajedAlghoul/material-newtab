import "./Grid.css";

function Grid({ gridType, children }) {
  return <div className={`grid ${gridType}`}>{children}</div>;
}

export default Grid;
