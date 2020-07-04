declare namespace IFormComponent {
    export interface IProps {
        onSubmit: (data: any) => Promise<void>;
        submitActive: boolean;
        defaultValues?: {};
        children?: ReactNode;
        fieldChange?: { [x: string]: any; }
    }
}

export { IFormComponent };