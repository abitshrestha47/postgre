import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/auth'
import axios from 'axios';
import Layout from '../../components/Layout/Layout';
import toast from 'react-hot-toast';

const CartPage = () => {
    const [auth, setAuth] = useAuth();
    const [carts, setCarts] = useState([]);
    const navigate = useNavigate();

    const getProductDetails = async (productId) => {
        try {
            const { data } = await axios.get(`http://localhost:8000/products/${productId}`);
            return data.products;
        } catch (error) {
            console.error(`Error fetching product details for product ID ${productId}:`, error);
            return null;
        }
    };

    const removeCartItem=async(pId)=>{
        try {
            const {data}=await axios.delete(`http://localhost:8000/carts/user/${pId}`);
            getCarts(); 
            if(data.success){
                toast.success('Cart Deleted Successfully');
            }
        } catch (error) {
            console.log(error);   
        }
    }

    const getCarts = async () => {
        try {
            const userId = auth?.user?.userId;
            if (!userId) {
                return;
            }
            const { data } = await axios.get(`http://localhost:8000/carts/${userId}`);
            const cartDetails = await Promise.all(
                data.carts.map(async (cart) => {
                    const productDetails = await getProductDetails(cart.product_id);
                    return { ...cart, productDetails };
                })
            );
            setCarts(cartDetails);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getCarts();
    }, [auth]);
    return (
        <Layout>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-12 mt-4'>
                        <h1 className='text-center p-2'>
                            {`Hello,${auth?.token && auth?.user?.username}`}<br></br>{!auth?.token?'Your carts will appear here!Please login first.':''}
                        </h1>
                        <h4 className='text-center mt-1'>
                        </h4>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-8'>
                        {
                            carts?.map(product => (
                                    <div className='row mb-2 card flex-row p-4'>
                                        <div className='col-md-3'>
                                            <img src={`http://localhost:8000/images/${product.productDetails.product_photo}`} className="card-img-top cartImage" alt={product.productDetails.product_name} />
                                        </div>
                                        <div className='col-md-9'>
                                            <p>{product.productDetails.product_name}</p>
                                            <p>{product.productDetails.product_description.substring(0, 30)}</p>
                                            <p>{product.productDetails.product_price}</p>
                                            <button className='btn btn-danger' onClick={()=>{removeCartItem(product.id)}}>Remove</button>
                                        </div>
                                    </div>
                            ))
                        }
                    </div>
                    <div className='col-md-4 text-center'>
                        <h4>Cart summary</h4>
                        <p>Total | Checkout | Payment</p>
                        <hr />
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default CartPage