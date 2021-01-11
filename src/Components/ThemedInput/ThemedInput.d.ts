declare namespace IThemeInput {
    export interface IProps {
        type: string;
        onChange: (param: any) => void;
        placeholder?: string;
        onBlur?: (param: any) => void;
        name?: string;
        className?: string;
        value?: string;
        autoComplete?: string;
    }
}

declare namespace IThemeInputWithLabel {
    export interface IProps {
        type: string;
        onChange: (param: any) => void;
        labelProps: { labelClass: string; labelText: string;[key: string]: {}; };
        placeholder?: string;
        onBlur?: (param: any) => void;
        name: string;
        className?: string;
        value?: string;
        autoComplete?: string;
        [key: string]: {};
    }
}

export { IThemeInput, IThemeInputWithLabel };