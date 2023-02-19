import { useState, useEffect } from 'react';
import CodeEditor from './components/CodeEditor';
import FileExplorer from './components/FileExplorer';
import initialTree from "./data/tree";
import OffCanvas from "./components/OffCanvas";
import SplitPane from "react-split-pane";
import RunButton from "./components/RunButton";
import LanguageLabel from "./components/LanguageLabel";
import './App.css';

// theme:vs-dark => '#1a202c' light => '#ffffff'
const initialSetting = {
  color: '#ff0000',
  theme: "vs-dark",
  fontSize: [26],
  language: "javascript"
} 
function App() {

  const [fileId, setFileId] = useState("0");
  const [tree, setTree] = useState(initialTree);
  const [setting, setSetting] = useState(initialSetting);

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

export default App;
