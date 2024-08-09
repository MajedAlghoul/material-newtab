import "./App.css";
import { useState } from "react";

function App() {
  const [bCount, setBCount] = useState(0);
  chrome.bookmarks.getTree(function (bookmarkTreeNodes) {
    const rootNode = bookmarkTreeNodes[0];
    setBCount(rootNode.children.length);

    console.log("Total bookmarks: " + bCount);
  });
  return <p>{"helloxzzzxx " + bCount}</p>;
}

export default App;
