import { useState } from 'react';
import CodeEditor from './components/CodeEditor';
import FileExplorer from './components/FileExplorer';
import initialTree from "./data/tree";
import { FiSettings } from 'react-icons/fi';
import SplitPane from "react-split-pane";
import './App.css';
function App() {

  const [fileId, setFileId] = useState("0");
  const [tree, setTree] = useState(initialTree);


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
  }
  return (
    <div style={background}>
      <FileExplorer setFileId={setFileId} tree={tree} setTree={setTree}/>
      <CodeEditor fileId={fileId} tree={tree} setTree={setTree}/>
      <button type="button" style={buttonStyle}><FiSettings style={iconStyle}/></button>
    </div>
  );
}

export default App;
