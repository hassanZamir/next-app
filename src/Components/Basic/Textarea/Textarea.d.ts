declare namespace ITextarea {
    export interface IProps {
        ref?: any;
        defaultValue?: string;
        rows: number;
        columns?: number;
        className?: string;
        onChange?: (event: MouseEvent<HTMLDivElement, MouseEvent>) => void;
        name?: string;
        value?: string;
        placeholder?: string;
        maxLength?: number;
        disabled?: boolean;
    }
}

export { ITextarea };