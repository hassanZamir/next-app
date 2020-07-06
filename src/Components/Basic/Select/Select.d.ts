declare namespace ISelect {
    export interface IProps {
        name: string;
        options: string[];
        ref: RefObject<HTMLSelectElement> & (() => void);
        // ref: React.MutableRefObject<HTMLInputElement> & (() => void)
    }
}

export { ISelect };