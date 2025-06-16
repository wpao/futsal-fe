// file ini berfungsi untuk mengatur halaman yang boleh di akses oleh user
// file ini berfungsi untuk mengarahkan user ke halaman husus user

// src/components/guard/GuardUser.tsx

import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const GuardUser = (props: React.PropsWithChildren<{}>) => {
  // mendapatkan data dari redux
  // redux mendapatkan data dari localStorage
  const userSelector = useSelector((state: RootState) => state.user);

  // jika id ada arahkan ke halaman user/HomePage.tsx
  if (userSelector.id && userSelector.role === "user") {
    return <Navigate to="/user/edit" />;
  }

  // jika tidak ada id maka boleh access hamalan berikut:
  // children berisi halaman LoginPage.tsx
  // children berisi halaman HomePage.tsx
  return props.children;
};
