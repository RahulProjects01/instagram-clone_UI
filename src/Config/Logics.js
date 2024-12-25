
export const isPostLikedByUser = (post, userId) => {
    for (let item of post.likedByUsers) {
        if (item.id === userId) {
            return true;
        }
    }
    return false;
}


export const isCommentLikedByUser  = (comment, userId) => {
    const likedByUsers = Array.isArray(comment.likedByUsers) ? comment.likedByUsers : [];
    for (let item of likedByUsers) {
        if (item.id === userId) {
            return true; 
        }
    }
    return false; 
};



export const isSavedPost = (user, postId) => {
    for (let item of user.savedPost) {
        if (item.id === postId) {
            return true;
        }
    }
    return false;
}

export const isReqUser= (userId1, userId2) => {
    if(userId1 && userId2) {
        return userId1 === userId2;
    }
}

export const isFollowing = (reqUser, user2) => {

    if (reqUser && user2) {
        for (let item of user2.follower) {
            if (reqUser.id === item.id) {
                return true;
            }
        }
    }
    return false;
}


export const timeDifference = (timestamp) => {

    const date = new Date(timestamp);
    const diff = Date.now() - date.getTime();
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hourse = Math.floor(minutes / 60);
    const days = Math.floor(hourse / 24);
    const weeks = Math.floor(days / 7);

    if (weeks > 0) {
        return weeks + " week" + (weeks === 1 ? "" : "s") + " ago";
    }
    else if (days > 0) {
        return days + " day" + (days === 1 ? "" : "s") + " ago";
    }
    else if (hourse > 0) {
        return hourse + " hours" + (hourse === 1 ? "" : "s") + " ago";
    } 
    else if (minutes > 0) {
        return minutes + " minute" + (minutes === 1 ? "" : "s") + " ago";
    }
    else if (seconds > 0) {
        return seconds + " second" + (seconds === 1 ? "" : "s") + " ago";
    }
}