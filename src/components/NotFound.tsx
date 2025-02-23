import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Hapus localStorage jika rute tidak ditemukan
    localStorage.removeItem("current-user");
    localStorage.removeItem("lapangan-change");

    // Redirect ke halaman utama atau login
    navigate("/");
  }, [navigate]);

  return null; // Tidak menampilkan apa pun karena langsung redirect
};

export default NotFound;
