import React from "react";
import SigninForm from "@/components/forms/SigninForm";

const Signin = () => {
  return (
    <section className="fixed top-0 bottom-0 left-0 right-0 flex w-screen h-screen overflow-hidden">
      <figure className="items-center justify-center hidden w-1/2 h-full md:flex">
        <img src="/bg.jpg" className="object-cover w-full h-full" />
      </figure>

      <SigninForm />
    </section>
  );
};

export default Signin;
