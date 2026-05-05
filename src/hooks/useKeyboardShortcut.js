import { useEffect } from "react";

export function useKeyboardShortcut(handler) {
  useEffect(() => {
    const onKeyDown = (event) => {
      const isCommandK = (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k";

      if (isCommandK) {
        event.preventDefault();
        handler();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [handler]);
}
