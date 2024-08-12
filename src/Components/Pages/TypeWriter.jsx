import React from 'react'
import Typewriter from 'typewriter-effect';
const TypeWriter = () => {
  return (
    <div>
      
<Typewriter
  options={{
    strings: ["Track Your Expenses Effortlessly","Simple & Intuitive Interface","Real-Time Tracking","Detailed Reports"],
    autoStart: true,
    loop: true,
  }}
/>
    </div>
  )
}

export default TypeWriter
