// import React, { useRef } from "react";
// import { Button } from "@/components/ui/button"; // atau library UI lainnya

// interface LaporanData {
//   judul: string;
//   kolom: string[];
//   data: any[];
//   footer?: string;
// }

// interface CetakLaporanProps {
//   data: LaporanData;
//   onCetak?: () => void;
//   className?: string;
// }

// const CetakLaporan: React.FC<CetakLaporanProps> = ({
//   data,
//   onCetak,
//   className,
// }) => {
//   const laporanRef = useRef<HTMLDivElement>(null);

//   const handleCetak = () => {
//     if (onCetak) {
//       onCetak();
//     }

//     const printWindow = window.open("", "_blank");
//     if (printWindow && laporanRef.current) {
//       printWindow.document.write(`
//         <html>
//           <head>
//             <title>${data.judul}</title>
//             <style>
//               body { font-family: Arial, sans-serif; margin: 20px; }
//               h1 { text-align: center; margin-bottom: 20px; }
//               table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
//               th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
//               th { background-color: #f2f2f2; }
//               .footer { text-align: right; margin-top: 30px; font-style: italic; }
//               @media print {
//                 .no-print { display: none; }
//                 body { margin: 0; padding: 0; }
//               }
//             </style>
//           </head>
//           <body>
//             ${laporanRef.current.innerHTML}
//           </body>
//         </html>
//       `);
//       printWindow.document.close();
//       printWindow.focus();
//       setTimeout(() => {
//         printWindow.print();
//         printWindow.close();
//       }, 500);
//     }
//   };

//   return (
//     <div className={className}>
//       <div className="no-print" style={{ marginBottom: 16 }}>
//         <Button onClick={handleCetak}>Cetak Laporan</Button>
//       </div>

//       <div ref={laporanRef}>
//         <h1>{data.judul}</h1>

//         <table>
//           <thead>
//             <tr>
//               {data.kolom.map((header, index) => (
//                 <th key={index}>{header}</th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {data.data.map((row, rowIndex) => (
//               <tr key={rowIndex}>
//                 {data.kolom.map((col, colIndex) => (
//                   <td key={colIndex}>{row[col] || "-"}</td>
//                 ))}
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         {data.footer && (
//           <div className="footer">
//             <p>{data.footer}</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CetakLaporan;

// ==================================================================
// import React, { useRef, useState } from "react";
// import { Button } from "@/components/ui/button"; // atau library UI lainnya

// interface LaporanData {
//   judul: string;
//   kolom: string[];
//   data: any[];
//   footer?: string;
// }

// interface CetakLaporanProps {
//   data: LaporanData;
//   onCetak?: () => void;
//   className?: string;
// }

// const CetakLaporan: React.FC<CetakLaporanProps> = ({
//   data,
//   onCetak,
//   className,
// }) => {
//   const laporanRef = useRef<HTMLDivElement>(null);
//   const [showLaporan, setShowLaporan] = useState(false);

//   const handleCetak = () => {
//     if (onCetak) {
//       onCetak();
//     }

//     const printWindow = window.open("", "_blank");
//     if (printWindow && laporanRef.current) {
//       printWindow.document.write(`
//         <html>
//           <head>
//             <title>${data.judul}</title>
//             <style>
//               body { font-family: Arial, sans-serif; margin: 20px; }
//               h1 { text-align: center; margin-bottom: 20px; }
//               table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
//               th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
//               th { background-color: #f2f2f2; }
//               .footer { text-align: right; margin-top: 30px; font-style: italic; }
//               @media print {
//                 .no-print { display: none; }
//                 body { margin: 0; padding: 0; }
//               }
//             </style>
//           </head>
//           <body>
//             ${laporanRef.current.innerHTML}
//           </body>
//         </html>
//       `);
//       printWindow.document.close();
//       printWindow.focus();
//       setTimeout(() => {
//         printWindow.print();
//         printWindow.close();
//       }, 500);
//     }
//   };

//   const toggleLaporan = () => {
//     setShowLaporan(!showLaporan);
//   };

//   return (
//     <div className={className}>
//       <div
//         className="no-print"
//         style={{ marginBottom: 16, display: "flex", gap: "8px" }}
//       >
//         <Button onClick={toggleLaporan}>
//           {showLaporan ? "Sembunyikan Laporan" : "Lihat Laporan"}
//         </Button>

//         {showLaporan && <Button onClick={handleCetak}>Cetak Laporan</Button>}
//       </div>

//       {showLaporan && (
//         <div ref={laporanRef}>
//           <h1>{data.judul}</h1>

//           <table>
//             <thead>
//               <tr>
//                 {data.kolom.map((header, index) => (
//                   <th key={index}>{header}</th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {data.data.map((row, rowIndex) => (
//                 <tr key={rowIndex}>
//                   {data.kolom.map((col, colIndex) => (
//                     <td key={colIndex}>{row[col] || "-"}</td>
//                   ))}
//                 </tr>
//               ))}
//             </tbody>
//           </table>

//           {data.footer && (
//             <div className="footer">
//               <p>{data.footer}</p>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default CetakLaporan;

// ==================================================================

import React from "react";
import { Button } from "@/components/ui/button"; // atau library UI lainnya

interface LaporanData {
  judul: string;
  kolom: string[];
  data: any[];
  footer?: string;
}

interface CetakLaporanProps {
  data: LaporanData;
  onCetak?: () => void;
  className?: string;
  buttonText?: string;
}

const CetakLaporan: React.FC<CetakLaporanProps> = ({
  data,
  onCetak,
  className,
  buttonText = "Cetak Laporan",
}) => {
  const handleCetak = () => {
    if (onCetak) {
      onCetak();
    }

    const printContent = `
      <html>
        <head>
          <title>${data.judul}</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            h1 { text-align: center; margin-bottom: 20px; }
            table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; }
            .footer { text-align: right; margin-top: 30px; font-style: italic; }
            @page { size: auto; margin: 5mm; }
          </style>
        </head>
        <body>
          <h1>${data.judul}</h1>
          
          <table>
            <thead>
              <tr>
                ${data.kolom.map((header) => `<th>${header}</th>`).join("")}
              </tr>
            </thead>
            <tbody>
              ${data.data
                .map(
                  (row) => `
                <tr>
                  ${data.kolom.map((col) => `<td>${row[col] || "-"}</td>`).join("")}
                </tr>
              `,
                )
                .join("")}
            </tbody>
          </table>
          
          ${data.footer ? `<div class="footer"><p>${data.footer}</p></div>` : ""}
        </body>
      </html>
    `;

    const printWindow = window.open("", "_blank");
    if (printWindow) {
      printWindow.document.write(printContent);
      printWindow.document.close();
      printWindow.focus();

      // Memberi sedikit delay untuk memastikan konten terload sebelum print
      setTimeout(() => {
        printWindow.print();
        // Tidak langsung ditutup agar user bisa melihat print preview
        // printWindow.close();
      }, 200);
    }
  };

  return (
    <div className={className}>
      <Button onClick={handleCetak}>{buttonText}</Button>
    </div>
  );
};

export default CetakLaporan;
