export const ActionConsts = {
    Home: {
        ResetReducer: "Home_ResetReducer",
        SetReducer: "Home_SetReducer",
    },
    Login: {
        SetUserPayload: "SetUserPayload",
        SetLoginError: "SetLoginError",
        GetCreatorProfileSuccess: "GetCreatorProfileSuccess",
        GetCreatorProfileError: "GetCreatorProfileError",
        SendResetPasswordEmailSuccess: "SendResetPasswordEmailSuccess",
        SendResetPasswordEmailError: "SendResetPasswordEmailError",
        ChangePasswordSuccess: "ChangePasswordSuccess",
        ChangePasswordError: "ChangePasswordError",
        DoLogout: "DoLogout",
        onCloseResetPasswordModal: "onCloseResetPasswordModal",

        ReloadPage: "ReloadPage",
        UpdateSession: "UpdateSession",
        ClearSession: "ClearSession"
    },
    SignUp: {
        SignUpSuccess: "SignUpSuccess",
        SignUpError: "SignUpError",
        SignUpFieldAvailaible: "SignUpFieldAvailaible",
        SignUpFieldNotAvailaible: "SignUpFieldNotAvailaible",
    },
    AccountVerify: {
        AccountVerifySuccess: "AccountVerifySuccess",
        AccountVerifyError: "AccountVerifyError",
        SetLoading: "SetLoading",
    },
    Feeds: {
        GetAllFeedsSuccess: "GetAllFeedsSuccess",
        GetAllFeedsError: "GetAllFeedsError",
        LikeFeedError: "LikeFeedError",
        LikeFeedSuccess: "LikeFeedSuccess",
        SetPersistFeed: "SetPersistFeed",
        SetPolledPersistFeed: "SetPolledPersistFeed",
        ClearPersistFeed: "ClearPersistFeed",
        ProfilesSuggestionSuccess: "ProfilesSuggestionSuccess",
        ProfilesSuggestionError: "ProfilesSuggestionError",
        PostContentSuccess: "PostContentSuccess",
        PostContentError: "PostContentError",
        UploadMediaError: "UploadMediaError",
    },
    CreatorProfile: {
        GetCreatorProfileSuccess: "GetCreatorProfileSuccess",
        GetCreatorProfileError: "GetCreatorProfileError",
        GetCreatorFeedsSuccess: "GetCreatorFeedsSuccess",
        GetCreatorFeedsError: "GetCreatorFeedsError",
        GetProfileFollowersSuccess: "GetProfileFollowersSuccess",
        GetProfileFollowersError: "GetProfileFollowersError",
        GetMediaGallarySuccess: "GetMediaGallarySuccess",
        GetMediaGallaryError: "GetMediaGallaryError",
        TabChanged: "TabChanged",
        CheckUserFollowingPending: "CheckUserFollowingPending",
        CheckUserFollowingSuccess: "CheckUserFollowingSuccess",
        CheckUserFollowingError: "CheckUserFollowingError",
        GetUserCreatorProfileSuccess: "GetUserCreatorProfileSuccess",
        GetUserCreatorProfileError: "GetUserCreatorProfileError",
        SetProfileFetching: "SetProfileFetching"
    },
    Status: {
        GetAllCommentsSuccess: "GetAllCommentsSuccess",
        GetAllCommentsError: "GetAllCommentsError",
        PostCommentSuccess: "PostCommentSuccess",
        PostCommentError: "PostCommentError",
        LikeCommentSuccess: "LikeCommentSuccess",
        LikeCommentError: "LikeCommentError",
        UpdatePersistFeedCommentCount: "UpdatePersistFeedCommentCount",
    },
    Payment: {
        GetPaymentSettingsSuccess: "GetPaymentSettingsSuccess",
        GetPaymentSettingsError: "GetPaymentSettingsError",
        AddCardSuccess: "AddCardSuccess",
        AddCardError: "AddCardError",
        UpdatePaymentInfoInSession: "UpdatePaymentInfoInSession",
        OnModalClosePaymentSettings: "OnModalClosePaymentSettings",
        UpdatePaymentSettingsSuccess: "UpdatePaymentSettingsSuccess",
        UpdatePaymentSettingsError: "UpdatePaymentSettingsError",
        AddFundsToWalletSuccess: "AddFundsToWalletSuccess",
        AddFundsToWalletError: "AddFundsToWalletError",
        OnBecomeCreatorSuccess: "OnBecomeCreatorSuccess",
        OnBecomeCreatorError: "OnBecomeCreatorError",
    },
    BankingInfo: {
        VerificationStatusUpdated: "VerificationStatusUpdated",

        GetUserProfileSuccess: "GetUserProfileSuccess",
        GetUserProfileError: "GetUserProfileError",
        UploadProfileImagesError: "UploadProfileImagesError",
        UpdateUserProfileSuccess: "UpdateUserProfileSuccess",
        UpdateUserProfileError: "UpdateUserProfileError",
        PostBankingInfoSuccess: "PostBankingInfoSuccess",
        PostBankingInfoError: "PostBankingInfoError",
        GetBankingInfoSuccess: "GetBankingInfoSuccess",
        GetBankingInfoError: "GetBankingInfoError",
    },
    Settings: {
        GetUserProfileSuccess: "GetUserProfileSuccess",
        GetUserProfileError: "GetUserProfileError",
        UploadProfileImagesError: "UploadProfileImagesError",
        UpdateUserProfileSuccess: "UpdateUserProfileSuccess",
        UpdateUserProfileError: "UpdateUserProfileError",
        PostBankingInfoSuccess: "PostBankingInfoSuccess",
        PostBankingInfoError: "PostBankingInfoError",
        GetBankingInfoSuccess: "GetBankingInfoSuccess",
        GetBankingInfoError: "GetBankingInfoError",
        DeleteAccountSuccess: "DeleteAccountSuccess",
        DeleteAccountError: "DeleteAccountError",
    },
    FollowersInfo: {
        GetFollowersInfoSuccess: "GetFollowersInfoSuccess",
        GetFollowersInfoError: "GetFollowersInfoError",
        RestrictFollowerSuccess: "RestrictFollowerSuccess",
        RestrictFollowerError: "RestrictFollowerError",
        UnRestrictFollowerSuccess: "UnRestrictFollowerSuccess",
        UnRestrictFollowerError: "UnRestrictFollowerError",
        BlockedFollowerSuccess: "BlockedFollowerSuccess",
        BlockedFollowerError: "BlockedFollowerError",
        UnBlockedFollowerSuccess: "UnBlockedFollowerSuccess",
        UnBlockedFollowerError: "UnBlockedFollowerError",
        FavouriteFollowerSuccess: "FavouriteFollowerSuccess",
        FavouriteFollowerError: "FavouriteFollowerError",
    },
    FollowingInfo: {
        GetFollowingInfoSuccess: "GetFollowingInfoSuccess",
        GetFollowingInfoError: "GetFollowingInfoError",
        PutRecurringSuccess: "PutRecurringSuccess",
        PutRecurringError: "PutRecurringError",
    },
    Notifications: {
        AddPusherNotificationToList: "AddPusherNotificationToList",
        PusherNotificationRecieved: "PusherNotificationRecieved",
        GetNotifiactionStatsSuccess: "GetNotifiactionStatsSuccess",
        GetNotifiactionStatsError: "GetNotifiactionStatsError",
        GetNotifiactionsSuccess: "GetNotifiactionsSuccess",
        GetNotifiactionsError: "GetNotifiactionsError",
        SeenNotifiactionSuccess: "SeenNotifiactionSuccess",
        SeenNotifiactionError: "SeenNotifiactionError",
        ViewNotificationsSuccess: "ViewNotificationsSuccess",
        ViewNotificationsError: "ViewNotificationsError",
    },
    Messages: {
        GetAllMessagesSuccess: "GetAllMessagesSuccess",
        GetAllMessagesError: "GetAllMessagesError",
        GetMessagesRecipientsSuccess: "GetMessagesRecipientsSuccess",
        GetMessagesRecipientsError: "GetMessagesRecipientsError",
        SetActiveConversationSuccess: "SetActiveConversationSuccess",
        SetActiveConversationError: "SetActiveConversationError",
        NewConversationRecieved: "NewConversationRecieved",
        SerachMessagesSuccess: "SerachMessagesSuccess",
        SerachMessagesError: "SerachMessagesError",
        ClearSearch: "ClearSearch",
    },
    Conversation: {
        PusherMessageRecieved: "PusherMessageRecieved",
        GetConversationSuccess: "GetConversationSuccess",
        GetConversationError: "GetConversationError",
        CreateMessageSuccess: "CreateMessageSuccess",
        CreateMessageError: "CreateMessageError",
        ConversationSeenSuccess: "ConversationSeenSuccess",
        BuyMessageSuccess: "BuyMessageSuccess",
        BuyMessageError: "BuyMessageError",
        UpdateMessageSettingSuccess: "UpdateMessageSettingSuccess",
        UpdateMessageSettingError: "UpdateMessageSettingError",
        UpdateViewStatusSuccess: "UpdateViewStatusSuccess",
        UpdateViewStatusError: "UpdateViewStatusError",
    },
};
