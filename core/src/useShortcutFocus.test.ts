import { fireEvent, renderHook } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { useShortcutFocus } from "./useShortcutFocus";
import { useRef } from "react";
import { InvalidKeyError } from "./errors";

describe("useShortcutFocus", () => {
  test("지정된 단축키를 누르면 전달된 ref에 focus 이벤트가 발생한다.", () => {
    const { result } = renderHook(() => useRef<HTMLInputElement>(null));
    const input = document.createElement("input");
    result.current.current = input;

    document.body.appendChild(input);

    renderHook(() => useShortcutFocus({ keys: "ctrl+a", ref: result.current }));

    fireEvent.keyDown(window, { key: "a", code: "KeyA", ctrlKey: true });

    const isFocused = document.activeElement === result.current.current;

    expect(isFocused).toBe(true);
  });

  test("올바르지 않은 키조합이 전달되면 오류가 발생한다.", () => {
    const { result } = renderHook(() => useRef<HTMLInputElement>(null));
    const input = document.createElement("input");
    result.current.current = input;
    document.body.appendChild(input);

    expect(() => {
      renderHook(() =>
        useShortcutFocus({ keys: "ctrl+10", ref: result.current })
      );
    }).toThrow(InvalidKeyError);
  });
});
