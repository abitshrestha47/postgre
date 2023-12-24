import React,{useState} from 'react'
import Layout from '../../components/Layout/Layout'
import toast from 'react-hot-toast';

import axios from 'axios';
import { useNavigate,useLocation } from 'react-router-dom';
import { useAuth } from '../../context/auth';

const Login = () => {
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [auth,setAuth]=useAuth();
    const navigate=useNavigate();
    //form sumbission
    const handleSubmit=async (e)=>{
        e.preventDefault();
        try {
            const res=await axios.post(`http://localhost:8000/login`,{email,password});
            console.log(res.data);
            if(res && res.data.success){    
                toast.success(res.data.message);
                setAuth({
                    ...auth ,user:res.data.user,token:res.data.token,
                })
                localStorage.setItem('auth',JSON.stringify(res.data));
                navigate('/');
            }else{
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong');
        }
    }

  return (
<Layout title={'Register App'}>
        <div className='login'>
        <h1>Login Page</h1>
        <form onSubmit={handleSubmit}>
        <div className="mb-3">
            <input type="Email" onChange={(e)=>setEmail(e.target.value)} className="form-control" id="exampleInputEmail" placeholder='enter your email...' value={email} required/>
        </div>
        <div className="mb-3">
            <input type="password" onChange={(e)=>setPassword(e.target.value)} className="form-control" id="exampleInputPassword1" placeholder='enter your password...' value={password} required/>
        </div>
        <div className='mb-3'>
        <button type="button" className="btn btn-primary" onClick={()=>navigate('/forgot-password')}>forget Password?</button>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
        </form>
        </div>
    </Layout>   
  )
}

export default Login