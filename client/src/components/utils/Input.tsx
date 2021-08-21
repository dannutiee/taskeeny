import React from "react";
import styled from "styled-components";

interface InputProps {
  value: string;
  name: string;
  onChange: (e: any) => void;
  label: string;
}

export const Input: React.FC<InputProps> = ({
  value,
  name,
  onChange,
  label,
}) => (
  <div>
    <FormInputLabel>{label}</FormInputLabel>
    <FormInput
      name={name}
      value={value}
      onChange={onChange}
      placeholder="&nbsp;"
    />
  </div>
);

const FormInput = styled.input`
    margin: 5px 0 10px 0;
    border: 1px solid;
    outline: none;
    width: -webkit-fill-available;
    background: transparent;
    padding: ${(p) => p.theme.auth.input.padding};
    border-radius: ${(p) => p.theme.formInput.borderRadius};
    border-color: ${(p) => p.theme.formInput.borderColor};
    :focus {
      border-color: blue;
    }
    }
    transition: all 0.4s;
  `;

const FormInputLabel = styled.span`
  font-size: ${(p) => p.theme.font.size.tiny};
  color: ${(p) => p.theme.formInput.label.color};
`;
