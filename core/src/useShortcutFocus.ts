import { useShortcut } from "./useShortcut";

export type ShortcutFocusProps = {
  keys: string;
  ref: React.RefObject<HTMLElement | null>;
};

export const useShortcutFocus = ({ keys, ref }: ShortcutFocusProps) => {
  useShortcut({
    keys,
    callback: () => {
      ref.current?.focus();
    },
  });
};
