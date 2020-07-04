declare namespace IInput {
    export interface IProps {
        onChange?: (event: MouseEvent<HTMLDivElement, MouseEvent>) => void;
        type: string;
        placeholder?: string;
        className?: string;
        name: string;
        disabled?: boolean;
    }
}

export { IInput };