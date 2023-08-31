import React from "react";
import { useParams } from "react-router-dom";

const Userpage = () => {
    const { userId } = useParams();
  return <>
    <h1>user PAge </h1>
    <h1>{userId}</h1>
  </>
};

export default Userpage;
