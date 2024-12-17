import React from 'react'
import { ALL_ADMIN_USER_REQUEST , ALL_ADMIN_USER_SUCCESS , ALL_ADMIN_USER_FAIL , ERROR_RESOLVE } from '../Constants/adminConstant'
import { ALL_ADMIN_ORDERS_REQUEST , ALL_ADMIN_ORDERS_SUCCESS , ALL_ADMIN_ORDERS_FAIL } from '../Constants/adminConstant'
import { PRODUCT_ADD_REQUEST , PRODUCT_ADD_SUCCESS , PRODUCT_ADD_FAIL } from '../Constants/adminConstant'
import { ALL_ADMIN_USER_DELETE_REQUEST , ALL_ADMIN_USER_DELETE_SUCCESS , ALL_ADMIN_USER_DELETE_FAIL } from '../Constants/adminConstant'
import { ALL_ADMIN_ORDER_DELETE_REQUEST , ALL_ADMIN_ORDER_DELETE_SUCCESS , ALL_ADMIN_ORDER_DELETE_FAIL } from '../Constants/adminConstant'
import { ALL_ADMIN_USER_UPDATE_REQUEST , ALL_ADMIN_USER_UPDATE_SUCCESS , ALL_ADMIN_USER_UPDATE_FAIL } from '../Constants/adminConstant'
import { ALL_ADMIN_ORDER_UPDATE_REQUEST , ALL_ADMIN_ORDER_UPDATE_SUCCESS , ALL_ADMIN_ORDER_UPDATE_FAIL } from '../Constants/adminConstant'

const initialUserState = {
    adminUsers: [],
    loading: false,
    error: null,
  };

export const userAdminReducer = ((state = initialUserState , action )=>{
        switch (action.type) {
            case ALL_ADMIN_USER_REQUEST:
              return {
                ...state,
                loading: true,
              };
            case ALL_ADMIN_USER_SUCCESS:
              return {
                ...state,
                loading: false,
                adminUsers: action.payload,
              };
            case ALL_ADMIN_USER_FAIL:
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

const initialOrderState = {
  adminOrder:[],
  loading: false,
  error: null,
};

export const orderAdminReducer = ((state = initialOrderState , action )=>{
        switch (action.type) {
            case ALL_ADMIN_ORDERS_REQUEST:
              return {
                ...state,
                loading: true,
              };
            case ALL_ADMIN_ORDERS_SUCCESS:
              return {
                ...state,
                loading: false,
                adminOrder: action.payload,
              };
            case ALL_ADMIN_ORDERS_FAIL:
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

const initialProductAddState = {
  product:null,
  loading: false,
  error: null,
};

export const productAddReducer = ((state = initialProductAddState , action )=>{
        switch (action.type) {
            case PRODUCT_ADD_REQUEST:
              return {
                ...state,
                loading: true,
              };
            case PRODUCT_ADD_SUCCESS:
              return {
                ...state,
                loading: false,
                product: action.payload,
              };
            case PRODUCT_ADD_FAIL:
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

const initialUserDeleteState = {
  deleteUser:null,
  loading: false,
  error: null,
};

export const userDeleteReducer = ((state = initialUserDeleteState , action )=>{
        switch (action.type) {
            case ALL_ADMIN_USER_DELETE_REQUEST:
              return {
                ...state,
                loading: true,
              };
            case ALL_ADMIN_USER_DELETE_SUCCESS:
              return {
                ...state,
                loading: false,
                deleteUser: action.payload,
              };
            case ALL_ADMIN_USER_DELETE_FAIL:
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

const initialOrderDeleteState = {
  deleteOrder:[],
  loading: false,
  error: null,
};

export const userOrderReducer = ((state = initialOrderDeleteState , action )=>{ 
        switch (action.type) {
            case ALL_ADMIN_ORDER_DELETE_REQUEST:
              return {
                ...state,
                loading: true,
              };
            case ALL_ADMIN_ORDER_DELETE_SUCCESS:
              return {
                ...state,
                loading: false,
                deleteOrder: action.payload,
              };
            case ALL_ADMIN_ORDER_DELETE_FAIL:
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

const initialUserUpdateState = {
  updateUser:null,
  loading: false,
  error: null,
};

export const userUpdateReducer = ((state = initialUserUpdateState , action )=>{ 
        switch (action.type) {
            case ALL_ADMIN_USER_UPDATE_REQUEST:
              return {
                ...state,
                loading: true,
              };
            case ALL_ADMIN_USER_UPDATE_SUCCESS:
              return {
                ...state,
                loading: false,
                updateUser: action.payload,
              };
            case ALL_ADMIN_USER_UPDATE_FAIL:
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

const initialOrderUpdateState = {
  updateOrder:null,
  loading: false,
  error: null,
};

export const orderUpdateReducer = ((state = initialOrderUpdateState , action )=>{ 
        switch (action.type) {
            case ALL_ADMIN_ORDER_UPDATE_REQUEST:
              return {
                ...state,
                loading: true,
              };
            case ALL_ADMIN_ORDER_UPDATE_SUCCESS:
              return {
                ...state,
                loading: false,
                updateOrder: action.payload,
              };
            case ALL_ADMIN_ORDER_UPDATE_FAIL:
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