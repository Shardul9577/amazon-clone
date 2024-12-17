import React from 'react'
import '../css/Product.css'
import { useNavigate } from 'react-router-dom';

export default function Product({ product }) {

  console.log(product , "product");
  let navigate = useNavigate()

  const checkOutHandler = (e)=>{
    e.preventDefault()
    navigate(`/products/detail/${product._id}`)
  }

  return (
      <div key={product.index} class="product-card card">
          <div className='card-images-general-div'>
            <img src={product.images.url} class="card-images-general" alt={product.images.url}/>
          </div>
        <div class="card-body">
            <h5 class="card-title">{product.name}</h5>
            <p class="card-text">{product.description}</p>
            <div className='btn-div'>
              <a onClick={checkOutHandler} class="btn btn-card btn-primary">CHECK OUT</a>
            </div>
        </div>
      </div>
  )
}
