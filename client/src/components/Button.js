import { useState } from 'react';
import { FiSettings } from 'react-icons/fi';
import Offcanvas from 'react-bootstrap/Offcanvas';
import styles from './Button.module.css'
import "bootstrap/dist/css/bootstrap.min.css"
import { themeColors } from '../data/dummy';
import Tooltip from '@mui/material/Tooltip';
import { BsCheck } from 'react-icons/bs';


const iconStyle = {
    width: '35px',
    height: '35px',
    display: 'flex'
  }

function Button(props) {
    const { setsetting, setting } = props;
    const [show, setShow] = useState(false);
    return (
        <div>
        <button className={styles.buttonStyle} style={{backgroundColor:setting.color}} type="button" onClick={() => {setShow(true)}}>
            <FiSettings style={iconStyle} />
        </button>
        <Offcanvas show={show} onHide={() => setShow(false)} placement="end" style={{backgroundColor:setting.backgroundColor}}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title style={{fontSize:'25px', fontWeight: 'bold', color:setting.theme==='vs-dark'?'white':'black'}}>Settings</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
        {/*<div className="flex-col border-t-1 border-color p-4 ml-4">
          <p className="font-semibold text-xl ">Theme Option</p>

          <div className="mt-4">
            <input
              type="radio"
              id="light"
              name="theme"
              value="Light"
              className="cursor-pointer"
              onChange={setsetting({...setting,theme:"light"})}
              checked={setsetting.theme === 'Light'}
            />
            <label htmlFor="light" className="ml-2 text-md cursor-pointer">
              Light
            </label>
          </div>
          <div className="mt-2">
            <input
              type="radio"
              id="dark"
              name="theme"
              value="Dark"
              onChange={setsetting({...setting,theme:"vs-dark"})}
              className="cursor-pointer"
              checked={setsetting.theme === 'Dark'}
            />
            <label htmlFor="dark" className="ml-2 text-md cursor-pointer">
              Dark
            </label>
          </div>
        </div>*/}
          <p style={{fontSize:'20px', color:setting.theme==='vs-dark'?'white':'black'}}>Theme Colors</p>
        <div style={{display:'flex', gap:'15px', justifyContent: 'center'}}>
        {themeColors.map((item, index) => (
            <Tooltip key={index} title={item.name}>
            <div key={item.name}>
                <button
                type="button"
                style={{ backgroundColor: item.color, height: '50px', width: '50px', borderRadius: '25px', cursor: 'pointer' }}
                onClick={() => setsetting({...setting,color:item.color})}
                >
                <BsCheck style={{fontSize:'25px', color:'white', visibility: item.color === setting.color ? 'visible' : 'hidden'}}/>
                </button>
            </div>
            </Tooltip>
        ))}
        </div>
        </Offcanvas.Body>
      </Offcanvas>
        </div>
    );
}

export default Button;