import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getProductDetailAction,
  getProductCommentAction,
} from "../../Actions/productActions";
import { useParams } from "react-router-dom";
import "../css/ProductDetail.css";
import Rating from "@mui/material/Rating";
import ReviewCard from "./ReviewCard";
import { getOrderSubmitAction } from '../../Actions/orderActions'

function ProductDetail() {

  const { _id } = useParams();
  const dispatch = useDispatch();
  const { comment } = useSelector((state) => state.productReview);
  const { user } = useSelector((state) => state.userDetail);

  // console.log("userRegister=>>>>>>>>>",userRegister);

  // console.log("id=>>>>>>>>>>>",_id);

  useEffect(() => {
    dispatch(getProductDetailAction(_id));
  }, [dispatch, _id]);

  const { product } = useSelector((state) => state.productDetail);

  const [ratings, setRatings] = useState([]);
  const [value, setValue] = useState(0);
  const [rateValue, setRateValue] = useState(0);
  const [addComment, setAddComment] = useState("");
  const [productReviews, setProductReviews] = useState({});

  const reviewSubmitHandler = async () => {
    try {
      let name = user.name;
      await dispatch(getProductCommentAction(_id, rateValue, addComment, name));

      setAddComment("")
      setRateValue(0)

    } catch (error) {
      // Handle any errors, such as by displaying an error message to the user
      // console.log("Failed to submit comment:", error);
      alert("There was an error submitting your comment. Please try again.");
    }
  };

  // _____________________________________________________________
  // Instant product after comment passed

  useEffect(()=>{

    if (Object.keys(comment).length > 0) {
      setProductReviews({...comment.SpecificProduct});
      console.log("comment seted ==================>");
    } else {
      setProductReviews({...product});
      console.log("product seted ==================>");
    } 

  },[setProductReviews,product,comment])

  // _____________________________________________________________
  // rating

  useEffect(() => {
    console.log("product hiii",product);
    const newRatings = product?.reviews?.map((review) => review.review.rating) || [];
    setRatings(newRatings);
  }, [product?.reviews]);

  // _____________________________________________________________
  // rating

  useEffect(() => {
    let rateSum = 0;
    const length = ratings?.length || 0; // Use optional chaining with a fallback

    for (let i = 0; i < length; i++) {
      rateSum += ratings[i];
    }

    const reviewStars = length > 0 ? rateSum / length : 0;

    // console.log("reviewStars======>", reviewStars);

    setValue(reviewStars);
  }, [ratings]); // Assuming `ratings` itself should trigger the effect



  // _____________________________________________________________

  // console.log("comment======>", comment);
  // console.log("product======>", product);
  // console.log("productReviews======>", productReviews);

  // console.log(productReviews.reviews,"<========productReviews");


// _____________________________________________________________________________________________________________________
// _____________________________________________________________________________________________________________________
// _____________________________________________________________________________________________________________________
// _____________________________________________________________________________________________________________________
// _____________________________________________________________________________________________________________________
// _____________________________________________________________________________________________________________________
// ___________________________________order section_____________________________________________________________________

const { order , error } = useSelector((state) => state.orderRegister);
const [address,setAddress] = useState("")
const [city,setCity] = useState("")
const [state,setState] = useState("")
const [country,setCountry] = useState("")
const [pincode,setPincode] = useState("")
const [phoneno,setPhoneno] = useState("")
const [quantity,setQuantity] = useState(0)
const taxprice = 500
const shipPrice = 200
let quan ;
const [orderErrMsg,setOrderErrMsg] = useState("")

const quantityAddHandler = ()=>{
  quan = quantity + 1

  setQuantity(quan)
}
const quantitySubHandler = ()=>{
  quan = quantity - 1

  setQuantity(quan)
}

 console.log("product order =========>",product); 

  const credentials = {
    shippingInfo:{
        address:address,
        city:city,
        state:state,
        country:country,
        pincode:pincode,
        phoneno:phoneno
    },
    orderItems:[
        {
            name:product.name,
            price:product.price,
            quantity:quantity,
            image:product?.images?.url,
            product:product._id
        }
    ],
    paymentInfo:{
        id:"payment12345",
    },
    itemPrice:product.price* quantity + taxprice* quantity ,
    taxPrice:taxprice,
    shippingPrice:shipPrice,
    totalPrice:product.price* quantity + taxprice* quantity + shipPrice,
    deliveredAt:12
  }

  const orderHandler = async()=>{

    await dispatch(getOrderSubmitAction(credentials))

  }

  useEffect(()=>{
    if (error) {
      setOrderErrMsg(`${error.message} : Please fill all the details correctly !`)
    }
    else if (order) {
      setAddress("")
      setCity("")
      setState("")
      setCountry("")
      setPincode("")
      setPhoneno("")
      setQuantity(0)
    }
  },[error,order])

  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    if (order || error) {
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
      }, 5000); // 5000 milliseconds = 5 seconds
    }
  }, [order, error]);

  return (
    <div>
      <div key={product?._id} className='product-detail-box-1 container'>
        <div className='product-image'>
          {product?.images && (
            <img className='main-detail-img' src={product.images.url} />
          )}
        </div>

        <div className='product-details'>
          <p
            style={{
              color: "#6c757d",
              fontFamily: "Oswald, sans-serif",
              fontOpticalSizing: "auto",
              fontWeight: 500,
              fontStyle: "normal",
            }}
          >
            {product?.category}
          </p>
          <h1>{product?.name}</h1>
          <Rating name='read-only' value={value} readOnly />
          <p>{product?.numOfReview} reviews</p>
          <hr></hr>
          <p className={product?.stock > 1 ? "green" : "red"}>
            {product?.stock > 1 ? <>Instock</> : <>Out of stock</>}
          </p>
          <hr></hr>
          <h3>&#8377;{product?.price}</h3>
          <hr></hr>
          <div className='product-details-quantity'>
            <button
              type='button'
              class='btn product-details-btn btn-outline-dark'
              onClick={quantityAddHandler}
            >
              +
            </button>
            <input value={quantity} type='Number' onChange={(e)=>setQuantity(e.target.value)} className='product-details-input' />
            { quantity === 0 ? <button
              type='button'
              class='btn product-details-btn btn-outline-dark'
              onClick={quantitySubHandler}
              disabled={true}
            >
              -
            </button> : <button
              type='button'
              class='btn product-details-btn btn-outline-dark'
              onClick={quantitySubHandler}
            >
              -
            </button>}
          </div>
          <div style={{display:"flex" , flexDirection:"column"}}>
          {user && quantity > 0  ? <button type='button' class='btn btn-danger add-to-cart-btn'>
            Add to cart
          </button> : <button disabled type='button' class='btn btn-danger add-to-cart-btn'>
            Add to cart
          </button>}
          {user && quantity > 0 ? <button  type='button' class='btn btn-primary add-to-cart-btn' data-bs-toggle="modal" data-bs-target="#exampleModal">
            Order Now
          </button> : <button disabled type='button' class='btn btn-primary add-to-cart-btn' data-bs-toggle="modal" data-bs-target="#exampleModal">
            Order Now
          </button> }
          </div>
          <hr></hr>
          <p>{product?.description}</p>
        </div>
      </div>  

{/* ____________________________order form start____________________________________________________ */}

      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            { showMessage && order && <div class="alert alert-success" role="alert">
              Order is placed Successfully!
            </div>}
            { showMessage && error && <div class="alert alert-danger" role="alert">
              {orderErrMsg}
            </div>}
            <div class="modal-dialog">
                          <div class="modal-content">
                              <div class="modal-header">
                                  <h1 class="modal-title fs-5" id="exampleModalLabel">Address</h1>
                                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                              </div>

                              <div class="modal-body">
                                <form>
                                  <div class="form-floating mb-3">
                                    <input onChange={(e)=>setAddress(e.target.value)} type="text" class="form-control" id="floatingInput" placeholder="34 anmol 2 sahara township"/>
                                    <label for="floatingInput">Address</label>
                                  </div>
                                  <div class="form-floating mb-3">
                                    <input onChange={(e)=>setCity(e.target.value)} type="text" class="form-control" id="floatingInput" placeholder="City"/>
                                    <label for="floatingInput">City</label>
                                  </div>
                                  <div class="form-floating mb-3">
                                    <input onChange={(e)=>setState(e.target.value)} type="text" class="form-control" id="floatingInput" placeholder="State"/>
                                    <label for="floatingInput">State</label>
                                  </div>
                                  <div class="form-floating mb-3">
                                    <input onChange={(e)=>setCountry(e.target.value)} type="text" class="form-control" id="floatingInput" placeholder="Country"/>
                                    <label for="floatingInput">Country</label>
                                  </div>
                                  <div class="form-floating mb-3">
                                    <input onChange={(e)=>setPincode(e.target.value)} type="text" class="form-control" id="floatingInput" placeholder="384002"/>
                                    <label for="floatingInput">Pincode</label>
                                  </div>
                                  <div class="form-floating mb-3">
                                    <input onChange={(e)=>setPhoneno(e.target.value)} type="text" class="form-control" id="floatingInput" placeholder="7801*****"/>
                                    <label for="floatingInput">Phone No</label>
                                  </div>
                                </form>
                              </div>

                              <div class="modal-footer">
                                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                  <button type="button" onClick={orderHandler} class="btn btn-primary">Order</button>
                              </div>
                          </div>
            </div>
      </div>

{/* ____________________________order form end____________________________________________________ */}


    {user? 
      <>
      <div className='product-add-review-section container'>
        <h1 className='product-add-review-head'>Add Review</h1>
        <hr className='container' />
        <p style={{ textAlign: "start" }}>Add Comment:</p>
        <textarea
          value={addComment}
          onChange={(e) => setAddComment(e.target.value)}
          className='form-control'
          id='exampleFormControlTextarea1'
          rows='2'
        ></textarea>
        <p style={{ textAlign: "start", marginTop: "2%" }}>Rating:</p>
        <div style={{ display: "flex", justifyContent: "start" }}>
          <Rating
            name='simple-controlled'
            style={{ marginBottom: "2%" }}
            value={rateValue}
            onChange={(event, newValue) => {
              setRateValue(newValue);
            }}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "start",
            paddingBottom: "1%",
          }}
        >
          <button
            onClick={reviewSubmitHandler}
            type='button'
            className='btn btn-outline-dark'
          >
            Submit
          </button>
        </div>
      </div>
      </> 
    : <div
    className='alert alert-danger container'
    role='alert'
    style={{ marginTop: "5%" }}
  >
    You cannot give a review because you have not logged in !
      </div> }

      {productReviews?.reviews?.length ? (
        <div className='product-review-section container'>
          <h1 className='reviews-heading'>Reviews</h1>
          {productReviews.reviews.map((review) => {
            return <ReviewCard review={review} />;
          })}
        </div>
      ) : (
          <div
            style={{
              textAlign: "center",
              marginTop: "10%",
              marginBottom: "10%",
            }}
          >
            No review exist !
          </div>
        )}


    </div>
  );
}

export default ProductDetail;