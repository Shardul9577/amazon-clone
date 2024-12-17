import { ALL_USERS_LOGIN_REQUEST , ALL_USERS_LOGIN_SUCCESS , ALL_USERS_LOGIN_FAIL , ERROR_RESOLVE } from '../Constants/userConstant'
import { ALL_USERS_DETAIL_REQUEST , ALL_USERS_DETAIL_SUCCESS , ALL_USERS_DETAIL_FAIL} from '../Constants/userConstant'
import { ALL_USERS_REGISTER_REQUEST , ALL_USERS_REGISTER_SUCCESS , ALL_USERS_REGISTER_FAIL} from '../Constants/userConstant'
import axios from 'axios'


export const getUsersLoginAction = (email="",password="") => async (dispatch) => {
    try {
        dispatch({type:ALL_USERS_LOGIN_REQUEST});

        // let Link = `/products?keyword=${keyword}&page=${currPage}&price[lt]=${price}${specificCategory ? `&category=${specificCategory}` : ''}`

        const credentials = {
            email:email,
            password:password
        }

        console.log("credentials============>",credentials);

        const { data } = await axios.post("/user/login",credentials);

        console.log("data==============>",data);
        
        dispatch({ type: ALL_USERS_LOGIN_SUCCESS, payload: data });
        
    } catch (error) {
        // More detailed error handling (example)

        console.log("errorMsg=>",error);

        dispatch({type:ALL_USERS_LOGIN_FAIL, payload:error });
    }
};

export const getUserDetailAction = (id)=> async(dispatch)=>{
    try {

        dispatch({type:ALL_USERS_DETAIL_REQUEST})

        // console.log(id,"<===========id");

        const { data } = await axios.get(`/users/${id}`);
        
        dispatch({type:ALL_USERS_DETAIL_SUCCESS , payload:data })
        
    } catch (error) {
        dispatch({type:ALL_USERS_DETAIL_FAIL , payload:error })
    }
}

// export const getUserRegisterAction = (credentials) => async (dispatch) => {

//     try {

//         dispatch({ type: ALL_USERS_REGISTER_REQUEST });

//         console.log(credentials,"credentials");
    
//         let { data } = await axios.post(`/user/new`, credentials);
    
//         console.log(data,"data of registration");

//         dispatch({ type: ALL_USERS_REGISTER_SUCCESS, payload: data });

//     } catch (error) {

//         // More detailed error handling (example)
//         let errorMsg = error.response ? error.response.data.message : error.message;

//         dispatch({ type: ALL_USERS_REGISTER_FAIL, payload:errorMsg });
//     }
// };

export const getUserRegisterAction = (credentials) => async (dispatch) => {
    try {
        dispatch({ type: ALL_USERS_REGISTER_REQUEST });

        // console.log(credentials, "credentials")       

        let { data } = await axios.post(`/user/new`, credentials);
    
        console.log(data, "data of registration");

        dispatch({ type: ALL_USERS_REGISTER_SUCCESS, payload:data });

    } catch(error) {
        let data = error.response.data.error

        console.log(data,"data error");

        dispatch({ type:ALL_USERS_REGISTER_FAIL,payload:data});
    }
};


export const getErrorResolve = (async(dispatch)=>{
    dispatch({type:ERROR_RESOLVE})
})