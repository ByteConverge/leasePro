import "../cssStyles/AboutPage.css"
import {Link} from "react-router-dom"
import LoggedInNavBarClient from "../LoggedInComponents/LoggedInNavBarClient"
import Footer from "../components/Footer"

export default function ClientLoggedInAbout(){
   const aboutHeroBg = {
    background: `linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("enomAbFaqBG.jpg")`
   }

    return(
        <>
          <div className="AboutHero" style={aboutHeroBg}>
          <LoggedInNavBarClient />
          {/*  About passages  */}
        <div className="About--container">
        <div className="aboutUs--wrap space">    
        <h2 className="aboutUs--header ">About Us</h2>
        <p>Welcome to E-NOMA, where we bring together land, expertise, and passion for agriculture to create a thriving farming community. Our mission is to empower aspiring and established farmers by providing access to fertile land and professional farming support.</p>
        </div>

         <div className="service--wrap space">
        <h2 className="services--header">Our Services</h2>
        <p><span className="bolder">Land Rental:</span> We provide flexible land rental options tailored to your needs, whether youre a small-scale grower or planning a larger agricultural venture. Our plots come equipped with essential infrastructure, including irrigation systems and basic soil preparation, ensuring you have a solid foundation to start your farming journey.</p>
        <p><span className="bolder">Professional Farming Support:</span> Our team of seasoned farmers is here to assist you every step of the way. From soil preparation and planting to crop management and harvesting, we offer hands-on support and expert advice. Whether youre new to farming or looking to optimize your yield, our farmers provide the knowledge and skills to help you succeed.</p>
        </div>
        <div className="choose--wrap space">
        <h2 className="choose--header">Why Choose Us?</h2>
        <ul >
            <li>
            <span className="bolder">Expertise:</span> Benefit from the knowledge and experience of our dedicated farming professionals.
            </li>
            <li>
                <span className="bolder">Flexibility:</span > Choose from a variety of plot sizes and rental terms to suit your specific needs.
                </li>
            <li>
                <span className="bolder">Community:</span> Join a vibrant community of like-minded individuals passionate about agriculture.
                </li>
        </ul>
        </div>
      
        <div className="get--wrap space">

        
        <h2 className="get--header">Get In Touch</h2>
        <p>Ready to start your farming journey with us? Contact us today to learn more about our land rental options and farmer support services. We look forward to helping you cultivate success.</p>
        </div>

        <Link id="contact--link">Contact Us</Link>
       </div>
          </div>
          {/*About passage ends here  */}

           <div className="mission-vision"> 
            <div className="vision">
              <div className="ourVision--text">
                 <h1>Our Vision</h1>
                 <p>We envision a future where sustainable farming practices and community collaboration lead to a healthier planet and prosperous agricultural communities. By renting out land and providing expert farming services, we aim to reduce barriers to entry and promote environmentally friendly farming techniques.  </p>
              </div>
              <figure>
                <img src="ourMission---AboutPage.jpg" alt="" />
              </figure>

            </div>
           
            <div className="mission">
        
              <figure>
                <img src="ourVision---AboutPage.jpg" alt="" />
              </figure>
            
            <div className="ourMission-text">
               <h1>Our Mission</h1>
               <p>To empower farmers with state of the art solutions that not only boost productivity bit also contribute to sustainable farm practice</p>
              </div>
            </div>
           </div>

           
         {/* footer section */}
          <Footer />
        </>
    )
}