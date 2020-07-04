declare namespace ILabelInput {
    export interface IProps {
        type: string;
        name: string;
        labelText: string;
        register?: ()=>void;
        validationRules?: {};
        formErrors?: { [key: string]: {message: string;}; };
        // ref: <HTMLDivElement>()=>{};
        // onChange?: (param: any) => void;
        // onBlur?: (param: any) => void;
        wrapperClass?: string;
        // placeholder?: string;
        // value?: string;
        // autoComplete?: string;
    }
}

export { ILabelInput };