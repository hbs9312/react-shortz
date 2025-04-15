import { useEffect, useMemo } from "react";
import { checkValidKey, checkModifierKey, keyCodeMap } from "./utils/keys";
import { InvalidKeyError } from "./errors";

// 단축키 등록
type ShortcutProps = {
  keys: string;
  callback: () => void;
  disabled?: boolean;
  options?: {
    preventDefault?: boolean;
    override?: boolean;
  };
};

export const useShortcut = (props: ShortcutProps) => {
  const { keys, callback } = props;

  const { modifiers, normalKeys } = useMemo(() => {
    const keyArray = keys.split("+");

    // KeyboardEvent.altKey 등 modifier 키와 비교하기 위한 객체
    const modifiers = {
      alt: keyArray.includes("alt"),
      ctrl: keyArray.includes("ctrl") || keyArray.includes("control"),
      meta: keyArray.includes("meta"),
      shift: keyArray.includes("shift"),
    };

    const normalKeys = keyArray.filter((key) => {
      if (!checkValidKey(key)) {
        throw new InvalidKeyError();
      }

      // modifier 키가 아니라면 배열에 추가
      return !checkModifierKey(key);
    });

    return { modifiers, normalKeys };
  }, [keys]);

  useEffect(() => {
    // 키 입력 이벤트 핸들러
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.repeat) return;

      if (modifiers.alt && !event.altKey) return;
      if (modifiers.ctrl && !event.ctrlKey) return;
      if (modifiers.meta && !event.metaKey) return;
      if (modifiers.shift && !event.shiftKey) return;

      if (normalKeys.includes(keyCodeMap[event.code])) {
        callback?.();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [modifiers, normalKeys, callback]);
};
