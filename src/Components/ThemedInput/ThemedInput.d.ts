declare namespace IThemeInput {
    export interface IProps {
        name?: string;
        className?: string;
        placeholder: string;
        type: string;
        value?: string;
        autoComplete?: string;
        onChange: (param: any) => void;
        onBlur: (param: any) => void;
    }
}

export { IThemeInput };