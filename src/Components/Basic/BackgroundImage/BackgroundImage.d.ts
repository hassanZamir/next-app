declare namespace IBackgroundImage {
    export interface IProps {
        src: string[] | string;
        paddingBottom?: string;
        borderRadius?: string;
        backgroundPosition?: string;
        onClick?: (e: any)=>void
    }
}

export { IBackgroundImage };