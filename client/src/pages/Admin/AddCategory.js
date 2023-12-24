import React,{useEffect,useState} from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import toast from 'react-hot-toast';
import axios from 'axios';
import CategoryForm from '../../components/Form/CategoryForm';
import { Modal } from  'antd';

const CreateCategory = () => {
  const [categories,setCategories]=useState([]);
  const [name,setName]=useState('');
  const [description,setDescription]=useState('');
  const [visible,setVisible]=useState(false);
  const [selected,setSelected]=useState(null);
  const [updatedName,setUpdatedName]=useState("");
  const [updatedDescription,setUpdatedDescription]=useState('');
  const handleSubmit=async (e)=>{
    e.preventDefault();
    try {
      const {data}=await axios.post('http://localhost:8000/categories',{categoryName:name,categoryDescription:description});
      if(data?.success){
        toast.success(`${name} is created.` );
        setName('');
        setDescription('');
        getAllCategory();   
      }else{
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong!');
    }
  }
  //handle form
  const getAllCategory=async()=>{
    try {
        const {data}=await axios.get('http://localhost:8000/categories');
        if(data.success){
          setCategories(data.categories);
        }
    } catch (error) {
        console.log(error);
        toast.error(`Something went wrong get category!`);
    }
  };
  useEffect(()=>{
    getAllCategory();
  },[]);
  // update category
  const handleUpdate=async(e)=>{
    e.preventDefault();
    try {
        const {data}=await axios.put(`http://localhost:8000/categories/${selected.id}`,{categoryName:updatedName,categoryDescription:updatedDescription});
        if(data.success){
          toast.success(`${updatedName} updated successfully.`);
          setSelected(null);
          setUpdatedName('');
          setVisible(false);
          getAllCategory();
        }else{
          toast.error(data.message);
        }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong!');
    }
  }
    // delete category
    const handleDelete=async(id)=>{
      try {
          const {data}=await axios.delete(`http://localhost:8000/categories/${id}`);
          if(data.success){
            toast.success(`Category is deleted.`);
            getAllCategory();
          }else{
            toast.error(data.message);
          }
      } catch (error) {
        console.log(error);
        toast.error('Something went wrong!');
      }
    }
  return (
    <Layout>
        <div className='container-fluid m-3 p-4'>           
          <div className='row'>
              <div className='col-md-3'>
                  <AdminMenu/>
              </div>
              <div className='col-md-6'>
                  <h1>Manage Category</h1>
                  <div className='p-3'>
                    <CategoryForm handleSubmit={handleSubmit} name={name} setName={setName} description={description} setDescription={setDescription}/>
                  </div>
                 <div>
                  <div className='w-75'>
                        <table className="table">
                          <thead>
                            <tr>
                              <th scope="col">Name</th>
                              <th scope="col">Description</th>
                              <th scope="col">Action</th>
                            </tr>
                          </thead>
                          <tbody>   
                              {categories?.map((c)=>(
                                  <tr key={c.id}>
                                    <td>{c.category_name}</td>
                                    <td>{c.category_description}</td>
                                    <td>
                                      <button className='btn btn-primary ms-2' onClick={()=>{setVisible(true);setUpdatedName(c.category_name);setUpdatedDescription(c.category_description);setSelected(c);}}>Edit</button>
                                      <button className='btn btn-danger ms-2' onClick={()=>{handleDelete(c.id)}}>Delete</button>
                                    </td>
                                  </tr>
                              ))}
                          </tbody>
                        </table>
                  </div>
                </div> 
                <Modal onCancel={()=>setVisible(false)} footer={null} open={visible}><CategoryForm name={updatedName} setName={setUpdatedName} handleSubmit={handleUpdate} description={updatedDescription} setDescription={setUpdatedDescription}/></Modal>
              </div>
          </div>  
        </div>
    </Layout>
  )
}

export default CreateCategory