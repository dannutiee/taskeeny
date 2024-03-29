import React from "react";
import styled from "styled-components";

import { SelectionProps, DropdownSelectProps } from "./interfaces";

const Selection: React.FC<SelectionProps> = ({ setCurrentValue, options }) => {
  const onClickOption = (option: string) => {
    setCurrentValue(option);
  };

  return (
    <SelectionWrapper>
      {options?.map((option, i) => {
        return (
          <OptionItem
            key={i}
            value={option.value}
            onClick={(e) => onClickOption(e.currentTarget.value)}
          >
            {option.text}
          </OptionItem>
        );
      })}{" "}
    </SelectionWrapper>
  );
};

export const DropdownSelect: React.FC<DropdownSelectProps> = ({
  setMenuVisible,
  setCurrentValue,
  currentValue,
  menuVisible,
  options,
}) => {
  const icon = !menuVisible ? "arrow_drop_down" : "arrow_drop_up";
  return (
    <SelectDropdown onClick={() => setMenuVisible(!menuVisible)}>
      {options.find((option) => option.value === currentValue)?.text}
      <span className="material-icons icon">{icon}</span>
      {menuVisible && (
        <Selection setCurrentValue={setCurrentValue} options={options} />
      )}
    </SelectDropdown>
  );
};

const SelectionWrapper = styled.div`
  position: absolute;
  right: -1px;
  box-sizing: border-box;
  margin-top: 10px;
  z-index: 200;
  width: 100%;
  top: ${(p) => p.theme.dropdown.menuItem.height};
  border-radius: ${(p) => p.theme.dropdown.borderRadius};
  background: ${(p) => p.theme.dropdown.background};
  box-shadow: ${(p) => p.theme.task.shadow};
`;

const OptionItem = styled.button`
  display: block;
  background: none;
  border: none;
  padding: 0 10px;
  font-family: "Open Sans";
  padding: 5px 10px;
  width: 100%;
  text-align: left;
  font-size: ${(p) => p.theme.font.size.small};
  color: ${(p) => p.theme.dropdown.menuItem.color};
  :hover {
    cursor: pointer;
    background: ${(p) => p.theme.dropdown.menuItem.hoverColor};
  }
`;

const SelectDropdown = styled.div`
  width: 150px;
  padding: 0 10px;
  border: 1px solid;
  border-radius: 3px;
  display: inline-block;
  position: relative;
  cursor: pointer;
  font-size: ${(p) => p.theme.font.size.small};
  height: ${(p) => p.theme.dropdown.menuItem.height};
  line-height: ${(p) => p.theme.dropdown.menuItem.height};
  & > .icon {
    position: absolute;
    right: 0;
    height: ${(p) => p.theme.dropdown.menuItem.height};
    line-height: ${(p) => p.theme.dropdown.menuItem.height};
    color: ${(p) => p.theme.task.button.color};
  }
  border-color: ${(p) => p.theme.task.button.color};
`;
