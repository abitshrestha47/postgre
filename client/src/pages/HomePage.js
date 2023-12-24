import React, { useState,useEffect } from 'react'
import Layout from '../components/Layout/Layout'
import axios from 'axios';
import { useAuth } from '../context/auth';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import LandingPage from './LandingPage';

const HomePage = () => {
  const [products,setProducts]=useState([]);
  const [auth,setAuth]=useAuth();
  const [loading,setLoading]=useState(false);
  const navigate=useNavigate();
  const checkAuth=async()=>{
    try {
      const res=await axios.get('http://localhost:8000/user-auth');  
      if(res.data.ok){
        return true;
      }
    } catch (error) {
      console.log(error);
      navigate('/login');
    }
  }
  const handleCart=async(productId)=>{
    const authenticated=await checkAuth();
    if(authenticated){
      try {
        const userId=auth?.user?.userId;
        const {data}=await axios.post('http://localhost:8000/carts',{userId,productId});
        if(data.success){
          toast.success('Product added to cart.');
        }
        } catch (error) {
        console.log(error);
        if(error.response.status===409){
          toast.error('Product Already Added! Goto Carts Page.');
        }
      }
    } 
  }


  //get products
  const getAllProducts=async()=>{
    try {
        setLoading(true);
        const {data}=await axios.get(`http://localhost:8000/products`);
          setLoading(false);
        setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  useEffect(()=>{
    getAllProducts();
  },[]);
  return (
    <Layout>
      <div className='row'>
        <div className='col-md-12'>
          <LandingPage/>
        </div>
      </div>
      <div className='row mt-3'>
        <div className='col-md-2'>
        </div>
        <div className='col-md-9'>
          <h1 className='text-center'>All Products</h1>
          <div className='d-flex flex-wrap'>  
                {products?.map(p=>(
                    <div className="card m-2" style={{width: '18rem'}} key={p.id}>
                        <img src={`upda`} className="card-img-top" alt={p.product_name}/>
                        <div className="card-body">
                            <h5 className="card-title">{p.product_name}</h5>
                            <p className="card-text">{p.product_description.substring(0,30)}...</p>
                            <p className="card-text"> Rs. {p.product_price}</p>
                            <button className='btn btn-primary ms-1'>More Details</button>
                            <button className='btn btn-secondary ms-1' onClick={()=>handleCart(p.id)} >Add to cart</button>
                        </div>
                    </div>
                ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default HomePage;