import NavigationBar from "./components/NavigationBar";
import Books from "./components/Books";
import {Route, Routes, Navigate} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <NavigationBar isLoggedIn={true}/>
      <Routes>
          <Route path="/" element={<h2>Main</h2>} />
          <Route path="/books" element={<Books />} />
          <Route path="/login" element={<h2>Login</h2>} />
          <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
