import React, { useRef } from "react";
import { useForm } from "react-hook-form";

import { IFormComponent } from "./FormComponent";

export const FormComponent: React.FunctionComponent<IFormComponent.IProps> = ({ submitActive, defaultValues, children, onSubmit }) => {
  const methods = useForm({ 
    defaultValues, 
    mode: 'onBlur'
  });
  const { handleSubmit, errors, formState, watch } = methods;

  const password = useRef({});
  password.current = watch("password", "");

  return (
    <form className="flex-column d-flex align-items-center" onSubmit={handleSubmit(onSubmit)}
      style={{ width: "300px" }}>
      {Array.isArray(children)
        ? children.map(child => {
            if (child.props.name) {
              if (child.props.name === "reTypePassword")
                child.props.validationRules.validate = (value: string) => { return password.current ? value === password.current || "Password must match" : true }

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