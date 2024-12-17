import { ALL_USERS_LOGIN_REQUEST , ALL_USERS_LOGIN_SUCCESS , ALL_USERS_LOGIN_FAIL , ERROR_RESOLVE } from '../Constants/userConstant'
import { ALL_USERS_DETAIL_REQUEST , ALL_USERS_DETAIL_SUCCESS , ALL_USERS_DETAIL_FAIL} from '../Constants/userConstant'
import { ALL_USERS_REGISTER_REQUEST , ALL_USERS_REGISTER_SUCCESS , ALL_USERS_REGISTER_FAIL} from '../Constants/userConstant'

const initialState = {
    loginuser: null,
    loading: false,
    error: null,
  };

export const userLoginReducer = ((state = initialState , action )=>{
        switch (action.type) {
            case ALL_USERS_LOGIN_REQUEST:
              return {
                ...state,
                loading: true,
              };
            case ALL_USERS_LOGIN_SUCCESS:
              return {
                ...state,
                loading: false,
                loginuser: action.payload.specificUser,
                token: action.payload.token         
              };
            case ALL_USERS_LOGIN_FAIL:
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
  user:null,
  loading: false,
  error: null,
};


export const userDetailReducer = ((state = initialdetailState , action )=>{
        switch (action.type) {
            case ALL_USERS_DETAIL_REQUEST:
              return {
                ...state,
                loading: true,
              };
            case ALL_USERS_DETAIL_SUCCESS:
              return {
                ...state,
                loading: false,
                user: action.payload,
              };
            case ALL_USERS_DETAIL_FAIL:
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

const initialRegisterState = {
  userRegister:null,
  loading: false,
  error: null,
  isAuthenticated:false
};


export const userRegisterReducer = ((state = initialRegisterState , action )=>{
        switch (action.type) {
            case ALL_USERS_REGISTER_REQUEST:
              return {
                ...state,
                loading: true,
                isAuthenticated:false
              };
            case ALL_USERS_REGISTER_SUCCESS:
              return {
                ...state,
                loading: false,
                userRegister: action.payload.user,
                isAuthenticated:true
              };
            case ALL_USERS_REGISTER_FAIL:
              return {
                ...state,
                loading: false,
                error: action.payload,
                isAuthenticated:false
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

  