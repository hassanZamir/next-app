declare namespace ITab {
    export interface IProps {
        active: boolean;
        borderRight: boolean;
        onClick: ()=>void;
        padding?: string;
        width?: string;
        showBorderBottom?: boolean;
    }
}
declare namespace IContent {
    export interface IProps {
        active: boolean;
    }
}

export { ITab, IContent };