import React, { useEffect } from 'react'
import '../css/OrderDetail.css'
import Paper from '@mui/material/Paper';
import { getUserOrderDetailAction , getUserOrderDeleteAction } from '../../Actions/orderActions'
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function OrderDetail() {

  const { _id } = useParams();
  const dispatch = useDispatch();
  const { orderDetail } = useSelector((state) => state.orderDetail);
  const { orderDeleted } = useSelector((state) => state.orderDeleted);
  let navigate = useNavigate();

  console.log("_id========>",_id);

  useEffect(()=>{

  const fetchOrders = async () => {
   await dispatch(getUserOrderDetailAction(_id))
  };

  fetchOrders();

  },[dispatch])

  // console.log("orderDetail===========>",orderDetail);
  // console.log("ID===========>",_id);

  const orderDeleteHandler = (id)=>{
    const fetchOrders = async () => { 

     await dispatch(getUserOrderDeleteAction(id))

    }
    fetchOrders();

    navigate(`/`)
  }


// _______________________________________________________________________________
// _______________________________________________________________________________
// _______________________________________________________________________________



  console.log("deleted order ==============>",orderDeleted);

  return (
    <>
    <div className='order-detail container'>
       <div className='order-detail-1'>
         <img className='order-detail-1-img' src={orderDetail?.orderItems[0]?.image}/>
         <div className='order-detail-1-text'>
          <h2>{orderDetail?.orderItems[0]?.name}</h2>
          <hr className='container'/>
          <p>&#x20B9; {orderDetail?.orderItems[0]?.price} X {orderDetail?.orderItems[0]?.quantity}</p>
         </div>
       </div>
       <hr className='container'/>
       <div className='order-detail-2'>
          <Paper elevation={2} className='order-detail-2-card'>
            <h3>Shipping Detail</h3>
            <hr className='container'></hr>
            <p>Address: <span style={{color:"blue"}}>{orderDetail?.shippingInfo?.address},</span></p>
            <p>City: <span style={{color:"blue"}}>{orderDetail?.shippingInfo?.city},</span></p>
            <p>State: <span style={{color:"blue"}}>{orderDetail?.shippingInfo?.state},</span></p>
            <p>Country: <span style={{color:"blue"}}>{orderDetail?.shippingInfo?.country},</span></p>
            <p>Pincode: <span style={{color:"blue"}}>{orderDetail?.shippingInfo?.pincode},</span></p>
            <div className='order-detail-2-card-button'>
              <button type="button" onClick={()=>orderDeleteHandler(_id)}  class="btn btn-outline-danger">Cancel Order</button>
            </div>
          </Paper>
          <Paper elevation={2} className='order-detail-2-card'>
          <h3>Payment Detail</h3>
          <hr className='container'></hr>
          <p>Id: <span style={{color:"blue"}}>{orderDetail?.paymentInfo?.id}</span></p>
          <p>Status: <span style={{color:"blue"}}>{orderDetail?.paymentInfo?.status}</span></p>
          </Paper>
          <Paper elevation={2} className='order-detail-2-card'>
          <h3>Order Summary</h3>
          <hr className='container'></hr>
          <p>Product Price : <span style={{color:"blue"}}>&#x20B9; {orderDetail?.orderItems[0].price}</span></p>
          <p>Quantity: <span style={{color:"blue"}}>{orderDetail?.orderItems[0]?.quantity}</span></p>
          <p>Tax Price : <span style={{color:"blue"}}>&#x20B9; {orderDetail?.taxPrice}</span></p>
          <p>Shipping Price : <span style={{color:"blue"}}>&#x20B9; {orderDetail?.shippingPrice}</span></p>
          <hr className='container'></hr>
          <p>Total Price : <span style={{color:"blue"}}>&#x20B9; {orderDetail?.totalPrice}</span></p>
          </Paper>
       </div>
    </div>
    </>
  )
}
