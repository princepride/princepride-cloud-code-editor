import { useState } from 'react';
import { FiSettings } from 'react-icons/fi';
import styles from './Button.module.css'
import { themeColors } from '../data/dummy';
import Tooltip from '@mui/material/Tooltip';
import { BsCheck } from 'react-icons/bs';
import { slide as Menu } from 'react-burger-menu'

const iconStyle = {
    width: '35px',
    height: '35px',
    display: 'flex'
  }

  let menuStyles = {
    bmBurgerButton: {
      position: 'fixed',
      width: '36px',
      height: '30px',
      left: '36px',
      top: '36px'
    },
    bmBurgerBars: {
      background: '#373a47'
    },
    bmBurgerBarsHover: {
      background: '#a90000'
    },
    bmCrossButton: {
      height: '24px',
      width: '24px'
    },
    bmCross: {
      background: '#bdc3c7'
    },
    bmMenuWrap: {
      position: 'fixed',
      height: '100%'
    },
    bmMenu: {
      background: '#373a47',
      fontSize: '1.15em'
    },
    bmMorphShape: {
      fill: '#373a47'
    },
    bmItemList: {
      color: '#b8b7ad',
      padding: '0.8em'
    },
    bmItem: {
      display: 'inline-block'
    },
    bmOverlay: {
      background: 'rgba(0, 0, 0, 0.3)'
    }
  }

function Button(props) {
    const { setsetting, setting } = props;
    const [show, setShow] = useState(false);
    return (
        <div>
        <button className={styles.buttonStyle} style={{backgroundColor:setting.color}} type="button" onClick={() => {setShow(true)}}>
            <FiSettings style={iconStyle} />
        </button>
        <Menu width={ '20%' } isOpen={ show } styles={menuStyles} customBurgerIcon={ false } right onClose={()=>setShow(false)}>
        <div>
          <div style={{fontSize:'3vw', color:setting.theme==='vs-dark'?'white':'black', marginBottom:'10vh'}}>Settings</div>
          <div style={{marginBottom:'10vh'}}>
          <p style={{fontSize:'1.8vw', color:setting.theme==='vs-dark'?'white':'black'}}>Theme</p>
          <label style={{fontSize:'30px', display:'flex'}}>
            <input style={{width:'3vw', height:'3vh'}} type="radio" name="fruit" value="vs-dark" checked />
            <div style={{fontSize:'1.5vw'}}>vs-dark</div>
            <input style={{width:'3vw', height:'3vh'}} type="radio" name="fruit" value="light" />
            <div style={{fontSize:'1.5vw'}}>light</div>
          </label>
          </div>
          <div style={{marginBottom:'10vh'}}>
          <p style={{fontSize:'1.8vw', color:setting.theme==='vs-dark'?'white':'black'}}>Theme Colors</p>
          <div style={{display:'flex', gap:'12px', justifyContent: 'center'}}>
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
          </div>
          <div style={{marginBottom:'10vh'}}>
          <p style={{fontSize:'1.8vw', color:setting.theme==='vs-dark'?'white':'black'}}>Font Size</p>
          </div>
        </div>
        </Menu>
        {/*<Offcanvas show={show} onHide={() => setShow(false)} placement="end" style={{backgroundColor:setting.backgroundColor}}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title style={{fontSize:'25px', fontWeight: 'bold', color:setting.theme==='vs-dark'?'white':'black'}}>Settings</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>

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
      </Offcanvas>*/}

        </div>
    );
}

export default Button;

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