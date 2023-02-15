import { useEffect, useState } from 'react';
import Editor from '@monaco-editor/react';
import config from '../config.json';
import './CodeEditor.css';

function CodeEditor(props) {
    const {fileId, tree, setTree, setting} = props;
    const [value, setValue] = useState();
    const [language, setLanguage] = useState('javascript');
    const [editor,setEditor] = useState(null);

    useEffect(() => {
        document.querySelector('section').style.width = '99%'
    },[])
    useEffect(() =>{
        let node = findNode(tree,fileId);
        setValue(node.context);
        let filename = node.module;
        let fileSuffix = filename.split('.').pop();
        setLanguage(config.languageSuffix[fileSuffix])
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

    const editorDidMount = (editor, monaco) => {
        setEditor(editor);
        editor.focus();
      };
      const editorStyle = {
        overflowX: 'scroll', // 横向滚动条
        overflowY: 'scroll', // 竖向滚动条
    };
    return (
        <div className="code-editor">
            <Editor language={language} theme="vs-dark" value={value} 
                onChange={(newValue) => {console.log(newValue)}}
                options={{
                selectOnLineNumbers: true
            }}/>
            {/*</ReactResizeDetector>*/}
        </div>
    );
}

export default CodeEditor;