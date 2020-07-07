// #region Local Imports
import { Http } from "@Services";
// #endregion Local Imports

// #region Interface Imports
import { FeedsModel } from "@Interfaces";
// #endregion Interface Imports

export const FeedsService = {
    GetAllFeeds: async (
        payload: FeedsModel.GetAllFeedsPayload
    ): Promise<FeedsModel.GetAllFeedsResponse> => {
        let response: FeedsModel.GetAllFeedsResponse

        try {
            response = await Http.Request<FeedsModel.GetAllFeedsResponse>(
                "GET",
                "/user/feeds",
                undefined
            );
            // localStorage.setItem("user", response.status);
        } catch (error) {
            response = {
                status: "false",
                feeds: [{
                    title: "Taking the Ride in Brant Beach",
                    username: "Keavas11110",
                    likes: 30,
                    time: "2h ago",
                    comments: 50,
                    imageUrl: "/images/photo@2x.png"
                }, {
                    title: "Taking the Ride in Brant Beach",
                    username: "Keavas11110",
                    likes: 30,
                    time: "2h ago",
                    comments: 50,
                    imageUrl: "/images/photo@2x.png"
                }, {
                    title: "Taking the Ride in Brant Beach",
                    username: "Keavas11110",
                    likes: 30,
                    time: "2h ago",
                    comments: 50,
                    imageUrl: "/images/photo@2x.png"
                }, {
                    title: "Taking the Ride in Brant Beach",
                    username: "Keavas11110",
                    likes: 30,
                    time: "2h ago",
                    comments: 50,
                    imageUrl: "/images/photo@2x.png"
                }],
                errors: "Something went wrong"
            };
        }
        return response;
    }
};
