import { SIGN_IN, SIGN_UP } from "./ActionType";

const initialvalue = {
    signup: null,
    signin: null
};

export const AuthReducer = (store = initialvalue, { type, payload }) => {
    switch (type) {
        case SIGN_IN:
            return { ...store, signin: payload };

        case SIGN_UP:
            return { ...store, signup: payload };

        default:
            return store;
    }
};
