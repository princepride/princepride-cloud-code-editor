import { useState } from 'react';
import { FiSettings } from 'react-icons/fi';
import './Button.css'


const iconStyle = {
    width: '35px',
    height: '35px',
    display: 'flex'
  }

function Button(props) {
    const { setsetting } = props;
    const [show, setShow] = useState(false);
    return (
        <button className="buttonStyle" type="button" onClick={() => {setShow(true)}}>
            <FiSettings style={iconStyle} />
        </button>
    );
}

export default Button;