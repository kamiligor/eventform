import React from 'react';
import svg from '../assets/images/spinner.svg';

const spinner = (props) => (
  <div className="Spinner">
    <img src={svg} alt="Loading.." />
  </div>
);

export default spinner;