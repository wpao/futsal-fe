import { axiosInstance } from "@/lib/axios";

// redux
import { useSelector } from "react-redux";

// redux
import { RootState } from "../store/store";
import { useEffect, useState } from "react";

// popup
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { useDispatch } from "react-redux";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export const Jam = () => {
  // redux
  const dateSelector = useSelector((state: RootState) => state.date);
  const jamSelector = useSelector((state: RootState) => state.jam);

  // jam
  const [times, setTimes] = useState([]);
  const [jamSelesai, setJamSelesai] = useState(jamSelector.timeBooking);

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

  // ketika tanggal berubah
  useEffect(() => {
    fetchC();
  }, [dateSelector]);

  return (
    <Popover>
      <div className="mb-10 mt-10 grid grid-cols-7 items-center gap-2">
        {times.map((time: typeTime) => (
          <PopoverTrigger>
            <div
              onClick={() => popupFunction(time.jam)}
              key={time.id}
              className={`flex h-10 w-10 cursor-pointer items-center justify-center border ${
                time.price > 0 ? "border-red-500 bg-red-100" : "border-gray-300"
              }`}
            >
              {time.jam}
            </div>
          </PopoverTrigger>
        ))}

        <PopoverContent className="m-3 flex h-[400px] w-[400px] flex-col justify-between border-2 border-gray-500 text-center">
          <div className="flex justify-center font-semibold">
            JAM : {String(jamSelector.timeBooking)} - {String(jamSelesai)} |
            Date : <p>{dateSelector.tahunbulantanggal}</p>
          </div>
          <div className="flex flex-col gap-5">
            <Input />
            <Input />
            <Input />
          </div>
          <div className="flex justify-around">
            <Button>Cancle</Button>
            <Button>Booking</Button>
          </div>
        </PopoverContent>
      </div>
    </Popover>
  );
};

//
type typeTime = {
  id: number;
  name: string;
  price: number;
  jam: number;
};
