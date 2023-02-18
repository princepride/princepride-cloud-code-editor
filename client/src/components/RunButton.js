import React from 'react';
import { VscDebugStart } from "react-icons/vsc";
import styles from './RunButton.module.css'

const iconStyle = {
    width: '35px',
    height: '35px',
    display: 'flex',
    paddingBottom: '3px',
  }


function RunButton(props) {
    const { setting } = props;
    return (
        <div>
            <button className={styles.buttonStyle} style={{backgroundColor:setting.color}} type="button" onClick={() => {}}>
            <VscDebugStart style={iconStyle} />
            </button>
        </div>
    );
}

export default RunButton;