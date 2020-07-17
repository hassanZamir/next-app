declare namespace IRadioInput {
    export interface IProps {
        type: string;
        name: string;
        value: string;
        labelText: string;
        register?: ()=>void;
        validationRules?: {};
        formErrors?: { [key: string]: {message: string;}; };
        wrapperClass?: string;
    }
}

export { IRadioInput };