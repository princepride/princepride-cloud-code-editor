import { useEffect, useState } from 'react';
import Editor from '@monaco-editor/react';

function CodeEditor(props) {

    const [file, setFile] = useState();
    const [value, setValue] = useState();
    const [language, setLanguage] = useState('javascript');

    return (
        <div>
            <Editor height="90vh" language={language} theme="vs-dark" value={value} 
                onChange={(newValue) => {setValue(newValue)}}
                options={{
                selectOnLineNumbers: true
            }}/>
        </div>
    );
}

export default CodeEditor;