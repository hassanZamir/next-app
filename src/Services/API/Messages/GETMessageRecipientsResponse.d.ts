export type MESSAGE_RECIPIENT = {
    id: number,
    name: string,
    userName: string,
    profileImageUrl: string
}

export interface GETMessageRecipientsResponse {
    status: boolean,
    response: MESSAGE_RECIPIENT[]
}