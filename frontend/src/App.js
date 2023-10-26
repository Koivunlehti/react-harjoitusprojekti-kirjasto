import NavigationBar from "./components/NavigationBar";
import Books from "./components/Books";
import {Route, Routes, Navigate} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <NavigationBar />
      <Routes>
          <Route path="/" element={<h2>Main</h2>} />
          <Route path="/books" element={<Books />} />
          <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
