// "use client";

// import * as React from "react";
// import {
//   ColumnDef,
//   ColumnFiltersState,
//   flexRender,
//   getCoreRowModel,
//   getFilteredRowModel,
//   getPaginationRowModel,
//   getSortedRowModel,
//   SortingState,
//   useReactTable,
//   VisibilityState,
// } from "@tanstack/react-table";
// import { ChevronDown, MoreHorizontal } from "lucide-react";
// // import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";

// import { Button } from "@/components/ui/button";
// import { Checkbox } from "@/components/ui/checkbox";
// import {
//   DropdownMenu,
//   DropdownMenuCheckboxItem,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// // import { Input } from "@/components/ui/input";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";

// const data: Payment[] = [
//   {
//     id: "m5gr84i9",
//     type: "type",
//     ukuran: "120 X 120 m",
//     kategory: "Futsal",
//     waktu: "08:00 - 22:00",
//     harga: "Rp. 50.000 - Rp. 150.000",
//   },
//   {
//     id: "m5gr84i9",
//     type: "type",
//     ukuran: "120 X 120 m",
//     kategory: "Futsal",
//     waktu: "08:00 - 22:00",
//     harga: "Rp. 50.000 - Rp. 150.000",
//   },
//   {
//     id: "m5gr84i9",
//     type: "type",
//     ukuran: "120 X 120 m",
//     kategory: "Futsal",
//     waktu: "08:00 - 22:00",
//     harga: "Rp. 50.000 - Rp. 150.000",
//   },
// ];

// export type Payment = {
//   id: string;
//   type: string;
//   ukuran: string;
//   kategory: string;
//   waktu: string;
//   harga: string;
// };

// export function Lapangan() {
//   // Ganti const data dengan state
//   const [data, setData] = React.useState<Payment[]>([
//     {
//       id: "m5gr84i9",
//       type: "type",
//       ukuran: "120 X 120 m",
//       kategory: "Futsal",
//       waktu: "08:00 - 22:00",
//       harga: "Rp. 50.000 - Rp. 150.000",
//     },
//     {
//       id: "m5gr84i9",
//       type: "type",
//       ukuran: "120 X 120 m",
//       kategory: "Futsal",
//       waktu: "08:00 - 22:00",
//       harga: "Rp. 50.000 - Rp. 150.000",
//     },
//     {
//       id: "m5gr84i9",
//       type: "type",
//       ukuran: "120 X 120 m",
//       kategory: "Futsal",
//       waktu: "08:00 - 22:00",
//       harga: "Rp. 50.000 - Rp. 150.000",
//     },
//   ]);

//   //
//   const [sorting, setSorting] = React.useState<SortingState>([]);
//   const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
//     [],
//   );
//   const [columnVisibility, setColumnVisibility] =
//     React.useState<VisibilityState>({});
//   const [rowSelection, setRowSelection] = React.useState({});

//   const table = useReactTable({
//     data,
//     columns,
//     onSortingChange: setSorting,
//     onColumnFiltersChange: setColumnFilters,
//     getCoreRowModel: getCoreRowModel(),
//     getPaginationRowModel: getPaginationRowModel(),
//     getSortedRowModel: getSortedRowModel(),
//     getFilteredRowModel: getFilteredRowModel(),
//     onColumnVisibilityChange: setColumnVisibility,
//     onRowSelectionChange: setRowSelection,
//     state: {
//       sorting,
//       columnFilters,
//       columnVisibility,
//       rowSelection,
//     },
//   });

