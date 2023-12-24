import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import axios from 'axios';
import toast from 'react-hot-toast';
import {Select} from 'antd';
import { useNavigate,useParams } from 'react-router-dom';
const {Option}=Select;

const UpdateProduct = () => {
    const [id,setId]=useState('');
  const [categories,setCategories]=useState([]);
  const [category,setCategory]=useState([]);
  const [photo,setPhoto]=useState('');
  const [name,setName]=useState('');
  const [description,setDescription]=useState('');
  const [price,setPrice]=useState('');
  const [quantity,setQuantity]=useState('');
  const [shipping,setShipping]=useState('');
  const navigate=useNavigate();
  const params=useParams();


  //get single product
  const getSingleProduct=async()=>{
    try {
        const {data}=await axios.get(`http://localhost:8000/product/${params.slug}`);
        // console.log(data);
        setId(data.products.id);
        setName(data.products.product_name);
        setDescription(data.products.product_description);
        setPrice(data.products.product_price);
        setQuantity(data.products.product_quantity);
        setCategory(data.products.category_id);
        setShipping(data.products.product_shipping);
        setPhoto(data.products.product_photo);
    } catch (error) {
        console.log(error);
    }
  }
  useEffect(()=>{
    getSingleProduct();
    //eslint-disable-next-line
  },[photo]);
  //get all category
  const getAllCategory=async()=>{
    try {
        const {data}=await axios.get('http://localhost:8000/categories');
        if(data?.success){
          setCategories(data?.category);
        }
    } catch (error) {
        console.log(error);
        toast.error(`Something went wrong get category!`);
    }
  };
  const handleUpdate=async(e)=>{
    e.preventDefault();
    try {
        const productData=new FormData();
        productData.append('productName',name);
        productData.append('productDescription',description);
        productData.append('productPrice',price);
        productData.append('productQuantity',quantity);
        productData.append('productCategory',category);
        photo && productData.append('prouctPhoto',photo);
        const {data}=await axios.put(`http://localhost:8080/product/update-product/${id}`,productData);
        if(data.success){
          toast.success('Product Created Successfully.');
          navigate('/dashboard/admin/products');
        }else{
          toast.error(data?.message);
        }
    } catch (error) {
        console.log(error);
        toast.error('Something went wrong!');
    }
  }
  const handleDelete=async(e)=>{
    try {
        let answer=window.prompt('Are you sure you want to delete this?');
        if(!answer) return;
        const {data}=await axios.delete(`http://localhost:8080/api/v1/product/delete-product/${id}`);
        navigate('/dashboard/admin/products');
        toast.success('Product Deleted Successfully.');
    } catch (error) {
        console.log(error);
    }
    }
  useEffect(()=>{
    getAllCategory();
  },[]);
  return (
    <Layout>
      <div className='container-fluid m-3 p-4'>
        <div className='row'>
            <div className='col-md-3'>
                <AdminMenu/>
            </div>
            <div className='col-md-9'>
                <h1>Update Product</h1>
                <div className='m-1 w-75'>
                  <Select bordered={false} placeholder="Select a category" size='large' showSearch className='form-select mb-3' onChange={(value)=>{setCategory(value)}} value={category}>
                    {categories?.map(c=>(
                      <Option key={c._id} value={c._id}>{c.name}</Option>
                    ))}

                  </Select>
                  <div className='mb-3'>
                    <label className='btn btn-outline-secondary col-md-12'>
                      {photo && typeof photo!=='string'?photo.name:"Upload Photo"}
                      <input type='file' name='photo' accept='image/*' onChange={(e)=>setPhoto(e.target.files[0])} hidden/>
                    </label>
                  </div>
                  <div className='mb-3'>
                    {photo && typeof photo!=='string'?(
                      <div className='text-center'>
                        <img src={URL.createObjectURL(photo)} alt='' height={'200px'} className='img img-responsive'/>
                      </div>
                    ):(
                        <div className='text-center'>
                        <img src={`http://localhost:8000/images/${photo}`} alt='' height={'200px'} className='img img-responsive'/>
                      </div>
                    )}
                  </div>
                  <div className='mb-3'>
                    <input type='text' value={name} placeholder='write a name' className='form-control' onChange={(e)=>setName(e.target.value)}/>
                  </div>
                  <div className='mb-3'>
                    <input type='text' value={description} placeholder='write a description' className='form-control' onChange={(e)=>setDescription(e.target.value)}/>
                  </div>
                  <div className='mb-3'>
                    <input type='number' value={price} placeholder='write a price' className='form-control' onChange={(e)=>setPrice(e.target.value)}/>
                  </div>
                  <div className='mb-3'>
                    <input type='number' value={quantity} placeholder='write a quantity' className='form-control' onChange={(e)=>setQuantity(e.target.value)}/>
                  </div>
                  <div className='mb-3'>
                    <Select bordered={false} placeholder='Select Shipping' size='large' showSearch className='form-select mb-3' onChange={(value)=>{setShipping(value);}} value={shipping?'yes':'no'}>
                      <Option value='0'>No</Option>
                      <Option value='1'>Yes</Option>
                    </Select>
                  </div>
                  <div className='mb-3'>
                    <button className='btn btn-primary' onClick={handleUpdate}>Update Product</button>
                  </div>
                  <div className='mb-3'>
                    <button className='btn btn-danger' onClick={handleDelete}>Delete Product</button>
                  </div>
                </div>
            </div>
        </div>
      </div>

    </Layout>
)
}

export default UpdateProduct