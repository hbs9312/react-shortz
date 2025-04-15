import { useCallback, useEffect, useMemo, useState } from "react";
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
  const keyArray = useMemo(() => props.keys.split("+"), [props.keys]);

  // event.altKey 등 modifier 키 확인을 위한 객체
  const modifiers = useMemo(
    () => ({
      alt: keyArray.includes("alt"),
      ctrl: keyArray.includes("ctrl") || keyArray.includes("control"),
      meta: keyArray.includes("meta"),
      shift: keyArray.includes("shift"),
    }),
    [keyArray]
  );

  // modifier 키를 제외한 일반키 => 추후 연속키 고려하여 배열.
  const normalKeys = useMemo(
    () =>
      keyArray.filter((key) => {
        if (!checkValidKey(key)) {
          throw new InvalidKeyError();
        }

        return !checkModifierKey(key);
      }),
    [keyArray]
  );

  // 키 입력 이벤트 핸들러
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.repeat) return;

      if (modifiers.alt && !event.altKey) return;
      if (modifiers.ctrl && !event.ctrlKey) return;
      if (modifiers.meta && !event.metaKey) return;
      if (modifiers.shift && !event.shiftKey) return;

      if (normalKeys.includes(keyCodeMap[event.code])) {
        props.callback?.();
      }
    },
    [modifiers, normalKeys, props.callback]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);
};

/*
	1. 키 등록
		1) 문자열을 + 기준으로 분리
		2) 분리된 문자열 중 유효한 키 인지 확인 -> KeyCode or ctlr, meta, shift, alt
		3) 유효하지 않은 키가 포함되었다면 throw error
		4) 수정자와 일반키를 별도로 관리
	2. 키 입력

*/
