// 입력 언어, 브라우저 등에 따라 키 코드가 다르기 때문에 모든 키 코드를 정의 ex) ㅁ 과 a
export const keyCodeMap: { [key: string]: string } = {
  // 영문
  KeyA: "a",
  KeyB: "b",
  KeyC: "c",
  KeyD: "d",
  KeyE: "e",
  KeyF: "f",
  KeyG: "g",
  KeyH: "h",
  KeyI: "i",
  KeyJ: "j",
  KeyK: "k",
  KeyL: "l",
  KeyM: "m",
  KeyN: "n",
  KeyO: "o",
  KeyP: "p",
  KeyQ: "q",
  KeyR: "r",
  KeyS: "s",
  KeyT: "t",
  KeyU: "u",
  KeyV: "v",
  KeyW: "w",
  KeyX: "x",
  KeyY: "y",
  KeyZ: "z",

  // 숫자
  Digit0: "0",
  Digit1: "1",
  Digit2: "2",
  Digit3: "3",
  Digit4: "4",
  Digit5: "5",
  Digit6: "6",
  Digit7: "7",
  Digit8: "8",
  Digit9: "9",

  // 특수문자
  Minus: "-",
  Equal: "=",
  BracketLeft: "[",
  BracketRight: "]",
  Backslash: "\\",
  Semicolon: ";",
  Quote: "'",
  Comma: ",",
  Period: ".",
  Slash: "/",
  Backquote: "`",

  // 기능키
  Space: " ",
  Enter: "enter",
  Backspace: "backspace",
  Tab: "tab",
  Escape: "escape",
  Delete: "delete",
  CapsLock: "capslock",

  // 방향키
  ArrowLeft: "arrowleft",
  ArrowRight: "arrowright",
  ArrowUp: "arrowup",
  ArrowDown: "arrowdown",

  // 수정자 키
  ShiftLeft: "shiftleft",
  ShiftRight: "shiftright",
  ControlLeft: "controlleft",
  ControlRight: "controlright",
  AltLeft: "altleft",
  AltRight: "altright",
  MetaLeft: "metaleft",
  MetaRight: "metaright",
} as const;

// 수정자 여부를 확인하기 위한 상수
export const modifierKeys: string[] = [
  "shift",
  "control",
  "alt",
  "meta",
  "ctrl",
] as const;

/**
 * 수정자 키 체크
 * @param key - key
 * @returns boolean
 */
export const checkModifierKey = (key: string) => {
  return modifierKeys.includes(key.toLowerCase());
};

/**
 * code를 key로 변환
 * @param code - key code
 * @returns key
 */
export const getKey = (code: string) => {
  return keyCodeMap[code];
};

/**
 * 키보드에서 입력 가능한 키인지 확인
 * @param key - key
 * @returns boolean
 */
export const checkValidKey = (key: string) => {
  return (
    Object.values(keyCodeMap)
      .map((v) => v.toLowerCase())
      .includes(key.toLowerCase()) || checkModifierKey(key)
  );
};
