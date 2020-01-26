import React from 'react';
import './Spinner.scss';
import svg from '../assets/images/spinner.svg';

const spinner = () => (
  <div className="Spinner">
    <img src={svg} alt="Loading.." />
  </div>
);

export default spinner;