/* eslint-disable react/prop-types */


export default function DataIcon({img ,number,text}){
  return (
    <div className="data--icon">
    <div className="Icon--number">
      <figure>
        <img src={img} alt="" />
      </figure>
      <h2>{number}</h2>
    </div>
    <h2 className="data--icon--text">{text}</h2>
   </div>
  )
}