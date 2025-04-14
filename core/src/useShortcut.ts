import { useEffect } from "react";
import { useShortcutContext } from "./shortcutProvider";
import { ShortcutProps } from "./types";

// ShortcutProvider에 단축키 등록
export const useShortcut = (props: ShortcutProps) => {
  const { addShortcut, removeShortcut } = useShortcutContext();

  useEffect(() => {
    addShortcut(props);
    return () => {
      removeShortcut(props);
    };
  }, []);
};
