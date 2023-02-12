import { useEffect, useState } from 'react';
import Editor from '@monaco-editor/react';
import './CodeEditor.css'

function CodeEditor(props) {
    const {fileId, tree, setTree} = props;
    const [value, setValue] = useState();
    const [language, setLanguage] = useState('javascript');

    useEffect(() =>{
        let node = findNode(tree,fileId);
        setValue(node.context);
    }, [fileId])

    const findNode = (root, targetId) => {
        if (root.id === targetId) {
            return root;
        } else if (root.children !== undefined) {
            for (const child of root.children) {
                let res = findNode(child, targetId);
                if (res !== undefined) {
                    return res;
                }
            }
        }
    };
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