
import LoggedInNavBarLender from "../LoggedInComponents/LoggedInNavBarLender"
import Footer from "../components/Footer"
import "../cssStyles/faq.css"


export default function VendorLoggedInFaq(){

    const faqHero={
        backgroundImage: `linear-gradient(
            rgba(255, 255, 255, 0.5),
            rgba(255, 255, 255, 0.5)
          ),
          url("enomAbFaqBG.jpg")`
    }
    
    return(
       <>
          <div className="faqHero" style={faqHero} >
          <LoggedInNavBarLender />
          <div className="faqContainer">
          <h1 className="help-header-text">How Can We Help You?</h1>
         <div className="columns">
         <div className="qna">
            <p className="question">Q: What services does your farm provide?</p>
            <p className="answer">A: We offer land rental for farming purposes and provide professional farmers to help manage the land. Our services include land preparation, crop management, and harvest assistance.</p>
         </div>
        
          <div className="qna">
            <p className="question">Q: How do I rent land from your farm?</p>
            <p className="answer">A: To rent land, please visit our Land Rental section on the website. You can view available plots, sizes, and rental rates. Fill out the inquiry form or contact us directly to discuss your needs and complete the rental agreement.</p>
        </div>
        
        <div className="qna">
            <p className="question">Q: How much does it cost to rent land?</p>
            <p className="answer">A: The cost varies depending on the size and location of the plot, as well as the duration of the rental. Please visit our pricing page for detailed information or contact us for a personalized quote.</p>
        </div>
        
        <div className="qna">
            <p className="question">Q: What kind of support do your farmers provide?</p>
            <p className="answer">A: Our experienced farmers can assist with soil preparation, planting, irrigation setup, pest control, crop management, and harvesting. They provide hands-on support and expert advice to ensure a successful farming experience.</p>
        </div>
        
        <div className="qna">
            <p className="question">Q: Can I hire a farmer without renting land?</p>
            <p className="answer">A: Yes, you can hire our farmers for consultation or specific farming tasks on your own land. Contact us to discuss your needs and arrange for our services.</p>
        </div>
        
        <div className="qna">
            <h3 className="h--visit--text">Visiting the farm</h3>
            <p className="question">Q: Can I visit the land before renting?</p>
            <p className="answer">A: Yes, we encourage prospective renters to visit the farm and view available plots. Please contact us to schedule a visit and meet with our team.</p>
        </div>
        
      
        </div>
        <div className="contact-info">
            <p>Q: How can I contact you for more information?</p>
            <p>A: You can reach us via email at user@gmail.com, by phone at 080***** or through our contact form on the website. Follow us on social media for updates and news.</p>
        </div>

        </div>
          </div>
        

          <Footer />
        
          </>
    )
}