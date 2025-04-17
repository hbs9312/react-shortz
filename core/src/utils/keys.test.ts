import { describe, expect, test } from "vitest";
import { checkModifierKey, getKey } from "./keys";

describe("checkModifierKey()", () => {
  test("전달된 문자열이 수정자 키(ctrl, alt, shift, meta)인 경우 true를 반환한다.", () => {
    expect(checkModifierKey("ctrl")).toBe(true);
    expect(checkModifierKey("alt")).toBe(true);
    expect(checkModifierKey("shift")).toBe(true);
    expect(checkModifierKey("meta")).toBe(true);
  });

  test("전달된 문자열이 수정자 키가 아닌 경우 false를 반환한다.", () => {
    expect(checkModifierKey("a")).toBe(false);
    expect(checkModifierKey("b")).toBe(false);
    expect(checkModifierKey("c")).toBe(false);
  });
});

describe("getKey()", () => {
  test("전달된 키 코드를 keyCodeMap의 키로 변환한다.", () => {
    expect(getKey("KeyA")).toBe("a");
    expect(getKey("Digit1")).toBe("1");
    expect(getKey("Minus")).toBe("-");
  });

  test("전달된 키 코드가 키 코드 맵에 없는 경우 null을 반환한다.", () => {
    expect(getKey("Keyb")).toBeNull();
    expect(getKey("Digit10")).toBeNull();
    expect(getKey("equal")).toBeNull();
  });
});
