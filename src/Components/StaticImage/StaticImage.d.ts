declare namespace IStaticImg {
    export interface IProps {
        src: string;
        children?: React.ReactNode;
        className?: string;
        height?: string;
        width?: string;
        top?: string;
        left?: string;
        name?: string;
        onClick?: (e: any) => void;
    }
}

export { IStaticImg };
