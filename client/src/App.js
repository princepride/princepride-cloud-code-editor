import Canvas from "./components/Canvas"
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom"
import {v4 as uuidV4} from 'uuid'
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to={`/editor/${uuidV4()}`}/>} />
        <Route path="/editor/:id" element={(<Canvas />)}>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
