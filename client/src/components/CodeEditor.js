import { useEffect, useState } from 'react';
import Editor from '@monaco-editor/react';
import languageSuffix from '../data/suffix.json';
import './CodeEditor.css'

function CodeEditor(props) {
    const {fileId, tree, setTree} = props;
    const [value, setValue] = useState();
    const [language, setLanguage] = useState('javascript');

    useEffect(() =>{
        let node = findNode(tree,fileId);
        setValue(node.context);
        let filename = node.module;
        let fileSuffix = filename.split('.').pop();
        setLanguage(languageSuffix[fileSuffix])
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

    const updateNode = (root, targetId, newValue) => {
        if (root.id === targetId) {
            root.context = newValue;
            return root;
        } else if (root.children !== undefined) {
            for (const child of root.children) {
                let res = findNode(child, targetId, newValue);
                if (res !== undefined) {
                    return res;
                }
            }
        }
    }
    return (
        <div className="code-editor">
            <Editor language={language} theme="vs-dark" value={value} 
                onChange={(newValue) => {console.log(newValue)}}
                options={{
                selectOnLineNumbers: true
            }}/>
        </div>
    );
}

export default CodeEditor;