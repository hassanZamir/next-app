declare namespace IRegInput {
    export interface IProps {
        name: string;
        type: string;
        ref?: RefObject<HTMLInputElement> & (() => void);
        value?: string;
        placeholder?: string;
    }
}

export { IRegInput };
