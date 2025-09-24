import React from 'react'

function Tractor({img, type, location, price,rent_gtn}) {
  return (
    <div>
      <div className='Available_Tractors'>
        <div>
           {/* {img} */}
           <img src={img} alt=""className='tractorImage' />
        </div>
        <div>
            <p>{type}</p>
            <p>{location}</p>
            <p>{price}</p>
        </div>
        <button className='RentButtun'>{rent_gtn}Rent</button>
      </div>
    </div>
  )
}

export default Tractor
