import { useEffect, useState } from "react";
// import axios from "axios";
import { useDispatch } from "react-redux";
import axiosInstance from "@/lib/axios";

// Definisi tipe data user
interface UserType {
  id: number;
  namaLapangan: string;
}

// // redux
// import { useSelector } from "react-redux";

// // redux
// import { RootState } from "../store/store";

const DashboardPage = () => {
  // const lapanganSelector = useSelector((state: RootState) => state.lapangan);
  // console.log(lapanganSelector.idUser);

  // redux
  // redux menggunakan dispatch untuk mengubah state global
  const dispatch = useDispatch();

  // state
  const [users, setUsers] = useState<UserType[]>([]);

  // Fungsi untuk mengambil data users
  const fetchUsers = async () => {
    try {
      const response = await axiosInstance.get<UserType[]>(`/users`);
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // function untuk memasukkan idUser ke redux
  const functionLapangan = (idUser: any) => {
    //
    dispatch({ type: "LAPANGAN_CHANGE", payload: { idUser } });

    // simpan data idUser ke localStorage
    localStorage.setItem("lapangan-change", idUser);

    // arahkan ke halaman HomePage.tsx
    window.location.href = "/home";
  };

  // Panggil fetchUsers saat komponen dimount
  useEffect(() => {
    fetchUsers();

    // Hapus item di localStorage saat halaman diakses
    localStorage.removeItem("current-user");
    localStorage.removeItem("lapangan-change");
  }, []);

  return (
    <div className="mt-8 flex w-full flex-col items-center justify-center text-center">
      <div className="mb-10 text-lg font-semibold">Daftar Lapangan</div>
      <div>
        {users.length > 0 ? (
          users.map((user) => (
            <div
              key={user.id}
              className="cursor-pointer border-b p-2"
              onClick={() => functionLapangan(user.id ?? "")}
            >
              {user.namaLapangan}
            </div>
          ))
        ) : (
          <p>Tidak ada lapangan.</p>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
