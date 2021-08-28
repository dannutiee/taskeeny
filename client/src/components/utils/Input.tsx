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
    <FormInput
      name={name}
      value={value}
      onChange={onChange}
      placeholder={label}
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
    transition: all 0.4s;
    :focus {
        border-color: ${(p) => p.theme.auth.input.focusColor};
        ::placeholder {
            color: ${(p) => p.theme.auth.input.focusColor};
            transition: all 0.4s;
        }
      }
    }
  `;
