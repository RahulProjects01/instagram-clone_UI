import { CREATE_NEW_POST, DELETE_POST, GET_SINGLE_POST, GET_USER_POST, LIKE_POST, SAVE_POST, UNLIKE_POST, UNSAVE_POST } from "./ActionType";

const initialvalue = {
    createdPost: null,
    usersPost: [],
    deletedpost: null,
    likePost: null,
    unlikepost: null,
    savedpost: null,
    unsavedPost: null,
    singlePost: null,
};

export const PostReducer = (store = initialvalue, { type, payload }) => {
    switch (type) {
        case CREATE_NEW_POST:
            return { ...store, createdPost: payload };
        case GET_USER_POST:
            return { ...store, usersPost: payload };
        case DELETE_POST:
            return { ...store, deletedpost: payload };
        case LIKE_POST:
            return { ...store, likePost: payload };
        case UNLIKE_POST:
            return { ...store, unlikepost: payload };
        case SAVE_POST:
            return { ...store, savedpost: payload };
        case UNSAVE_POST:
            return { ...store, unsavedPost: payload };
        case GET_SINGLE_POST:
            return { ...store, singlePost: payload };
        default:
            return store; // Return the current state if no action matches
    }
};
