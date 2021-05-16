import { ReactNode, ReactChildren } from "react";
import { DropdownItem } from "./DropdownButton";

export interface DropdownProps {
  children?: ReactNode;
  button?: boolean;
  options?: Option[];
  value?: string;
  onSelectOption?: (value: string) => any;
}

export interface Option {
  text: string;
  value: string;
}

export interface DropdownItemProps {
  onClick(): void;
  title?: string;
  children?: ReactNode;
}

export interface DropdownSubComponents {
  Item: typeof DropdownItem;
}

export interface MenuProps {
  children: React.ReactNode;
}

export interface DropdownButtonProps extends MenuProps {
  setMenuVisible: (isVisible: boolean) => any;
  menuVisible: boolean;
}

export interface SelectionProps {
  setCurrentValue: (status: string) => any;
  options: Option[];
}

export interface DropdownSelectProps extends SelectionProps {
  setMenuVisible: (isVisible: boolean) => any;
  menuVisible: boolean;
  currentValue: string;
}
