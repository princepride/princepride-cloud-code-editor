import { useState } from 'react';
import CodeEditor from './components/CodeEditor';
import FileExplorer from './components/FileExplorer';
import initialTree from "./data/tree";
function App() {

  const [fileId, setFileId] = useState(0);
  const [tree, setTree] = useState(initialTree);
  return (
    <div>
      <FileExplorer setFileId={setFileId} initialTree={tree}/>
      <CodeEditor fileId={fileId}/>
    </div>
  );
}

export default App;
