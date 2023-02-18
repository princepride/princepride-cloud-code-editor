import React from 'react';
import { RunIcon } from "react-icons/vsc";
import styles from './RunButton.module.css'

const iconStyle = {
    width: '35px',
    height: '35px',
    display: 'flex'
  }


function RunButton(props) {
    const { setting } = props;
    return (
        <div>
            <button className={styles.buttonStyle} style={{backgroundColor:setting.color}} type="button" onClick={() => {}}>
            <RunIcon style={iconStyle} />
            </button>
        </div>
    );
}

export default RunButton;