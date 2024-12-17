import {MY_ORDER_REQUEST , MY_ORDER_SUCCESS , MY_ORDER_FAIL , ERROR_RESOLVE } from '../Constants/orderConstant'
import { MY_ORDER_DETAIL_REQUEST , MY_ORDER_DETAIL_SUCCESS , MY_ORDER_DETAIL_FAIL} from '../Constants/orderConstant'
import { MY_PLACE_ORDER_REQUEST , MY_PLACE_ORDER_SUCCESS , MY_PLACE_ORDER_FAIL} from '../Constants/orderConstant'
import { SPECIFIC_ORDER_DELETE_REQUEST , SPECIFIC_ORDER_DELETE_SUCCESS , SPECIFIC_ORDER_DELETE_FAIL } from '../Constants/orderConstant'
import axios from 'axios'

export const getOrderSubmitAction = (credentials) => async (dispatch) => {
    try {
        dispatch({type:MY_PLACE_ORDER_REQUEST});
        
        console.log("credentials===========>",credentials);

        const { data } = await axios.post(`/orders/newOrder`,credentials)

        console.log("data===========>",data);
        
        dispatch({ type:MY_PLACE_ORDER_SUCCESS, payload:data });
        
    } catch (error) {
        console.log("error===========>",error);
        dispatch({type:MY_PLACE_ORDER_FAIL, payload:error });
    }
};


export const getUserOrderAction = (id) => async (dispatch) => {
    try {
        dispatch({ type: MY_ORDER_REQUEST });

        console.log("id=============>",id);

        const { data } = await axios.get(`/orders/user/myorders/${id}`)

        // Ensure payload structure matches what the reducer expects
        dispatch({ type: MY_ORDER_SUCCESS, payload:data });

    } catch (error) {
        dispatch({ type: MY_ORDER_FAIL, payload: error.message || "An error occurred" });
    }
}

export const getUserOrderDetailAction = (_id) => async (dispatch) => {
    try {
        dispatch({ type: MY_ORDER_DETAIL_REQUEST });

        console.log("_ID",_id);

        const { data } = await axios.get(`/orders/${_id}`)

        // Ensure payload structure matches what the reducer expects
        dispatch({ type: MY_ORDER_DETAIL_SUCCESS, payload:data });

    } catch (error) {
        dispatch({ type:  MY_ORDER_DETAIL_FAIL, payload: error });
    }
}


export const getUserOrderDeleteAction = (id) => async (dispatch) => {
    try {
        dispatch({ type:SPECIFIC_ORDER_DELETE_REQUEST });

        console.log("_ID==============shardul=====>",id);

        const { data } = await axios.delete(`/order/deleteOrder/${id}`)

        // Ensure payload structure matches what the reducer expects
        dispatch({ type:SPECIFIC_ORDER_DELETE_SUCCESS, payload:data });

    } catch (error) {
        dispatch({ type:SPECIFIC_ORDER_DELETE_FAIL, payload: error });
    }
}

export const getErrorResolve = (async(dispatch)=>{
    dispatch({type:ERROR_RESOLVE})
})