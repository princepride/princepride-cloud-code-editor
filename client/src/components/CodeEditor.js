import { useEffect, useState } from 'react';
import Editor from '@monaco-editor/react';
import {languageSuffix} from '../data/dummy.js';
import styles from './CodeEditor.module.css';

function CodeEditor(props) {
    const {fileId, tree, setTree, setting, setSetting} = props;
    const [value, setValue] = useState();
    //const [language, setLanguage] = useState('javascript');
    const [editor,setEditor] = useState(null);

    useEffect(() => {
        document.querySelector('section').style.width = '99%'
    },[])
    useEffect(() =>{
        let node = findNode(tree,fileId);
        setValue(node.context);
        let filename = node.module;
        let fileSuffix = filename.split('.').pop();
        setSetting({...setting,language : languageSuffix[fileSuffix] || 'markdown'})
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
    //vs-dark
    return (
        <div className={styles.codeEditor} style={{backgroundColor:setting.theme==='vs-dark'?'#1a202c':'#ffffff',color:setting.color}}>
            <Editor language={setting.language} theme={setting.theme} value={value} 
                onChange={(newValue) => {console.log(newValue)}} 
                options={{
                selectOnLineNumbers: true,
                fontSize: setting.fontSize[0],
            }}/>
            {/*</ReactResizeDetector>*/}
        </div>
    );
}

export default CodeEditor;