import React, { useState } from 'react'

const SignupPage = () => {
  const [signup ,setsignupData] =  useState({
    fullName: "",
    email: "",
    password:"",
  }) ;
  const handlesubmit = (e) =>{
    e.preventDefault()
  }
  return (
    <div className='h-screen flex items-center justify-center p-4 sm:p-6 md:p-8' data-theme="forest">SignupPage</div>
  )
}

export default SignupPage