import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export const useHydration = () => {
  // redux
  const dispatch = useDispatch();

   // code ini berfungsi untuk mengload content setelah data siap
    // supaya tidak klip
    const [isHydrated, setIsHydrated] = useState(false);

  
    // function ini berfungsi untuk mengecek user yang login
    // dan akan di tampilkan di header
    const hydrateAuth = async () => {
      try {
        // ambil id user dari localStorage
        const currentUser = localStorage.getItem("current-user");
        // console.log(currentUser);
  
        // jika tidak ada yang login maka akan berhenti
        if (!currentUser) return;
  
        // ambil data user berdasarkan id
        const userResponse = await axios.get(`http://localhost:3000/users/${currentUser}`);
        // console.log(userResponse.data.data)
  
        // simpan data user ke redux
        dispatch({
          type: "ADMIN_LOGIN",
          payload: {
            username: userResponse.data.data.username,
            id: userResponse.data.data.id,
            role: userResponse.data.data.role,
          },
        });
      } catch (error) {
        console.log(error);
      } finally {
        setIsHydrated(true);
      }
    };
  
    useEffect(() => {
      hydrateAuth();
    }, []);

    return {
      isHydrated: isHydrated,
    };
}

