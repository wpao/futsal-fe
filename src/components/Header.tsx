// import { Button } from "./ui/button";
// import { Input } from "./ui/input";
// import { IoCart, IoHeart } from "react-icons/io5";
import { Link } from "react-router-dom";

// redux
// import { RootState } from "../store/store";
import { useDispatch } from "react-redux";

export const Header = () => {
  // declaration deispatch
  const dispatch = useDispatch();

  // redux
  // const userSelector = useSelector((state: RootState) => state.user);

  // handle logout
  const handleLogout = () => {
    // 1. remove local storage
    localStorage.removeItem("current-user");

    // 2. reset user slice
    dispatch({ type: "ADMIN_LOGOUT" });
  };

  // Ketika true, maka yang login adalah admin
  // return header for admin
  // dan sebalik-nya
  // const urlHeader = userSelector.urlHeader;
  // console.log(urlHeader);

  // jika user login maka akan terbuat current-user
  // jika current-user ada maka gunakan header admin
  const admin = localStorage.getItem("current-user");

  if (admin) {
    return (
      <header className="flex justify-center p-4">
        <div className="flex w-full max-w-md items-center justify-center gap-14">
          <Link to="/admin/edit">
            <div className="cursor-pointer">Home</div>
          </Link>

          <Link to="/admin/editTableInfo">
            <div className="cursor-pointer">Info</div>
          </Link>

          <div className="cursor-pointer" onClick={handleLogout}>
            Log Out
          </div>
        </div>
      </header>
    );
  }
  return (
    <header className="flex justify-center p-4">
      <div className="flex w-full max-w-md justify-around">
        <Link to="/home">
          <div className="cursor-pointer">Home</div>
        </Link>
        <Link to="/info">
          <div className="cursor-pointer">Info</div>
        </Link>
        <Link to="/">
          <div
            className="cursor-pointer"
            onClick={() => {
              // hapus local storage
              localStorage.removeItem("lapangan-change");
              localStorage.removeItem("current-user");
            }}
          >
            Keluar
          </div>
        </Link>
      </div>
    </header>
  );
};
