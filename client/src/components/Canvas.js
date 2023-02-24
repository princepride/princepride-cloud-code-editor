import { useState, useEffect, useCallback, useRef } from 'react';
import CodeEditor from './CodeEditor';
import FileExplorer from './FileExplorer';
import initialTree from "../data/tree";
import OffCanvas from "./OffCanvas";
import SplitPane from "react-split-pane";
import RunButton from "./RunButton";
import LanguageLabel from "./LanguageLabel";
import './Canvas.css';
import {io} from 'socket.io-client';
import { useParams } from 'react-router-dom';
import config from '../config.json';

const SAVE_INTERVAL_MS = 2000
//const FILE_EXPLORER_TIMEOUT = 1000
const initialSetting = {
  color: '#ff0000',
  theme: "vs-dark",
  fontSize: [26],
  language: "javascript"
} 
function Canvas() {
  const wrapper = useRef(null);
  const [fileId, setFileId] = useState("5");
  //const [tree, setTree] = useState(initialTree);
  const [setting, setSetting] = useState(initialSetting);
  //const [showComponent, setShowComponent] = useState(false);
  const {id: projectId} = useParams();
  const [socket, setSocket] = useState();
  const [tree, setTree] = useState();

  useEffect(() => {
    const s = io("http://"+config.url+":3001")
    setSocket(s)
    return () => {
        s.disconnect()
    }
}, [])

//useEffect(() => {
//  const timer = setTimeout(() => {
//    setShowComponent(true);
//  }, FILE_EXPLORER_TIMEOUT);
//  return () => clearTimeout(timer);
//}, []);

useEffect(() =>{
  //let element1 = document.querySelector('.file-explorer-tree');
  let element2 = document.querySelector('body');
  //element1.style.color=setting.color;
  //element1.style.backgroundColor = setting.theme==='vs-dark'?'#1a202c':'#ffffff';
  element2.style.backgroundColor = setting.theme==='vs-dark'?'#1a202c':'#ffffff';
},[setting])

  return (
    <div>
      <SplitPane
        split="vertical"
        minSize={100}
        maxSize={-100}
        defaultSize={"15%"}
        style={{"width":"100vw"}}
      >
      {tree && <FileExplorer setFileId={setFileId} tree={tree} setTree={setTree} setting={setting} socket={socket}/>}
        {/*{showComponent && <FileExplorer setFileId={setFileId} tree={tree} setTree={setTree} setting={setting} socket={socket}/>}*/}
        <CodeEditor fileId={fileId} tree={tree} setTree={setTree} setSetting={setSetting} setting={setting}/>
      
      </SplitPane>
      <OffCanvas setSetting={setSetting} setting={setting}/>
      <RunButton setting={setting}/>
      <LanguageLabel setting={setting}/>
    </div>
  );
}

export default Canvas;