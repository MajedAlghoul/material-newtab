function chkStrg(item) {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get([item], function (result) {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else {
        resolve(result);
      }
    });
  });
}

export async function pullStorage(item) {
  try {
    let result = await chkStrg(item);
    if (!result[item]) {
      await pushStorage(item, {});
      result = await chkStrg(item);
    }
    return result[item];
  } catch (error) {
    console.error(error);
  }
}

export function setStorage(item, bit) {
  return new Promise((resolve, reject) => {
    try {
      if (bit && Object.keys(bit).length !== 0) {
        chrome.storage.local.set({ [item]: bit }, () => {
          console.log(`${item} Has Been Set`);
          resolve();
        });
      } else {
        throw new Error("No Data To Be Set");
      }
    } catch (error) {
      reject(error);
    }
  });
}

export async function pushStorage(item, bit) {
  try {
    let toPush;
    if (bit && Object.keys(bit).length !== 0) {
      let tmp = await pullStorage(item);
      toPush = { ...tmp, ...bit };
      await chrome.storage.local.set({ [item]: toPush }, function () {
        console.log(item + " Has Been Pushed");
      });

      if (item === "preferences" || item === "whitelist") {
        await updateProfile();
        const acc = await pullStorage("account");
        if (acc.length !== 0) {
          await uploadToGoogle(item);
        }
      }
    } else {
      throw new Error("No Data To Push");
    }
  } catch (error) {
    console.error(error);
  }
}

export async function removeStorage(item) {
  try {
    await chrome.storage.local.remove([item], function () {
      console.log(item + " Has Been Deleted");
    });
  } catch (error) {
    console.error(error);
  }
}

export async function removeSpecificStorage(item1, item) {
  try {
    let toPush;
    if (item.length === 0) {
      toPush = item;
    } else {
      let tmp = await pullStorage(item1);
      if (tmp.includes(item)) {
        tmp = tmp.filter((e) => e !== item);
        console.log(
          "Item Founed And Will Be Removed From The " + item1 + " Storage"
        );
      }
      toPush = tmp;
    }
    await chrome.storage.local.set({ [item1]: toPush }, function () {
      console.log(
        "the item: " + item + " Has Been Removed From The " + item1 + " Storage"
      );
    });
  } catch (error) {
    console.error(error);
  }
}

export function generateUUID() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
