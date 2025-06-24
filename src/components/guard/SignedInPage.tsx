import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const SignedInPage = (props: React.PropsWithChildren<{}>) => {
  // mendapatkan data dari redux
  // redux mendapatkan data dari localStorage
  const adminSelector = useSelector((state: RootState) => state.admin);

  // jika id ada arahkan ke halaman admin/HomePage.tsx
  if (adminSelector.id && adminSelector.role === "admin") {
    return <Navigate to="/admin/edit" />;
  }

  // jika tidak ada id maka boleh access hamalan berikut:
  // children berisi halaman LoginPage.tsx
  // children berisi halaman HomePage.tsx
  // return tampilan biasa
  return props.children;
};
