// import { Button } from "./ui/button";
// import { Input } from "./ui/input";
// import { IoCart, IoHeart } from "react-icons/io5";
import { Link } from "react-router-dom";

export const Header = () => {
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
