import { useState } from 'react';
import CodeEditor from './components/CodeEditor';
import FileExplorer from './components/FileExplorer';
import initialTree from "./data/tree";
import { FiSettings } from 'react-icons/fi';
import SplitPane from "react-split-pane";
import './App.css';

const initialSetting = {
  color: "green",
  theme: "vs-dark",
  backgroundColor: '#1a202c',
  "font-size": "16px"
} 
function App() {

  const [fileId, setFileId] = useState("0");
  const [tree, setTree] = useState(initialTree);
  const [setting, setSetting] = useState(initialSetting);

  const buttonStyle = {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    width: '50px',
    height: '50px',
    borderRadius: '25px',
    backgroundColor: 'blue',
    color: 'white',
    textAlign: 'center',
    cursor: 'pointer'
  };

  const iconStyle = {
    width: '35px',
    height: '35px',
    display: 'flex'
  }

  const background = {
    backgroundColor: '#1a202c',
    width:'100vw',
  }

  return (
    <div style={background}>
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
      <button type="button" style={buttonStyle}><FiSettings style={iconStyle}/></button>
    </div>
  );
}

export default App;
