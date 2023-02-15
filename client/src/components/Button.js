import { useState } from 'react';
import { FiSettings } from 'react-icons/fi';
import Offcanvas from 'react-bootstrap/Offcanvas';
import './Button.css'
import "bootstrap/dist/css/bootstrap.min.css"
import { themeColors } from '../data/dummy';


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
        <button className="buttonStyle" type="button" onClick={() => {setShow(true)}}>
            <FiSettings style={iconStyle} />
        </button>
        <Offcanvas show={show} onHide={() => setShow(false)} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Settings</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
        <div className="flex-col border-t-1 border-color p-4 ml-4">
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
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
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
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label htmlFor="dark" className="ml-2 text-md cursor-pointer">
              Dark
            </label>
          </div>
        </div>
        <div className="p-4 border-t-1 border-color ml-4">
          <p className="font-semibold text-xl ">Theme Colors</p>
          <div className="flex gap-3">
            {themeColors.map((item, index) => (
              <TooltipComponent key={index} content={item.name} position="TopCenter">
                <div
                  className="relative mt-2 cursor-pointer flex gap-5 items-center"
                  key={item.name}
                >
                  <button
                    type="button"
                    className="h-10 w-10 rounded-full cursor-pointer"
                    style={{ backgroundColor: item.color }}
                    onClick={() => setColor(item.color)}
                  >
                    <BsCheck className={`ml-2 text-2xl text-white ${item.color === currentColor ? 'block' : 'hidden'}`} />
                  </button>
                </div>
              </TooltipComponent>
            ))}
          </div>
        </div>
        </Offcanvas.Body>
      </Offcanvas>
        </div>
    );
}

export default Button;