/* eslint-disable react/prop-types */

export default function Cards({img , text, width}){
    return(
        <div className="agric--Equip">
        <figure>
         <img src={img} alt="" />
        </figure>
        <h4 style={{width:`${width}rem`}}>{text}</h4>
       </div>
    )
}