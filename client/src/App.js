import { useEffect, useState } from 'react';
import Editor from '@monaco-editor/react';

const FileUploader = ({ onFileLoad }) => {
  return <input type="file" onChange={(e) => onFileLoad(e.target.files[0])} />;
};

function App() {
  const [file, setFile] = useState();
  const [value, setValue] = useState();
  const [language, setLanguage] = useState('javascript');

  useEffect(() => {
    if (file) {
      var reader = new FileReader();
      reader.onload = async (e) => {
        setValue(e.target.result);
      };
      reader.readAsText(file);
      let newLanguage = 'javascript';
      const extension = file.name.split('.').pop();
      if (['css', 'html', 'json'].includes(extension)) {
        newLanguage = extension;
      } else if (extension === 'md') {
        newLanguage='markdown';
      }
      setLanguage(newLanguage);
    }
  }, [file]);

  return (
    <>
      <FileUploader onFileLoad={setFile} />
      <Editor height="90vh" language={language} theme="vs-dark" value={value} 
      options={{
        selectOnLineNumbers: true
      }}/>
    </>
  );
}

export default App;
