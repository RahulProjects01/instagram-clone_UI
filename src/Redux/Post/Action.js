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
const handleFetch = async (url, options, successType, dispatch) => {
  try {
    const response = await fetch(url, options);
    
    // Check if the response is successful (status 200-299)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    // Parse the response as JSON
    const data = await response.json();
    
    // Log the response data for debugging
    console.log(`${successType} Response:`, data);
    
    // Dispatch the action with the payload (data)
    dispatch({ type: successType, payload: data });
    
    return data; // Optionally return the data for further processing if needed
  } catch (error) {
    // Log the error for debugging
    console.error(`${successType} Error:`, error);
    
    // Optionally return the error or an error message to handle it in the calling function
    return null;
  }
};


const checkJwt = (data) => {
  if (!data.jwt) {
    console.error("JWT token is missing");
    return false;
  }
  return true;
};


export const createPostAction = (data) => async (dispatch) => {
  if (!data || !data.jwt || !data.data) {
      console.error("Invalid data payload:", data);
      return;
  }

  const { caption, location, image } = data.data;

  const url = new URL("http://localhost:8080/api/posts/create");
  url.searchParams.append("caption", caption);
  url.searchParams.append("location", location);
  url.searchParams.append("image", image);

  const options = {
      method: "POST",
      headers: {
          "Authorization": `Bearer ${data.jwt}`, 
      },
  };

  try {
      await handleFetch(url.toString(), options, CREATE_NEW_POST, dispatch);
  } catch (error) {
      console.error("Error creating post:", error);
  }
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
  
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    console.log("getData"+data);
    dispatch({ type: GET_USER_POST, payload: data });
  } catch (error) {
    console.error('Error fetching user posts:', error);
  }
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

  try {
    console.log("Fetching posts from URL:", url); // Log the URL being used for fetch
    const response = await fetch(url, options);
    const responseData = await response.json();

    if (!response.ok) {
      console.error("API Error:", response.statusText);
      return;
    }

    console.log("API Response Data:", responseData); // Log the response data

    // Check if the response is an array and dispatch
    if (Array.isArray(responseData)) {
      dispatch({ type: REQ_USER_POST, payload: responseData });
    } else {
      console.error("Invalid response format:", responseData);
    }
  } catch (error) {
    console.error('Error fetching user posts:', error);
  }
};

// export const reqUserPostAction = (data) => async (dispatch) => {
//   const mockData = [
//     { id: 655, caption: 'hello test 001', image: 'image1.jpg' },
//     { id: 654, caption: 'dasfgdasf', image: 'image2.jpg' },
//   ];
  
//   dispatch({ type: REQ_USER_POST, payload: mockData });
// };

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
  if (!checkJwt(data)) return;  // Ensure the JWT token is valid before proceeding

  const url = `${BASE_API}/posts/savePost/${data.postId}`;
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${data.jwt}`,
    },
  };

  try {
    // Call handleFetch and get the response or null if there's an error
    const response = await handleFetch(url, options, SAVE_POST, dispatch);

    // If response is null or undefined, handle the error
    if (!response) {
      console.error('Error: No response from API');
      return;
    }

    // Check if the response is successful (status 200)
    if (response.status === 200) {
      console.log('Post saved successfully');
    } else {
      console.error('Failed to save post', response);
    }
  } catch (error) {
    // Handle any unexpected errors in saving the post
    console.error('Error in saving post:', error);
  }
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
