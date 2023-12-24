import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import axios from 'axios';
import toast from 'react-hot-toast';
import {Select} from 'antd';
import { useNavigate } from 'react-router-dom';
const {Option}=Select;

const CreateProduct = () => {
  const [categories,setCategories]=useState([]);
  const [category,setCategory]=useState([]);
  const [photo,setPhoto]=useState('');
  const [name,setName]=useState('');
  const [description,setDescription]=useState('');
  const [price,setPrice]=useState('');
  const [quantity,setQuantity]=useState('');
  const [shipping,setShipping]=useState('');
  const navigate=useNavigate();


  //get all category
  const getAllCategory=async()=>{
    try {
        const {data}=await axios.get('http://localhost:8000/categories');
        if(data?.success){
          setCategories(data?.categories);
        }
    } catch (error) {
        console.log(error);
        toast.error(`Something went wrong get category!`);
    }
  };
  const handleCreate=async(e)=>{
    e.preventDefault();
    try {
        const productData=new FormData();
        productData.append('productName',name);
        productData.append('productDescription',description);
        productData.append('productPrice',price);
        productData.append('productQuantity',quantity);
        productData.append('categoryId',category);
        productData.append('productPhoto',photo);
        productData.append('productShipping',shipping);
        const {data}=await axios.post('http://localhost:8000/products',productData);
        if(data.success){
          toast.success('Product Created Successfully.');
        //   navigate('/dashboard/admin/products');
        }else{
          toast.error(data?.message);
        }
    } catch (error) {
        console.log(error);
        toast.error('Something went wrong!');
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
                <h1>Create Product</h1>
                <div className='m-1 w-75'>
                  <Select bordered={false} placeholder="Select a category" size='large' showSearch className='form-select mb-3' onChange={(value)=>{setCategory(value)}}>
                    {categories?.map(c=>(
                      <Option key={c.id} value={c.id}>{c.category_name}</Option>
                    ))}

                  </Select>
                  <div className='mb-3'>
                    <label className='btn btn-outline-secondary col-md-12'>
                      {photo?photo.name:"Upload Photo"}
                      <input type='file' name='photo' accept='image/*' onChange={(e)=>setPhoto(e.target.files[0])} hidden/>
                    </label>
                  </div>
                  <div className='mb-3'>
                    {photo &&(
                      <div className='text-center'>
                        <img src={URL.createObjectURL(photo)} alt='' height={'200px'} className='img img-responsive'/>
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
                    <Select bordered={false} placeholder='Select Shipping' size='large' showSearch className='form-select mb-3' onChange={(value)=>{setShipping(value);}}>
                      <Option value='0'>No</Option>
                      <Option value='1'>Yes</Option>
                    </Select>
                  </div>
                  <div className='mb-3'>
                    <button className='btn btn-primary' onClick={handleCreate}>Create Product</button>
                  </div>
                </div>
            </div>
        </div>
      </div>

    </Layout>
)
}

export default CreateProduct