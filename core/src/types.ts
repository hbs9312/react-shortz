export type Shortcut = {
  key: string;
  callback: () => void;
};

export type ShortcutProps = {
  key: string;
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
