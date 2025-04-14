/* 

    단축키 등록 
    1. 단축키 중복, 오버라이드 처리
    2. 단축키 등록 해제
    3. 단축키 이벤트 처리 => 별도 훅 구성 고려

*/
import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import {
  Shortcut,
  ShortcutContextType,
  ShortcutProps,
  ShortcutProviderProps,
} from "./types";
import { isSameSet } from "./utils/isSameSet";
import { keyCodeMap, modifierKeys } from "./constant/keys";

const ShortcutContext = createContext<ShortcutContextType | null>(null);

export const ShortcutProvider = ({ children }: ShortcutProviderProps) => {
  const [shortcuts, setShortcuts] = useState<Shortcut[]>([]);

  const [inputModifiers, setInputModifiers] = useState<string[]>([]);
  const [inputCodes, setInputCodes] = useState<string[]>([]);

  const addShortcut = useCallback(
    (props: ShortcutProps) => {
      const { key, callback, disabled, options } = props;

      // override 옵션이 없으면 중복 체크
      if (!options?.override) {
        checkDuplicateShortcut(key);
      }

      setShortcuts((prev) => [...prev, { key, callback, disabled, options }]);
    },
    [shortcuts]
  );

  const removeShortcut = useCallback(
    (shortcut: Shortcut) => {
      setShortcuts((prev) => prev.filter((s) => s.key !== shortcut.key));
    },
    [shortcuts]
  );

  const checkDuplicateShortcut = (key: string) => {
    const isDuplicate = !!shortcuts.some((s) => s.key === key);

    if (isDuplicate) {
      throw new Error("Duplicate shortcut");
    }
  };

  // 키보드 입력시 modifier, key 등록
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.repeat) return;
      if (modifierKeys.includes(event.key.toLowerCase())) {
        setInputModifiers((prev) => [...prev, event.key.toLowerCase()]);
      } else {
        const newInputCodes = [...inputCodes, keyCodeMap[event.code]];
        setInputCodes(newInputCodes);
      }
    },
    [inputModifiers, inputCodes, shortcuts]
  );

  // 키보드 입력 해제시 modifier, key 제거
  const handleKeyUp = useCallback(
    (event: KeyboardEvent) => {
      if (event.repeat) return;
      if (modifierKeys.includes(event.key.toLowerCase())) {
        setInputModifiers((prev) =>
          prev.filter((key) => key !== event.key.toLowerCase())
        );
      } else {
        setInputCodes((prev) =>
          prev.filter((key) => key !== keyCodeMap[event.code])
        );
      }
    },
    [inputModifiers, inputCodes]
  );

  useEffect(() => {
    const shortcut = shortcuts.find((shortcut) => {
      const shortcutKeys = shortcut.key.split("+");
      return isSameSet(
        new Set(shortcutKeys),
        new Set([...inputModifiers, ...inputCodes])
      );
    });
    shortcut?.callback();
  }, [inputCodes, shortcuts, inputModifiers]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return (
    <ShortcutContext.Provider
      value={{ shortcuts, addShortcut, removeShortcut }}
    >
      {children}
    </ShortcutContext.Provider>
  );
};

export const useShortcutContext = () => {
  const context = useContext(ShortcutContext);
  if (!context) {
    throw new Error(
      "useShortcutContext must be used within a ShortcutProvider"
    );
  }
  return context;
};
