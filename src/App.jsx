import Add from "./components/Add";
import Data from "./components/Data";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Edit from "./components/Edit";

export default function App() {
  return (
    <div className="flex flex-col justify-center items-center py-20 gap-10 px-4 md:px-8">
      <h1 className="text-[#008AF2] font-bold text-center text-7xl max-md:text-5xl">
        React Assignment
      </h1>
      <Router>
        <Routes>
          <Route exact path="/" element={<Data />} />
          <Route exact path="/add" element={<Add />} />
          <Route exact path="/edit/:id" element={<Edit />} />
        </Routes>
      </Router>
    </div>
  );
}
