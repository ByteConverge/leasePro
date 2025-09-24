import { Link } from "react-router-dom"
import NavBar from "./NavBar"
// import bgHero from "../assets/heroBG.jpg"

export default function Hero(){

     let heroSectionStyles ={
      background: `url("./heroBG.jpg")`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      display: "flex",
      flexdirection: "column"
     }    

    return(
        <div className="heroSection" style={heroSectionStyles}>
        <NavBar />
        {/* Hero---Main */}
        <div className="heroMain" >
         <h1>
          <span className="block">
          <span className="green">E</span>-Noma <span className="green">Elevate Your, Yield</span>
          </span>
          With Innovative Agricultural Structure
          </h1>
          {/*  */}
          <p><span className="block" >We offer a comprehensive suite of tools and technologies designed</span>
          <span className="block">to streamlineyour farming operations.Whether you are a seasoned</span>
          <span className="block">farmer or just starting , ensuring that every crop thrives</span>
          </p>
          {/*  */}
          <Link to="/welcomePage">
          <div className="getStarted">
            <h3 >Get Started Now</h3>
            <figure>
              <img src="GetStartedArrow.svg" alt="" />
            </figure>
          </div>
          </Link>
       
        </div>
      </div>
 
    )
}