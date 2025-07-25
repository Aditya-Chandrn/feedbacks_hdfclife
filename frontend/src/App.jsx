import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Create from "./pages/Create";

const App = () => {
  return (
    <div className="">
      <Routes>
        hello
        <Route index element={<Home />} />
        <Route path="/create" element={<Create />} />
      </Routes>
    </div>
  );
};

export default App;
