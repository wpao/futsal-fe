import {
  // SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
// import { AppSidebar } from "@/components/AppSidebar";
import { DataTableDemo } from "./admin/DataTableDemo";
import { Jam } from "@/components/admin/Jam";
import { CalendarForm } from "@/components/CalendarForm";

export default function Layout() {
  return (
    <>
      {/* <AppSidebar /> */}
      <main>
        <SidebarTrigger />
        {/* {children} */}
      </main>
      <SidebarInset>
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="mr-4 flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <div className="mb-10 mt-10 flex flex-col px-4 md:flex-row md:justify-evenly lg:px-6">
                <div className="w-64">
                  <CalendarForm />
                </div>
                <div className="w-64">
                  <Jam />
                </div>
              </div>
              {/* <DataTable data={data} /> */}
              <DataTableDemo />
            </div>
          </div>
        </div>
      </SidebarInset>
    </>
  );
}
