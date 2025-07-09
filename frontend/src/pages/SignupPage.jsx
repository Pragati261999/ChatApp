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
    <div>SignupPage</div>
  )
}

export default SignupPage