import "../cssStyles/homePage.css"
// import '../cssStyles/test.css'

import { Link } from "react-router-dom"
import Cards from "../components/Cards"
import DataIcon from "../components/DataIcon"
import HappyCard from "../components/HappyCard"
import Footer from "../components/Footer"
import LoggedHeroClient from "../LoggedInComponents/LoggedHeroClient"

export default function ClientLoggedInHome(){
     const getInTouchBg ={
      background: `url("getInTouchBg.jpg")`
     }

    return (
      <>
     <LoggedHeroClient />
      <div className="cards--Section">
      <Cards 
      img="tractorIcon.svg" 
      text="Agricultural           
          Equipment"
        width={12} 
          /> 
      <Cards 
      img="labourersIcon.svg" 
      text="Farm Hands"
      width={12} 
      /> 
      <Cards 
      img="landIcons.svg" 
      text=" Fertile Lands Available
            To Farmers"
      width={20}     
      /> 
      </div>

      {/* DATA ICONS SECTION */}
      <div className="data--icons">
        {/*  */}
        <DataIcon img="achieveIcon.svg"   number='80+' text="Achievements"/>
        <DataIcon img="LabourIconDark.svg"  number='250+' text="Farmers"/>
        <DataIcon img="comunityIcon.svg"  number='100+' text="Community"/>
        <DataIcon img="tractorDark.svg"  number='310+' text="Farm Equipment"/>
      
         {/*  */}
      </div>
      
      {/* ourMission */}
      <div className="OurMissionSection">
       <div className="missionText">
        <h1 className="title">
         Our Mission
        </h1>
        <div className="title--text">
          <h1>Unleash The Power Of
             Modern Farming</h1>
          <p>To empower farmers with state of the 
          art solutions that not only 
          boost productivity bit also contribute 
          to sustainable farm practice</p>
        </div>
       </div>
       <div className="missionSection--pics">
        <figure>
          <img src="manTilling-OurMission.jpg" alt="" />
        </figure>
        <figure>
          <img src="ourMission--manCarriesProduce.png" alt="" />
        </figure>
       </div>
      </div>
      {/* Happy Customers */}
      <div className="happyCustomers">
      <h1>Happy <span>Customers</span></h1>
      <div className="happy--cards--wrap">
      <HappyCard 
      img="happyCustomers-1.jpg"
      name="Mathew Cole"
       />
      <HappyCard 
      img="happyCustomers-2.jpg"
      name="David Right"
       />
      <HappyCard 
      img="happyCustomers-3.jpg"
      name="Sara Martins"
      />
      </div>
      </div>
      {/* Get in touch section*/}
      <div className="get--in--touch" style={getInTouchBg}>
        <div className="text-wraps">
        <h1><span className="block">Get In Touch With Us -</span>
         <span className="block">Your Agricultural</span>
         Solutions Partner</h1>
         <p>Thank you for considering us fot your Agricultural
          needs . We are eager to assist you with our expertise
         and services . Feel free to reach out.</p>
         <Link>Contact us</Link>
         </div>
      </div>
      {/* Footer section */}
      <Footer />
  
      </>
            
    )
}