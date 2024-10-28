import { Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";

const App = () => {
  return (
    <div className="min-h-screen bg-gray-200">
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
};

export default App;
