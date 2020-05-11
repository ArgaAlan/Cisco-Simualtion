import React, { useState, useRef, Fragment } from 'react';

const Action = ({ color, icon }) => {

  return (
    <a href="#" className={color} >
      <i className="material-icons">{ icon }</i>
    </a>
  );
}

export default Action;
