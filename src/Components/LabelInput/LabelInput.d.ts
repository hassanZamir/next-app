declare namespace ILabelInput {
    export interface IProps {
        type: string;
        name: string;
        labelText: string;
        register?: ()=>void;
        validationRules?: {};
        formErrors?: { [key: string]: {message: string;}; };
        wrapperClass?: string;
    }
}

declare namespace ISelectInput {
    export interface IProps {
        type: string[];
        name: string[];
        options: string[][];
        register?: (rule: {})=>void;
        labelText: string;
        validationRules: {}[];
        formErrors?: { [key: string]: {message: string;}; };
        wrapperClass?: string;
    }
}

export { ILabelInput, ISelectInput };