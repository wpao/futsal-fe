"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { cn } from "@/lib/utils";
import { toast } from "@//hooks/use-toast";
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

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";

export function CalendarForm() {
  const dateSelector = useSelector((state: RootState) => state.date);

  console.log(dateSelector.tahunbulantanggal);
  //
  const [date, setDate] = useState<String>("");

  // redux menggunakan dispatch untuk mengubah state global
  const dispatch = useDispatch();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    // formattedDate = 2025-01-24
    const formattedDate = format(data.dob, "yyyy-MM-dd");
    console.log(formattedDate);
    setDate(formattedDate);

    //
    toast({
      title: "Silahkan pilih jam main:",
      // description: (
      //   <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
      //     <code className="text-white">{JSON.stringify(data, null, 2)}</code>
      //   </pre>
      // ),
    });
  }

  const setDateInput = () => {
    dispatch({ type: "DATE_CHANGE_TAHUNBULANTANGGAL", payload: date });
  };

  //
  useEffect(() => {
    setDateInput();
  }, [date]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full max-w-60 space-y-8"
      >
        <FormField
          control={form.control}
          name="dob"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date of birth</FormLabel>
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
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
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
                    // mengatur disabled tanggal sebelum tanggal sekarang
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
                Your date of birth is used to calculate your age.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* <p>{date?.toISOString().split("T")[0]}</p> */}
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
