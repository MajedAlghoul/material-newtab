import "./AddNewItemPlaceholder.css";
import WidgetTemplate from "../widgetTemplate/WidgetTemplate.jsx";

function AddNewItemPlaceholder({ x, y, w, h }) {
  return (
    <WidgetTemplate
      className="add-new-item-placeholder"
      x={x}
      y={y}
      w={w}
      h={h}
    >
      <svg
        width="26"
        stroke="var(--secondary-color)"
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

export default AddNewItemPlaceholder;
