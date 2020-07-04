import React from "react";
import { useForm } from "react-hook-form";

import { IFormComponent } from "./FormComponent";

export const FormComponent: React.FunctionComponent<IFormComponent.IProps> = ({ submitActive, defaultValues, children, onSubmit }) => {
  const methods = useForm({ defaultValues, mode: 'onBlur' });
  const { handleSubmit, errors, formState } = methods;

  return (
    <form className="flex-column d-flex align-items-center" onSubmit={handleSubmit(onSubmit)}>
      {Array.isArray(children)
        ? children.map(child => {
            return child.props.name
              ? React.createElement(child.type, {
                  ...{
                    ...child.props,
                    register: child.props.validationRules ? methods.register(child.props.validationRules) : methods.register,
                    key: child.props.name,
                    formErrors: errors,
                    isActive: submitActive && formState.isValid
                  }
                })
              : child;
          })
        : children}
    </form>
  );
}