import React from 'react';

const styles = {
    position: 'fixed',
    top: '25px',
    right: '90px',
    width: '200px',
    height: '50px',
    borderRadius: '25px',
    color: 'white',
    textAlign: 'center',
    cursor: 'pointer'
}

function LanguageLabel(props) {
    const { setting } = props;

    return (
        <div style={styles}>
            {setting.language}
        </div>
    );
}

export default LanguageLabel;