declare namespace IRegInput {
    export interface IProps {
        name: string;
        type: string;
        ref?: RefObject<HTMLInputElement> & (() => void);
    }
}

export { IRegInput };
