import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import { Toaster } from "@/components/ui/toaster";
import InfoPage from "./pages/InfoPage";
import { Header } from "./components/Header";
// import { AppSidebar } from "./components/AppSidebar";
import JamPage from "./pages/admin/JamPage";
import LoginPage from "./pages/LoginPage";
import Layout from "./pages/Layout";
import RegisterPage from "./pages/RegisterPage";
import { useHydration } from "./hooks/useHydration";
import DashboardPage from "./pages/DashboardPage";
import EditTableInfo from "./pages/admin/EditTableInfo";
// import { EditTableInfo } from "./pages/admin/EditTableInfo";
import { useLocation, Outlet } from "react-router-dom";
import NotFound from "./components/NotFound";
import { Lapangan } from "./components/Lapangan";
import { Pelanggan } from "./components/Pelanggan";
import { Booking } from "./components/Booking";
import { Skejule } from "./components/Skejule";

//
import {
  SidebarProvider,
  // SidebarInset,
  // SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";

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

  //
  // const isAdminRoute = location.pathname.startsWith("/admin");

  //
  // 1. Buat Main Layout untuk non-admin routes
  const MainLayout = () => {
    return (
      <>
        {shouldShowHeader && <Header />}
        <Outlet /> {/* Child routes akan dirender di sini */}
      </>
    );
  };

  // 2. Buat Admin Layout
  const AdminLayout = () => {
    return (
      <SidebarProvider>
        {shouldShowHeader && <AppSidebar />}
        <Outlet />
      </SidebarProvider>
    );
  };

  return (
    <>
      {/* {shouldShowHeader && (isAdminRoute ? <AppSidebar /> : <Header />)} */}
      {/* {shouldShowHeader && <Header />} */}
      {/* {shouldShowHeader && <AppSidebar />} */}
      <Routes>
        {/* <Route path="/" Component={DashboardPage} />
        <Route path="/layout" Component={Layout} />
        <Route path="/Lapangan" Component={Lapangan} />
        <Route path="/Pelanggan" Component={Pelanggan} />
        <Route path="/Booking" Component={Booking} />
        <Route path="/Skejule" Component={Skejule} />
        <Route path="/register" Component={RegisterPage} />
        <Route path="/home" Component={HomePage} />
        <Route path="/info" Component={InfoPage} />
        <Route path="/login" Component={LoginPage} /> */}

        {/* Semua rute non-admin */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/layout" element={<Layout />} />
          <Route path="/Lapangan" element={<Lapangan />} />
          <Route path="/Pelanggan" Component={Pelanggan} />
          <Route path="/Booking" Component={Booking} />
          <Route path="/Skejule" Component={Skejule} />
          <Route path="/register" Component={RegisterPage} />
          <Route path="/home" Component={HomePage} />
          <Route path="/info" Component={InfoPage} />
          <Route path="/login" Component={LoginPage} />
        </Route>

        {/* Admin routes wrapped with SidebarProvider */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index Component={NotFound} />
          <Route path="edit/" Component={JamPage} />
          <Route path="editTableInfo/" Component={EditTableInfo} />
          <Route path="810009/:jamId" Component={JamPage} />
        </Route>

        {/* <Route path="/admin">
          <Route path="edit/" Component={JamPage} />
          <Route path="editTableInfo/" Component={EditTableInfo} />
          <Route path="810009/:jamId" Component={JamPage} />
        </Route> */}

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
