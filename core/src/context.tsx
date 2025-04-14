// import { createContext, useCallback } from "react";
// import { Hotkey, HotKeyContext, HotkeyProps, Key } from "./types";
// import { useState } from "react";
// import { DuplicateKeyError } from "./errors";

// const HotkeyContext = createContext<HotKeyContext | null>(null);

// export function HotkeyProvider({ children }: { children: React.ReactNode }) {
//   const [hotkeys, setHotkeys] = useState<Hotkey[]>([]);

//   const registrHotkeys = useCallback(
//     (props: HotkeyProps) => {
//       // override 여부에 따른 중복키 체크
//       // 중복된 키가 있다면 throw error
//       if (!props.options.override) {
//         checkDuplicateKey(props.key);
//       }

//       const newHotkey = {
//         key: props.key,
//         callback: props.callback,
//       };

//       // TODO: override가 true라면 다른키는 enabled false 처리
//       const newState = hotkeys
//         .filter((hotkey) => hotkey.key !== props.key)
//         .concat(newHotkey);

//       setHotkeys(newState);
//     },
//     [hotkeys]
//   );

//   const checkDuplicateKey = useCallback(
//     (key: Key) => {
//       const existKey = hotkeys.find((hotkey) => hotkey.key === key);

//       if (existKey) {
//         throw new DuplicateKeyError();
//       }
//     },
//     [hotkeys]
//   );

//   /*
//    * TODO: 키보드 이벤츠 처리
//    * 1. keydown 시 입력된 키 저장
//    * 2. keyup 시 콜백함수 실행
//    * */
//   return (
//     <HotkeyContext.Provider value={null}>{children}</HotkeyContext.Provider>
//   );
// }
