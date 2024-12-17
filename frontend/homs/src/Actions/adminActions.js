import React from 'react'
import { ALL_ADMIN_USER_REQUEST , ALL_ADMIN_USER_SUCCESS , ALL_ADMIN_USER_FAIL , ERROR_RESOLVE } from '../Constants/adminConstant'
import { ALL_ADMIN_ORDERS_REQUEST , ALL_ADMIN_ORDERS_SUCCESS , ALL_ADMIN_ORDERS_FAIL } from '../Constants/adminConstant'
import { PRODUCT_ADD_REQUEST , PRODUCT_ADD_SUCCESS , PRODUCT_ADD_FAIL } from '../Constants/adminConstant'
import { ALL_ADMIN_USER_DELETE_REQUEST , ALL_ADMIN_USER_DELETE_SUCCESS , ALL_ADMIN_USER_DELETE_FAIL } from '../Constants/adminConstant'
import { ALL_ADMIN_ORDER_DELETE_REQUEST , ALL_ADMIN_ORDER_DELETE_SUCCESS , ALL_ADMIN_ORDER_DELETE_FAIL } from '../Constants/adminConstant'
import { ALL_ADMIN_USER_UPDATE_REQUEST , ALL_ADMIN_USER_UPDATE_SUCCESS , ALL_ADMIN_USER_UPDATE_FAIL } from '../Constants/adminConstant'
import { ALL_ADMIN_ORDER_UPDATE_REQUEST , ALL_ADMIN_ORDER_UPDATE_SUCCESS , ALL_ADMIN_ORDER_UPDATE_FAIL } from '../Constants/adminConstant'
import axios from 'axios'

export const getAdminUserAction = () => async (dispatch) => {
    try {
        dispatch({type:ALL_ADMIN_USER_REQUEST});

        const { data } = await axios.get(`/users`);

        console.log(data,"data");
        
        dispatch({ type: ALL_ADMIN_USER_SUCCESS, payload: data });
        
    } catch (error) {
        dispatch({type:ALL_ADMIN_USER_FAIL, payload:error });
    }
};

export const getAdminOrderAction = () => async (dispatch) => {
    try {
        dispatch({ type: ALL_ADMIN_ORDERS_REQUEST });

        const { data } = await axios.get(`/orders/user/admin-orders-dashboard`);

        dispatch({ type: ALL_ADMIN_ORDERS_SUCCESS, payload:data });

    } catch (error) {
        dispatch({ type: ALL_ADMIN_ORDERS_FAIL, payload: error });
    }
}

export const getProductAddAction = (credentials)=> async(dispatch)=>{
    try {

        dispatch({type:PRODUCT_ADD_REQUEST})

        const { data } = await axios.post(`/product/new`,credentials);

        console.log("dataproduct====>",data);
        
        dispatch({type:PRODUCT_ADD_SUCCESS , payload:data })
        
    } catch (error) {
        dispatch({type:PRODUCT_ADD_FAIL , payload:error })
    }
}

export const getUserDeleteAction = (id)=> async(dispatch)=>{
    try {

        dispatch({type:ALL_ADMIN_USER_DELETE_REQUEST})

        console.log("id========>",id);

        const { data } = await axios.delete(`/users/admin/${id}`);

        console.log("dataproduct====>",data);
        
        dispatch({type:ALL_ADMIN_USER_DELETE_SUCCESS , payload:data })
        
    } catch (error) {
        dispatch({type:ALL_ADMIN_USER_DELETE_FAIL , payload:error })
    }
}

export const getOrderDeleteAction = (id)=> async(dispatch)=>{
    try {

        dispatch({type:ALL_ADMIN_ORDER_DELETE_REQUEST})

        console.log("id========>",id);

        const { data } = await axios.delete(`/orders/user/admin-orders-dashboard/deleteOrder/${id}`);

        console.log("dataproduct====>",data);
        
        dispatch({type:ALL_ADMIN_ORDER_DELETE_SUCCESS , payload:data })
        
    } catch (error) {
        dispatch({type:ALL_ADMIN_ORDER_DELETE_FAIL , payload:error })
    }
}

export const getUserUpdateAction = (id , credential)=> async(dispatch)=>{
    try {

        dispatch({type:ALL_ADMIN_USER_UPDATE_REQUEST})

        console.log("id========>",id);
        console.log("role========>",credential);

        const { data } = await axios.put(`/users/updateDetails/role/${id}`,credential);

        console.log("dataupdateuser====>",data);
        
        dispatch({type:ALL_ADMIN_USER_UPDATE_SUCCESS , payload:data })
        
    } catch (error) {
        dispatch({type:ALL_ADMIN_USER_UPDATE_FAIL , payload:error })
    }
}

export const getOrderUpdateAction = (credential)=> async(dispatch)=>{
    try {

        dispatch({type:ALL_ADMIN_ORDER_UPDATE_REQUEST})

        console.log("role========>",credential);

        const { data } = await axios.put(`/orders/admin-orders-dashboard/updateStatusOrder`,credential);

        console.log("dataupdateuser====>",data);
        
        dispatch({type:ALL_ADMIN_ORDER_UPDATE_SUCCESS , payload:data })
        
    } catch (error) {
        dispatch({type:ALL_ADMIN_ORDER_UPDATE_FAIL , payload:error })
    }
}



export const getErrorResolve = (async(dispatch)=>{
    dispatch({type:ERROR_RESOLVE})
})