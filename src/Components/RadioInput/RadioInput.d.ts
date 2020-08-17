declare namespace IRadioInput {
    export interface IProps {
        type: string;
        name: string;
        value: string;
        checked?: boolean;
        labelText?: string;
        register?: ()=>void;
        validationRules?: {};
        formErrors?: { [key: string]: {message: string;}; };
        wrapperClass?: string;
        labelTextClass?: string;
        inputMargin?: string;
        inputHeight?: string;
        inputWidth?: string;
        labelTextElem?: React.ReactNode;
    }
}

export { IRadioInput };