import { useState } from 'react';
import { FiSettings } from 'react-icons/fi';
import styles from './OffCanvas.module.css'
import { themeColors } from '../data/dummy';
import Tooltip from '@mui/material/Tooltip';
import { BsCheck } from 'react-icons/bs';
import { slide as Menu } from 'react-burger-menu';
import { Range } from 'react-range';

const iconStyle = {
    width: '35px',
    height: '35px',
    display: 'flex'
  }

function OffCanvas(props) {
    const { setSetting, setting } = props;
    const [show, setShow] = useState(false);

    const menuStyles = {
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
        background: setting.theme === 'vs-dark'?'#373a47':'#dddddd',
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
                <input style={{width:'3vw', height:'3vh'}} type="radio" name="fruit" value="vs-dark" onChange={()=>setSetting({...setting,theme:"vs-dark"})}
                  checked={setting.theme === 'vs-dark'}/>
                <div style={{fontSize:'1.5vw'}}>vs-dark</div>
                <input style={{width:'3vw', height:'3vh'}} type="radio" name="fruit" value="light" onChange={()=>setSetting({...setting,theme:"light"})}
                checked={setting.theme === 'light'}/>
                <div style={{fontSize:'1.5vw'}}>light</div>
              </label>
            </div>
          <div style={{marginBottom:'10vh'}}>
            <p style={{fontSize:'1.8vw', color:setting.theme==='vs-dark'?'white':'black'}}>Theme Colors</p>
            <div style={{display:'flex', gap:'12px', justifyContent: 'center', flexWrap: 'wrap'}}>
            {themeColors.map((item, index) => (
              <Tooltip key={index} title={item.name}>
                <div key={item.name}>
                    <button
                    type="button"
                    style={{ backgroundColor: item.color, height: '50px', width: '50px', borderRadius: '25px', cursor: 'pointer' }}
                    onClick={() => setSetting({...setting,color:item.color})}
                    >
                    <BsCheck style={{fontSize:'25px', color:'white', visibility: item.color === setting.color ? 'visible' : 'hidden'}}/>
                    </button>
                </div>
              </Tooltip>
            ))}
            </div>
          </div>
          <div style={{marginBottom:'10vh'}}>
          <p style={{fontSize:'1.8vw', color:setting.theme==='vs-dark'?'white':'black'}}>Font Size : {setting.fontSize[0]} px</p>
          </div>
          <Range
        step={1}
        min={12}
        max={40}
        values={setting.fontSize}
        onChange={(values) => setSetting({...setting,fontSize:values})}
        renderTrack={({ props, children }) => (
          <div
            {...props}
            style={{
              ...props.style,
              marginLeft:'5%',
              height: '6px',
              width: '90%',
              backgroundColor: '#ccc'
            }}
          >
            {children}
          </div>
        )}
        renderThumb={({ props }) => (
          <div
            {...props}
            style={{
              ...props.style,
              borderRadius: '21px',
              height: '42px',
              width: '42px',
              backgroundColor: '#999'
            }}
          />
        )}
      />
        </div>
        </Menu>
        </div>
    );
}

export default OffCanvas;
