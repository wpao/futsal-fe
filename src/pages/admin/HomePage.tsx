import { CalendarForm } from "@/components/CalendarForm";
import { Jam } from "@/components/admin/Jam";
import { AdminPage } from "@/components/guard/AdminPage";

// redux
import { useDispatch } from "react-redux";

const JamPage = () => {
  const dispatch = useDispatch();

  // supaya home mengarah ke admin/edit
  dispatch({ type: "USER_CHANGE" });
  return (
    <AdminPage>
      <div className="mt-10 flex flex-col items-center justify-around">
        <CalendarForm />
        <Jam />
      </div>
    </AdminPage>
  );
};

export default JamPage;
