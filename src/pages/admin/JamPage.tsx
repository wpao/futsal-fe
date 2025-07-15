// ini adalah halaman sama seperti HomePage.tsx

import { CalendarForm } from "@/components/CalendarForm";
import { Jam } from "@/components/admin/Jam";
import { AdminPage } from "@/components/guard/AdminPage";
import { DataTableDemo } from "./DataTableDemo";
// import { useState } from "react";

// redux
// import { useDispatch } from "react-redux";

//
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

const JamPage = () => {
  // const dispatch = useDispatch();

  // Loading...
  // const [timesIsLoading, setTimesIsLoading] = useState(false);

  // supaya home mengarah ke admin/edit
  // dispatch({ type: "USER_CHANGE" });

  return (
    <AdminPage>
      {/* <div className="flex h-screen w-full flex-row justify-around bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% bg-cover md:flex-row md:justify-evenly">
        <div className="flex flex-col">
          <CalendarForm />
          <Jam />
        </div>
        <div>
          <DataTableDemo />
        </div>
      </div> */}
      <div className="w-full">
        <ResizablePanelGroup
          direction="vertical"
          // className="rounded-lg border md:min-w-[450px]"
        >
          <ResizablePanel defaultSize={30}>
            <ResizablePanelGroup direction="horizontal">
              <ResizablePanel>
                <div className="flex h-full items-center justify-center p-6">
                  <span className="font-semibold">
                    <CalendarForm />
                  </span>
                </div>
              </ResizablePanel>
              <ResizableHandle />
              <ResizablePanel>
                <div className="flex h-full items-center justify-center p-6">
                  <span className="font-semibold">
                    <Jam />
                  </span>
                </div>
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>

          <ResizableHandle />

          <ResizablePanel>
            <div className="flex h-full items-center justify-center p-6">
              <span className="font-semibold">
                <DataTableDemo />
              </span>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </AdminPage>
  );
};

export default JamPage;
