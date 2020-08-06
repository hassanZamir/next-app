declare namespace ITextarea {
    export interface IProps {
        rows: number;
        columns?: number;
        className?: string;
        onChange?: (event: MouseEvent<HTMLDivElement, MouseEvent>) => void;
        name?: string;
        value?: string;
        placeholder?: string;
        maxLength?: number;
    }
}

export { ITextarea };