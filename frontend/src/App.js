import NavigationBar from "./components/NavigationBar";
import BookPage from "./components/BookPage";
import Login from "./components/Login";
import LoanedBooks from "./components/LoanedBooks";
import AdminPage from "./components/AdminPage";
import MainPage from "./components/MainPage";
import {Route, Routes, Navigate} from "react-router-dom";

import {useState, useEffect} from "react";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if(sessionStorage.getItem("user")) {
      setLoggedIn(JSON.parse(sessionStorage.getItem("user")))
    }
  }, []);


  return (
    <div className="App">
      <NavigationBar isLoggedIn={loggedIn} login={setLoggedIn}/>
      <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/books" element={<BookPage isLoggedIn={loggedIn} />} />
          <Route path="/login" element={<Login isLoggedIn={loggedIn} login={setLoggedIn} />} />
          <Route path="/loaned" element={<LoanedBooks isLoggedIn={loggedIn}/>} />
          <Route path="/admin" element={<AdminPage isLoggedIn={loggedIn}/>} />
          <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
