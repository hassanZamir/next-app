declare namespace HttpModel {
    export interface IRequestPayload {
        [key: string]: {};
        [key?: string]: {
            [key?: string]: {};
        };
    }

    export interface IRequestQueryPayload {
        [key: string]: {};
    }
}

export { HttpModel };
