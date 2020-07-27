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
        ProfilesSuggestionSuccess: "ProfilesSuggestionSuccess",
        ProfilesSuggestionError: "ProfilesSuggestionError"
    },
    CreatorProfile: {
        GetCreatorProfileSuccess: "GetCreatorProfileSuccess",
        GetCreatorProfileError: "GetCreatorProfileError",
        GetCreatorFeedsSuccess: "GetCreatorFeedsSuccess",
        GetCreatorFeedsError: "GetCreatorFeedsError",
        GetProfileFollowersSuccess: "GetProfileFollowersSuccess",
        GetProfileFollowersError: "GetProfileFollowersError"
    },
    Status: {
        GetAllCommentsSuccess: "GetAllCommentsSuccess",
        GetAllCommentsError: "GetAllCommentsError",
        PostCommentSuccess: "PostCommentSuccess",
        PostCommentError: "PostCommentError",
        LikeCommentSuccess: "LikeCommentSuccess",
        LikeCommentError: "LikeCommentError"
    },
    Payment: {
        GetPaymentSettingsSuccess: "GetPaymentSettingsSuccess",
        GetPaymentSettingsError: "GetPaymentSettingsError",
        AddCardSuccess: "AddCardSuccess",
        AddCardError: "AddCardError",
        UpdatePaymentInfoInSession: "UpdatePaymentInfoInSession"
    }
};
