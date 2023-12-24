import React, { useEffect, useState } from 'react'
import AdminMenu from '../../components/Layout/AdminMenu'
import Layout from '../../components/Layout/Layout';
import toast from 'react-hot-toast';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Products = () => {
    const [products,setProducts]=useState([]);
    const getAllProducts=async()=>{
        try {
            const {data}=await axios.get('http://localhost:8000/products');
            setProducts(data.products);
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong!');
        }
    }
    useEffect(()=>{
        getAllProducts();
    },[]);
  return (
    <Layout>
        <div className='row'>
            <div className='col-md-3'>
                <AdminMenu/>
            </div>
            <div className='col-md-9'>
                <h1 className='text-center'>All Products List</h1>
                <div className='d-flex'>
                    {products?.map(p=>(
                        <Link key={p.id} to={`/dashboard/admin/product/${p.product_slug_name}`} className='product-link'>
                        <div className="card m-2" style={{width: '18rem'}} key={p._id}>
                            <img src={`http://localhost:8000/images/${p.product_photo}`} className="card-img-top" alt={p.product_name}/>
                            <div className="card-body">
                                <h5 className="card-title">{p.product_name}</h5>
                                <p className="card-text">{p.product_description}</p>
                            </div>
                        </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    </Layout>
  )
}

export default Products