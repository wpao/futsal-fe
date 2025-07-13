import {
  // SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
// import { AppSidebar } from "@/components/AppSidebar";
import { DataTableDemo } from "./admin/DataTableDemo";
import { Jam } from "@/components/admin/Jam";
import { CalendarForm } from "@/components/CalendarForm";
import CetakLaporan from "@/components/CetakLaporan";

export default function Layout() {
  //
  const dataLaporan = {
    judul: "Laporan Penjualan Bulanan",
    kolom: ["No", "Bulan", "Total Penjualan", "Profit"],
    data: [
      {
        No: 1,
        Bulan: "Januari",
        "Total Penjualan": "Rp 10.000.000",
        Profit: "Rp 2.000.000",
      },
      {
        No: 2,
        Bulan: "Februari",
        "Total Penjualan": "Rp 12.000.000",
        Profit: "Rp 2.500.000",
      },
      // Data lainnya...
    ],
    footer: "Laporan dibuat pada: " + new Date().toLocaleDateString(),
  };

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
              <CetakLaporan
                data={dataLaporan}
                onCetak={() => console.log("Mencetak laporan...")}
              />
              <DataTableDemo />
            </div>
          </div>
        </div>
      </SidebarInset>
    </>
  );
}
