import React from 'react';
import styles from './LanguageLabel.module.css'


function LanguageLabel(props) {
    const { setting } = props;

    return (
        <div className={styles.labelStyle} style={{backgroundColor:setting.color}}>
            <div style={{fontSize:"26px",marginTop:"7px"}}>{setting.language}</div>
        </div>
    );
}

export default LanguageLabel;