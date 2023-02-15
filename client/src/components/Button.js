import React from 'react';
import { FiSettings } from 'react-icons/fi';
import './Button.css'


const iconStyle = {
    width: '35px',
    height: '35px',
    display: 'flex'
  }

function Button(props) {
    const { setsetting } = props;
    return (
        <div>
            <button className="buttonStyle" type="button" >
                <FiSettings style={iconStyle} />
            </button>
        </div>
    );
}

export default Button;