import { useEffect } from "react";

export function useKey(whichKey, action) {
  useEffect(
    function() {
      function callback(evt) {
        if (evt.code.toLowerCase() === whichKey.toLowerCase()) {
          action();
        }
      }

      document.addEventListener("keydown", callback);
      return function() {
        document.removeEventListener("keydown", callback);
      };
    },
    [action, whichKey],
  );
}
