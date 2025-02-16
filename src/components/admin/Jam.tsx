import { axiosInstance } from "@/lib/axios";

// redux
import { useSelector } from "react-redux";

// redux
import { RootState } from "../../store/store";
import { useEffect, useState } from "react";

// alert dialog
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { useDispatch } from "react-redux";
import axios from "axios";

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
  const fetchC = async () => {
    setProductIsLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:3000/bookings/filter?date=${dateSelector.tahunbulantanggal}`,
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

  // jika booking di tekan
  // add data to API Reinjadi Sharing tour
  // const onBookingSubmit = async () => {
  //   try {
  //     await axiosInstance.post(`/api/booking/create`, {
  //       name: "admin",
  //       price: 100000,
  //       wa: "081907257059",
  //       time: jamSelector.timeBooking,
  //       date: dateSelector.tahunbulantanggal,
  //       isBayar: true,
  //     });

  //     // info berhasil
  //     alert("Booking berhasil");

  //     // refresh halaman dengan cara memanggil fungsi fetch
  //     fetchC();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // jika booking di tekan
  // add data to http://localhost:3000/booking API Docker postgresql
  const onBookingSubmit = async () => {
    try {
      await axios.post(`http://localhost:3000/bookings`, {
        username: "admin",
        price: 100000,
        wa: "081907257059",
        time: jamSelector.timeBooking,
        date: dateSelector.tahunbulantanggal,
        isBayar: true,
      });

      // info berhasil
      alert("Booking berhasil");

      // refresh halaman dengan cara memanggil fungsi fetch
      fetchC();
    } catch (error) {
      console.log(error);
    }
  };

  const unBookingSubmit = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3000/bookings/delete/${id}`);

      alert("unBooking berhasil");
      fetchC();
    } catch (error) {
      console.log(error);
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
                Silahkan pilih jam yang akan di booking atau unBooking
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <div className="flex justify-around">
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogCancel
                  // status terbooking atau belum || jam lebih kecil atau lebih besar
                  disabled={
                    !buttonSelector.chack || buttonSelector.disableButton
                  }
                  onClick={() =>
                    unBookingSubmit(jamSelector.timeDelete.valueOf())
                  }
                >
                  {/* disable ketika jam lebih kecil && belum terbooking */}
                  unBooking
                </AlertDialogCancel>
                <AlertDialogCancel
                  // status terbooking atau belum || jam lebih kecil atau lebih besar
                  disabled={
                    buttonSelector.chack || buttonSelector.disableButton
                  }
                  onClick={onBookingSubmit}
                >
                  {/* disable ketika jam lebih kecil && sudah terbooking */}
                  Booking
                </AlertDialogCancel>
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
