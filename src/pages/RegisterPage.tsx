import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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
// import { axiosInstance } from "@/lib/axios";
import axios from "axios";

const registerFormSchema = z
  .object({
    username: z
      .string()
      .min(3, "Username must be at least 3 characters")
      .max(6),
    password: z.string().min(8, "Password must be at least 8 characters"),
    repeatPassword: z.string().min(8, "Password must be at least 8 characters"),
  })
  .superRefine(({ password, repeatPassword }, ctx) => {
    if (password !== repeatPassword) {
      ctx.addIssue({
        code: "custom",
        message: "Password does not match",
        path: ["repeatPassword"],
      });
    }
  });

const RegisterPage = () => {
  const form = useForm({
    defaultValues: {
      username: "",
      password: "",
      repeatPassword: "",
    },
    resolver: zodResolver(registerFormSchema),
  });

  const handleRegister = async (values: RegisterValues) => {
    try {
      // post user ke fake api db.json
      await axios.post("http://localhost:3000/users", {
        username: values.username,
        password: values.password,
        role: "admin",
      });

      alert("User created successfully");
      form.reset();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="flex h-[80vh] flex-col items-center justify-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleRegister)}
          className="w-full max-w-md"
        >
          <Card>
            <CardHeader>
              <CardTitle>Create an Account!</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input {...field} />
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
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input {...field} type="password" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="repeatPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Repeat Password</FormLabel>
                    <FormControl>
                      <Input {...field} type="password" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <div className="flex w-full flex-col space-y-4">
                <Button type="submit" /* disabled={!form.formState.isValid} */>
                  Register
                </Button>
                <Button variant="link" className="w-full">
                  Log in instead
                </Button>
              </div>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </main>
  );
};

export default RegisterPage;

// types
type RegisterValues = {
  username: string;
  password: string;
};
