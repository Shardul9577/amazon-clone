import { ALL_PRODUCTS_REQUEST , ALL_PRODUCTS_SUCCESS , ALL_PRODUCTS_FAIL , ERROR_RESOLVE } from '../Constants/productConstant'
import { ALL_PRODUCTS_DETAIL_REQUEST , ALL_PRODUCTS_DETAIL_SUCCESS , ALL_PRODUCTS_DETAIL_FAIL} from '../Constants/productConstant'
import { ALL_PRODUCTS_COMMENT_REQUEST , ALL_PRODUCTS_COMMENT_SUCCESS , ALL_PRODUCTS_COMMENT_FAIL } from '../Constants/productConstant'
import axios from 'axios'

export const getProductAction = (keyword = "", currPage=1 , price=25000,specificCategory="") => async (dispatch) => {
    try {
        dispatch({type:ALL_PRODUCTS_REQUEST});

        let Link = `/products?keyword=${keyword}&page=${currPage}&price[lt]=${price}${specificCategory ? `&category=${specificCategory}` : ''}`

        const { data } = await axios.get(Link);

        console.log(data,"data");
        
        dispatch({ type: ALL_PRODUCTS_SUCCESS, payload: data });
        
    } catch (error) {
        // More detailed error handling (example)
        let errorMsg = error.response ? error.response.data.message : error.message;
        dispatch({type:ALL_PRODUCTS_FAIL, payload: errorMsg });
        console.log(error);
    }
};


export const getProductDetailAction = (id) => async (dispatch) => {
    try {
        dispatch({ type: ALL_PRODUCTS_DETAIL_REQUEST });
        console.log(dispatch({ type: ALL_PRODUCTS_DETAIL_REQUEST }));
        console.log(">>>>>>", id);
        const { data } = await axios.get(`/products/detail/${id}`);
        console.log("detail data =======>", data);

        // Ensure payload structure matches what the reducer expects
        dispatch({ type: ALL_PRODUCTS_DETAIL_SUCCESS, payload:data });

    } catch (error) {
        console.error("Error fetching product details:", error);
        dispatch({ type: ALL_PRODUCTS_DETAIL_FAIL, payload: error.message || "An error occurred" });
    }
}


export const getProductCommentAction = (_id="",rateValue=0,addComment="",name="")=> async(dispatch)=>{
    try {

        dispatch({type:ALL_PRODUCTS_COMMENT_REQUEST})

        const credentials = {
            "_id":_id,
            "review":{
                "message":addComment,
                "rating":rateValue,
                "writer":name
            }
        }

        const { data } = await axios.put(`/product/createReview`,credentials);

        console.log("data====>",data);
        
        dispatch({type:ALL_PRODUCTS_COMMENT_SUCCESS , payload:data })
        
    } catch (error) {
        dispatch({type:ALL_PRODUCTS_COMMENT_FAIL , payload:error })
    }
}

export const getErrorResolve = (async(dispatch)=>{
    dispatch({type:ERROR_RESOLVE})
})