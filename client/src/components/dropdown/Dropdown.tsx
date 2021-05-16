import React, { useState, useEffect } from "react";

import { DropdownProps, DropdownSubComponents } from "./interfaces";
import { DropdownButton, DropdownItem } from "./DropdownButton";
import { DropdownSelect } from "./DropdownSelect";

const DropdownComponent: React.FC<DropdownProps> & DropdownSubComponents = ({
  children,
  button,
  options,
  value,
  onSelectOption,
}) => {
  const [menuVisible, setMenuVisible] = useState<boolean>(false);
  const [currentValue, setCurrentValue] = useState<string>(value ? value : "");

  useEffect(() => {
    if (onSelectOption) {
      onSelectOption(currentValue);
    }
  }, [currentValue]);

  if (options) {
    if (!value || !onSelectOption) {
      console.error(
        `Component DropdownSelect requires props "value" and "onSelectOption"`
      );
      return null;
    }
    return (
      <DropdownSelect
        setCurrentValue={setCurrentValue}
        currentValue={currentValue}
        options={options}
        setMenuVisible={setMenuVisible}
        menuVisible={menuVisible}
      />
    );
  }

  if (button) {
    if (!children) {
      console.error(
        `Component DropdownButton requires at least one child component <Dropdown.Item />`
      );
      return null;
    }
    return (
      <DropdownButton
        children={children}
        setMenuVisible={setMenuVisible}
        menuVisible={menuVisible}
      />
    );
  }

  if (!button && !options) {
    console.error(
      `Component Dropdown requires one of props ("button" || "options")`
    );
    return null;
  }

  return null;
};

DropdownComponent.Item = DropdownItem;

export const Dropdown = DropdownComponent;
