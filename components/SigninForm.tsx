"use client";
import { loginFormSchema } from "@/lib/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import { useState, useTransition } from "react";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import FormErrorComponent from "./FormErrorComponent";
import FormSuccessComponent from "./FormSuccessComponent.";
import { Eye, EyeOff } from "lucide-react";
import { login } from "@/actions/login";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { AuthContext } from "@/providers/AuthProvider";

export default function SigninForm() {
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      userid: "",
      password: "",
    },
  });
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { setId, setRole } = useContext(AuthContext);

  const onSubmit = (values: z.infer<typeof loginFormSchema>) => {
    setError("");
    setSuccess("");
    setShowPassword(false);
    startTransition(() => {
      login(values).then((res) => {
        console.log("Response", res);
        if (res?.status === "success") {
          console.log(res?.data);
          router.push("/dashboard/timetable");
        }

        if (res?.status === "error") {
          setError(res.message);
        }

        setRole(res.data?.userdetails.role);
        setId(res.data?.userdetails.username || res.data?.userdetails.rollno);
      });
    });
  };

  return (
    <Form {...form} >
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 text-primary ">
        <FormField
          control={form.control}
          name="userid"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg max-sm:text-base">
                Username / Roll Number
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Username / Roll Number"
                  type="text"
                  className="text-lg max-sm:text-base"
                  {...field}
                  disabled={isPending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg max-sm:text-base">
                Password
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    placeholder="Enter Password"
                    type={showPassword ? "text" : "password"}
                    className="text-lg max-sm:text-base pr-12"
                    disabled={isPending}
                    {...field}
                  />
                  <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    disabled={isPending}
                    className="absolute right-0 top-0 hover:bg-transparent "
                    onClick={() => {
                      setShowPassword((prev) => !prev);
                    }}
                  >
                    {showPassword ? (
                      <Eye width={24} height={24} />
                    ) : (
                      <EyeOff width={24} height={24} />
                    )}
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-center">
          <Button
            type="submit"
            className="px-8 text-lg max-sm:text-base"
            disabled={isPending}
          >
            {isPending ? "Sigining In..." : "Sign In"}
          </Button>
        </div>

        <FormErrorComponent errorMessage={error} />
        <FormSuccessComponent successMessage={success} />
      </form>

      <p className="text-center mt-4 text-primary">
        Forgot Password?{" "}
        <Button
          size="default"
          variant="link"
          asChild={true}
          className="p-0 font-normal "
        >
          <Link href="/">Click here</Link>
        </Button>
      </p>
    </Form>
  );
}
