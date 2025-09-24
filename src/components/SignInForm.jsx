/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import eyeToggle from "../assets/eye-slash.svg"

function SignInForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  function validateEmail (email){
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }

  const handleBlur = (e) => {
    const { name, value } = e.target;
    if (name === 'email' && !validateEmail(value)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: 'Please enter a valid email address',
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: '',
      }));
    }
  };

  async function handleSubmit(e){
    e.preventDefault();
    const { email, password} = formData;

    // Basic validation
    if ( !email || !password) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        form: 'All fields are required',
      }));
      return;
    }
    if (!validateEmail(email)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: 'Please enter a valid email address',
      }));
      return;
    }
  

    // Sending POST request to the server
    try {
      const response = await fetch('https://enoma-backend-v1.onrender.com/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })
        

      if (response.ok) {
        console.log(response)
          
      }else{
         setSuccess("")
        setErrors((prevErrors) => ({
          ...prevErrors,
          form: 'Invalid Credentials: Check email or password',
        }))
        setTimeout(() => {
        setErrors((prevErrors) => ({
          ...prevErrors,
          form: '',
        }))
        }, 5000);
      }

      const data = await response.json();
       console.log(data);

      if (data.Token) {

        setErrors((prevErrors) => ({
          ...prevErrors,
          form: '',
        }))

        setSuccess(data.message)

        // Storing JWT in local storage

        localStorage.setItem('jwt', data.Token);

        console.log(data.Token)

        setTimeout(() => {
          if(data.User.role === "client"){
            navigate("/clientLoggedInHome" , {
              replace:true
            })
          }else if(data.User.role === "lender"){
           
            navigate("/lenderLoggedInHome" , {
              replace: true
            })
          }
        
              // navigate('/');
            }, 3000);
    
      
      } else {
       
        // console.log("conflict")
      
      }
    } catch (error) {
      setSuccess("")
      setErrors((prevErrors) => ({
        ...prevErrors,
        form: 'Failed to login:Check Data Connection',
      }));
      
    }
  }
// toggle States
  const [toggle1, setToggle1] = useState(false)
  

  function passwordToggle1(){
    setToggle1(preVState=>!preVState)
    
  }

   

    // JSX RETURN

  return (
    <form onSubmit={handleSubmit} className="loginForm">

      {errors.form && <p style={{ color: 'red' ,fontSize: "1rem" }}>{errors.form}</p>}
      {success && <p style={{ color: 'green' ,fontSize: "1rem", textAlign:"center" }}>{success}</p>}
      {/* hidden input role */}
      <input 
      type="hidden"
       name="role"
       value={formData.role} 
      
       />
      {/* hidden input role */}

      <label>Email</label>
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        onBlur={handleBlur}
        
      />
      {errors.email && <p style={{  color: 'red' ,fontSize: "1rem"}}>{errors.email}</p>}
   <div className='passwordOne'>
      <label>Password</label>
      <input
        type={toggle1? "text" : "password"}
        name="password"
        value={formData.password}
        onChange={handleChange}
        
      />
      {/* Toogle 1 */}
       <span className="toggleSignIn" style={{display: "block"} } onClick={passwordToggle1}>
        <img src={eyeToggle} width="5px"/> 
        </span>

      </div>

      <button className="sign-in-button" type="submit">Sign in</button>
    </form>
  )
}

export default SignInForm;
