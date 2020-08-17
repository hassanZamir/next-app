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
        onCloseResetPasswordModal: "onCloseResetPasswordModal"
    },
    SignUp: {
        SignUpSuccess: "SignUpSuccess",
        SignUpError: "SignUpError",
        SignUpFieldAvailaible: "SignUpFieldAvailaible",
        SignUpFieldNotAvailaible: "SignUpFieldNotAvailaible"
    },
    AccountVerify: {
        AccountVerifySuccess: "AccountVerifySuccess",
        AccountVerifyError: "AccountVerifyError",
        SetLoading: "SetLoading"
    },
    Feeds: {
        GetAllFeedsSuccess: "GetAllFeedsSuccess",
        GetAllFeedsError: "GetAllFeedsError",
        LikeFeedError: "LikeFeedError",
        LikeFeedSuccess: "LikeFeedSuccess",
        SetPersistFeed: "SetPersistFeed",
        ClearPersistFeed: "ClearPersistFeed",
        ProfilesSuggestionSuccess: "ProfilesSuggestionSuccess",
        ProfilesSuggestionError: "ProfilesSuggestionError",
        PostContentSuccess: "PostContentSuccess",
        PostContentError: "PostContentError",
        UploadMediaError: "UploadMediaError"
    },
    CreatorProfile: {
        GetCreatorProfileSuccess: "GetCreatorProfileSuccess",
        GetCreatorProfileError: "GetCreatorProfileError",
        GetCreatorFeedsSuccess: "GetCreatorFeedsSuccess",
        GetCreatorFeedsError: "GetCreatorFeedsError",
        GetProfileFollowersSuccess: "GetProfileFollowersSuccess",
        GetProfileFollowersError: "GetProfileFollowersError",
        GetMediaGallarySuccess: "GetMediaGallarySuccess",
        GetMediaGallaryError: "GetMediaGallaryError"
    },
    Status: {
        GetAllCommentsSuccess: "GetAllCommentsSuccess",
        GetAllCommentsError: "GetAllCommentsError",
        PostCommentSuccess: "PostCommentSuccess",
        PostCommentError: "PostCommentError",
        LikeCommentSuccess: "LikeCommentSuccess",
        LikeCommentError: "LikeCommentError",
        UpdatePersistFeedCommentCount: "UpdatePersistFeedCommentCount"
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
        GetUserProfileSuccess: "GetUserProfileSuccess",
        GetUserProfileError: "GetUserProfileError",
        UploadProfileImagesError: "UploadProfileImagesError",
        UpdateUserProfileSuccess: "UpdateUserProfileSuccess",
        UpdateUserProfileError: "UpdateUserProfileError",
        PostBankingInfoSuccess: "PostBankingInfoSuccess",
        PostBankingInfoError: "PostBankingInfoError",
        GetBankingInfoSuccess: "GetBankingInfoSuccess",
        GetBankingInfoError: "GetBankingInfoError"
    }
};
