import "./App.css";
import Main from "./pages/Main/Main";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
// import FightPage from "../src/pages/FightPage/FightPage";

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Routes>
            {/* <Route path="/fightpage" element={<FightPage />} /> */}
            <Route path="/" element={<Main />} />
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;
