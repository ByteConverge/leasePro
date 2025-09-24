/* eslint-disable react/prop-types */

export default function HappyCard({img ,name}){
    return(
        <div className="happyCard">
        <figure className="happyCard--img">
          <img src={img} alt="" />
        </figure>
        <div className="happyCard--text">
        <h4>{name}</h4>
        <p>I am a farmer for the last 36 years and never in those 36 years thought farming would be this easy. E-Noma has helped cover the gap between local and integrated farming</p>
        <div className="Rate--num">
       <p>5.0</p>
       <figure>
        <img src="RateStar.svg" alt="" />
       </figure>
       </div>
     </div>
        
      </div>
    )
}