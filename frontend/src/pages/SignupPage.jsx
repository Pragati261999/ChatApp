import React, { useState } from 'react'

const SignupPage = () => {
  const [signup ,setsignupData] =  useState({
    fullName: "",
    email: "",
    password:"",
  })
  return (
    <div>SignupPage</div>
  )
}

export default SignupPage