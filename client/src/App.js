import { useState, useEffect } from 'react';
import CodeEditor from './components/CodeEditor';
import FileExplorer from './components/FileExplorer';
import initialTree from "./data/tree";
import Button from "./components/Button";
import SplitPane from "react-split-pane";
import './App.css';

const initialSetting = {
  color: "red",
  theme: "vs-dark",
  backgroundColor: '#1a202c',
  fontSize: "16px"
} 
function App() {

  const [fileId, setFileId] = useState("0");
  const [tree, setTree] = useState(initialTree);
  const [setting, setsetting] = useState(initialSetting);

  useEffect(() =>{
    let element1 = document.querySelector('.file-explorer-tree');
    let element2 = document.querySelector('.code-editor');
    let element3 = document.querySelector('.buttonStyle');
    element1.style.color=setting.color;
    element1.style.backgroundColor = setting.backgroundColor;
    element2.style.color=setting.color;
    element2.style.backgroundColor = setting.backgroundColor;
    element3.style.backgroundColor = setting.color;
  },[setting])

  return (
    <div>
        <SplitPane
          split="vertical"
          minSize={100}
          maxSize={-100}
          defaultSize={"20%"}
          style={{"width":"100vw"}}
        >
          <FileExplorer setFileId={setFileId} tree={tree} setTree={setTree}/>
          <CodeEditor fileId={fileId} tree={tree} setTree={setTree}/>
        </SplitPane>
      <Button setsetting={setsetting} setting={setting}/>
    </div>
  );
}

export default App;
