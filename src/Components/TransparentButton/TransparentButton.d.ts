declare namespace ITransparentButton {
    export interface IProps {
        padding?: string;
        border?: string;
        borderRadius?: string;
        formState?: {};
        className?: string;
        onClick?: (param: any) => void;
        isActive?: boolean;
        type?: string;
        name?: string;
        showLoader?: boolean;
    }
}

export { ITransparentButton };
