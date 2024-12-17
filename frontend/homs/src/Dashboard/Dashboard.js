import React, { useEffect, useState } from "react";
import "./css/Dashboard.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useDispatch, useSelector } from "react-redux";
import {
  getAdminUserAction,
  getAdminOrderAction,
  getProductAddAction,
  getUserDeleteAction,
  getOrderDeleteAction,
  getUserUpdateAction,
  getOrderUpdateAction
} from "../Actions/adminActions";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const dispatch = useDispatch();
  const { adminUsers } = useSelector((state) => state.adminUsers);
  const { adminOrder } = useSelector((state) => state.adminOrders);
  const { user } = useSelector((state) => state.userDetail);

  useEffect(() => {
    const fetchUsers = async () => {
      await dispatch(getAdminUserAction());
    };

    fetchUsers();
  }, [dispatch]);

  useEffect(() => {
    const fetchOrders = async () => {
      await dispatch(getAdminOrderAction());
    };

    fetchOrders();
  }, [dispatch]);

  const deleteUserHandler = async (id) => {
    await dispatch(getUserDeleteAction(id));

    await dispatch(getAdminUserAction());
  };

  const deleteOrderHandler = async (id) => {
    await dispatch(getOrderDeleteAction(id));

    await dispatch(getAdminOrderAction());
  };

  const updateUserHandler = async (id,role) => {

    const credential = {
        role:role
    }

    await dispatch(getUserUpdateAction(id,credential));

    await dispatch(getAdminUserAction());
  };

  const updateOrderHandler = async (id,status) => {

    const credential = {
        id:id,
        status:status
    }

    await dispatch(getOrderUpdateAction(credential));

    await dispatch(getAdminOrderAction());
  };

  console.log("adminUsers==========>", adminUsers);
  console.log("adminOrders==========>", adminOrder);

  // ________________________________________________________________________
  // ________________________________________________________________________
  // _____________________Add Products_______________________________________
  // ________________________________________________________________________

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [imageurl, setImageurl] = useState("");
  const [imageid, setImageid] = useState("");

  const { product, error } = useSelector((state) => state.addProduct);
  const [showMessage, setShowMessage] = useState(false);

  const addProduct = async () => {
    const credentials = {
      name: name,
      email: email,
      password: password,
      category: category,
      stock: stock,
      price: price,
      description: description,
      images: {
        public_id: imageid,
        url: imageurl,
      },
    };

    const fetchUsers = async () => {
      await dispatch(getProductAddAction(credentials));
    };

    fetchUsers();
  };

  useEffect(() => {
    if (product) {
      setName("");
      setEmail("");
      setPassword("");
      setCategory("");
      setStock("");
      setPrice("");
      setDescription("");
      setImageurl("");
      setImageid("");
    }
  }, [product, error]);

  useEffect(() => {
    if (product || error) {
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
      }, 5000); // 5000 milliseconds = 5 seconds
    }
  }, [product, error]);

  // console.log("error==========>",error);

  const totalOrders = adminOrder.length
  let money = [];

// Assuming 'adminOrder' is an array and 'totalOrders' is the count of orders
for (let i = 0; i < totalOrders; i++) {
  // Ensure that 'adminOrder[i]' is defined to avoid accessing properties on undefined
  if (adminOrder[i]) {
    money.push(adminOrder[i].totalPrice);
  }
}

