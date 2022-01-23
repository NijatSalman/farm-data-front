import {BrowserRouter as Router, Switch, Route,Routes} from "react-router-dom"
import { Main } from "./components/Main";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      {
      <Main/>
    }
    </div>
  );
}

export default App;
