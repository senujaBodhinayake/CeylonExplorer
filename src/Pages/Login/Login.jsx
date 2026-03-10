import React, { useState,useEffect } from 'react'
import './Login.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Login = () => {
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [name,setName]= useState('');
    const [isSignup,setIsSignup]=useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
  const [userData, setUserData] = useState(null); // State to store fetched data
  const [loading, setLoading] = useState(false);
    

    const handlesubmit= async(e) =>{
        e.preventDefault();
        setError('');
        setLoading(true);
        if(isSignup)
        {
            if(name && email && password)
           try {
            const response = await axios.post('http://localhost:5000/sign-up', { name, email, password });
            console.log(response);
            alert("Registration successful!");
          setLoading(false);
          }
        
            catch (err) {
             setError(err.response?.data?.error || "An error occurred");
             setLoading(false);
            }
          
            else{
                setError("please fill all fields.");
                setLoading(false);
            }
        }
        else{
            try{
              const response = await axios.post('http://localhost:5000/login', { email, password });
              console.log(response);
          alert("Login successful!")
          navigate('/');
        }
          catch (err) {
            setError(err.response?.data?.error || "An error occurred");
            setLoading(false);
          }
      }
      
      
        
    }
    
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/user-data'); // Example API to fetch user data
        setUserData(response.data); // Set the fetched data in state
      } catch (err) {
        setError(err.response?.data?.error || 'An error occurred while fetching user data');
      }
    };
    useEffect(() => {
      if (name&&email && password) {
        fetchData(); // Fetch data on initial load or after login
      }
    }, [name,email, password]);
    useEffect(() => {
      if (email && password) {
        fetchData(); // Fetch data on initial load or after login
      }
    }, [email, password]);

        
        
    
  return (
    <div className='login'>
    <div className='login-container'>
        <h2>{isSignup ? 'Sign Up':'Login'}</h2>
        <form onSubmit={handlesubmit}>
            {isSignup&&(
                <input
                type='text'
                placeholder='Name'
                value={name}
                onChange={(e)=>setName(e.target.value)}
                required/>
            )}
            <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required />
          <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
        <button type="submit">{isSignup ? 'Sign Up' : 'Login'}</button>
       </form>
       {error && <p style={{ color: 'red' }}>{error}</p>}
        <p>
        {isSignup ? "Already have an account? " : "Don't have an account? "}
        <span 
          onClick={() => setIsSignup(!isSignup)} 
          style={{ color: 'blue', cursor: 'pointer' }}
        >
          {isSignup ? 'Login' : 'Sign Up'}
        </span>
      </p>

        
      
    </div>
    </div>
  )
}

export default Login
