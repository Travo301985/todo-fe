import React from 'react'
import RingLoader from "react-spinners/RingLoader";

function Loading() {
  return (
    <div className='flex items-center justify-center h-screen'>
        <RingLoader loading={true} color={"#11aa11"} size={20} speedMultiplier={2}/>
    </div>
  )
}

export default Loading