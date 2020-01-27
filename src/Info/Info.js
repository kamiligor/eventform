import React from 'react';
import './Info.scss';

const info = (props) => (
  <div className={`Info Info--${props.type}`}>
    <div className="Info__container">
      <p>{props.children}</p>
    </div>
  </div>
);

export default info;