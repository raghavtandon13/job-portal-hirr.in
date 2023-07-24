import React from 'react'
import OrgLogin from '../components/OrgLoggin';
import Navbar from "../components/navbar";

const Orgloginpage = () => {
  return (
    <>
    <Navbar buttonLink="/" buttonLabel="Find Jobs" button2Link="/signup" button2Label="Register"/>
    <OrgLogin/>
    </>
  )
}

export default Orgloginpage