/* eslint-disable react/no-unescaped-entities */
"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { Github, Loader2 } from "lucide-react";
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
import { Separator } from "../ui/separator";

const signinSchema = z.object({
  email: z.string().email("Invalid email!"),
  password: z.string(),
});

export const SigninForm = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const router = useRouter();

  const form = useForm<z.infer<typeof signinSchema>>({
    resolver: zodResolver(signinSchema),
  });

  const onSubmit = async (values: z.infer<typeof signinSchema>) => {
    setLoading(true);

    signIn("credentials", {
      redirect: false,
      email: values.email,
      password: values.password,
      // @ts-ignore
    }).then(({ error }) => {
      if (error) {
        setLoading(false);
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: error,
        });
      } else {
        setLoading(false);
        router.refresh();
        router.replace("/");
        toast({
          title: "Logged In",
        });
      }
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col items-center justify-center space-y-8 lg:w-1/2 md:w-2/3"
      >
        <h2 className="text-3xl font-semibold lg:w-1/2 md:w-2/3">
          Hello ! Welcome Back
        </h2>

        <div className="flex flex-col items-center w-full gap-4">
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
        </div>

        <div className=" lg:w-1/2 md:w-2/3">
          <Button className="w-full" type="submit">
            {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
            {loading ? "Logging" : "Login"}
          </Button>
        </div>

        <div className="flex items-center gap-2 text-sm lg:w-1/2 md:w-2/3">
          <p>Don't have an account?</p>
          <Link
            className="text-blue-800 underline transition-all hover:text-blue-600"
            href={"/register"}
          >
            Create an account!
          </Link>
        </div>

        <Separator className=" lg:w-1/2 md:w-2/3" />

        <div className="space-y-2 lg:w-1/2 md:w-2/3">
          <p className="w-full text-center">or</p>

          <Button
            type="button"
            className="flex items-center w-full gap-2"
            onClick={() =>
              signIn("github", {
                redirect: true,
              })
            }
          >
            <Github size={18} />
            Sign in with Github
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default SigninForm;
