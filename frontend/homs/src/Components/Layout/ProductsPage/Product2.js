import React from 'react'
import '../../css/Product2.css'
import { useNavigate } from 'react-router-dom';

export default function Product2({ product }) {

    console.log(product , "product");
    let navigate = useNavigate()
  
    const checkOutHandler = (e)=>{
      e.preventDefault()
      navigate(`/products/detail/${product._id}`)
    }

  return (
    <div>
      <div key={product.index} class="product-2-card card">
          <div className='product-2-card-images-general-div'>
            <img src={product.images.url} class="card-2-images-general" alt={product.images.url}/>
          </div>
        <div class="card-2-body">
            <h5 class="card-2-title">{product.name}</h5>
            <p class="card-2-text">{product.description}</p>
            <div className='btn-2-div'>
              <a onClick={checkOutHandler} class="btn btn-card btn-primary">CHECK OUT</a>
            </div>
        </div>
      </div>
    </div>
  )
}
