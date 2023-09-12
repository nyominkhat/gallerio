/* eslint-disable react/no-unescaped-entities */
"use client";

import React, { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "../ui/use-toast";

import useRegister from "@/hooks/auth/useRegister";

const registerSchema = z
  .object({
    name: z
      .string()
      .nonempty({ message: "Name must contain at least 1 character(s)!" }),
    email: z.string().email(),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long.")
      .refine((value) => {
        const hasUpperCase = /[A-Z]/.test(value);
        const hasLowerCase = /[a-z]/.test(value);
        const hasNumber = /\d/.test(value);
        const hasSpecialCharacter = /[!@#$%^&*()_+[\]{};':"\\|,.<>/?]/.test(
          value
        );
        return hasUpperCase && hasLowerCase && hasNumber && hasSpecialCharacter;
      }, "Not a strong password!"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match!",
    path: ["confirmPassword"],
  });

const RegisterForm = () => {
  const { mutate, isSuccess, isLoading, isError, error } = useRegister();
  const { toast } = useToast();

  const router = useRouter();

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (values: z.infer<typeof registerSchema>) => {
    mutate(values);
  };

  useEffect(() => {
    if (isSuccess) {
      toast({
        description: "Register success!",
      });

      router.replace("/");
    }

    if (isError) {
      toast({
        variant: "destructive",
        description: (error as Error).message,
      });
    }
  }, [isSuccess, isError, toast, error, router]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col items-center justify-center space-y-8 lg:w-1/2 md:w-2/3"
      >
        <h2 className="text-3xl font-semibold lg:w-1/2 md:w-2/3">
          Register here
        </h2>

        <div className="flex flex-col items-center w-full gap-6">
          <FormField
            control={form.control}
            name="name"
            render={() => (
              <FormItem className=" lg:w-1/2 md:w-2/3">
                <FormLabel className="cursor-pointer">Name</FormLabel>
                <FormControl>
                  <Input placeholder="Name" {...form.register("name")} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={() => (
              <FormItem className=" lg:w-1/2 md:w-2/3">
                <FormLabel className="cursor-pointer">Email</FormLabel>
                <FormControl>
                  <Input placeholder="Email" {...form.register("email")} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={() => (
              <FormItem className=" lg:w-1/2 md:w-2/3">
                <FormLabel className="cursor-pointer">Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Password"
                    {...form.register("password")}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={() => (
              <FormItem className="lg:w-1/2 md:w-2/3">
                <FormLabel className="cursor-pointer">
                  Confirm password
                </FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Confirm password"
                    {...form.register("confirmPassword")}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-y-2 lg:w-1/2 md:w-2/3">
            <Button type="submit" className="flex items-center w-full gap-2">
              {isLoading ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : null}
              {isLoading ? "Registering" : " Register"}
            </Button>
          </div>

          <div className="flex items-center gap-2 text-sm lg:w-1/2 md:w-2/3">
            <p>Already have an account?</p>
            <Link
              className="text-blue-800 underline transition-all hover:text-blue-600"
              href={"/signin"}
            >
              Login here!
            </Link>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default RegisterForm;
