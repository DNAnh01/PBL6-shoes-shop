import api_instance from '~/utils/axiosCustomize';
import {
    CREATE_PRODUCT_FAILURE,
    CREATE_PRODUCT_REQUEST,
    CREATE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAILURE,
    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_SUCCESS,
    FIND_PRODUCT_BY_ID_FAILURE,
    FIND_PRODUCT_BY_ID_REQUEST,
    FIND_PRODUCT_BY_ID_SUCCESS,
    FIND_PRODUCT_FAILURE,
    FIND_PRODUCT_REQUEST,
    FIND_PRODUCT_SUCCESS,
} from './ActionType';
import { toast } from 'react-toastify';
const token = localStorage.getItem('jwt');
export const findProducts = (reqData) => async (dispatch) => {
    dispatch({ type: FIND_PRODUCT_REQUEST });

    const { color, size, minPrice, maxPrice, minDiscount, brand, stock, sort, pageNumber, pageSize } = reqData;

    try {
        console.log(
            `/api/products/?color=${color}&size=${size}&minPrice=${minPrice}&maxPrice=${maxPrice}&minDiscount=${minDiscount}&brand=${brand}&stock=${stock}&sort=${sort}&pageNumber=${pageNumber}&pageSize=${pageSize}`,
        );
        const { data } = await api_instance.get(
            `/api/products/?color=${color}&size=${size}&minPrice=${minPrice}&maxPrice=${maxPrice}&minDiscount=${minDiscount}&brand=${brand}&stock=${stock}&sort=${sort}&pageNumber=${pageNumber}&pageSize=${pageSize}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );

        dispatch({ type: FIND_PRODUCT_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: FIND_PRODUCT_FAILURE, payload: error.message });
    }
};

export const findProductById = (reqData) => async (dispatch) => {
    dispatch({ type: FIND_PRODUCT_BY_ID_REQUEST });

    const { productId } = reqData;
    try {
        const { data } = await api_instance.get(`/api/products/id/${productId}`);
        dispatch({ type: FIND_PRODUCT_BY_ID_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: FIND_PRODUCT_BY_ID_FAILURE, payload: error.message });
    }
};

export const createProduct = (reqData) => async (dispatch) => {
    dispatch({ type: CREATE_PRODUCT_REQUEST });
    try {
        const { data } = await api_instance.post(`/api/admin/products/`, reqData.data);
        dispatch({ type: CREATE_PRODUCT_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: CREATE_PRODUCT_FAILURE, payload: error.message });
    }
};

export const deleteProduct = (productId) => async (dispatch) => {
    dispatch({ type: DELETE_PRODUCT_REQUEST });
    try {
        const { data } = await api_instance.delete(`/api/admin/products/${productId}/delete`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log('delete product: ', data);
        toast.success("Xóa sản phẩm thành công");
        dispatch({ type: DELETE_PRODUCT_SUCCESS, payload: productId });
    } catch (error) {
        dispatch({ type: DELETE_PRODUCT_FAILURE, payload: error.message });
    }
};
