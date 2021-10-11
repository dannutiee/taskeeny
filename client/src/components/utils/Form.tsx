import React from "react";
import styled from "styled-components";

import { Button } from ".";

export enum FormType {
  LOGIN,
  REGISTER,
}

export interface FormProps {
  onSubmit: (e: React.FormEvent) => void;
  type: FormType;
}

export const Form: React.FC<FormProps> = ({ onSubmit, type, children }) => {
  const buttonLabel = type === FormType.LOGIN ? "Log in" : "Register";
  return (
    <FormWrapper>
      <FormComponent onSubmit={onSubmit}>
        {children}
        <Button type="submit" label={buttonLabel} />
      </FormComponent>
    </FormWrapper>
  );
};

const FormWrapper = styled.div`
  width: 100%;
  max-width: 20rem;
`;

const FormComponent = styled.form`
  display: flex;
  flex-direction: column;
  padding: ${(p) => p.theme.auth.form.padding};
`;
