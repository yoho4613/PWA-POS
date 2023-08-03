import Image from "next/image";
import React, { useState } from "react";
import { BASE_URL } from "../constant/config";
import { useRouter } from "next/router";
import mainLogo from '../public/assets/logo.jpg'
import Spinner from "../components/Spinner";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [warning, setWarning] = useState<string | null>(null);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      setWarning("Please fill the form correctly");
    } else {
      setIsLoading(true)
      await fetch(`${BASE_URL}/api/auth/login`, {
        method: "POST",
        body: JSON.stringify(form),
      })
        .then((res) => {
          if (!res.ok) {
            console.log(res);
            throw res.statusText;
          } else {
            return res.json();
          }
        })
        .catch((err) => {
          setWarning("Something went wrong");
          setIsLoading(false)
        })
        .then((res) => router.push("/"));
    }
  };
  return (
    <section className="w-screen min-h-screen gradient-form bg-neutral-200 dark:bg-neutral-700">
        {isLoading && (
          <div className="fixed flex justify-center z-10 items-center w-screen h-screen top-0 left-0" style={{backgroundColor: "rgba(0,0,0,0.4)"}}>
            <Spinner />
          </div>
        )}
      <div className="container m-auto h-full p-10">
        <div className="g-6 flex h-full flex-wrap items-center justify-center text-neutral-800 dark:text-neutral-200">
          <div className="w-full">
            <div className="block rounded-lg bg-white shadow-lg dark:bg-neutral-800">
              <div className="g-0 lg:flex lg:flex-wrap">
                <div className="px-4 md:px-0 lg:w-6/12">
                  <div className="md:mx-6 p-6 md:p-12">
                    <div className="text-center">
                      <Image
                        className="mx-auto w-48 rounded-md"
                        src={mainLogo}
                        alt="logo"
                        width={100}
                        height={100}
                      />
                      <h4 className="mb-12 mt-1 pb-1 text-base sm:text-lg md:text-xl font-semibold">
                        We are The FC POS
                      </h4>
                    </div>

                    <p className="mb-4">Please login to your account</p>
                    <form onSubmit={(e) => handleSubmit(e)}>
                      <div
                        className="relative mb-4 z-0"
                        data-te-input-wrapper-init
                      >
                        <input
                          type="text"
                          id="email"
                          name="email"
                          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          placeholder=" "
                          value={form.email}
                          onChange={(e) =>
                            setForm({ ...form, email: e.target.value })
                          }
                        />
                        <label
                          htmlFor="email"
                          className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                          Email
                        </label>
                      </div>
                      <div
                        className="relative mb-4 z-0"
                        data-te-input-wrapper-init
                      >
                        <input
                          type="password"
                          id="password"
                          name="password"
                          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          placeholder=" "
                          value={form.password}
                          onChange={(e) =>
                            setForm({ ...form, password: e.target.value })
                          }
                        />
                        <label
                          htmlFor="password"
                          className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                          Password
                        </label>
                        {warning && <p className="text-red-500">{warning}</p>}
                      </div>

                      <div className="mb-12 pb-1 pt-1 text-center">
                        <button
                          className="mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"
                          type="submit"
                          data-te-ripple-init
                          data-te-ripple-color="light"
                          style={{
                            background:
                              "linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)",
                          }}
                        >
                          Log in
                        </button>
                        <a href="#!">Forgot password?</a>
                      </div>
                    </form>

                    <div className="flex items-center justify-between pb-6">
                      <p className="mb-0 mr-2">Don&apos;t have an account?</p>
                      <button
                        type="submit"
                        className="inline-block rounded border-2 border-danger px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-danger transition duration-150 ease-in-out hover:border-danger-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-danger-600 focus:border-danger-600 focus:text-danger-600 focus:outline-none focus:ring-0 active:border-danger-700 active:text-danger-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
                        data-te-ripple-init
                        data-te-ripple-color="light"
                      >
                        Register
                      </button>
                    </div>
                  </div>
                </div>
                <div
                  className="flex items-center rounded-b-lg lg:w-6/12 lg:rounded-r-lg lg:rounded-bl-none"
                  style={{
                    background:
                      "linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)",
                  }}
                >
                  <div className="px-4 py-6 text-white md:mx-6 md:p-12">
                    <h4 className="mb-6 text-xl font-semibold">
                      We are more than just a company
                    </h4>
                    <p className="text-sm mb-6">
                      At FC-POS, we are revolutionizing the way restaurants
                      manage their operations and enhance the dining experience.
                      Our state-of-the-art POS system is designed to streamline
                      your restaurant&apos;s daily activities, from order management
                      and table service to inventory control and reporting.
                      Whether you run a bustling fine dining establishment, a
                      cozy cafe, or a trendy food truck, our POS solution is
                      tailored to meet the unique needs of your business.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
