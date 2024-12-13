import {
    CREATE_NEW_POST,
    DELETE_POST,
    GET_SINGLE_POST,
    GET_USER_POST,
    LIKE_POST,
    REQ_USER_POST,
    SAVE_POST,
    UNLIKE_POST,
    UNSAVE_POST,
  } from "./ActionType";
  
  const BASE_API = "http://localhost:8080/api";
  
  // Helper function to handle the fetch logic
  const handleFetch = async (url, options, successType, dispatch) => {
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log(`${successType} Response: `, data);
      dispatch({ type: successType, payload: data });
    } catch (error) {
      console.error(`${successType} Error: `, error);
    }
  };
  
  // Helper function to check if JWT is available
  const checkJwt = (data) => {
    if (!data.jwt) {
      console.error("JWT token is missing");
      return false;
    }
    return true;
  };
  
  export const createPostAction = (data) => async (dispatch) => {
    if (!checkJwt(data)) return;
    const url = `${BASE_API}/posts/create`;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${data.jwt}`,
      },
      body: JSON.stringify(data.data),
    };
    await handleFetch(url, options, CREATE_NEW_POST, dispatch);
  };
  
  export const findUserPostAction = (data) => async (dispatch) => {
    if (!data.jwt) {
      console.error('JWT token is missing');
      return;
    }
    const url = `${BASE_API}/posts/following/${data.userIds}`;
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${data.jwt}`,
      },
    };
    await handleFetch(url, options, GET_USER_POST, dispatch);
  };
  
  
  export const reqUserPostAction = (data) => async (dispatch) => {
    if (!checkJwt(data)) return;
    const url = `${BASE_API}/posts/following/${data.userId}`;
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${data.jwt}`,
      },
    };
    await handleFetch(url, options, REQ_USER_POST, dispatch);
  };
  
  export const likePostAction = (data) => async (dispatch) => {
    if (!checkJwt(data)) return;
    const url = `${BASE_API}/posts/like/${data.postId}`;
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${data.jwt}`,
      },
    };
    await handleFetch(url, options, LIKE_POST, dispatch);
  };
  
  export const unLikePostAction = (data) => async (dispatch) => {
    if (!checkJwt(data)) return;
    const url = `${BASE_API}/posts/unlike/${data.postId}`;
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${data.jwt}`,
      },
    };
    await handleFetch(url, options, UNLIKE_POST, dispatch);
  };
  
  export const savePostAction = (data) => async (dispatch) => {
    if (!checkJwt(data)) return;
    const url = `${BASE_API}/posts/save_post/${data.postId}`;
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${data.jwt}`,
      },
    };
    await handleFetch(url, options, SAVE_POST, dispatch);
  };
  
  export const unSavePostAction = (data) => async (dispatch) => {
    if (!checkJwt(data)) return;
    const url = `${BASE_API}/posts/unsave_post/${data.postId}`;
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${data.jwt}`,
      },
    };
    await handleFetch(url, options, UNSAVE_POST, dispatch);
  };
  
  export const findPostByIdAction = (data) => async (dispatch) => {
    if (!checkJwt(data)) return;
    const url = `${BASE_API}/posts/${data.postId}`;
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${data.jwt}`,
      },
    };
    await handleFetch(url, options, GET_SINGLE_POST, dispatch);
  };
  
  export const deletePostAction = (data) => async (dispatch) => {
    if (!checkJwt(data)) return;
    const url = `${BASE_API}/posts/delete/${data.postId}`;
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${data.jwt}`,
      },
    };
    await handleFetch(url, options, DELETE_POST, dispatch);
  };
  