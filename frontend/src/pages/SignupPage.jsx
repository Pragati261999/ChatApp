import React, { useState } from 'react'
import { ShipWheelIcon } from "lucide-react"

const SignupPage = () => {
  const [signup, setsignupData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const handlesubmit = (e) => {
    e.preventDefault()
  }
  return (
    <div className='h-screen flex items-center justify-center p-4 sm:p-6 md:p-8' data-theme="forest">
      <div className='border border-primary/25 flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-base-100 rounded-xl shadow-lg overflow-hidden'>
        {/* signup form - left sode  */}
        <div className='w-full lg:w-1/2 p-4 sm:p-8 flex flex-col'>
          {/* logo */}
          <div className='mb-4 flex items-center justify-start gap-2'>
            <ShipWheelIcon className="size-9 " />
            <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">
              Togetia
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignupPage