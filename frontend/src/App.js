import "./App.css";
import { Routes, Route } from "react-router-dom";
import Todo from "./pages/todo";
import Register from "./pages/register";
import Login from "./pages/login";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Todo />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>

    </div>
  );
}

export default App;
