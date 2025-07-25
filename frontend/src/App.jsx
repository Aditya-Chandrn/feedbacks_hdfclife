import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import CreateFeedback from "./pages/CreateFeedback";
import NotFound from "./pages/NoteFound";

const App = () => {
  return (
    <div className="">
      <Routes>
        <Route index element={<Home />} />
        <Route path="/create" element={<CreateFeedback />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
