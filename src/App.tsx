import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import { Toaster } from "@/components/ui/toaster";
import InfoPage from "./pages/InfoPage";
import { Header } from "./components/Header";
import JamPage from "./pages/admin/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { useHydration } from "./hooks/useHydration";

function App() {
  // ambil isHydrated
  const { isHydrated } = useHydration();

  // kondisi untuk mengatur halaman muncul ketika hydrateAuth selesai
  if (!isHydrated) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" Component={HomePage} />
        {/* <Route path="/check" Component={CheckPage} /> */}
        <Route path="/info" Component={InfoPage} />
        <Route path="/login" Component={LoginPage} />
        <Route path="/register" Component={RegisterPage} />
        <Route path="/admin">
          <Route path="edit/" Component={JamPage} />
          <Route path="810009/:jamId" Component={JamPage} />
        </Route>
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
