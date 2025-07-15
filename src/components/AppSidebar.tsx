import {
  Calendar,
  ChevronUp,
  Home,
  // Inbox,
  // Search,
  // Settings,
  User2,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
// import { NavUser } from "./NavUser";
//
import CetakLaporan from "@/components/CetakLaporan";

// Menu items.
const items = [
  {
    title: "Home",
    url: "/admin/edit",
    icon: Home,
  },
  // {
  //   title: "Info",
  //   url: "/admin/editTableInfo",
  //   icon: Inbox,
  // },
  // {
  //   title: "Calendar",
  //   url: "/layout",
  //   icon: Calendar,
  // },
  // {
  //   title: "Search",
  //   url: "#",
  //   icon: Search,
  // },
  // {
  //   title: "Settings",
  //   url: "#",
  //   icon: Settings,
  // },
  {
    title: "Lapangan",
    url: "/admin/lapangan",
    icon: Calendar,
  },
  {
    title: "Pelanggan",
    url: "/admin/booking",
    icon: Calendar,
  },
  {
    title: "Booking",
    url: "/admin/booking",
    icon: Calendar,
  },
  {
    title: "Skejule",
    url: "/admin/editTableInfo",
    icon: Calendar,
  },
];

// const data = {
//   user: {
//     name: "shadcn",
//     email: "m@example.com",
//     avatar: "/avatars/shadcn.jpg",
//   }
// }

// redux
// import { RootState } from "../store/store";
import { useDispatch } from "react-redux";

export function AppSidebar() {
  // declaration deispatch
  const dispatch = useDispatch();

  // handle logout
  const handleLogout = () => {
    // 1. remove local storage
    localStorage.removeItem("current-user");
    localStorage.removeItem("token");
    localStorage.removeItem("lapangan-change");

    // 2. reset user slice
    dispatch({ type: "ADMIN_LOGOUT" });
  };

  //
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
      <Sidebar>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Application</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton>
                    <User2 /> Username
                    <ChevronUp className="ml-auto" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  side="top"
                  className="w-[--radix-popper-anchor-width]"
                >
                  {/* <DropdownMenuItem>
                  <span>Account</span>
                </DropdownMenuItem> */}
                  {/* <DropdownMenuItem>
                  <span>Billing</span>
                </DropdownMenuItem> */}
                  <DropdownMenuItem>
                    <CetakLaporan
                      className="w-full p-1"
                      data={dataLaporan}
                      onCetak={() => console.log("Mencetak laporan...")}
                    />
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    {/* <span className="w-full cursor-pointer text-right">
                    Sign out
                  </span> */}
                    <Link to="/">
                      <Button
                        className="w-32 cursor-pointer rounded-lg border-2 p-1"
                        onClick={handleLogout}
                      >
                        Keluar
                      </Button>
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
        {/* <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter> */}
      </Sidebar>
    </>
  );
}
