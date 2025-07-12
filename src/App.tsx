import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import { Toaster } from "@/components/ui/toaster";
import InfoPage from "./pages/InfoPage";
import { Header } from "./components/Header";
import JamPage from "./pages/admin/JamPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { useHydration } from "./hooks/useHydration";
import DashboardPage from "./pages/DashboardPage";
import EditTableInfo from "./pages/admin/EditTableInfo";
// import { EditTableInfo } from "./pages/admin/EditTableInfo";
import { useLocation } from "react-router-dom";
import NotFound from "./components/NotFound";
import Page from "./pages/admin/page";

function App() {
  // mengatur munculnya Header
  const location = useLocation();
  const hideHeaderPaths = ["/login", "/register", "/"]; // Path tanpa Header
  const shouldShowHeader = !hideHeaderPaths.includes(location.pathname);

  // ambil isHydrated
  const { isHydrated } = useHydration();

  // kondisi untuk mengatur halaman muncul ketika hydrateAuth selesai
  if (!isHydrated) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {shouldShowHeader && <Header />}
      <Routes>
        <Route path="/" Component={DashboardPage} />
        <Route path="/register" Component={RegisterPage} />
        <Route path="/home" Component={HomePage} />
        <Route path="/info" Component={InfoPage} />
        <Route path="/login" Component={LoginPage} />
        <Route path="/admin" Component={NotFound} />
        <Route path="/admin">
          <Route path="edit/" Component={JamPage} />
          <Route path="editTableInfo/" Component={EditTableInfo} />
          <Route path="810009/:jamId" Component={JamPage} />
        </Route>

        {/* 
        - Rute NotFound menangkap semua rute yang tidak terdaftar
        - mencegah terjadi-nya penulisan secara langsung pada URL
        */}
        <Route path="*" Component={NotFound} />
      </Routes>

      <Toaster />
    </>
  );
}

export default App;
