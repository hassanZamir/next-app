declare namespace IAccountOptionsModal {
    export interface IProps {
        isShowing: boolean;
        modalRef?: RefObject<HTMLDivElement>;
        onLogout: ()=>void;
        onPaymentSettings: (a: boolean)=>void;
    }
}

export { IAccountOptionsModal } 