import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout'
import toast from 'react-hot-toast';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password,setPassword]=useState('');
    const navigate = useNavigate();
    //form sumbission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`http://localhost:8000/signup`, { username, email, password });
            if (res && res.data.success) {
                toast.success(res.data.message);
                navigate('/login');
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong');
        }
    }

    return (
        <Layout title={'Register App'}>
            <div className='register'>
                <h1>Register Page</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <input type="username" value={username} onChange={(e) => setUsername(e.target.value)} className="form-control" id="exampleInputUsername" placeholder='enter your username...' required />
                    </div>
                    <div className="mb-3">
                        <input type="Email" onChange={(e) => setEmail(e.target.value)} className="form-control" id="exampleInputEmail" placeholder='enter your email...' value={email} required />
                    </div>
                    <div className="mb-3">
                        <input type="password" onChange={(e) => setPassword(e.target.value)} className="form-control" id="exampleInputpassword" placeholder='enter your password...' value={password} required />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </Layout>
    )
}

export default Register