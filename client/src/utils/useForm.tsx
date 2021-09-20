import { useState } from "react";
import { HTML_INJECTION_REGEXP } from "./regexp";

export const useForm = (callback: any, initialState: any) => {
  const [values, setValues] = useState(initialState);
  const onChange = (e: any) => {
    const value = e.target.value;
    if (!value.match(HTML_INJECTION_REGEXP)) {
      setValues({ ...values, [e.target.name]: e.target.value });
    }
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
    callback();
  };

  return {
    onChange,
    onSubmit,
    values,
  };
};
