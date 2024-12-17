import React, { useEffect, useState} from 'react'
import Product from './Product'
import '../css/Allproducts.css'
import { useDispatch , useSelector } from 'react-redux'
import { getProductAction } from '../../Actions/productActions'

export default function AllProducts() {
  const dispatch = useDispatch()
  const { loading , error , products } = useSelector(state => state.products)

  console.log(products,"products");

  useEffect(()=>{
    dispatch(getProductAction())
  },[dispatch,error])


  return (
    <div>
      <h1 className='products-title'>Products</h1>

      { loading ? 
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div> 
      : <div className='main-all-products'>
              { products ? products.map((product)=>{
              return <Product key={product.index} product={product} />
              }) : <div>There is some error in fetching products</div>}
        </div>
      }
    </div>
  )
}