let total = money.reduce((accumulator, currentValue) => {
  return accumulator + currentValue;
}, 0);

  return (
    <>
      <div className='dashboard-1 container'>
        <div className='card-color-1'>
          <div className='cards-logo-1'>
            <i class='fa-solid fa-file'></i>
          </div>
          <div className='dashboard-card-1'>
            <p>Total Orders</p>
            <h2>{adminOrder.length}</h2>
          </div>
        </div>
        <div className='card-color-2'>
          <div className='cards-logo-2'>
            <i class='fa-solid fa-cart-shopping'></i>
          </div>
          <div className='dashboard-card-1'>
            <p>Total Sales</p>
            <h2>&#8377; {total}</h2>
          </div>
        </div>
      </div>

      <div className='users-table container'>
        <h1 className='container' style={{ textAlign: "start" }}>
          Users
        </h1>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell>Delete User</TableCell>
                <TableCell>Name</TableCell>
                <TableCell align='right'>Email</TableCell>
                <TableCell align='right'>Role</TableCell>
                <TableCell align='right'>User Id</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {adminUsers.length > 0 ? (
                adminUsers?.map((user1) => (

                  <TableRow
                    // key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell scope='row'>
                        {user._id === user1._id ? <i aria-disabled={true} class='fa-solid fa-user-minus user-delete-logo-2'></i> 
                        : <i
                            onClick={() => {
                                deleteUserHandler(user1._id);
                            }}
                            class='fa-solid fa-user-minus user-delete-logo'
                        ></i>}
                    </TableCell>
                    <TableCell component='th' scope='row'>
                      {user1?.name}
                    </TableCell>
                    <TableCell align='right'>{user1?.email}</TableCell>
                    <TableCell align='right'>
                      <div class='dropdown'>
                        {user._id === user1._id ?<button
                          class='btn btn-light dropdown-toggle'
                          type='button'
                          data-bs-toggle='dropdown'
                          aria-expanded='false'
                          disabled={true}
                        >
                          {user1?.role}
                        </button> : <button
                          class='btn btn-light dropdown-toggle'
                          type='button'
                          data-bs-toggle='dropdown'
                          aria-expanded='false'
                        >
                          {user1?.role}
                        </button>}

                        <ul class='dropdown-menu'>
                          <li>
                            <a onClick={()=>updateUserHandler(user1._id,"user")} class='dropdown-item'>user</a>
                          </li>
                          <li>
                            <a onClick={()=>updateUserHandler(user1._id,"admin")}  class='dropdown-item'>admin</a>
                          </li>
                        </ul>
                      </div>
                    </TableCell>
                    <TableCell align='right'>{user1?._id}</TableCell>
                  </TableRow>

                ))
              ) : (
                <p style={{ textAlign: "start", marginTop: "2%" }}>
                  No users exist in this website !
                </p>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      <div className='orders-table container'>
        <h1 className='container' style={{ textAlign: "start" }}>
          Orders
        </h1>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell>Delete Order</TableCell>
                <TableCell>Order</TableCell>
                <TableCell align='right'>Ordered By</TableCell>
                <TableCell align='right'>Payment Status</TableCell>
                <TableCell align='right'>Total Price</TableCell>
                <TableCell align='right'>Order Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {adminOrder.length > 0 ? (
                adminOrder?.map((order) => (
                  <TableRow
                    key={order?._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell scope='row'>
                      <i
                        class='fa-solid fa-trash order-delete-logo'
                        style={{ color: "#ff0000" }}
                        onClick={()=>deleteOrderHandler(order?._id)}
                      ></i>
                    </TableCell>
                    <TableCell component='th' scope='row'>
                      <img
                        src={order?.orderItems[0]?.image}
                        className='dashboard-section-order-img'
                      />
                    </TableCell>
                    <TableCell align='right'>{order?.user}</TableCell>
                    <TableCell align='right'>
                      {order?.paymentInfo?.status}
                    </TableCell>
                    <TableCell align='right'>
                      &#x20B9; {order?.totalPrice}
                    </TableCell>
                    <TableCell align='right'>
                      <div class='dropdown'>
                        {order?.orderStatus === "Delivered" ?<button
                          class='btn btn-light dropdown-toggle'
                          type='button'
                          data-bs-toggle='dropdown'
                          aria-expanded='false'
                          disabled={true}
                        >
                          {order?.orderStatus}
                        </button> : <button
                          class='btn btn-light dropdown-toggle'
                          type='button'
                          data-bs-toggle='dropdown'
                          aria-expanded='false'
                        >
                          {order?.orderStatus}
                        </button>}
                        <ul class='dropdown-menu'>
                          <li>
                            <a onClick={()=>updateOrderHandler(order?._id,"Order Placed")} class='dropdown-item'>Order Placed</a>
                          </li>
                          <li>
                            <a onClick={()=>updateOrderHandler(order?._id,"Packed")} class='dropdown-item'>Packed</a>
                          </li>
                          <li>
                            <a onClick={()=>updateOrderHandler(order?._id,"Shipped")} class='dropdown-item'>Shipped</a>
                          </li>
                          <li>
                            <a onClick={()=>updateOrderHandler(order?._id,"Delivered")} class='dropdown-item'>Delivered</a>
                          </li>
                        </ul>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <p style={{ textAlign: "start", marginTop: "2%" }}>
                  No orders exsist in this website !
                </p>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      <Paper className='product-form container'>
        {showMessage && product && (
          <div class='alert alert-success' role='alert'>
            Your Product is listed successfully !
          </div>
        )}

        {showMessage && error && (
          <div class='alert alert-danger' role='alert'>
            Please fill all the details of product !
          </div>
        )}

        <h1 className='product-form-head'>Add Product +</h1>

        <div class='form-floating mb-3'>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type='name'
            class='form-control'
            id='floatingInput'
            placeholder='name@example.com'
          />
          <label for='floatingInput'>Name</label>
        </div>

        <div class='form-floating mb-3'>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type='email'
            class='form-control'
            id='floatingPassword'
            placeholder='Email'
          />
          <label for='floatingPassword'>Email</label>
        </div>

        <div class='form-floating mb-3'>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type='password'
            class='form-control'
            id='floatingPassword'
            placeholder='Password'
          />
          <label for='floatingPassword'>Password</label>
        </div>

        <div class='form-floating mb-3'>
          <input
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            type='category'
            class='form-control'
            id='floatingInput'
            placeholder='Category'
          />
          <label for='floatingInput'>Category</label>
        </div>

        <div class='form-floating mb-3'>
          <input
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            type='number'
            class='form-control'
            id='floatingInput'
            placeholder='number'
          />
          <label for='floatingInput'>Stock</label>
        </div>

        <div class='form-floating mb-3'>
          <input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            type='number'
            class='form-control'
            id='floatingPassword'
            placeholder='number'
          />
          <label for='floatingPassword'>Price</label>
        </div>

        <div class='mb-3'>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            class='form-control'
            id='exampleFormControlTextarea1'
            placeholder='Description'
            rows='3'
          ></textarea>
        </div>

        <div class='form-floating mb-3'>
          <input
            value={imageurl}
            onChange={(e) => setImageurl(e.target.value)}
            type='text'
            class='form-control'
            id='floatingInput'
            placeholder='url'
          />
          <label for='floatingInput'>Image URL</label>
        </div>

        <div class='form-floating mb-3'>
          <input
            value={imageid}
            onChange={(e) => setImageid(e.target.value)}
            type='text'
            class='form-control'
            id='floatingInput'
            placeholder='id'
          />
          <label for='floatingInput'>Image ID</label>
        </div>

        <div style={{ display: "flex", justifyContent: "start" }}>
          <button
            onClick={addProduct}
            type='button'
            class='btn btn-outline-success mb-3'
          >
            Submit
          </button>
        </div>
      </Paper>
    </>
  );
}
