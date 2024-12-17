import React, { useEffect, useState } from 'react'
import '../../css/ProductsPage.css'
import { useDispatch , useSelector } from 'react-redux'
import { getProductAction } from '../../../Actions/productActions'
import Product2 from './Product2'
import { useNavigate , useParams } from 'react-router-dom';
import Pagination from "react-js-pagination";
import Slider from '@mui/material/Slider';

export default function ProductsPage() {

  let navigate = useNavigate()

  const dispatch = useDispatch()

  const { loading , error , products , numOfPdt , productCount} = useSelector(state => state.products)
  // console.log(products,"products");


  // PRICE SECTION____________________________________________________________________________________

  const [price,setPrice] = useState(25000)

  const priceHandler = (event,newPrice)=>{
    setPrice(newPrice)
  }

  // PAGINATION SECTION____________________________________________________________________________________

  const [currPage,setCurrPage] = useState(1)

  // console.log(currPage,numOfPdt,productCount , "necessary details");

  const pageHandler = (e)=>{
    setCurrPage(e)
  }

  // SEARCH SECTION____________________________________________________________________________________

  const [keyword,setKeyword] = useState("")

  const keywordSubmitHandler = (e)=>{
    e.preventDefault()
    if (keyword.trim()) {
      navigate(`/products/${keyword}`)
    } else {
      navigate(`/products`) 
    }
  }
  const params = useParams();
  const searchKeyword = params.keyword;


  // CATEGORY SECTION____________________________________________________________________________________

  let categories = [
    "Mobile",
    "Laptop",
    "TV"
  ]
  const [specificCategory,setSpecificCategory] = useState("");

  // API SECTION____________________________________________________________________________________

  useEffect(()=>{
    dispatch(getProductAction(searchKeyword,currPage,price,specificCategory))
  },[dispatch,error,searchKeyword,currPage,price,specificCategory])


  return (
    <>
    <form class="d-flex container" onSubmit={keywordSubmitHandler} style={{marginTop:"5%" , boxShadow: "0px -1px 25px rgb(155 155 155 / 84%)" , padding:"1%" , borderRadius: "10px"}} role="search">
      <input class="form-control me-2" onChange={(e)=> setKeyword(e.target.value)} type="search" placeholder="Search" aria-label="Search" style={{backgroundColor:"#fff",color:"black" , border:"2px solid black"}}/>
      <button class="btn btn-outline-success" type="submit">Search</button>
    </form>
    <div className='all-products-section container'>
      <div className='all-products-section-1 container'>
        <h1>Filters</h1>
        <hr className='container'></hr>
        <div class="accordion filters-section" id="accordionPanelsStayOpenExample">

          <div class="accordion-item">
            <h2 class="accordion-header">
              <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
                Price
              </button>
            </h2>
            <div id="panelsStayOpen-collapseOne" class="accordion-collapse collapse show">
              <div class="accordion-body">
                <label for="customRange1" class="form-label">Price Range</label>
                <Slider aria-label="Price" onChange={priceHandler} value={price} defaultValue={25000} valueLabelDisplay="auto" step={1000} marks min={0} max={25000}/>
              </div>
            </div>
          </div>
          <div class="accordion-item">
            <h2 class="accordion-header">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false" aria-controls="panelsStayOpen-collapseTwo">
                Product Type
              </button>
            </h2>
            <div id="panelsStayOpen-collapseTwo" class="accordion-collapse collapse">
              <div class="accordion-body">
                <ul>
                {categories.map((category) => (
                  <li onClick={() => setSpecificCategory(category)} className="category-selector">{category}</li>
                ))}
                </ul>
                {/* <div class="form-check">
                  <input class="form-check-input" onClick={categoryHandler("Refrigerator")} type="checkbox" value="" id="flexCheckDefault"/>
                  <label class="form-check-label" for="flexCheckDefault">
                    Refrigerator
                  </label>
                </div> */}
              </div>
            </div>
          </div>

        </div>
      </div>
      <div className='all-products-section-2 container'>
        <h1>Products</h1>
        <hr className='container'></hr>
          { 
          loading ? 
              <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
              </div> 
            : 
            <div className='main-all-products'>
                    { products.length > 0 ? products.map((product)=>{
                    return <Product2 key={product.index} product={product} />
                    }) : 
                    <div style={{display:"flex" , flexDirection:"column", marginTop:"5%"}}>
                    <div className='error-detail'>There are no products available for this condition right now !</div>
                    <div className='error-image-div'><img className='error-image' src='https://png.pngtree.com/png-vector/20220616/ourmid/pngtree-sad-apologizing-emoticon-holding-a-sign-with-the-text-sorry-png-image_5103588.png'></img></div>
                    </div>
                    }
            </div>
          }

        { products.length > 0 && <div className='productspage-pagination'>
          <Pagination
            activePage={currPage}
            itemsCountPerPage={numOfPdt}
            totalItemsCount={productCount}
            pageRangeDisplayed={3}
            onChange={pageHandler}  
            prevPageText={<i class="fa-solid fa-angle-left" ></i>}	
            firstPageText={<i class="fa-solid fa-backward" ></i>}	
            lastPageText={<i class="fa-solid fa-forward" ></i>}
            nextPageText={<i class="fa-solid fa-angle-right" ></i>}
            innerClass={"pagination"}
            itemClass={"pagination-items"}
            linkClass={"pagination-items-links"}
            linkClassFirst={"pagination-items-links"}
            linkClassPrev={"pagination-items-links"}
            linkClassNext={"pagination-items-links"}
            linkClassLast={"pagination-items-links"} 
            
            activeLinkClass={"pagination-active-item"}
            itemClassFirst={"pagination-items-first"}
            itemClassPrev={"pagination-items-prev"}	
            itemClassNext={"pagination-items-next"}
            itemClassLast={"pagination-items-last"}  
          />
        </div>}

      </div>
    </div>
    </>
  )
}
