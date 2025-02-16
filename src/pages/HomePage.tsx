import { CalendarForm } from "@/components/CalendarForm";
import { SignedInPage } from "@/components/guard/SignedInPage";
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
    <SignedInPage>
      <div className="mt-10 flex flex-col items-center justify-around">
        <CalendarForm />
        <Jam />
      </div>
    </SignedInPage>
  );
};

export default HomePage;
