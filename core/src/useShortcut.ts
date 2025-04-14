import { useEffect, useState } from "react";
import { ShortcutProps } from "./types";
import { isSameSet } from "./utils/isSameSet";
import { getKey, isModifierKey } from "./utils/keys";

// TODO: 윈도우 포커스 아웃 등과 같은 예상치 못한 이벤트에 대한 처리 필요
// 단축키 등록
export const useShortcut = (props: ShortcutProps) => {
  // 일반키를 입력했을 때만 단축키를 실행하기 위해 수정자와 일반 키 별도로 관리
  const [modifier, setModifier] = useState<string[]>([]);
  const [key, setKey] = useState<string[]>([]);

  // input 등에서 기본적으로 기본동작을 막지 않아야 하기 때문에 preventDefault의 기본값 false
  const preventDefault = props.options?.preventDefault ?? false;

  const handleKeyDown = (event: KeyboardEvent) => {
    // TODO : input 태그 등 콜백함수가 실행되지 않아야하는 경우 boolean 값으로 분기처리
    if (preventDefault) {
      event.preventDefault();
    }
    if (event.repeat) return;
    if (isModifierKey(event.key)) {
      setModifier((prev) => [...prev, event.key.toLowerCase()]);
    } else {
      setKey((prev) => [...prev, getKey(event.code)]);
    }
  };

  const handleKeyUp = (event: KeyboardEvent) => {
    if (event.repeat) return;
    if (preventDefault) {
      event.preventDefault();
    }
    if (isModifierKey(event.key)) {
      setModifier((prev) =>
        prev.filter((key) => key !== event.key.toLowerCase())
      );
    } else {
      setKey((prev) => prev.filter((key) => key !== getKey(event.code)));
    }
  };

  useEffect(() => {
    // 일반키를 입력했을 때에만 단축키 실행
    if (key.length === 0) return;
    // 단축키를 '+' 기준으로 분리
    const shortcut = props.key.split("+");
    // Set을 통해서 순서와 관계없이 입력 비교
    if (isSameSet(new Set(shortcut), new Set([...modifier, ...key]))) {
      props.callback();
    }
  }, [modifier, key]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);
};
