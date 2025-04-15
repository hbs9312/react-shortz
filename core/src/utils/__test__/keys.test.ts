import { checkModifierKey, getModifierKey, getKey } from "../keys";

describe("checkModifierKey: 수정자인지 확인하는 함수", () => {
  it("전달받은 문자열 key가 ctrl, alt, shift, meta 중 하나라면 true를 반환", () => {
    expect(checkModifierKey("ctrl")).toBe(true);
    expect(checkModifierKey("alt")).toBe(true);
    expect(checkModifierKey("shift")).toBe(true);
    expect(checkModifierKey("meta")).toBe(true);
  });

  it("전달 받은 문자열 key가 수정자가 아니면 false를 반환", () => {
    expect(checkModifierKey("a")).toBe(false);
  });
});
