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

  // jam
  const [times, setTimes] = useState([]);
  const [jamSelesai, setJamSelesai] = useState(jamSelector.timeBooking);
  // const [refreshJam, setRefreshJam] = useState(jamSelector.timeBooking);

  // redux (by : paozan)
  // redux menggunakan dispatch untuk mengubah state global
  const dispatch = useDispatch();

  // jam get
  const fetchC = async () => {
    try {
      const response = await axiosInstance.get(
        "/" + dateSelector.tahunbulantanggal,
      );
      setTimes(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
      return [];
    }
  };

  const popupFunction = (jam: Number) => {
    dispatch({ type: "JAM_CHANGE", payload: jam });
    if (jam == 24) {
      setJamSelesai(1);
    } else {
      setJamSelesai(Number(jam) + 1);
    }
  };

  // jika booking di tekan, console.log(object)
  const onBookingSubmit = async () => {
    // update data jam db.json
    try {
      await axiosInstance.patch(
        `${dateSelector.tahunbulantanggal}/${jamSelector.timeBooking}`,
        {
          name: "admin",
          bayar: true,
          wa: 98776654321,
          price: 50000,
        },
      );

      alert("Booking berhasil");

      console.log("button booking was clicked");
      fetchC();

      // close popup
    } catch (error) {
      console.log(error);
    }
  };

  const unBookingSubmit = async () => {
    // update data jam db.json
    try {
      await axiosInstance.patch(
        `${dateSelector.tahunbulantanggal}/${jamSelector.timeBooking}`,
        {
          name: "",
          bayar: false,
          wa: 0,
          price: 0,
        },
      );

      alert("unBooking berhasil");
      console.log("button unBooking was clicked");
      fetchC();
    } catch (error) {
      console.log(error);
    }
  };

  // ketika tanggal berubah
  useEffect(() => {
    fetchC();
    console.log("tanggal berubah");
  }, [dateSelector]);

  return (
    <AlertDialog>
      <div className="mb-10 mt-10 grid grid-cols-5 items-center gap-2">
        {times.map((time: typeTime) => (
          <AlertDialogTrigger key={time.id}>
            <div
              onClick={() => popupFunction(time.jam)}
              key={time.id}
              className={`flex h-10 w-10 cursor-pointer items-center justify-center border ${
                time.price > 0 ? "border-red-500 bg-red-100" : "border-gray-300"
              }`}
            >
              {time.jam}
            </div>
          </AlertDialogTrigger>
        ))}
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Jam : {String(jamSelector.timeBooking)} - {String(jamSelesai)} |
              date : {dateSelector.tahunbulantanggal}
            </AlertDialogTitle>
            <AlertDialogDescription>
              Silahkan pilih jam yang akan di booking atau unBooking
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <div className="flex justify-around">
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogCancel onClick={unBookingSubmit}>
                unBooking
              </AlertDialogCancel>
              <AlertDialogCancel onClick={onBookingSubmit}>
                Booking
              </AlertDialogCancel>
            </div>
          </AlertDialogFooter>
        </AlertDialogContent>
      </div>
    </AlertDialog>
  );
};

//
type typeTime = {
  id: number;
  name: string;
  price: number;
  jam: number;
};
