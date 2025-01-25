import { axiosInstance } from "@/lib/axios";

// redux
import { useSelector } from "react-redux";

// redux
import { RootState } from "../store/store";
import { useEffect, useState } from "react";

export const Jam = () => {
  // redux
  const dateSelector = useSelector((state: RootState) => state.date);

  // jam
  const [times, setTimes] = useState<TypeTime[]>([]);

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

  // ketika tanggal berubah
  useEffect(() => {
    fetchC();
  }, [dateSelector]);

  //=====================================================
  // Buat kotak menggunakan ARRAY. buat sebanyak 15 kotak dari angka 8 sampai 22
  // kotak.id dimulai dari 8
  const kotakIds = Array.from({ length: 15 }, (_, i) => 8 + i);
  return (
    <div className="mb-10 mt-10 grid grid-cols-5 items-center gap-2">
      {kotakIds.map((kotakId) => {
        // Cari data yang cocok dengan kotakId
        const data = times.find((time) => time.time === kotakId);

        // Dapatkan jam saat ini
        const currentHour = new Date().getHours();

        // Tentukan apakah kotak perlu dinonaktifkan
        const isDisabled = kotakId < currentHour;

        return (
          <div key={kotakId} className="flex flex-col items-center">
            <div
              className={`flex h-10 w-10 items-center justify-center border ${
                isDisabled
                  ? "cursor-not-allowed border-gray-300 bg-gray-200"
                  : (data?.price ?? 0) > 0
                    ? "border-red-500 bg-red-100"
                    : "border-gray-300"
              }`}
            >
              {data ? data.time : kotakId}
            </div>
          </div>
        );
      })}
    </div>
  );
};

type TypeTime = {
  id: number;
  name: string;
  time: number;
  price: number;
  kotakId: number;
};
