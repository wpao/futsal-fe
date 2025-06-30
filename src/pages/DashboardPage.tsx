import { useEffect, useState } from "react";
// import axios from "axios";
import { useDispatch } from "react-redux";
import axiosInstance from "@/lib/axios";

// Definisi tipe data user
interface UserType {
  id: number;
  namaLapangan: string;
}

// membuat card lapangan
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// gambar
const images = [
  {
    imageUrl:
      "https://images.unsplash.com/photo-1695950695168-f4038b55a9ca?q=80&w=1176&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    imageSize: 90,
  },
  {
    imageUrl:
      "https://images.unsplash.com/photo-1606589551622-b140d95660cf?q=80&w=1175&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    imageSize: 90,
  },
];

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
      <div className="grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2">
        {users.length > 0 ? (
          users.map((user, index) => (
            <div
              key={user.id}
              className="cursor-pointer border-b p-2"
              onClick={() => functionLapangan(user.id ?? "")}
            >
              {/* {user.namaLapangan} */}
              {/* cart lapangan */}
              <Card>
                <CardHeader>
                  <CardTitle>{user.namaLapangan}</CardTitle>
                  <CardDescription>
                    Enter your email below to login to your account
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center space-y-4 p-6">
                  {/* Menggunakan index untuk mengambil gambar dari array images */}
                  <img
                    // src="https://images.unsplash.com/photo-1695950695168-f4038b55a9ca?q=80&w=1176&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    src={images[index % images.length].imageUrl} // % digunakan untuk loop jika images lebih sedikit dari users
                    alt={"Foto " + user.namaLapangan}
                  />
                </CardContent>
                <CardFooter className="flex-col gap-2">
                  <Button type="submit" className="w-full">
                    view
                  </Button>
                </CardFooter>
              </Card>
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
