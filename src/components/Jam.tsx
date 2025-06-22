// redux
import { useSelector } from "react-redux";

// redux
import { RootState } from "../store/store";
import { useEffect, useState } from "react";

// alert dialog
import {
  AlertDialog,
  // AlertDialogPortal,
  // AlertDialogOverlay,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";

import { useDispatch } from "react-redux";
// import axios from "axios";
import axiosInstance from "@/lib/axios";
// import { SnapPaymentButton } from "./SnapPaymentButton";

// mendapatkan tahun bulan tanggal sekarang
// mendapatkan jam sekarang
const getCurrentDateTime = () => {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0"); // Bulan dimulai dari 0
  const day = String(now.getDate()).padStart(2, "0");
  const hour = now.getHours();

  return { year, month, day, hour };
};

const {
  year: tahun,
  month: bulan,
  day: tanggal,
  hour: jamNow,
} = getCurrentDateTime();
const tahunBulanTanggalNow = `${tahun}-${bulan}-${tanggal}`;

export const Jam = () => {
  // redux
  const dateSelector = useSelector((state: RootState) => state.date);
  const jamSelector = useSelector((state: RootState) => state.jam);
  const buttonSelector = useSelector((state: RootState) => state.check);

  // loading..
  const [productIsLoading, setProductIsLoading] = useState(false);

  // jam
  const [times, setTimes] = useState<TypeTime[]>([]);

  // mengatur jika jam yang di pilih 24 maka jam selesai akan menjadi 01
  // mengatur penambahan 1 jam dari jam yang di pilih untuk di tampilkan
  const [jamSelesai, setJamSelesai] = useState(jamSelector.timeBooking);

  // redux
  // redux menggunakan dispatch untuk mengubah state global
  const dispatch = useDispatch();

  // mendapatkan jam dari tahun-bulan-tanggal yang di pilih
  // const fetchC = async () => {
  //   setProductIsLoading(true);
  //   try {
  //     const response = await axiosInstance.get(
  //       `/api/booking/all?date=${dateSelector.tahunbulantanggal}`,
  //     );
  //     setTimes(response.data.data);
  //   } catch (error) {
  //     console.error("Error fetching products:", error);
  //     return [];
  //   } finally {
  //     setProductIsLoading(false);
  //   }
  // };

  // fetch data from http://localhost:3000/booking API Docker postgresql
  // GET /bookings/filter?date=2025-02-19&idUser=1f746f94-0c8e-4360-8b1d-8d70ec62418f
  const fetchC = async () => {
    // dapatkan data current-user yang login dari localStorage
    const currentUser = localStorage.getItem("current-user");
    setProductIsLoading(true);
    try {
      const response = await axiosInstance.get(
        `/bookings/filter?date=${dateSelector.tahunbulantanggal}&idUser=${currentUser}`,
      );
      setTimes(response.data.data);
    } catch (error) {
      console.error("Error fetching products:", error);
      return [];
    } finally {
      setProductIsLoading(false);
    }
  };

  // ketika kotak jam di tekan akan memunculkan popup ini
  const popupFunction = (jam: Number, id: number) => {
    // =====================================================
    // jam di yangdi booking
    dispatch({ type: "JAM_CHANGE", payload: jam });
    // id data yang akan di hapus
    dispatch({ type: "JAM_DELETE", payload: id });

    // =====================================================
    if (dateSelector.tahunbulantanggal == tahunBulanTanggalNow) {
      // kondisi ini untuk mengatur disable 2 button
      // jika (jam kotak) < dari (jam sekarang), maka button (booking dan unBooking pada popup) akan disable
      if (jam.valueOf() <= jamNow) {
        dispatch({ type: "DISABLE_BUTTON_TRUE" });
      } else {
        // jika buttonSelector false maka button (booking dan unBooking pada popup) un-disable
        dispatch({ type: "DISABLE_BUTTON_FALSE" });
      }
    } else {
      // jika tahun-bulan-tanggal yang di click > tahun-bulan-tanggal sekarang, maka jangan disable button (booking dan unBooking pada popup)
      dispatch({ type: "DISABLE_BUTTON_FALSE" });
    }

    // =====================================================
    // kondisi ini untuk mengatur disable button
    if (id) {
      // kotak yang tertekan sudah di booking
      // jika true maka button booking akan di disable (button dalam popup)
      dispatch({ type: "DISABLE_CHANGE_TRUE" });
    } else {
      // kotak yang tertekan belum di booking
      // jika false maka button unBooking akan di disable (button dalam popup)
      dispatch({ type: "DISABLE_CHANGE_FALSE" });
    }

    // =====================================================
    // untuk memberi info jika booking jam 24 maka selesainya pada jam 1
    // kecil kemungkinan orang main futsal di tengah malam
    if (jam == 24) {
      setJamSelesai(1);
    } else {
      setJamSelesai(Number(jam) + 1);
    }
  };

  // =============
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
  });

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePay = async () => {
    console.log("Data yang disimpan:", formData);
    // midtrans
    try {
      const res = await axiosInstance.post("/midtrans/snap", {
        item_details: {
          name: formData.name,
          phone: formData.phone,
          quantity: 1,
        },
        transaction_details: {
          order_id: String(Date.now()), // order_id harus unik
          gross_amount: 100000,
        },
      });

      const { token } = res.data;
      console.log(token);

      window.snap.pay(token, {
        onSuccess: async (result: any) => {
          console.log("✅ Pembayaran berhasil:", result);

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

  // ketika tanggal berubah
  useEffect(() => {
    fetchC();
  }, [dateSelector]);

  //=====================================================
  // Buat kotak menggunakan ARRAY. buat sebanyak 15 kotak dari angka 8 sampai 22
  // kotak.id dimulai dari 8
  const kotakIds = Array.from({ length: 15 }, (_, i) => 8 + i);

  return (
    <AlertDialog>
      <h1 className="mb-2 mt-10">Jam</h1>
      {/* Loading.. */}
      {productIsLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-5 items-center gap-2">
          {kotakIds.map((kotakId) => {
            // Cari data yang cocok dengan kotakId
            const data = times.find((time) => time.time === kotakId);

            // Tentukan apakah kotak diberi tanda disable(css)
            let isDisabled = false;
            if (
              dateSelector.tahunbulantanggal == tahunBulanTanggalNow &&
              kotakId <= jamNow
            ) {
              isDisabled = true;
            }

            return (
              <AlertDialogTrigger
                key={kotakId}
                className="flex flex-col items-center"
              >
                <div
                  onClick={() => popupFunction(kotakId, data?.id ?? 0)}
                  className={`flex h-10 w-10 items-center justify-center border ${
                    isDisabled
                      ? "cursor-not-allowed border-gray-300 bg-gray-200"
                      : (data?.price ?? 0) > 0
                        ? "cursor-pointer border-red-500 bg-red-100"
                        : "cursor-pointer border-gray-300"
                  }`}
                >
                  {data ? data.time : kotakId}
                </div>
              </AlertDialogTrigger>
            );
          })}
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Jam : {`${jamSelector.timeBooking}`} - {`${jamSelesai}`} | date
                : {dateSelector.tahunbulantanggal}
              </AlertDialogTitle>
              <AlertDialogDescription>
                {/* Form di dalam Description */}
                <div className="mt-4 space-y-4">
                  <div>
                    <label htmlFor="name" className="mb-1 block">
                      Nama Lengkap
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full rounded border px-3 py-2"
                      placeholder="Masukkan nama Anda"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="mb-1 block">
                      Nomor HP
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full rounded border px-3 py-2"
                      placeholder="Masukkan nomor HP"
                    />
                  </div>
                </div>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <div className="flex justify-around">
                <AlertDialogCancel>Cancel</AlertDialogCancel>

                {/* <AlertDialogCancel
                  disabled={
                    buttonSelector.chack || buttonSelector.disableButton
                  }
                  onClick={onBookingSubmit}
                >
                  Booking
                </AlertDialogCancel> */}
                <AlertDialogAction
                  disabled={
                    buttonSelector.chack || buttonSelector.disableButton
                  }
                  onClick={handlePay}
                >
                  Booking
                </AlertDialogAction>
              </div>
            </AlertDialogFooter>
          </AlertDialogContent>
        </div>
      )}
    </AlertDialog>
  );
};

type TypeTime = {
  id: number;
  name: string;
  time: number;
  price: number;
  kotakId: number;
};
