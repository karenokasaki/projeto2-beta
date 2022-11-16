import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import HomePage from "./pages/HomePage";
import NavBar from "./components/Navbar";
import DetailPage from "./pages/DetailPage";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Toaster />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/user/:userID" element={<DetailPage />} />
      </Routes>
    </div>
  );
}

export default App;
