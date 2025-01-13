import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import { Toaster } from "@/components/ui/toaster";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" Component={HomePage} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
