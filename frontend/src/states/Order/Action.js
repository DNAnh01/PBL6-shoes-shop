import { GET_ORDER_BY_ID_REQUEST } from './ActionType';

export const getOrderById = (orderId) => async (dispatch) => {
    dispatch({ type: GET_ORDER_BY_ID_REQUEST });
    try {
    } catch (error) {}
};
