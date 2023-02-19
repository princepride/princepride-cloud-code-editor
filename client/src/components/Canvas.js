import { useState, useEffect } from 'react';
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
const initialSetting = {
  color: '#ff0000',
  theme: "vs-dark",
  fontSize: [26],
  language: "javascript"
} 
function Canvas() {
  const [fileId, setFileId] = useState("5");
  //const [tree, setTree] = useState(initialTree);
  const [setting, setSetting] = useState(initialSetting);
  
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

useEffect(() => {
  console.log(socket)
  if (socket == null) return
  
  socket.once("load-project", project => {
      setTree(project)
  })
  socket.emit('get-project', projectId)
},[socket, tree, projectId])

useEffect(() => {
  if (socket == null) return

  const interval = setInterval(() => {
    socket.emit("save-project", tree)
  }, SAVE_INTERVAL_MS)

  return () => {
    clearInterval(interval)
  }
}, [socket, tree])

useEffect(() => {
  if (socket == null ) return
  const handler = (project) => {
      setTree(project)
  }
  socket.on("receive-changes", handler)

  return () => {
    socket.off('receive-changes',handler)
  }
}, [socket, tree])

useEffect(() => {
  if (socket == null) return
  socket.emit("send-changes",tree)

}, [socket, tree])

useEffect(() =>{
  let element1 = document.querySelector('.file-explorer-tree');
  let element2 = document.querySelector('body');
  element1.style.color=setting.color;
  element1.style.backgroundColor = setting.theme==='vs-dark'?'#1a202c':'#ffffff';
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
        <FileExplorer setFileId={setFileId} tree={tree} setTree={setTree} setting={setting}/>
        <CodeEditor fileId={fileId} tree={tree} setTree={setTree} setSetting={setSetting} setting={setting}/>
      </SplitPane>
      <OffCanvas setSetting={setSetting} setting={setting}/>
      <RunButton setting={setting}/>
      <LanguageLabel setting={setting}/>
    </div>
  );
}

export default Canvas;


//  useEffect(() => {
//    const s = io("http://"+config.url+":3001")
//    setSocket(s)
//    return () => {
//        s.disconnect()
//    }
//}, [])

//useEffect(() => {
//    console.log(socket)
//    if (socket == null || tree == null) return
    
//    socket.once("load-project", project => {
//        setTree(project)
//    })
//    socket.emit('get-project', projectId)
//},[socket, tree, projectId])

//  useEffect(() => {
//    if (socket == null || tree == null) return

//    const interval = setInterval(() => {
//      socket.emit("save-project", tree)
//    }, SAVE_INTERVAL_MS)

//    return () => {
//      clearInterval(interval)
//    }
//  }, [socket, tree])

//  useEffect(() => {
//    if (socket == null || tree == null) return
//    const handler = (action, id, newItem) => {
//        // rename(id, newname), delete(id, ""), 
//        // edit code(id, newCodes), addItem((folder, file), newname),
//        // upload new project(id, newProject)
//    }
//}, [socket, tree])

//useEffect(() => {
//    if (socket == null || tree == null) return
//    const handler = (delta, oldDelta, source) => {
//        if (source !== 'user') return
//        socket.emit("send-changes",delta)
//    }
//}, [socket, tree])