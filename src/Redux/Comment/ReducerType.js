import { CREATE_COMMENT, GET_POST_COMMENT, LIKE_COMMENT, UNLIKE_COMMENT } from "./ActionType";

const initialvalue = {
    createdComment: null,
    postComment: null,
    likeComment: null,
    unlikeComment: null,
};

export const CommentReducer = (store = initialvalue, { type, payload }) => {
    switch (type) {
        case CREATE_COMMENT:
            return { ...store, createdComment: payload };
        case GET_POST_COMMENT:
            return { ...store, postComment: payload };
        case LIKE_COMMENT:
            return { ...store, likeComment: payload };
        case UNLIKE_COMMENT:
            return { ...store, unlikeComment: payload };
        default:
            return store; 
    }
};
