import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";

import { useLoginMutation } from "../graphql/__generated__/typeDefs";
import { AuthContext } from "../contexts/auth";
import { useForm } from "../utils/useForm";

interface LoginComponentProps {
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
    <div>
      {error && <span>{error}</span>}
      <form onSubmit={onSubmit}>
        <input name="email" value={values.email} onChange={onChange} />
        <input name="password" value={values.password} onChange={onChange} />
        <button type="submit">Log in</button>
      </form>
    </div>
  );
};

export const Login = LoginContainer;
