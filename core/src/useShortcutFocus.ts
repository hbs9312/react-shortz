import type { ShortcutRefProps } from "./types";
import { useShortcut } from "./useShortcut";

export const useShortcutFocus = ({ keys, ref }: ShortcutRefProps) => {
	useShortcut({
		keys,
		callback: () => {
			ref.current?.focus();
		},
	});
};
