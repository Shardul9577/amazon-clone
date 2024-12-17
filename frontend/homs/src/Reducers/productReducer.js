import React from 'react'
import { ALL_PRODUCTS_REQUEST , ALL_PRODUCTS_SUCCESS , ALL_PRODUCTS_FAIL , ERROR_RESOLVE } from '../Constants/productConstant'
import { ALL_PRODUCTS_DETAIL_REQUEST , ALL_PRODUCTS_DETAIL_SUCCESS , ALL_PRODUCTS_DETAIL_FAIL} from '../Constants/productConstant'
import { ALL_PRODUCTS_COMMENT_REQUEST , ALL_PRODUCTS_COMMENT_SUCCESS , ALL_PRODUCTS_COMMENT_FAIL } from '../Constants/productConstant'

const initialState = {
    products: [],
    loading: false,
    error: null,
  };

export const productReducer = ((state = initialState , action )=>{
        switch (action.type) {
            case ALL_PRODUCTS_REQUEST:
              return {
                ...state,
                loading: true,
              };
            case ALL_PRODUCTS_SUCCESS:
              return {
                ...state,
                loading: false,
                products: action.payload.products,
                numOfPdt: action.payload.numOfPdt,
                productCount: action.payload.productCount,
              };
            case ALL_PRODUCTS_FAIL:
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

const initialdetailState = {
  product:{},
  loading: false,
  error: null,
};


export const productDetailReducer = ((state = initialdetailState , action )=>{
        switch (action.type) {
            case ALL_PRODUCTS_DETAIL_REQUEST:
              return {
                ...state,
                loading: true,
              };
            case ALL_PRODUCTS_DETAIL_SUCCESS:
              return {
                ...state,
                loading: false,
                product: action.payload,
              };
            case ALL_PRODUCTS_DETAIL_FAIL:
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

const initialCommentState = {
  comment:{},
  loading: false,
  error: null,
};

export const productCommentReducer = ((state = initialCommentState , action )=>{
        switch (action.type) {
            case ALL_PRODUCTS_COMMENT_REQUEST:
              return {
                ...state,
                loading: true,
              };
            case ALL_PRODUCTS_COMMENT_SUCCESS:
              return {
                ...state,
                loading: false,
                comment: action.payload,
              };
            case ALL_PRODUCTS_COMMENT_FAIL:
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

  