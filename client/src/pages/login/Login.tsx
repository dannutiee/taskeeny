import React, { useContext, useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

import { useLoginMutation } from "../../graphql/__generated__/typeDefs";
import { AuthContext } from "../../contexts/auth";
import { useForm } from "../../utils/useForm";
import { Input } from "../../components/utils";
import { Footer } from "./Footer";
import { Form, FormType, Card } from "../utils";

export interface LoginComponentProps {
  handleLogin: (email: string, password: string) => void;
  loading: boolean;
  error: string;
}

const LoginContainer: React.FC = () => {
  const history = useHistory();
  const authContext = useContext(AuthContext);
  const [error, setError] = useState("");

  const [loginMutation, { loading }] = useLoginMutation({
    onCompleted: ({ login }) => {
      authContext.login(login!.user);
      history.push("/");
    },
    onError: (error) => {
      setError("Failed to login");
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
    <LoginComponent handleLogin={handleLogin} loading={loading} error={error} />
  );
};

const LoginComponent: React.FC<LoginComponentProps> = ({
  handleLogin,
  error,
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
    <MainWrapper>
      <TopBar />
      <Card message={error} type={FormType.LOGIN}>
        <Form onSubmit={onSubmit} type={FormType.LOGIN}>
          <Input
            name="email"
            value={values.email}
            onChange={onChange}
            label="Email address"
          />
          <Input
            name="password"
            value={values.password}
            onChange={onChange}
            label="Password"
          />
        </Form>
      </Card>
      <Footer />
    </MainWrapper>
  );
};

export const Login = LoginContainer;

const TopBar = styled.div`
  width: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: ${(p) => p.theme.auth.bar.padding};
`;

const MainWrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
  background: ${(p) => p.theme.auth.bg};
`;