//   return (
//     <div className="w-full p-10">
//       <div className="flex items-center py-4">
//         <DropdownMenu>
//           <DropdownMenuTrigger asChild>
//             <Button variant="outline" className="ml-auto">
//               Columns <ChevronDown />
//             </Button>
//           </DropdownMenuTrigger>
//           <DropdownMenuContent align="end">
//             {table
//               .getAllColumns()
//               .filter((column) => column.getCanHide())
//               .map((column) => {
//                 return (
//                   <DropdownMenuCheckboxItem
//                     key={column.id}
//                     className="capitalize"
//                     checked={column.getIsVisible()}
//                     onCheckedChange={(value) =>
//                       column.toggleVisibility(!!value)
//                     }
//                   >
//                     {column.id}
//                   </DropdownMenuCheckboxItem>
//                 );
//               })}
//           </DropdownMenuContent>
//         </DropdownMenu>
//       </div>
//       <div className="rounded-md border">
//         <Table>
//           <TableHeader>
//             {table.getHeaderGroups().map((headerGroup) => (
//               <TableRow key={headerGroup.id}>
//                 {headerGroup.headers.map((header) => {
//                   return (
//                     <TableHead key={header.id}>
//                       {header.isPlaceholder
//                         ? null
//                         : flexRender(
//                             header.column.columnDef.header,
//                             header.getContext(),
//                           )}
//                     </TableHead>
//                   );
//                 })}
//               </TableRow>
//             ))}
//           </TableHeader>
//           <TableBody>
//             {table.getRowModel().rows?.length ? (
//               table.getRowModel().rows.map((row) => (
//                 <TableRow
//                   key={row.id}
//                   data-state={row.getIsSelected() && "selected"}
//                 >
//                   {row.getVisibleCells().map((cell) => (
//                     <TableCell key={cell.id}>
//                       {flexRender(
//                         cell.column.columnDef.cell,
//                         cell.getContext(),
//                       )}
//                     </TableCell>
//                   ))}
//                 </TableRow>
//               ))
//             ) : (
//               <TableRow>
//                 <TableCell
//                   colSpan={columns.length}
//                   className="h-24 text-center"
//                 >
//                   No results.
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </div>
//       <div className="flex items-center justify-end space-x-2 py-4">
//         <div className="flex-1 text-sm text-muted-foreground">
//           {table.getFilteredSelectedRowModel().rows.length} of{" "}
//           {table.getFilteredRowModel().rows.length} row(s) selected.
//         </div>
//         <div className="space-x-2">
//           <Button
//             variant="outline"
//             size="sm"
//             onClick={() => table.previousPage()}
//             disabled={!table.getCanPreviousPage()}
//           >
//             Previous
//           </Button>
//           <Button
//             variant="outline"
//             size="sm"
//             onClick={() => table.nextPage()}
//             disabled={!table.getCanNextPage()}
//           >
//             Next
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export const columns: ColumnDef<Payment>[] = [
//   {
//     id: "select",
//     header: ({ table }) => (
//       <Checkbox
//         checked={
//           table.getIsAllPageRowsSelected() ||
//           (table.getIsSomePageRowsSelected() && "indeterminate")
//         }
//         onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
//         aria-label="Select all"
//       />
//     ),
//     cell: ({ row }) => (
//       <Checkbox
//         checked={row.getIsSelected()}
//         onCheckedChange={(value) => row.toggleSelected(!!value)}
//         aria-label="Select row"
//       />
//     ),
//     enableSorting: false,
//     enableHiding: false,
//   },
//   {
//     accessorKey: "type",
//     header: "type Lapangan",
//     cell: ({ row }) => <div className="capitalize">{row.getValue("type")}</div>,
//   },
//   {
//     accessorKey: "ukuran",
//     header: "Ukuran",
//     cell: ({ row }) => (
//       <div className="capitalize">{row.getValue("ukuran")}</div>
//     ),
//   },
//   {
//     accessorKey: "kategory",
//     header: "Kategory",
//     cell: ({ row }) => (
//       <div className="capitalize">{row.getValue("kategory")}</div>
//     ),
//   },
//   {
//     accessorKey: "waktu",
//     header: "Waktu",
//     cell: ({ row }) => (
//       <div className="capitalize">{row.getValue("waktu")}</div>
//     ),
//   },
//   {
//     accessorKey: "harga",
//     header: "Harga Sewa",
//     cell: ({ row }) => (
//       <div className="capitalize">{row.getValue("harga")}</div>
//     ),
//   },
//   {
//     id: "actions",
//     enableHiding: false,
//     cell: ({ row }) => {
//       const payment = row.original;
//       console.log(payment);

//       const handleDelete = async () => {
//         // console.log(payment.id);
//         // Show confirmation dialog
//         const confirmDelete = window.confirm(`Are you sure you want to delete`);

//         if (!confirmDelete) return;

//         // Filter data untuk menghapus item dengan id yang sesuai
//         const updatedData = data.filter((item) => item.id !== payment.id);

//         console.log(updatedData);
//         // Set data baru ke dalam state
//         // setData(updatedData);
//       };

//       return (
//         <DropdownMenu>
//           <DropdownMenuTrigger asChild>
//             <Button variant="ghost" className="h-8 w-8 p-0">
//               <span className="sr-only">Open menu</span>
//               <MoreHorizontal />
//             </Button>
//           </DropdownMenuTrigger>
//           <DropdownMenuContent align="end">
//             <DropdownMenuLabel>Actions</DropdownMenuLabel>
//             <DropdownMenuSeparator />
//             <DropdownMenuItem>Edit</DropdownMenuItem>
//             <DropdownMenuItem>Add</DropdownMenuItem>
//             <DropdownMenuItem onClick={handleDelete}>Delete</DropdownMenuItem>
//           </DropdownMenuContent>
//         </DropdownMenu>
//       );
//     },
//   },
// ];
// ======================================================================
"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import { ChevronDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Tipe data Payment
export type Payment = {
  id: string;
  type: string;
  ukuran: string;
  kategory: string;
  waktu: string;
  harga: string;
};

// Fungsi untuk generate kolom (dipisah dari komponen utama)
export const getColumns = (
  setData: React.Dispatch<React.SetStateAction<Payment[]>>,
): ColumnDef<Payment>[] => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "type",
    header: "Type Lapangan",
    cell: ({ row }) => <div className="capitalize">{row.getValue("type")}</div>,
  },
  {
    accessorKey: "ukuran",
    header: "Ukuran",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("ukuran")}</div>
    ),
  },
  {
    accessorKey: "kategory",
    header: "Kategori",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("kategory")}</div>
    ),
  },
  {
    accessorKey: "waktu",
    header: "Waktu",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("waktu")}</div>
    ),
  },
  {
    accessorKey: "harga",
    header: "Harga Sewa",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("harga")}</div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original;

      const handleDelete = () => {
        const confirmDelete = window.confirm(
          "Apakah Anda yakin ingin menghapus lapangan ini?",
        );
        if (confirmDelete) {
          setData((prevData) =>
            prevData.filter((item) => item.id !== payment.id),
          );
        }
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {/* <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>Add</DropdownMenuItem> */}
            <DropdownMenuItem onClick={handleDelete}>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

// Komponen utama
export function Lapangan() {
  const [data, setData] = React.useState<Payment[]>([
    {
      id: "1",
      type: "Lapangan Futsal",
      ukuran: "20m x 40m",
      kategory: "Futsal",
      waktu: "08:00 - 22:00",
      harga: "Rp 100.000/jam",
    },
    {
      id: "2",
      type: "Lapangan Basket",
      ukuran: "28m x 15m",
      kategory: "Basket",
      waktu: "07:00 - 21:00",
      harga: "Rp 150.000/jam",
    },
  ]);

  // Gunakan useMemo untuk mengoptimasi kolom
  const columns = React.useMemo(() => getColumns(setData), []);

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full p-10">
      <div className="flex items-center py-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No data found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
