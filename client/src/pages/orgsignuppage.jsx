import React from 'react'
import OrgSignup from '../components/OrgSignup'
import Navbar from "../components/navbar";

const OrgsignupPage = () => {
  return (
    <>
    <Navbar buttonLink="/" buttonLabel="Find Jobs" button2Link="/signup" button2Label="Login"/>
    <OrgSignup/>
    </>
  )
}

export default OrgsignupPage