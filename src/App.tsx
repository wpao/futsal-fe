import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import { Toaster } from "@/components/ui/toaster";
import CheckPage from "./pages/CheckPage";
import InfoPage from "./pages/InfoPage";
import { Header } from "./components/Header";
import EditJam from "./pages/admin/EditJam";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" Component={HomePage} />
        <Route path="/check" Component={CheckPage} />
        <Route path="/info" Component={InfoPage} />
        <Route path="/admin">
          <Route path="edit/" Component={EditJam} />
          <Route path="810009/:jamId" Component={EditJam} />
        </Route>
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
