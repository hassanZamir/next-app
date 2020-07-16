declare namespace ISelect {
    export interface IProps {
        name: string;
        options: string[];
        selectRef: any;
        // ref: React.MutableRefObject<HTMLInputElement> & (() => void)
    }
}

export { ISelect };