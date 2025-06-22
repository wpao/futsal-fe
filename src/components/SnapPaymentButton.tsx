import { Button } from "@/components/ui/button";
import axiosInstance from "@/lib/axios";
import React, { useEffect, useState } from "react";

declare global {
  interface Window {
    snap: any;
  }
}

interface SnapPaymentButtonProps {
  itemName: string;
  price: number;
}

export const SnapPaymentButton: React.FC<SnapPaymentButtonProps> = ({
  itemName,
  price,
}) => {
  console.log("ini adalah snap payment button");
  console.log(itemName);
  console.log(price);
  const [data, setData] = useState({
    // idTemplate: "",
    // namaPria: "",
    // namaWanita: "",
    namaPemboking: "ansori",
    wa: "",
    // email: "",
  });

  // const [idPeople, setIdPeople] = useState("");

  // Hanya mengubah nomor WA
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData((prev) => ({
      ...prev,
      wa: e.target.value,
    }));
  };

  // pesan wa
  // const linkTemplate = import.meta.env.VITE_LINK_THIS_TEMPLATE;
  // const idTemplate = import.meta.env.VITE_ID_TEMPLATE;

  const handlePay = async () => {
    // midtrans
    try {
      const res = await axiosInstance.post("/midtrans/snap", {
        item_details: {
          name: itemName,
          price: price,
          quantity: 1,
        },
        transaction_details: {
          order_id: String(Date.now()), // order_id harus unik
          gross_amount: price,
        },
      });

      const { token } = res.data;
      console.log(token);

      window.snap.pay(token, {
        onSuccess: async (result: any) => {
          console.log("✅ Pembayaran berhasil:", result);

          // tambah data ke database
          // try {
          //   await axiosInstance.post("/templates", data);
          //   alert("✅ Data berhasil ditambahkan");
          // } catch (error) {
          //   console.error("❌ Gagal simpan:", error);
          //   alert("❌ Data gagal ditambahkan. Terjadi kesalahan");
          // }

          // get data kemudian dapatkan idPeople
          // try {
          //   const res = await axiosInstance.get("/templates");

          //   // dapatkan idPeople yang terakhir
          //   const idPeople = res.data[res.data.length - 1].idPeople; // get last data
          //   console.log(res.data[0].idPeople);
          //   // const idPeople = res.data[0].idPeople; // get first data

          //   setIdPeople(idPeople);
          //   console.log("idPeople on /templates =", idPeople);
          // } catch (error) {
          //   console.error("❌ Gagal simpan:", error);
          //   alert("❌ Data gagal ditambahkan. Terjadi kesalahan");
          // }

          // Kirim pesan WhatsApp
          // try {
          //   console.log("idPeople on /whatsapp/send-wa =", idPeople);
          //   await axiosInstance.post("/whatsapp/send-wa", {
          //     // phone: "6282146480321", // Pastikan dalam format internasional tanpa "+"
          //     phone: data.wa, // Pastikan dalam format internasional tanpa "+"
          //     message: `Pembayaran berhasil! Ini link kamu: https://${linkTemplate}/${idPeople}?idTemplate=${idTemplate}`,
          //   });
          //   console.log("✅ Pesan WhatsApp terkirim");
          //   console.log("idPeople on /whatsapp/send-wa =", idPeople);
          // } catch (waErr) {
          //   console.error("❌ Gagal kirim pesan WhatsApp:", waErr);
          // }

          alert("Pembayaran berhasil!");
        },
        onPending: (result: any) => {
          console.log("Pending", result);
          alert("Pembayaran tertunda!");
        },
        onError: (result: any) => {
          console.error("Error", result);
          alert("Terjadi kesalahan saat membayar.");
        },
        onClose: () => {
          alert("Kamu menutup popup tanpa menyelesaikan pembayaran.");
        },
      });
    } catch (error) {
      console.error("Gagal membuat transaksi", error);
      alert("Gagal membuat transaksi");
    }
  };

  // Ambil data dari localStorage saat komponen mount
  useEffect(() => {
    const stored = localStorage.getItem("data");
    if (stored) {
      setData(JSON.parse(stored));
    }
  }, []);

  // ketika idPeople ada, kirim pesan WA
  // useEffect(() => {
  //   if (idPeople) {
  //     console.log("idPeople on /whatsapp/send-wa =", idPeople);
  //     const sendWa = async () => {
  //       try {
  //         await axiosInstance.post("/whatsapp/send-wa", {
  //           phone: data.wa,
  //           message: `Pembayaran berhasil! Ini link kamu: https://${linkTemplate}/${idPeople}?idTemplate=${idTemplate}`,
  //         });
  //         console.log("✅ Pesan WhatsApp terkirim");
  //         console.log("idPeople on /whatsapp/send-wa =", idPeople);
  //       } catch (error) {
  //         console.error("❌ Gagal kirim WA:", error);
  //       }
  //     };
  //     sendWa();
  //   }
  // }, [idPeople]); // Trigger saat idPeople berubah

  return (
    <>
      <input
        type="text"
        name="wa"
        placeholder="Nomor WhatsApp"
        value={data.wa}
        onChange={handleChange}
        className="mb-2 w-full rounded border px-3 py-2"
      />
      <Button onClick={handlePay}>Bayar Sekarang</Button>
    </>
  );
};
