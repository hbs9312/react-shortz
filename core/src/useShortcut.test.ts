import { describe, expect, test, vi } from "vitest";
import { useShortcut } from "./useShortcut";
import { InvalidKeyError } from "./errors";
import { fireEvent, renderHook } from "@testing-library/react";
describe("useShortcut", () => {
  test("올바른 키조합이 전달되면 오류가 발생하지 않는다.", () => {
    expect(() => {
      renderHook(() =>
        useShortcut({
          keys: "ctrl+a",
          callback: () => {},
        })
      );
    }).not.toThrow();
  });

  test("올바르지 않은 키조합이 전달되면 오류가 발생한다.", () => {
    expect(() => {
      renderHook(() =>
        useShortcut({
          keys: "ctrl++a",
          callback: () => {},
        })
      );
    }).toThrow(InvalidKeyError);
  });

  test("등록된 단축키를 키보드로 입력하면 콜백함수가 호출된다.", () => {
    const spy = vi.fn();
    renderHook(() =>
      useShortcut({
        keys: "ctrl+a",
        callback: spy,
      })
    );
    fireEvent.keyDown(window, { key: "a", code: "KeyA", ctrlKey: true });
    expect(spy).toHaveBeenCalledTimes(1);
  });

  test("등록된 단축키외의 키를 키보드로 입력하면 콜백함수가 호출되지 않는다.", () => {
    const spy = vi.fn();
    renderHook(() =>
      useShortcut({
        keys: "ctrl+a",
        callback: spy,
      })
    );
    fireEvent.keyDown(window, { key: "b", code: "KeyB", ctrlKey: true });
    expect(spy).toHaveBeenCalledTimes(0);
  });
});
