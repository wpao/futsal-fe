"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { cn } from "@/lib/utils";
// import { toast } from "@//hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useEffect, useState } from "react";

const FormSchema = z.object({
  dob: z.date({
    required_error: "A date of birth is required.",
  }),
});

import { useDispatch } from "react-redux";

export function CalendarForm() {
  //
  const [date, setDate] = useState<String>("");

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const formattedDate = format(data.dob, "yyyy-MM-dd");
    // formattedDate = 2025-01-24
    setDate(formattedDate);

    // ini akan menampilkan toast
    // toast({
    //   title: "Silahkan pilih jam main futsal",
    // description: (
    //   <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
    //     <code className="text-white">{JSON.stringify(data, null, 2)}</code>
    //   </pre>
    // ),
    // });
  }

  // redux menggunakan dispatch untuk mengubah state global
  const dispatch = useDispatch();
  const setDateInput = () => {
    dispatch({ type: "DATE_CHANGE_TAHUNBULANTANGGAL", payload: date });
  };

  // jika terjadi perubahan pada date maka useEffect akan di jalankan
  useEffect(() => {
    setDateInput();
  }, [date]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full max-w-60 space-y-8"
      >
        <Button type="submit" className="mt-10">
          Submit
        </Button>
        <FormField
          control={form.control}
          name="dob"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Tanggal Booking</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground",
                      )}
                    >
                      {field.value ? (
                        format(field.value, "yyyy-MM-dd")
                      ) : (
                        // format(field.value, "PPP")
                        <span>Pilih tanggal</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    // disabled tanggal sebelum tanggal sekarang
                    disabled={(date) => {
                      // Membandingkan hanya tanggal tanpa memperhitungkan waktu
                      const today = new Date();
                      today.setHours(0, 0, 0, 0);
                      return date < today || date < new Date("1900-01-01");
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>
                Silahkan pilih tanggal booking Futsal
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* <p>{date?.toISOString().split("T")[0]}</p> */}
        {/* <Button type="submit">Submit</Button> */}
      </form>
    </Form>
  );
}
