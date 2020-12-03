declare namespace IBackgroundImageSmart {
    export interface IProps {
        src: string;
        token?: string;
        paddingBottom?: string;
        borderRadius?: string;
        backgroundPosition?: string;
        onClick?: (e: any) => void;
        placeholder?: string;
    }
}

export { IBackgroundImageSmart };