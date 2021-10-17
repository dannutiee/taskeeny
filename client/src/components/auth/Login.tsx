import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

import { useLoginMutation } from "../../graphql/__generated__/typeDefs";
import { AuthContext } from "../../contexts/auth";
import { useForm } from "../../hooks/useForm";
import { Input, Form, FormType } from "../utils";
import { getErrors } from "../../utils";

interface LoginErrors {
  email?: string;
  password?: string;
  general?: string;
}

export interface LoginComponentProps {
  handleLogin: (email: string, password: string) => void;
  loading: boolean;
  errors: LoginErrors;
}

const LoginContainer: React.FC = () => {
  const history = useHistory();
  const authContext = useContext(AuthContext);
  const [errors, setErrors] = useState({});

  const [loginMutation, { loading }] = useLoginMutation({
    onCompleted: ({ login }) => {
      authContext.login(login!.user);
      history.push("/");
    },
    onError: (e) => {
      setErrors(getErrors(e));
    },
  });

  const handleLogin = (email: string, password: string): void => {
    loginMutation({
      variables: {
        email,
        password,
      },
    });
  };

  return (
    <LoginComponent
      handleLogin={handleLogin}
      loading={loading}
      errors={errors}
    />
  );
};

const LoginComponent: React.FC<LoginComponentProps> = ({
  handleLogin,
  errors,
}) => {
  const { onChange, onSubmit, values } = useForm(loginCallback, {
    email: "",
    password: "",
  });

  // hoisted to useForm
  function loginCallback() {
    handleLogin(values.email, values.password);
  }

  return (
    <Form onSubmit={onSubmit} type={FormType.LOGIN}>
      <ErrorInfo>{errors.general}</ErrorInfo>
      <Input
        name="email"
        value={values.email}
        onChange={onChange}
        label="Email address"
        error={errors.email}
        type="email"
      />
      <Input
        name="password"
        value={values.password}
        onChange={onChange}
        label="Password"
        error={errors.password}
        type="password"
      />
    </Form>
  );
};

export const Login = LoginContainer;

const ErrorInfo = styled.span`
  font-size: ${(p) => p.theme.font.size.small};
  color: ${(p) => p.theme.font.error};
  text-align: center;
  padding-bottom: 15px;
`;
