import { useCallback } from "react";
import toastify from "toastify-js";

export function useToast(): (msg: string) => void {
  return useCallback(
    (msg: string) =>
      toastify({
        text: msg,
        duration: 3000,
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
      }).showToast(),
    []
  );
}
