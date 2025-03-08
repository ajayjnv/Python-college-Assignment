import { Routes, Route } from "react-router-dom";
import AddNotes from "./components/AddNotes";
import CreateUser from "./components/CreateUser";
import DisplayNotes from "./components/DisplayNotes";

function App() {
  return (
    <Routes>
      <Route path="/" element={<AddNotes />} />
      <Route path="/create-user" element={<CreateUser />} />
      <Route path="/display-notes" element={<DisplayNotes />} />
    </Routes>
  );
}

export default App;
