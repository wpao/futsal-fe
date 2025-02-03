// import { Button } from "./ui/button";
// import { Input } from "./ui/input";
// import { IoCart, IoHeart } from "react-icons/io5";
import { Link } from "react-router-dom";

// redux
import { RootState } from "../store/store";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "./ui/button";

export const Header = () => {
  // declaration deispatch
  const dispatch = useDispatch();

  // redux
  const userSelector = useSelector((state: RootState) => state.user);

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
  const urlHeader = userSelector.urlHeader;

  if (urlHeader) {
    return (
      <header className="flex justify-center p-4">
        <div className="flex w-full max-w-md items-center justify-center gap-14">
          <Link to="/admin/edit">
            <div>Home</div>
          </Link>

          <Link to="/info">
            <div>Info</div>
          </Link>

          <Button onClick={handleLogout} variant={"destructive"}>
            Log Out
          </Button>
        </div>
      </header>
    );
  }
  return (
    <header className="flex justify-center p-4">
      <div className="flex w-full max-w-md justify-around">
        <Link to="/">
          <div>Home</div>
        </Link>
        <Link to="/info">
          <div>Info</div>
        </Link>
      </div>
    </header>
  );
};
