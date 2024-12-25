import { FOLLOW_USER, GET_USER_BY_IDS, GET_USER_BY_USERNAME, REQ_USER, SEARCH_USER, UNFOLLOW_USER, UPDATE_USER } from "./ActionType";
const BASE_API = "http://localhost:8080/api";

export const getUserProfileAction = (jwt) => async (dispatch) => {
    try {
        if (!jwt) {
            throw new Error("JWT token is missing!");
        }

        const res = await fetch(`${BASE_API}/users/req`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + jwt
            }
        });

        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }

        // Check for empty response
        const text = await res.text();
        const reqUser = text ? JSON.parse(text) : {}; // Parse only if content exists

        dispatch({ type: REQ_USER, payload: reqUser });
    } catch (error) {
        console.error("Error fetching user profile:", error.message);
        dispatch({ type: 'REQ_USER_ERROR', payload: error.message });
    }
};


export const findUserByUserNameAction = (data) => async (dispatch) => {
    try {
        const jwt = data.jwt || localStorage.getItem("token"); // Fallback for JWT
        if (!data.username || !jwt) {
            throw new Error("Username or JWT token is missing!");
        }

        const res = await fetch(`${BASE_API}/users/username/${data.username}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + jwt
            }
        });

        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }

        // Handle empty response
        const text = await res.text();
        const user = text ? JSON.parse(text) : {};
        dispatch({ type: GET_USER_BY_USERNAME, payload: user });
    } catch (error) {
        console.error("Error fetching user by username:", error.message);
    }
};



export const findUserByUserIdsAction = (data) => async (dispatch) => {

    const res = await fetch(`${BASE_API}/users/m/${data.userIds}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + data.jwt
        }
    });

    const users = await res.json();
    console.log("find by userIds: ", users);
    dispatch({ type: GET_USER_BY_IDS, payload: users });
}




export const followUserAction = (data) => async (dispatch) => {
    try {
        if (!data.userId || !data.jwt) {
            throw new Error("User ID or JWT token is missing!");
        }

        const res = await fetch(`${BASE_API}/users/follow/${data.userId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + data.jwt
            }
        });

        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const text = await res.text();
        const user = text ? JSON.parse(text) : {};
        dispatch({ type: FOLLOW_USER, payload: user });
    } catch (error) {
        console.error("Error following user:", error.message);
    }
};



export const unFollowUserAction = (data) => async (dispatch) => {

    const res = await fetch(`${BASE_API}/users/unfollow/${data.userId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + data.jwt
        }
    });

    const user = await res.json();
    console.log("unFollow user: ", user);
    dispatch({ type: UNFOLLOW_USER, payload: user });
}


export const searchUserAction = (data) => async (dispatch) => {

    try {
        const res = await fetch(`${BASE_API}/users/search?q=/${data.query}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + data.jwt
            }
        });

        const user = await res.json();
        console.log("Search user: ", user);
        dispatch({ type: SEARCH_USER, payload: user });
    } catch (error) {
        console.log("catch error: ", error);
    }
}


export const editUserAction = (data) => async (dispatch) => {
    try {
        const token = localStorage.getItem("token"); // Retrieve token
        const res = await fetch(`${BASE_API}/users/account/edit`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token // Use token directly
            },
            body: JSON.stringify(data) // Send complete data
        });

        console.log("Response Status:", res.status);
        console.log("Response Headers:", res.headers);

        // Handle error responses
        if (!res.ok) {
            const errorText = await res.text(); // Read error text
            throw new Error(`Error ${res.status}: ${errorText}`); // Throw error
        }

        // Parse JSON only if content exists
        const user = res.status !== 204 ? await res.json() : {};
        console.log("Edited user: ", user);

        dispatch({ type: UPDATE_USER, payload: user });

    } catch (error) {
        console.log("catch error: ", error.message); // Log error message
    }
};
