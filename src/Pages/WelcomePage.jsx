  import "../cssStyles/welcomePage.css"
  import {Link} from "react-router-dom"

  export default function WelcomePage(){
    return(
        <div className="welcomeContainer">

        <div className="welcome--image--wrap">

          <div className="welcome--text--div">

            <div>
              <h1>Welcome to E-NOMA</h1>
              <p>Access to farmland, resources and professional farmers</p>
            </div>

            <div>
              <Link to="/signUpClient">Sign up as Farmer</Link>
              <Link to="/signUpLender">Sign up as Lender</Link>
            </div>
           
          </div>

          <div className="side--img">
            <img src="welcomeToEnoma.jpg" alt="" />
          </div>
        </div>

        </div>
    )
  }