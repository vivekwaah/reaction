import { Routes, Route } from "react-router-dom";
import "./App.css";
import TodosApp from "./components/Apps/TodoList/TodosApp";
import Home from "./components/Home";

const App: React.FC = () => {

  return (
    <>
      <div className="main-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/todos" element={<TodosApp />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
