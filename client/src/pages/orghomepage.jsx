import React from 'react'
import Navbar from "../components/navbar";
import OrgPosts from '../components/OrgPosts';
import PostData from '../components/PostData';

const Orghomepage = () => {
  return (
    <>
    <Navbar buttonLink="/" buttonLabel="Settings" button2Link="/signup" button2Label="Profile"/>
    <OrgPosts/>
    </>
  )
}

export default Orghomepage