import {
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAILURE,
    GET_USER_FAILURE,
    GET_USER_REQUEST,
    GET_USER_SUCCESS,
    LOGIN_FAILURE,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGOUT,
} from './ActionType';
import api_instance from '~/utils/axiosCustomize';

// const token = localStorage.getItem('jwt');

const registerRequest = () => ({ type: REGISTER_REQUEST });
const registerSuccess = (user) => ({ type: REGISTER_SUCCESS, payload: user });
const registerFailure = (error) => ({ type: REGISTER_FAILURE, payload: error });

export const register = (reqData) => async (dispatch) => {
    dispatch(registerRequest());

    try {
        const response = await api_instance.post(`/auth/signup`, reqData);
        const user = response.data;

        if (user.jwt) {
            localStorage.setItem('jwt', user.jwt);
        }
        dispatch(registerSuccess(user.jwt));
    } catch (error) {
        dispatch(registerFailure(error.message));
    }
};

const loginRequest = () => ({ type: LOGIN_REQUEST });
const loginSuccess = (user) => ({ type: LOGIN_SUCCESS, payload: user });
const loginFailure = (error) => ({ type: LOGIN_FAILURE, payload: error });

export const login = (reqData) => async (dispatch) => {
    dispatch(loginRequest());

    // console.log('reqData.data: ', reqData);
    try {
        const res = await api_instance.post(`/auth/signin`, reqData);
        const user = res.data;
        // console.log(' ============', user);
        if (user.jwt) {
            localStorage.setItem('jwt', user.jwt);
            localStorage.setItem('token', user.jwt);
        }
        dispatch(loginSuccess(user));
    } catch (error) {
        dispatch(loginFailure(error.message));
    }
};

const getUserRequest = () => ({ type: GET_USER_REQUEST });
const getUserSuccess = (user) => ({ type: GET_USER_SUCCESS, payload: user });
const getUserFailure = (error) => ({ type: GET_USER_FAILURE, payload: error });

export const getUser = (jwt) => async (dispatch) => {
    dispatch(getUserRequest());

    try {
        const response = await api_instance.get(`/api/users/profile`, {
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
        });
        const user = response.data;
        localStorage.setItem('user', JSON.stringify(user));

        dispatch(getUserSuccess(user)); // Pass the user to getUserSuccess
    } catch (error) {
        dispatch(getUserFailure(error.message));
    }
};

export const logout = () => (dispatch) => {
    dispatch({ type: LOGOUT, payload: null });
};
