import React from 'react'
import { MY_ORDER_REQUEST , MY_ORDER_SUCCESS , MY_ORDER_FAIL , ERROR_RESOLVE } from '../Constants/orderConstant'
import { MY_ORDER_DETAIL_REQUEST , MY_ORDER_DETAIL_SUCCESS , MY_ORDER_DETAIL_FAIL } from '../Constants/orderConstant'
import { MY_PLACE_ORDER_REQUEST , MY_PLACE_ORDER_SUCCESS , MY_PLACE_ORDER_FAIL} from '../Constants/orderConstant'
import { SPECIFIC_ORDER_DELETE_REQUEST , SPECIFIC_ORDER_DELETE_SUCCESS , SPECIFIC_ORDER_DELETE_FAIL } from '../Constants/orderConstant'

const initialState = {
    order: null,
    loading: false,
    error: null,
  };

export const orderRegisterReducer = ((state = initialState , action )=>{
        switch (action.type) {
            case MY_PLACE_ORDER_REQUEST:
              return {
                ...state,
                loading: true,
              };
            case MY_PLACE_ORDER_SUCCESS:
              return {
                ...state,
                loading: false,
                order: action.payload,
              };
            case MY_PLACE_ORDER_FAIL:
              return {
                ...state,
                loading: false,
                error: action.payload,
              };
            case ERROR_RESOLVE:
              return {
                ...state,
                error: null,
              };
            default:
              return state;
          }
}

)

const initialMyOrderState = {
  allOrders:[],
  loading: false,
  error: null,
};


export const myOrdersReducer = ((state = initialMyOrderState , action )=>{
        switch (action.type) {
            case MY_ORDER_REQUEST:
              return {
                ...state,
                loading: true,
              };
            case MY_ORDER_SUCCESS:
              return {
                ...state,
                loading: false,
                allOrders: action.payload,
              };
            case MY_ORDER_FAIL:
              return {
                ...state,
                loading: false,
                error: action.payload,
              };
            case ERROR_RESOLVE:
              return {
                ...state,
                error: null,
              };
            default:
              return state;
          }
}

)  

const initialOrderDetailState = {
  orderDetail:null,
  loading: false,
  error: null,
};


export const orderDetailReducer = ((state = initialOrderDetailState , action )=>{
        switch (action.type) {
            case MY_ORDER_DETAIL_REQUEST:
              return {
                ...state,
                loading: true,
              };
            case MY_ORDER_DETAIL_SUCCESS:
              return {
                ...state,
                loading: false,
                orderDetail: action.payload,
              };
            case MY_ORDER_DETAIL_FAIL:
              return {
                ...state,
                loading: false,
                error: action.payload,
              };
            case ERROR_RESOLVE:
              return {
                ...state,
                error: null,
              };
            default:
              return state;
          }
}

)  

// _______________________________________________________________________________________

const initialOrderDeleteState = {
  orderDeleted:[],
  loading: false,
  error: null,
};


export const orderDeleteReducer = ((state = initialOrderDeleteState , action )=>{
        switch (action.type) {
            case SPECIFIC_ORDER_DELETE_REQUEST:
              return {
                ...state,
                loading: true,
              };
            case SPECIFIC_ORDER_DELETE_SUCCESS:
              return {
                ...state,
                loading: false,
                orderDeleted: action.payload,
              };
            case SPECIFIC_ORDER_DELETE_FAIL:
              return {
                ...state,
                loading: false,
                error: action.payload,
              };
            case ERROR_RESOLVE:
              return {
                ...state,
                error: null,
              };
            default:
              return state;
          }
}

)  