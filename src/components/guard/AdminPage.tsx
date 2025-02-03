import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const AdminPage = (props: React.PropsWithChildren<{}>) => {
  // mendapatkan data dari redux
  // redux mendapatkan data dari localStorage
  const adminSelector = useSelector((state: RootState) => state.admin);

  // jika role bukan admin maka akan di arahkan ke halaman HomePage.tsx
  if (adminSelector.role !== "admin") {
    return <Navigate to="/" />;
  }

  // jika role admin maka boleh access /admin/edit (admin/HomePage.tsx)
  return props.children;
};
