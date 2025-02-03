import { axiosInstance } from "@/lib/axios";

// redux
import { useSelector } from "react-redux";

// redux
import { RootState } from "../store/store";
import { useEffect, useState } from "react";

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

  // loading..
  const [productIsLoading, setProductIsLoading] = useState(false);

  // jam
  const [times, setTimes] = useState<TypeTime[]>([]);

  // jam get
  const fetchC = async () => {
    setProductIsLoading(true);
    try {
      const response = await axiosInstance.get(
        `/api/booking/all?date=${dateSelector.tahunbulantanggal}`,
      );
      setTimes(response.data.data);
    } catch (error) {
      console.error("Error fetching products:", error);
      return [];
    } finally {
      setProductIsLoading(false);
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
    <>
      <h1 className="mb-2 mt-10">Jam</h1>
      {/* membuat Loading.. */}
      {productIsLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-5 items-center gap-2">
          {kotakIds.map((kotakId) => {
            // Cari data yang cocok dengan kotakId
            const data = times.find((time) => time.time === kotakId);

            // // Dapatkan jam saat ini
            // const currentHour = new Date().getHours();

            // // Tentukan apakah kotak perlu dinonaktifkan
            // const isDisabled = kotakId <= currentHour;

            // Tentukan apakah kotak diberi tanda disable(css)
            let isDisabled = false;
            if (
              dateSelector.tahunbulantanggal == tahunBulanTanggalNow &&
              kotakId <= jamNow
            ) {
              isDisabled = true;
            }

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
      )}
    </>
  );
};

type TypeTime = {
  id: number;
  name: string;
  time: number;
  price: number;
  kotakId: number;
};
