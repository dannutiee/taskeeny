import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import {
  useRegisterMutation,
  RegisterInput,
} from "../../graphql/__generated__/typeDefs";
import { useForm } from "../../utils/useForm";
import { Input, Form, FormType } from "../utils";

export interface RegisterComponentProps {
  handleRegister: (input: RegisterInput) => void;
  loading: boolean;
  error: string;
}

const RegisterContainer: React.FC = () => {
  const history = useHistory();
  const [error, setError] = useState("");

  const [registerMutation, { loading }] = useRegisterMutation({
    onCompleted: () => {
      history.replace("/login?success");
      location.reload();
    },
    onError: (error) => {
      setError("Failed to login");
    },
  });

  const handleRegister = (input: RegisterInput): void => {
    registerMutation({
      variables: {
        input: {
          name: input.name,
          surname: input.surname,
          email: input.email,
          password: input.password,
          confirmPassword: input.confirmPassword,
        },
      },
    });
  };

  return (
    <RegisterComponent
      handleRegister={handleRegister}
      loading={loading}
      error={error}
    />
  );
};

const RegisterComponent: React.FC<RegisterComponentProps> = ({
  handleRegister,
  error,
}) => {
  const { onChange, onSubmit, values } = useForm(registerCallback, {
    email: "",
    name: "",
    surname: "",
    password: "",
    confirmPassword: "",
  });

  // hoisted to useForm
  function registerCallback() {
    const registerInput = {
      email: values.email,
      name: values.name,
      surname: values.surname,
      password: values.password,
      confirmPassword: values.confirmPassword,
    };

    handleRegister(registerInput);
  }

  return (
    <Form onSubmit={onSubmit} type={FormType.REGISTER}>
      <Input name="name" value={values.name} onChange={onChange} label="Name" />
      <Input
        name="surname"
        value={values.surname}
        onChange={onChange}
        label="Surname"
      />
      <Input
        name="email"
        value={values.email}
        onChange={onChange}
        label="E-mail"
      />
      <Input
        name="password"
        value={values.password}
        onChange={onChange}
        label="Password"
      />
      <Input
        name="confirmPassword"
        value={values.confirmPassword}
        onChange={onChange}
        label="Confirm password"
      />
    </Form>
  );
};

export const Register = RegisterContainer;
