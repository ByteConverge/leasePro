
import LoggedInNavBarClient from "./LoggedInNavBarClient"
// import bgHero from "../assets/heroBG.jpg"

export default function LoggedHeroClient(){

     let heroSectionStyles ={
      background: `url("./heroBG.jpg")`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      display: "flex",
      flexdirection: "column"
     }    

    return(
        <div className="heroSection" style={heroSectionStyles}>
        <LoggedInNavBarClient />
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
        
       
        </div>
      </div>
 
    )
}