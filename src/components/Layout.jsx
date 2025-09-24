/* eslint-disable react/prop-types */

export default function Layout(props){
    return(
        <div className="layOut">
        <figure>
          <img src={props.img} alt="" height={"300px"}/>
        </figure>
        <h3>{props.text}</h3>
       </div>
    )
}