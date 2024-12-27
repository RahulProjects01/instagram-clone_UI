import { SIGN_IN, SIGN_UP } from "./ActionType";

export const signupAction = (data) => async (dispatch) => {
    try {
        const res = await fetch("http://localhost:8080/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data), 
        });

        if (res.ok) {
            const user = await res.json();
            console.log("Signup User: ", user);
            dispatch({ type: SIGN_UP, payload: user });
        } else {
            const error = await res.json(); 
            console.log("Signup failed:", error.message); 
        }

    } catch (error) {
        console.log("Signup error:", error); 
    }
};




export const signinAction = (data) => async (dispatch) => {
    try {
        const res = await fetch("http://localhost:8080/signin", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Basic " + btoa(data.email + ":" + data.password), // Corrected the space
            },
        });

        // Check if the response is successful (status code 200)
        if (res.ok) {
            const token = res.headers.get("Authorization");
            localStorage.setItem("token", token); // Store token in localStorage
            dispatch({ type: SIGN_IN, payload: token });
            console.log("Signin Token: ", token);
        } else {
            console.log("Signin failed:", res.statusText); // Handle failed signin
        }

    } catch (error) {
        console.log("Signin error:", error); // Log error in case of failure
    }
};


const handleLogout = async () => {
    try {
        const response = await fetch('http://localhost:8080/api/auth/logout', {
            method: 'POST',
            credentials: 'include', 
        });

        if (response.ok) {
            // Remove token from localStorage or cookies
            localStorage.removeItem('token');
            alert('Logged out successfully!');
            window.location.href = '/login'; // Redirect to login page
        } else {
            console.error('Logout failed');
        }
    } catch (error) {
        console.error('Error during logout:', error);
    }
};

