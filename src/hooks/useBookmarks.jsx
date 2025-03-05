import { createContext, useContext, useState, useEffect, useRef } from "react";
import { generateUUID, pullStorage, setStorage } from "../app/utility.js";
import { useGridsWH } from "./useGridsWH.jsx";
import WidgetBackend from "../app/WidgetBackend.js";

const BookmarksContext = createContext();

export function BookmarksProvider({ children }) {
  const [bookmarks, setBookmarks] = useState([]);
  const [appsFolderId, setAppsFolderId] = useState(null);
  useEffect(() => {
    const fetchBookmarks = () => {
      chrome.bookmarks.getTree((tree) => {
        setBookmarks(tree[0].children);
      });
    };

    fetchBookmarks();

    chrome.bookmarks.onCreated.addListener(fetchBookmarks);
    chrome.bookmarks.onRemoved.addListener(fetchBookmarks);
    chrome.bookmarks.onChanged.addListener(fetchBookmarks);
    return () => {
      chrome.bookmarks.onCreated.removeListener(fetchBookmarks);
      chrome.bookmarks.onRemoved.removeListener(fetchBookmarks);
      chrome.bookmarks.onChanged.removeListener(fetchBookmarks);
    };
  }, []);
  /*
  useEffect(() => {
    console.log(bookmarks);
  }, [bookmarks]);
*/
  useEffect(() => {
    if (bookmarks.length > 0) {
      //console.log(bookmarks);
      const foundFolder = bookmarks[1].children.find(
        (item) => item.title === "MNT Apps"
      );
      const fId = foundFolder ? foundFolder.id : null;
      //console.log(foundFolder);

      if (fId !== null && appsFolderId !== fId) {
        setAppsFolderId(fId);
      } else if (fId === null) {
        addBookmark(bookmarks[1].id, "MNT Apps");
      }
      //console.log(appsFolderId, "tata", "xxx", fId);
      /*
      for (let i = 0; i < 3000; i++) {
        console.log("removing");
        removeBookmark(bookmarks[1].children[i].id);
      }*/
    }
  }, [bookmarks]);

  const isFolder = (item) => !item.url;

  const addBookmark = (parent, title, url = null) => {
    chrome.bookmarks.create(
      {
        parentId: parent,
        title: title,
        url: url === null ? undefined : url,
      },
      (newBookmark) => {
        if (newBookmark.title === "MNT Apps") {
          setAppsFolderId(newBookmark.id);
        }
        console.log(appsFolderId, "ttt");
        console.log("Created Bookmark:", newBookmark);
      }
    );
  };

  const removeBookmark = (id) => {
    chrome.bookmarks.remove(id, () => {
      console.log("Bookmark removed!");
    });
  };
  return (
    <BookmarksContext.Provider
      value={{ bookmarks, addBookmark, appsFolderId, isFolder, removeBookmark }}
    >
      {children}
    </BookmarksContext.Provider>
  );
}

export function useBookmarks() {
  return useContext(BookmarksContext);
}
