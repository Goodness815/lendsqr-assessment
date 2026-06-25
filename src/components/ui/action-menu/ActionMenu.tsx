import type { ReactNode } from "react";
import { createPortal } from "react-dom";
import s from "./ActionMenu.module.scss";

interface ActionMenuProps {
  id: string;
  top: number;
  right: number;
  onClose: () => void;
  children: ReactNode;
}

export function ActionMenu({ id, top, right, onClose, children }: ActionMenuProps) {
  return createPortal(
    <div
      className={s.dropMenu}
      style={{ top, right }}
      data-testid={`action-menu-${id}`}
      role="menu"
    >
      {/* 
        We rely on the click handler of the wrapper component or 
        document listener to close the menu.
      */}
      {children}
    </div>,
    document.body
  );
}
