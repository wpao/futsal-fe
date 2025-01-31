import { CalendarForm } from "@/components/CalendarForm";
import { Jam } from "@/components/Jam";

// redux
import { useDispatch } from "react-redux";

const HomePage = () => {
  const dispatch = useDispatch();

  // supaya home mengarah ke /
  dispatch({ type: "USER_UN_CHANGE" });
  return (
    <div className="mt-10 flex flex-col items-center justify-around">
      <CalendarForm />
      <Jam />
    </div>
  );
};

export default HomePage;
