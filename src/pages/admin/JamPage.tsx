// ini adalah halaman sama seperti HomePage.tsx

import { CalendarForm } from "@/components/CalendarForm";
import { Jam } from "@/components/admin/Jam";
import { AdminPage } from "@/components/guard/AdminPage";
import { DataTableDemo } from "./DataTableDemo";
// import { useState } from "react";

// redux
// import { useDispatch } from "react-redux";

const JamPage = () => {
  // const dispatch = useDispatch();

  // Loading...
  // const [timesIsLoading, setTimesIsLoading] = useState(false);

  // supaya home mengarah ke admin/edit
  // dispatch({ type: "USER_CHANGE" });

  return (
    <AdminPage>
      <div className="flex h-screen flex-col justify-around bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% bg-cover md:flex-row md:justify-evenly">
        <div>
          <CalendarForm />
          <Jam />
        </div>
        <div className="mt-10">
          <DataTableDemo />
        </div>
      </div>
    </AdminPage>
  );
};

export default JamPage;
