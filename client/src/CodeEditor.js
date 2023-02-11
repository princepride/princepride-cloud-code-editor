import { useEffect, useState } from 'react';
import Editor from '@monaco-editor/react';
import './CodeEditor.css'

function CodeEditor(props) {

    const [file, setFile] = useState();
    const [value, setValue] = useState();
    const [language, setLanguage] = useState('javascript');

    return (
        <div className="code-editor">
            <Editor language={language} theme="vs-dark" value={value} 
                onChange={(newValue) => {setValue(newValue)}}
                options={{
                selectOnLineNumbers: true
            }}/>
        </div>
    );
}

export default CodeEditor;