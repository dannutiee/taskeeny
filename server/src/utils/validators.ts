import { emailRegEx } from "./regex";

interface Errors {
  username?: string;
  email?: string;
  password?: string;
  general?: string;
}

// TODO I woild like to remove usernmae from User

export const validateRegisterInput = (
  name: string,
  surname: string,
  email: string,
  password: string,
  confirmPassword: string
) => {
  const errors: Errors = {};

  if (name.trim() === "") {
    errors.username = "User name must not be empty";
  }

  if (surname.trim() === "") {
    errors.username = "User surname must not be empty";
  }

  if (email.trim() === "") {
    errors.email = "Email must not be empty";
  } else if (!email.match(emailRegEx)) {
    errors.email = "Email must be a valid email address";
  }

  if (password === "") {
    errors.password = "Password must not be empty";
  } else if (password !== confirmPassword) {
    errors.password = "Passwords must match";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

export const validateLoginInput = (email: string, password: string) => {
  const errors: Errors = {};

  if (email.trim() === "") {
    errors.username = "Username must not be empty";
  }

  if (password === "") {
    errors.password = "Password must not be empty";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};
