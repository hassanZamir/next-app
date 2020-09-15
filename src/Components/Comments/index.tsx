// #region Global Imports
import React, { useEffect, useState, useRef, RefObject } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faPaperPlane, faSpinner } from '@fortawesome/free-solid-svg-icons';
// #endregion Global Imports

// #region Local Imports
import { CircularImage, LoadingSpinner } from "@Components";
import { Textarea } from "@Components/Basic";
import { StatusActions } from "@Actions";
import { IStore } from "@Redux/IStore";
import { COMMENT, USER_SESSION, IStatusPage } from "@Interfaces";
import { theme } from "@Definitions/Styled";
import { CurrentTimeDifference }from "@Services/Time";
import Link from "next/link";
// #endregion Local Imports

const Comment: React.FunctionComponent<{ comment: COMMENT, likeComment: (comment: COMMENT)=>void, commentsListRef: any}> = 
    ({ comment, likeComment, commentsListRef }) => {
    
    return <div style={{ minHeight: "50px" }} className="d-flex px-3 align-items-center my-4 w-100" ref={commentsListRef}>
        <CircularImage src={[comment.profileImageUrl, '/images/profile_image_placeholder.jpg']} height="50px" width="50px" border={"1px solid " + theme.colors.primary} />
        <div className="d-flex flex-column pl-2 w-100 justify-content-between">
            <div className="d-flex justify-content-between align-items-center w-100">
                <Link href={"/profile/" + comment.userName}>
                    <a className="seoge-ui-bold font-13px text-primary cursor-pointer">{ comment.userName }</a>
                </Link>
                <div className="d-flex align-items-center">
                    <div className="d-flex align-items-center cursor-pointer mr-1" onClick={() => { likeComment(comment) }}>
                        <span className="font-13px text-darkGrey mr-1">{ comment.likesCount || 0 }</span>
                        <FontAwesomeIcon icon={faHeart} color={comment.content_viewer_like ? "#F57B52" : "#A0A0A0"} size="lg" />
                    </div>
                    <div style={{ minWidth: "20px", minHeight: "20px" }}>
                        {comment.isTipComment && <img src="/images/money_copy@2x.png" 
                            height="20px" width="20px" />}
                    </div>
                </div>
            </div>
            <div className="font-13px text-darkGrey">{ comment.text }</div>
            <div className="font-11px text-darkGrey">{ CurrentTimeDifference(comment.timeStamp) }</div>
        </div>
    </div>
}

const CommentsList: React.FunctionComponent<{onSeeLatestComments: ()=>void; scrolledToTop: boolean; commentsCount: number; onScroll: any; viewAllComments: boolean; setViewAllComments: (a: boolean)=>void; onViewAllComments: ()=>void; commentsListRef: RefObject<HTMLDivElement>, loading: boolean, error: string, comments: COMMENT[], likeComment: (comment: COMMENT)=>void }> = 
    ({ onSeeLatestComments, scrolledToTop, commentsCount, loading, error, comments, likeComment, commentsListRef, onViewAllComments, viewAllComments, setViewAllComments, onScroll }) => {
    
    const [defaultCommentsCount, setDefaultCommentCount] = useState(commentsCount);
    const [scrollingTop, setScrollingTop] = useState(false);
    const [showSeeAllComments, setShowSeeAllComments] = useState(false);

    useEffect(() => {
        if (commentsCount > defaultCommentsCount) setShowSeeAllComments(true);
        else setShowSeeAllComments(false);
    }, [commentsCount]);
    
    return <div onScroll={(e: any)=> {
            const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight
            !bottom ? setScrollingTop(true) : setScrollingTop(false); 
            onScroll(e);
        }}
        style={{ flex: "1", overflowY: "scroll" }} 
        className={"scroll-y d-flex align-items-center flex-column px-4 border border-top-1 border-right-0 border-left-0 border-bottom-1 border-lightGrey " + (loading ? "justify-content-center" : "")}>
        {loading && <LoadingSpinner size="2x" />}
        {!viewAllComments && !loading && commentsCount > 6 && scrollingTop && <div onClick={()=>{ setViewAllComments(true); setShowSeeAllComments(false); onViewAllComments() }} 
            className="px-3 py-2 bg-primary text-white font-12px mt-2 text-underline cursor-pointer"
            style={{ 
                position: scrolledToTop ? "initial" : "absolute",
                borderRadius: "7px", top: "5px" 
            }}>
            Load Previous Comments
        </div>}
        {!loading && comments.map((comment: COMMENT, i) => {
            return <Comment key={i} comment={comment} likeComment={likeComment} commentsListRef={i >= comments.length - 1 ? commentsListRef : null} />
        })}
        {viewAllComments && !loading && showSeeAllComments && <div onClick={()=>{ setViewAllComments(false); onSeeLatestComments() }} 
            className="px-3 py-2 bg-primary text-white font-12px mt-2 text-underline cursor-pointer"
            style={{ 
                position: "absolute",
                borderRadius: "7px", bottom: "75px" 
            }}>
            See New Comments
        </div>}
    </div>
}

