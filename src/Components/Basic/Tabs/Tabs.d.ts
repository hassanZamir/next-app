declare namespace ITab {
    export interface IProps {
        active: boolean;
        border: boolean;
    }
}
declare namespace IContent {
    export interface IProps {
        active: boolean;
    }
}

export { ITab, IContent };