import React, { useRef, useEffect } from "react";
import { useForm } from "react-hook-form";

import { IFormComponent } from "./FormComponent";

export const FormComponent: React.FunctionComponent<IFormComponent.IProps> = ({ submitSuccess, submitActive, defaultValues, children, onSubmit }) => {
  const methods = useForm({ 
    defaultValues, 
    mode: 'onBlur'
  });
  const { handleSubmit, errors, formState, watch, reset } = methods;

  const password = useRef({});
  password.current = watch("password", "");

  useEffect(() => {
    if (submitSuccess) reset({});
  }, [submitSuccess]);

  return (
    <form className="flex-column d-flex align-items-center" onSubmit={handleSubmit(onSubmit)}>
      {Array.isArray(children)
        ? children.map(child => {
            if (child && child.props && child.props.name) {
              if (child.props.name === "reTypePassword")
                child.props.validationRules.validate = (value: string) => { return password.current ? value === password.current || "Password must match" : true }
              
              console.log("formState.isValid", formState.isValid);
              return React.createElement(child.type, {
                ...{
                  ...child.props,
                  register: !child.props.validationRules || Array.isArray(child.props.validationRules) ? methods.register : methods.register(child.props.validationRules),
                  key: child.props.name,
                  formErrors: errors,
                  isActive: submitActive && formState.isValid,
                  validationRules: child.props.validationRules
                }
              })
            } else {
              return child;
            }
          })
        : children}
    </form>
  );
}