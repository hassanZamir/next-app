export const ActionConsts = {
    Home: {
        ResetReducer: "Home_ResetReducer",
        SetReducer: "Home_SetReducer",
    },
    Login: {
        SetUserPayload: "SetUserPayload",
        SetLoginError: "SetLoginError"
    },
    SignUp: {
        SignUpSuccess: "SignUpSuccess",
        SignUpError: "SignUpError",
        SignUpFieldAvailaible: "SignUpFieldAvailaible",
        SignUpFieldNotAvailaible: "SignUpFieldNotAvailaible"
    },
    Feeds: {
        GetAllFeedsSuccess: "GetAllFeedsSuccess",
        GetAllFeedsError: "GetAllFeedsError"
    },
    CreatorProfile: {
        GetCreatorProfileSuccess: "GetCreatorProfileSuccess",
        GetCreatorProfileError: "GetCreatorProfileError",
        GetCreatorFeedsSuccess: "GetCreatorFeedsSuccess",
        GetCreatorFeedsError: "GetCreatorFeedsError"
    }
};
