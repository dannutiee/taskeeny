import React, { useState } from "react";
import { HTML_INJECTION_REGEXP } from "../utils/regexp";

export const useForm = (
  callback: () => void,
  initialState: { [key: string]: string }
) => {
  const [values, setValues] = useState(initialState);
  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { value, name } = e.currentTarget;

    if (!value.match(HTML_INJECTION_REGEXP)) {
      setValues({ ...values, [name]: value });
    }
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    callback();
  };

  return {
    onChange,
    onSubmit,
    values,
  };
};
