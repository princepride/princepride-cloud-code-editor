import { useState } from 'react';
import CodeEditor from './components/CodeEditor';
import FileExplorer from './components/FileExplorer';
import initialTree from "./data/tree";
import './App.css';
function App() {

  const [fileId, setFileId] = useState("0");
  const [tree, setTree] = useState(initialTree);
  return (
    <div>
      <h5>js</h5>
      <FileExplorer setFileId={setFileId} tree={tree} setTree={setTree}/>
      <CodeEditor fileId={fileId} tree={tree} setTree={setTree}/>
    </div>
  );
}

export default App;
