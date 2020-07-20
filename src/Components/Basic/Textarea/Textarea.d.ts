declare namespace ITextarea {
    export interface IProps {
        className?: string;
        onChange?: (event: MouseEvent<HTMLDivElement, MouseEvent>) => void;
        name?: string;
        rows: number;
        columns: number;
        value?: string;
        placeholder?: string;
    }
}

export { ITextarea };