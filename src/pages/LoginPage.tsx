import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormItem,
  FormMessage,
  FormLabel,
  FormControl,
  FormField,
  FormDescription,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
// import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { SignedInPage } from "@/components/guard/SignedInPage";
import axiosInstance from "@/lib/axios";

const loginFormSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters").max(6),
  password: z.string().min(4, "Password must be at least 4 characters"),
});

type LoginValues = {
  username: string;
  password: string;
};

const LoginPage = () => {
  // menggunakan dispatch untuk mengubah state global
  const dispatch = useDispatch();

  // melihat user yang login
  const userSelector = useSelector((state: RootState) => state.admin);

  // melihat password dan sebaliknya
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const form = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
    resolver: zodResolver(loginFormSchema),
  });

  const onSubmit = async (values: LoginValues) => {
    // console.log(values);
    try {
      // kirim data ke API Docker postgresql menggunakan axios
      const userResponse = await axiosInstance
        .post("/login", {
          username: values.username,
          password: values.password,
        })
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          // console.log("ini Error Data:", err.response.data); // Muncul di Console Chrome
          return err.response.data.message;
        });

      //
      // console.log(userResponse.message);
      if (userResponse == "Invalid username or password") {
        // alert(`ini dalam ${userResponse}`);
        alert(userResponse);
        return;
      }

      alert(userResponse.message);

      // jwt
      // token di simpan di localStorage
      if (userResponse.token) {
        localStorage.setItem("token", userResponse.token); // Simpan token di localStorage
      }

      // simpan user id ke local storage
      // ini di pakai untuk melihat user yang login
      localStorage.setItem("current-user", userResponse.data.id);

      // ini di gunakan untuk mendapatkan info lapangan
      localStorage.setItem("lapangan-change", userResponse.data.id);

      // simpan data user ke redux
      dispatch({
        type: "ADMIN_LOGIN",
        payload: {
          username: userResponse.data.username,
          id: userResponse.data.id,
          role: userResponse.data.role,
        },
      });

      // reset form
      form.reset();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SignedInPage>
      <main className="flex h-[80vh] flex-col items-center justify-center">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full max-w-md"
          >
            <Card>
              <CardHeader>
                <CardTitle>Welcome Back! {userSelector.username}</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-2">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor={field.name}>Username</FormLabel>
                      <FormControl>
                        <Input
                          id={field.name}
                          type="text"
                          placeholder="Username"
                          autoComplete="off"
                          {...field}
                          autoFocus
                        />
                      </FormControl>
                      <FormDescription />
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor={field.name}>Password</FormLabel>
                      <FormControl>
                        <Input
                          id={field.name}
                          placeholder="Password"
                          {...field}
                          type={isChecked ? "text" : "password"}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="show-password"
                    onCheckedChange={(checked: boolean) =>
                      setIsChecked(checked)
                    }
                  />
                  <Label htmlFor="show-password">Show Password</Label>
                </div>
              </CardContent>
              <CardFooter>
                <div className="flex w-full flex-col space-y-4">
                  <Button
                    type="submit" /* disabled={!form.formState.isValid} */
                  >
                    Login
                  </Button>
                  <Button variant="link" className="w-full">
                    Sign Up
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </form>
        </Form>
      </main>
    </SignedInPage>
  );
};

export default LoginPage;
