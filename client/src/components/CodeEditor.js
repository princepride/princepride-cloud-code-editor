import { useEffect, useState } from 'react';
import Editor from '@monaco-editor/react';
import {languageSuffix} from '../data/dummy.js';
import styles from './CodeEditor.module.css';

function CodeEditor(props) {
    const {fileId, tree, setTree, setting, setSetting} = props;
    const [value, setValue] = useState();
    const [readOnly, setReadOnly] = useState(false);
    //const [language, setLanguage] = useState('javascript');
    const [editor,setEditor] = useState(null);

    useEffect(() => {
        document.querySelector('section').style.width = '99%'
    },[])
    useEffect(() =>{
        let node = findNode(tree,fileId);
        if(node === undefined){
            setReadOnly(true);
            setValue('oops, it looks like you have not load file correctly');
            setSetting({...setting,language : 'markdown'});
        }
        else{
            setReadOnly(false);
            setValue(node.context);
            let filename = node.module;
            let fileSuffix = filename.split('.').pop();
            setSetting({...setting,language : languageSuffix[fileSuffix] || 'markdown'})
        }
        
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
                readOnly:readOnly,
            }}/>
            {/*</ReactResizeDetector>*/}
        </div>
    );
}

export default CodeEditor;