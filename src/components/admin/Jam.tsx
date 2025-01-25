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

export const Jam = () => {
  // redux
  const dateSelector = useSelector((state: RootState) => state.date);
  const jamSelector = useSelector((state: RootState) => state.jam);
  const buttonSelector = useSelector((state: RootState) => state.check);

  // jam
  const now = new Date();
  const [times, setTimes] = useState<TypeTime[]>([]);
  const [jamSelesai, setJamSelesai] = useState(jamSelector.timeBooking);

  // redux
  // redux menggunakan dispatch untuk mengubah state global
  const dispatch = useDispatch();

  // jam get
  const fetchC = async () => {
    try {
      const response = await axiosInstance.get(
        `/api/booking/all?date=${dateSelector.tahunbulantanggal}`,
      );
      setTimes(response.data.data);
    } catch (error) {
      console.error("Error fetching products:", error);
      return [];
    }
  };

  const popupFunction = (jam: Number, id: number) => {
    // =====================================================
    dispatch({ type: "JAM_CHANGE", payload: jam });
    dispatch({ type: "JAM_DELETE", payload: id });

    // =====================================================
    // disable button bookong dan unBooking ketika jam lebih kecil dari jam sekarang
    // jika jam kotak lebih kecil dari jam sekarang, maka button booking dan unBooking akan disable
    // jika buttonSelector true maka button booking dan button unBooking akan di disable
    const hours = String(now.getHours()).padStart(2, "0");
    const hoursNow = parseInt(hours);
    if (jam.valueOf() >= hoursNow) {
      // jika buttonSelector false maka button booking dan button unBooking tidak disable
      dispatch({ type: "DISABLE_BUTTON_FALSE" });
    } else {
      // jika buttonSelector true maka button booking dan button unBooking akan disable
      dispatch({ type: "DISABLE_BUTTON_TRUE" });
    }

    // =====================================================
    // jika sudah terboking, maka akan masuk ke kondisi satu
    // kondisi ini di buat sebagai acuan untuk mengatur disable buttonpada popup yang muncul ketika kotak di tekan
    if (id > 0) {
      // kotak yang tertekan sudah di boking
      // rubah nilai redux menjadi true
      // jika true maka button booking akan di disable
      dispatch({ type: "DISABLE_CHANGE_TRUE" });
    } else if (id == 0) {
      // kotak yang tertekan belum di booking
      // rubah nilai redux menjadi false
      // jika false maka button unBooking akan di disable
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
  const onBookingSubmit = async () => {
    try {
      await axiosInstance.post(`/api/booking/create`, {
        name: "admin",
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
    // update data jam db.json
    try {
      await axiosInstance.delete(`/api/booking/delete/${id}`);

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
      <div className="mb-10 mt-10 grid grid-cols-5 items-center gap-2">
        {kotakIds.map((kotakId) => {
          // Cari data yang cocok dengan kotakId
          const data = times.find((time) => time.time === kotakId);

          // Dapatkan jam saat ini
          const currentHour = new Date().getHours();

          // Tentukan apakah kotak perlu dinonaktifkan
          const isDisabled = kotakId < currentHour;

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
              Jam : {`${jamSelector.timeBooking}`} - {`${jamSelesai}`} | date :{" "}
              {dateSelector.tahunbulantanggal}
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
                disabled={!buttonSelector.chack || buttonSelector.disableButton}
                onClick={() =>
                  unBookingSubmit(jamSelector.timeDelete.valueOf())
                }
              >
                {/* disable ketika jam lebih kecil && belum terbooking */}
                unBooking
              </AlertDialogCancel>
              <AlertDialogCancel
                // status terbooking atau belum || jam lebih kecil atau lebih besar
                disabled={buttonSelector.chack || buttonSelector.disableButton}
                onClick={onBookingSubmit}
              >
                {/* disable ketika jam lebih kecil && sudah terbooking */}
                Booking
              </AlertDialogCancel>
            </div>
          </AlertDialogFooter>
        </AlertDialogContent>
      </div>
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
