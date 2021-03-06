import { deprecate } from "util"

export interface CONVERSATION_TEXT_MESSAGE {
    conversationId: number,
    id: number,
    message: string,
    /**
    * @deprecated Use `recipientUsername` instead.
    */
    recipientId: number,
    recipientUsername?: string,
    /**
    * @deprecated Use `senderUsername` instead.
    */
    senderId: number,
    senderUsername?: string
    sentAt: string
    type: number
}

export interface MEDIA_MESSAGE {
    url: string,
    thumbnailUrl: string,
    media_type: string,

    type: string,
}
export interface CONVERSATION_MEDIA_MESSAGE extends CONVERSATION_TEXT_MESSAGE {
    meta: {
        media_urls: MEDIA_MESSAGE[],
        purchase_status: boolean,
        amount: number,
        view_status: boolean
    }
}

export interface TIP_MESSAGE {
    amount: number,
    tipMsg: string,
    tipId: number,
    userId: number
}
export interface CONVERSATION_TIP_MESSAGE extends CONVERSATION_TEXT_MESSAGE {
    meta: TIP_MESSAGE
}

export interface CONVERSATION_RESPONSE extends CONVERSATION_TEXT_MESSAGE {
    meta?: TIP_MESSAGE | {
        media_urls: MEDIA_MESSAGE[],
        purchase_status: boolean,
        amount: number
    }
}
// export interface CONVERSATION_RESPONSE extends CONVERSATION_TEXT_MESSAGE extends CONVERSATION_MEDIA_MESSAGE extends CONVERSATION_TIP_MESSAGE {}

export interface GETConversationResponse {
    status: boolean,
    response: CONVERSATION_RESPONSE[]
}
