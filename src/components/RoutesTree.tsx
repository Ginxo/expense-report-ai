import { Routes, Route } from "react-router-dom";
import EmptyScreen from "../views/EmptyScreen";
import Dashboard from "../views/Dashboard";

const RoutesTree = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/list" element={<EmptyScreen />} />
    </Routes>
  );
};

export default RoutesTree;
