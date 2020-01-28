import React from 'react';
import './Info.scss';
import PropTypes from 'prop-types';

const info = (props) => (
  <div className={`Info Info--${props.type}`}>
    <div className="Info__container">
      <p>{props.children}</p>
    </div>
  </div>
);

export default info;

info.propTypes = {
  children: PropTypes.string,
  type: PropTypes.oneOf(['success','error'])
}