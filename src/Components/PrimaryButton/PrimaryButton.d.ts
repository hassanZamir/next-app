declare namespace IPrimaryButton {
    export interface IProps {
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

export { IPrimaryButton };
