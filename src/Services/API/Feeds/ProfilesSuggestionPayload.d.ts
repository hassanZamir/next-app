export interface ProfilesSuggestionPayload {
    viewerId: number;
    page?: number;
    offset?: number;
    filter?: number;
    authtoken: string;
}