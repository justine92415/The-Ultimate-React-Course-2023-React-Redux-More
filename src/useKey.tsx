import { useEffect } from "react";

export function useKey(key:string, action:()=>void) {
  useEffect(function () {
    function callback(event: KeyboardEvent) {
      if (event.key.toLowerCase() === key.toLowerCase()) {
        action();
        console.log('CLOSING');
      }
    }

    document.addEventListener('keydown', callback);

    return function () {
      document.removeEventListener('keydown', callback);
    };
  },[action, key]);
}
