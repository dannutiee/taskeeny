import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import {
  useRegisterMutation,
  RegisterInput,
} from "../../graphql/__generated__/typeDefs";
import { getErrors } from "../../utils";
import { useForm } from "../../hooks";
import { Input, Form, FormType } from "../utils";

interface RegisterErrors {
  name?: string;
  surname?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export interface RegisterComponentProps {
  handleRegister: (input: RegisterInput) => void;
  loading: boolean;
  errors: RegisterErrors;
}

const RegisterContainer: React.FC = () => {
  const history = useHistory();
  const [errors, setErrors] = useState({});

  const [registerMutation, { loading }] = useRegisterMutation({
    onCompleted: () => {
      history.replace("/login?success");
      location.reload();
    },
    onError: (e) => {
      setErrors(getErrors(e));
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
      errors={errors}
    />
  );
};

const RegisterComponent: React.FC<RegisterComponentProps> = ({
  handleRegister,
  errors,
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
      <Input
        name="name"
        value={values.name}
        onChange={onChange}
        label="Name"
        error={errors.name}
        type="text"
      />
      <Input
        name="surname"
        value={values.surname}
        onChange={onChange}
        label="Surname"
        error={errors.surname}
        type="text"
      />
      <Input
        name="email"
        value={values.email}
        onChange={onChange}
        label="E-mail"
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
      <Input
        name="confirmPassword"
        value={values.confirmPassword}
        onChange={onChange}
        label="Confirm password"
        error={errors.confirmPassword}
        type="password"
      />
    </Form>
  );
};

export const Register = RegisterContainer;
