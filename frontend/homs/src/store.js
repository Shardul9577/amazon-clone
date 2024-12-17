import { createStore , combineReducers , applyMiddleware } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import { thunk } from 'redux-thunk';
import { productReducer , productDetailReducer , productCommentReducer } from './Reducers/productReducer';
import { userLoginReducer , userDetailReducer, userRegisterReducer } from './Reducers/userReducers';
import { orderRegisterReducer , myOrdersReducer ,orderDetailReducer , orderDeleteReducer } from './Reducers/orderReducer';
import {userAdminReducer , orderAdminReducer , productAddReducer , userOrderReducer , userDeleteReducer , userUpdateReducer , orderUpdateReducer} from './Reducers/adminReducer';

const reducer = combineReducers({
    products:productReducer,
    productDetail:productDetailReducer,
    productReview:productCommentReducer,
    usersLogin:userLoginReducer,
    userDetail:userDetailReducer,
    userRegister:userRegisterReducer,
    orderRegister:orderRegisterReducer,
    myorders:myOrdersReducer,
    orderDetail:orderDetailReducer,
    orderDeleted:orderDeleteReducer,
    adminUsers:userAdminReducer,
    adminOrders:orderAdminReducer,
    addProduct:productAddReducer,
    adminUserDeleted:userOrderReducer,
    adminOrderDeleted:userDeleteReducer,
    updateUserAdmin:userUpdateReducer,
    updateOrderAdmin:orderUpdateReducer,
})

let initialState = {}

const middleware = [thunk]

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store;