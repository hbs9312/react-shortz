export type Shortcut = {
	keys: string;
	callback: () => void;
};

export type ShortcutProps = {
	keys: string;
	callback: () => void;
	disabled?: boolean;
	options?: {
		preventDefault?: boolean;
		override?: boolean;
	};
};

export type ShortcutProviderProps = {
	children: React.ReactNode;
};

export type ShortcutContextType = {
	shortcuts: Shortcut[];
	addShortcut: (shortcut: ShortcutProps) => void;
	removeShortcut: (shortcut: Shortcut) => void;
};
