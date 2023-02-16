import React, {useEffect} from 'react';
import styles from './Offcanvas.module.css';

function Offcanvas(props) {
    const {show} = props;
    let offCanvasStyles = styles.offcanvas
    useEffect(()=>{
        if (show) {
            offCanvasStyles += " offcanvas-animation";
        }
    },[show])
    return (
        <div className={offCanvasStyles}>
            
        </div>
    );
}

export default Offcanvas;