const PostComment: React.FunctionComponent<{ user: USER_SESSION, contentId: number, error: string, onSuccess: ()=>void }> = 
    ({ user, contentId, error, onSuccess }) => {

    const [comment, setComment] = useState("");
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
        const { value } = e.currentTarget;
        setComment(value);
    }

    const postComment = async () => {
        if (comment) {
            const params = { contentId: contentId, userId: user.id, commentText: comment };
            setLoading(true);
            await dispatch(StatusActions.PostComment(params))
            setLoading(false);
            setComment('');
            onSuccess();
        }
    }

    return <div className="px-4 d-flex flex-column pb-2 pt-4">
        <div className="d-flex align-items-center justify-content-between">
            <CircularImage src={[user.profileImageUrl, '/images/profile_image_placeholder.jpg']} height="35px" width="35px" />
            <div className="d-flex justify-content-between align-items-center w-100 ml-2">
                <Textarea 
                    placeholder="Type Comment"
                    name="comment" 
                    rows={1} 
                    columns={20} 
                    className="border-primary rounded w-100 font-10px text-lightGrey" 
                    onChange={handleChange}
                    value={comment}/>
                <div onClick={() => { postComment() }} 
                    className={"cursor-pointer ml-2 rounded-circle d-flex align-items-center justify-content-center " + (loading || comment === '' ? "bg-darkGrey" : "bg-primary")}
                    style={{ height: "30px", width: "35px" }}>
                    {!loading && <FontAwesomeIcon color="white" icon={faPaperPlane} />}
                    {loading && <FontAwesomeIcon color="white" icon={faSpinner} size="sm" />}
                </div>
            </div>
        </div>
        <span className="text-danger font-12px">{ error }</span>
    </div>
}

export const Comments: React.FunctionComponent<{ contentId: number; user: USER_SESSION, commentsCount: number }> = 
    ({ contentId, user, commentsCount }) => {

    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const statusPage = useSelector((state: IStore) => state.statusPage);
    const { comments, error } = statusPage;
    const commentsListRef:RefObject<HTMLDivElement> = useRef(null);
    const [viewAllComments, setViewAllComments] = useState(false);
    const [scrolledToTop, setScrolledToTop] = useState(false);
    const [paginationPageNo, setPaginationPageNo] = useState(0);

    useEffect(() => {
        onSeeLatestComments();
    }, []);

    const onSeeLatestComments = async () => {
        const params = {
            contentId: contentId, 
            pageNo: 0, 
            offset: 7, 
            userId: user ? user.id : 0,
            sort: 'desc'
        };
        await getComments(params);
        setLoading(false);
        scrollToLastComment();
    }

    const trackScrolling = async (e: any) => {
        const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
        const top = e.target.scrollTop <= 10;
        if (bottom && viewAllComments) {
            const params = {
                contentId: contentId, 
                pageNo: paginationPageNo, 
                offset: 7, 
                userId: user ? user.id : 0,
                sort: 'asc'
            };
            await getComments(params);
            setPaginationPageNo(paginationPageNo+1)
        }
        if (top && !viewAllComments) {
            setScrolledToTop(true);
        } else {
            setScrolledToTop(false);
        }
    }

    const getComments = async(params: IStatusPage.Actions.IGetAllCommentsPayload) => {
        await dispatch(StatusActions.GetComments(params));
    };

    const scrollToLastComment = () => {
        commentsListRef.current && commentsListRef.current!.scrollIntoView({behavior: "smooth"});
    }

    const onViewAllComments = async () => {
        setLoading(true);
        const params = {
            contentId: contentId, 
            pageNo: 0, 
            offset: 7, 
            userId: user ? user.id : 0,
            sort: 'asc'
        };
        await getComments(params);
        setPaginationPageNo(1);
        setLoading(false);
    }
    
    const likeComment = (comment: COMMENT) => {
        const params = { commentId: comment.id, userId: user.id };
        if (!comment.content_viewer_like) {
            dispatch(StatusActions.LikeComment(params));
        } else {
            dispatch(StatusActions.UnLikeComment(params));
        }
    }

    return (<div className="position-relative full-flex-scroll d-flex flex-column w-100 h-100">
        <CommentsList 
            commentsListRef={commentsListRef}
            comments={comments} 
            likeComment={likeComment} 
            loading={loading} 
            error={error} 
            onViewAllComments={onViewAllComments} 
            viewAllComments={viewAllComments}
            setViewAllComments={setViewAllComments} 
            onScroll={trackScrolling}
            commentsCount={commentsCount} 
            scrolledToTop={scrolledToTop}
            onSeeLatestComments={onSeeLatestComments} />
        <PostComment 
            user={user} 
            contentId={contentId} 
            error={error} 
            onSuccess={scrollToLastComment} />
    </div>);
}
