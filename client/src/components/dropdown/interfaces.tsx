import { ReactNode } from "react";
import { DropdownItem } from "./Dropdown";

export interface DropdownProps {
  children?: ReactNode;
}

export interface DropdownItemProps {
  onClick(): void;
  title?: string;
  children?: ReactNode;
}

export interface DropdownSubComponents {
  Item: typeof DropdownItem;
}
