"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

// import { toast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { axiosInstance } from "@/lib/axios";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const FormSchema = z.object({
  nomorWA: z.coerce.number().min(2, {
    message: "Number must be at least 8 sampai 12 characters.",
  }),
});

export function CheckForm() {
  // state
  const [nomorWA, setNomorWA] = useState<Number>(0);
  const [popup, setPopup] = useState({
    id: 1,
    name: "",
    price: 0,
    wa: 0,
    jam: 0,
    bayar: false,
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      nomorWA: 0,
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    // console.log("DATA", typeof data.nomorWA);
    setNomorWA(data.nomorWA);
    // toast({
    //   title: "You submitted the following values:",
    //   description: (
    //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
    //       <code className="text-white">{JSON.stringify(data, null, 2)}</code>
    //     </pre>
    //   ),
    // })
  }

  // /api/check?nomorWA=
  const fetchNomor = async () => {
    try {
      const response = await axiosInstance.get("/" + nomorWA); /* 81123123123 */
      setPopup(response.data[0]);
    } catch (error) {
      console.error("Error fetching products:", error);
      return [];
    }
  };

  useEffect(() => {
    fetchNomor();
  }, [nomorWA]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full max-w-60 space-y-8"
      >
        <Popover>
          <FormField
            control={form.control}
            name="nomorWA"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Check nomor</FormLabel>

                <FormControl>
                  <Input type="number" placeholder="08***232" {...field} />
                </FormControl>
                <FormDescription>Please enter your nomor WA</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <PopoverTrigger>
            <Button type="submit">Check</Button>
          </PopoverTrigger>

          {/* menampilkan popup berdasarkan kondisi */}
          {popup.wa !== 0 && popup.bayar === true ? (
            <PopoverContent>
              <div>S T R U C K</div>
            </PopoverContent>
          ) : popup.bayar === false && popup.wa !== 0 ? (
            <PopoverContent>
              <div>anda belum bayar</div>
            </PopoverContent>
          ) : (
            <PopoverContent>
              <div>Anda belum booking</div>
            </PopoverContent>
          )}
        </Popover>
      </form>
    </Form>
  );
}
