import { describe, expect, test } from "vitest";
import { checkModifierKey } from "./keys";

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
