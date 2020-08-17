import React, { useRef, useEffect } from "react";
import { useForm } from "react-hook-form";

import { IFormComponent } from "./FormComponent";

export const FormComponent: React.FunctionComponent<IFormComponent.IProps> = ({ submitSuccess, submitActive, defaultValues, children, onSubmit }) => {
  const methods = useForm({ 
    defaultValues, 
    mode: 'onBlur'
  });
  const { handleSubmit, errors, formState, watch, reset, setValue } = methods;

  const password = useRef({});
  password.current = watch("password", "");

  useEffect(() => {
    if (submitSuccess) reset({});
  }, [submitSuccess]);

  useEffect(() => {
    if (defaultValues && ('id' in defaultValues)) {
      reset(defaultValues);
    }
  }, [defaultValues]);

  const returnChildren: any = (children: {props: any, type: any, children: any}[]) => {
    return children.map(child => {
      if (child && child.props && child.props.name) {
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
        if (child && child.props && Array.isArray(child.props.children))
          return <div className={child.props.className}>{ returnChildren(child.props.children) }</div>
        else
          return child;
      }
    })
  }
  
  return (
    <form className="flex-column d-flex align-items-center" onSubmit={handleSubmit(onSubmit)}>
      {Array.isArray(children) ? returnChildren(children) : children}
    </form>
  );
  // return (
  //   <form className="flex-column d-flex align-items-center" onSubmit={handleSubmit(onSubmit)}>
  //     {Array.isArray(children)
  //       ? children.map(child => {
  //           if (child && child.props && child.props.name) {
  //             if (child.props.name === "reTypePassword")
  //               child.props.validationRules.validate = (value: string) => { return password.current ? value === password.current || "Password must match" : true }
              
  //             return React.createElement(child.type, {
  //               ...{
  //                 ...child.props,
  //                 register: !child.props.validationRules || Array.isArray(child.props.validationRules) ? methods.register : methods.register(child.props.validationRules),
  //                 key: child.props.name,
  //                 formErrors: errors,
  //                 isActive: submitActive && formState.isValid,
  //                 validationRules: child.props.validationRules
  //               }
  //             })
  //           } else {
  //             return child;
  //           }
  //         })
  //       : children}
  //   </form>
  // );
}