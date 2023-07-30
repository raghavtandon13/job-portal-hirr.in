import React from 'react'
import "./reccos.css"

const Reccos = ({desc}) => {
  return (
<div className="reccos">
      <div className="reccos-brand">
        <h3>{desc}</h3>
      </div>
      <div className="reccos-group">
        <div className="recc">
          <p>Title</p>
          <p>company</p>
          <p>skills</p>
        </div>
        <div className="recc">
          <p>Title</p>
          <p>company</p>
          <p>skills</p>
        </div>
        <div className="recc">
          <p>Title</p>
          <p>company</p>
          <p>skills</p>
        </div>
      </div>
    </div>
  )
}

export default Reccos