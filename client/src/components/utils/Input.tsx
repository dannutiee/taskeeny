import React, { useEffect, useState } from "react";
import styled from "styled-components";

interface InputProps {
  value: string;
  name: string;
  onChange: (e: any) => void;
  label: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({
  value,
  name,
  onChange,
  label,
  error,
}) => {
  const [inputError, setInputError] = useState(false);

  useEffect(() => {
    setInputError(!!error);
  }, [error]);

  const onInputFocus = () => {
    setInputError(false);
  };

  const onInputBlur = () => {
    setInputError(value ? false : !!error);
  };

  return (
    <div>
      <FormInput
        name={name}
        value={inputError ? "" : value}
        onChange={onChange}
        placeholder={inputError ? error : label}
        error={inputError}
        onFocus={onInputFocus}
        onBlur={onInputBlur}
      />
    </div>
  );
};

interface FormInputProps {
  error: boolean;
}
const FormInput = styled.input<FormInputProps>`
    margin: 5px 0 10px 0;
    border: 1px solid;
    outline: none;
    width: -webkit-fill-available;
    background: transparent;
    padding: ${(p) => p.theme.auth.input.padding};
    border-radius: ${(p) => p.theme.formInput.borderRadius};
    border-color: ${(p) =>
      p.error ? p.theme.auth.input.error : p.theme.formInput.borderColor};
    transition: all 0.4s;
    ::placeholder {
      color: ${(p) =>
        p.error ? p.theme.auth.input.error : p.theme.font.placeholderColor};
      transition: all 0.4s;
    }
    :focus {
        border-color: ${(p) => p.theme.auth.input.focusColor};
        ::placeholder {
            color: ${(p) =>
              p.error
                ? p.theme.auth.input.error
                : p.theme.auth.input.focusColor};
            transition: all 0.4s;
        }
      }
    }
  `;
