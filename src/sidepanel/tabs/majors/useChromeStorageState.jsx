import { useState, useEffect } from "react";

function useChromeStorageState(key, initialData) {
  const [value, setValue] = useState(initialData);

  useEffect(() => {
    chrome.storage.local.get(key, (result) => {
      if (result[key] !== undefined) {
        setValue(result[key]);
      }
    });
  }, [key]);

  useEffect(() => {
    chrome.storage.local.set({ [key]: value });
  }, [key, value]);

  return [value, setValue];
}

export default useChromeStorageState;
