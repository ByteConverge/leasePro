import {Link ,NavLink} from "react-router-dom"
import { useState } from "react"

export default function NavBar(){
 const [hambugMenu , setHambugMenu] = useState(false)

  function handleClick(){
    setHambugMenu(prevState=> !prevState)
  }

  function removeHandle(){
    setHambugMenu(false)
  }



     const activeStyles ={
        fontWeight: "bold",
        TextDecoration: "underline"
     }

   
    //  const dropDown = {
    //     display: hambugMenu? "flex" : "none"
    //  }

    return(
        <nav className="nav" >
        <figure>
       <img src="enomalogo2.PNG" alt="" width="40px"/>

        </figure>
        {/*  .navBar--links // navBar--links-display--none  */}
        <div className={`nav--links ${!hambugMenu && "nav--links-display--none"}`} >
            <div className="HAF--links">
              <NavLink to="/" Style={({isActive})=> isActive? activeStyles : null} onClick={removeHandle}>Home</NavLink>
              <NavLink to="/about" Style={({isActive})=> isActive? activeStyles : null} onClick={removeHandle}>About us</NavLink>
              <NavLink to="/faq" >FAQ</NavLink>
            </div>
            {/*  */}
            <div className="links--login--signup">
                <Link to="/signIn">Sign in</Link>
                <Link to="/WelcomePage">Sign up</Link>
            </div>
        </div>
        <span className="hamburger" onClick={handleClick}>&#9776;</span>
    </nav> 
    )
}