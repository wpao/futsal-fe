// import { Button } from "./ui/button";
// import { Input } from "./ui/input";
// import { IoCart, IoHeart } from "react-icons/io5";
import { Link } from "react-router-dom";

// redux
import { RootState } from "../store/store";
import { useSelector } from "react-redux";

export const Header = () => {
  // redux
  const userSelector = useSelector((state: RootState) => state.user);

  // Ketika true, maka yang login adalah admin
  // return header for admin
  // dan sebalik-nya
  const urlHeader = userSelector.urlHeader;

  if (urlHeader) {
    return (
      <header className="flex justify-center p-4">
        <div className="flex w-full max-w-md justify-around">
          <Link to="/admin/edit">
            <div>Home</div>
          </Link>
          {/* <Link to="/logout">
            <div>logout</div>
          </Link> */}
          <Link to="/info">
            <div>Info</div>
          </Link>
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
        {/* <Link to="/check">
          <div>Check</div>
        </Link> */}
        <Link to="/info">
          <div>Info</div>
        </Link>
      </div>
    </header>
  );
};
