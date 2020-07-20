// #region Global Imports
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faPaperPlane, faSpinner } from '@fortawesome/free-solid-svg-icons';
// #endregion Global Imports

// #region Local Imports
import { CircularImage, LoadingSpinner } from "@Components";
import { Textarea } from "@Components/Basic";
import { StatusActions } from "@Actions";
import { IStore } from "@Redux/IStore";
import { COMMENT, USER_SESSION } from "@Interfaces";
import { theme } from "@Definitions/Styled";
import { CurrentTimeDifference }from "@Services/Time";
// #endregion Local Imports

const Comment: React.FunctionComponent<{ comment: COMMENT, likeComment: (comment: COMMENT)=>void }> = 
    ({ comment, likeComment }) => {
    return <div className="d-flex px-3 align-items-center my-4 w-100">
        <CircularImage src={comment.profileImageUrl} height="50px" width="50px" border={"1px solid " + theme.colors.primary} />
        <div className="d-flex flex-column pl-2 w-100 justify-content-between">
            <div className="d-flex justify-content-between align-items-center w-100">
                <span className="seoge-ui-bold font-13px text-primary">{ comment.userName }</span>
                <div className="d-flex align-items-center cursor-pointer" onClick={() => { likeComment(comment) }}>
                    <span className="font-13px text-darkGrey mr-1">{ comment.likesCount || 0 }</span>
                    <FontAwesomeIcon icon={faHeart} color={"#A0A0A0"} size="lg" />
                </div>
            </div>
            <span className="font-11px text-darkGrey">{ comment.text }</span>
            <span className="font-11px text-darkGrey">{ CurrentTimeDifference(comment.timeStamp) }</span>
        </div>
    </div>
}

const CommentsList: React.FunctionComponent<{loading: boolean, error: string, comments: COMMENT[], likeComment: (comment: COMMENT)=>void }> = 
    ({ loading, error, comments, likeComment }) => {
    return <div style={{ flex: "1", overflowY: "scroll" }} 
        className={"scroll-y d-flex align-items-center flex-column px-4 border border-top-1 border-right-0 border-left-0 border-bottom-1 border-lightGrey " + (loading ? "justify-content-center" : "")}>
        {loading && <LoadingSpinner size="2x" />}
        
        {!loading && comments.map((comment: COMMENT, i) => {
            return <Comment key={i} comment={comment} likeComment={likeComment} />
        })}
    </div>
}

const PostComment: React.FunctionComponent<{ user: USER_SESSION, contentId: number, error: string }> = 
    ({ user, contentId, error }) => {

    const [comment, setComment] = useState("");
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
        const { value } = e.currentTarget;
        setComment(value);
    }

    const postComment = async () => {
        const params = { contentId: contentId, userId: user.id, commentText: comment };
        setLoading(true);
        await dispatch(StatusActions.PostComment(params))
        setLoading(false);
    }

    return <div className="px-4 d-flex flex-column pb-2 pt-4">
        <div className="d-flex align-items-center justify-content-between">
            <CircularImage src={"https://storage.cricingif.com/cig-live-images/user-images/262319.png"} height="35px" width="35px" />
            <div className="d-flex justify-content-between align-items-center w-100 ml-2">
                <Textarea 
                    placeholder="Type Comment"
                    name="comment" 
                    rows={1} 
                    columns={20} 
                    className="border-primary rounded w-100 font-10px text-lightGrey" 
                    onChange={handleChange}/>
                <div onClick={() => { postComment() }} 
                    className="cursor-pointer ml-2 rounded-circle bg-darkGrey d-flex align-items-center justify-content-center" 
                    style={{ height: "30px", width: "35px" }}>
                    {!loading && <FontAwesomeIcon color="white" icon={faPaperPlane} />}
                    {loading && <FontAwesomeIcon color="white" icon={faSpinner} size="sm" />}
                </div>
            </div>
        </div>
        <span className="text-danger font-12px">{ error }</span>
    </div>
}

export const Comments: React.FunctionComponent<{ contentId: number; user: USER_SESSION }> = 
    ({ contentId, user }) => {
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const statusPage = useSelector((state: IStore) => state.statusPage);
    const { comments, error } = statusPage;
    
    useEffect(() => {
        (async () => {
            const params = { contentId: contentId, pageNo: 0, offset: 7 };
            await dispatch(StatusActions.GetAllComments(params));
            setLoading(false);
        })()
    }, []);

    const likeComment = (comment: COMMENT) => {
        const params = { commentId: comment.id, userId: user.id };
        dispatch(StatusActions.LikeComment(params));
    }

    return (<div style={{ overflow: "auto", flexGrow: "1", minHeight: "0" }}
    className="d-flex flex-column w-100 h-100">
        <CommentsList comments={comments} likeComment={likeComment} loading={loading} error={error} />
        <PostComment user={user} contentId={contentId} error={error} />
    </div>);
}
