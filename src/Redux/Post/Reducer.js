import { 
    CREATE_NEW_POST, 
    DELETE_POST, 
    GET_SINGLE_POST, 
    GET_USER_POST, 
    LIKE_POST, 
    SAVE_POST, 
    UNLIKE_POST, 
    UNSAVE_POST 
} from "./ActionType";

const initialState = {
    createdPost: null,
    usersPost: [],         // Keeps an array of user's posts
    deletedPost: null,     // For the deleted post, handle properly in components
    likePost: null,        // Keep track of liked posts
    unlikePost: null,      // For unlike post tracking
    savedPost: null,       // For saved post tracking
    unsavedPost: null,     // For unsaved post tracking
    singlePost: null,      // For the single post data
};

export const PostReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case CREATE_NEW_POST:
            return { ...state, createdPost: payload };

        case GET_USER_POST:
            console.log("Received payload in reducer:", payload); // Logs the payload for debugging
            return { 
                ...state, 
                usersPost: Array.isArray(payload) ? payload : [] // Ensures payload is an array
            };

        case DELETE_POST:
            return { ...state, deletedPost: payload }; // Handle deleted post

        case LIKE_POST:
            return { ...state, likePost: payload };    // Handle liked post

        case UNLIKE_POST:
            return { ...state, unlikePost: payload };  // Handle unliked post

        case SAVE_POST:
            return { ...state, savedPost: payload };   // Handle saved post

        case UNSAVE_POST:
            return { ...state, unsavedPost: payload }; // Handle unsaved post

        case GET_SINGLE_POST:
            return { ...state, singlePost: payload };  // Handle single post data

        default:
            return state;  // Return the current state by default
    }
};
