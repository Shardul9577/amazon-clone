import React, { useEffect } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import '../css/UserOrders.css'
import { useDispatch, useSelector } from 'react-redux';
import { getUserOrderAction } from '../../Actions/orderActions';
import { useNavigate } from 'react-router-dom';

export default function UserOrders() {

  const dispatch = useDispatch();
  let navigate = useNavigate()
  const { allOrders , error } = useSelector((state) => state.myorders);
  const { user } = useSelector((state) => state.userDetail);

  console.log("user========>",user);

  useEffect(() => {
    // Define an async function inside the useEffect
    const fetchOrders = async () => {

      await dispatch(getUserOrderAction(user._id));

    };

    // Call the async function
    fetchOrders();

    // Since there's nothing specific to clean up, no return statement is needed
  }, [dispatch]); 

  console.log("allorders================>",allOrders);
  console.log("allorders================>",allOrders);

  return (
    <>
    <div>
      <h1 className='cart-section-head container'>Your Orders</h1>
      <hr className='container'/>
    </div>
    <div className='container'>
      <p className='cart-section-para'>Status : <i class="fa-solid fa-square-check" style={{color: "#14ad00"}}></i> Payment Completed Successfully !</p>
    </div>
    <div className='cart-section container'>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Product</TableCell>
            <TableCell align="right">Details</TableCell>
            <TableCell align="right">Quantity</TableCell>
            <TableCell align="right">Total Price</TableCell>
            <TableCell align="right">Delivery Status</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {allOrders.length > 0 ? allOrders.map((order) => (
            <TableRow
              key={order._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <img onClick={()=>navigate(`/orders/${order._id}`)} src={order.orderItems[0].image} className='cart-section-order-img'/>
              </TableCell>
              <TableCell align="right"><strong>{order.orderItems[0].name}</strong></TableCell>
              <TableCell align="right"><strong>{order.orderItems[0].quantity}</strong></TableCell>
              <TableCell align="right"><strong>{order.totalPrice}</strong></TableCell>
              <TableCell align="right"><strong>{order.orderStatus}</strong></TableCell>
            </TableRow>
           )) : <p style={{textAlign: "start", marginTop: "5%"}}> No Orders Yet ! </p>} 
        </TableBody>
      </Table>
    </TableContainer>
    </div>
    </>
  )
}
