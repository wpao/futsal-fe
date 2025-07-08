import { CalendarForm } from "@/components/CalendarForm";
// import { SignedInPage } from "@/components/guard/SignedInPage";
import { Jam } from "@/components/Jam";

// redux
// import { useDispatch } from "react-redux";

const HomePage = () => {
  // const dispatch = useDispatch();

  // supaya home mengarah ke /
  // dispatch({ type: "USER_UN_CHANGE" });

  return (
    // SignedInPage berarti bahwa :
    // halaman ini bisa di access oleh public
    // halaman ini tidak bisa di access oleh admin
    // <SignedInPage>
    <div className="flex h-screen justify-center">
      <div className="mt-5">
        <CalendarForm />
        <Jam />
      </div>
    </div>
    // {/* </SignedInPage> */}
  );
};

export default HomePage;
