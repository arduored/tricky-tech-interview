import { Nullable } from "./types";

export function debounce(cb: () => void, timeout = 1000) {
  let timer: Nullable<NodeJS.Timeout> = null;
  const rand = Math.floor(Math.random() * timeout) + 1000;
  return () => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => cb(), rand);
  };
}
