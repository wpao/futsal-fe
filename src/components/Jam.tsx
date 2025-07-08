import { Button } from "@/components/ui/button";
// redux
import { useSelector } from "react-redux";

// redux
import { RootState } from "../store/store";
import { useEffect, useState } from "react";

// alert dialog
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
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

//
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

//
const indonesianPhoneNumber = z
  .string()
  .min(10, "Nomor WA harus minimal 10 digit")
  .max(14, "Nomor WA maksimal 14 digit")
  .regex(/^(\+62|62|0)[0-9]{9,12}$/, {
    message:
      "Format nomor tidak valid. Gunakan format 08..., +628..., atau 628...",
  });

// Definisikan schema validasi dengan Zod
const formSchema = z.object({
  name: z
    .string()
    .min(3, "Nama harus diisi")
    .max(10, "Nama maksimal 10 karakter"),
  wa: indonesianPhoneNumber,
  // wa: z.string().min(10, "Nomor WA harus minimal 10 karakter"),
});

export const Jam = () => {
  // open close popup/dialog booking
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  // redux
  const dateSelector = useSelector((state: RootState) => state.date);
  const jamSelector = useSelector((state: RootState) => state.jam);
  // const buttonSelector = useSelector((state: RootState) => state.check);

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

  // fetch data from http://localhost:3000/booking API Docker postgresql
  // GET /bookings/filter?date=2025-02-19&idUser=1f746f94-0c8e-4360-8b1d-8d70ec62418f
  const fetchC = async () => {
    // dapatkan data current-user yang login dari localStorage
    // const currentUser = localStorage.getItem("current-user");
    const currentUser = localStorage.getItem("lapangan-change");
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

  // =====================================================
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      wa: "",
    },
  });

  type PayValues = {
    name: string;
    wa: string;
  };

  //
  const onSubmit = async (values: PayValues) => {
    // console.log("Data yang disimpan:", values);
    // midtrans
    try {
      const res = await axiosInstance.post("/midtrans/snap", {
        item_details: {
          name: values.name,
          wa: values.wa,
          price: 50000,
          quantity: 1,
        },
        transaction_details: {
          order_id: String(Date.now()), // order_id harus unik
          gross_amount: 50000,
        },
      });

      const { token } = res.data;
      // console.log(token);
      if (token) {
        // Tutup dialog
        setIsDialogOpen(false);
      }

      window.snap.pay(token, {
        onSuccess: async (result: any) => {
          console.log("✅ Pembayaran berhasil:", result);
          alert("Pembayaran berhasil!");

          const idAdmin = localStorage.getItem("lapangan-change");

          // kirim data ke API Docker postgresql menggunakan axios
          try {
            await axiosInstance.post(`/bookings`, {
              idUser: idAdmin,
              username: values.name,
              price: 50000,
              wa: values.wa,
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

      // reset form
      form.reset();
    } catch (error) {
      console.error("Gagal membuat transaksi", error);
      alert("Gagal membuat transaksi");
    }
  };

  //
  // ketika tanggal berubah
  useEffect(() => {
    fetchC();
  }, [dateSelector]);

  //=====================================================
  // Buat kotak menggunakan ARRAY. buat sebanyak 15 kotak dari angka 8 sampai 22
  // kotak.id dimulai dari 8
  const kotakIds = Array.from({ length: 15 }, (_, i) => 8 + i);

  return (
    <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
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
                      ? "cursor-not-allowed border-gray-900 bg-gray-500"
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
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="mt-4 space-y-4"
                  >
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nama Lengkap</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Masukkan nama Anda"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            nama 3 - 10 karakter
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="wa"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nomor WA</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Masukkan nomor WA"
                              {...field}
                              onChange={(e) => {
                                // Hanya mengizinkan input angka
                                const value = e.target.value.replace(
                                  /[^0-9+]/g,
                                  "",
                                );
                                field.onChange(value);
                              }}
                            />
                          </FormControl>
                          <FormDescription>
                            Gunakan format 08xx, +628xx, atau 628xx
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="flex justify-around">
                      <AlertDialogCancel type="button">
                        Cancel
                      </AlertDialogCancel>
                      <AlertDialogAction asChild>
                        <Button
                          type="submit"
                          disabled={
                            !form.formState.isValid ||
                            form.formState.isSubmitting
                          }
                        >
                          booking
                        </Button>
                      </AlertDialogAction>
                    </div>
                  </form>
                </Form>
              </AlertDialogDescription>
            </AlertDialogHeader>
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
