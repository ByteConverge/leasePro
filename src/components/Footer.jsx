import {Link} from "react-router-dom"

const year = new Date()
let CurrentYear = year.getFullYear()
export default function Footer(){
    return(
        <footer className="footer">
        <div className="top-section">
            <figure className="logo">
                <img src="enomalogo2.PNG" alt="" width="40px" />
            </figure>
            <div className="links">
                <Link >Our Communities</Link>
                <Link >Help</Link>
            </div>
        </div>
        <div className="bottom-section">
          <div className="links--date">
            <div className="legal-links">
                <Link>Legal & Privacy</Link>
                <Link>User Agreement</Link>
                <Link>Privacy & Cookie Policy</Link>
                <Link>Online Service Updates</Link>
                <Link>Security</Link>
                <Link>Cookie Preferences</Link>
            </div>
            <p className="date">
                &copy; {CurrentYear} E-NOMA
            </p>
            </div>

            <div className="social-icons--Contact">
              <h3>Contact Us</h3>
              <div className="icons">
              <Link>
              <figure>
                <img src="Xlogo.svg" alt="" />
               </figure>

              </Link>
              <Link>
               <figure>
                <img src="facebookLogo.svg" alt="" />
               </figure>
               </Link>
               <Link>
               <figure>
                <img src="instaLogo.svg" alt="" />
               </figure>
               </Link>
               </div>
            </div>
        </div>
    </footer>

    )
}