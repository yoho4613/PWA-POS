import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Image from "next/image";
import { BASE_URL, MAX_FILE_SIZE } from "../../constant/config";
import { GetServerSideProps } from "next";
import { Shop } from "../../config/type";
import { Toaster, toast } from "react-hot-toast";

type Input = {
  id: string;
  name: string;
  address: string;
  contact: string;
  email: string;
  tax: string;
  file: undefined | File;
  description: string;
  cashBalance: number;
  url: string;
};

const index = ({ shop }: { shop: Shop }) => {
  const initialInput = {
    id: shop.id,
    name: shop.name,
    address: shop.address,
    contact: shop.contact,
    email: shop.email,
    tax: shop.tax,
    file: undefined,
    description: shop.description,
    cashBalance: shop.cashBalance,
    url: shop.url,
  };

  const [input, setInput] = useState<Input>(initialInput);
  const [preview, setPreview] = useState<string>(shop.url || "");
  const [error, setError] = useState<string>("");
  const [warning, setWarning] = useState<string | null>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return setError("No File Selected");
    if (e.target.files[0].size > MAX_FILE_SIZE)
      return setError("File size is too big");

    setInput((prev) => ({ ...prev, file: e.target.files![0] }));
  };

  useEffect(() => {
    console.log(input);
  }, [input]);

  useEffect(() => {
    setInput(initialInput);
  }, []);

  useEffect(() => {
    if (!input.file) return;

    // create the preview
    const objectUrl = URL.createObjectURL(input.file);
    setPreview(objectUrl);

    // clean up the preview
    return () => URL.revokeObjectURL(objectUrl);
  }, [input.file]);

  const handleImageUpload = async () => {
    const { file } = input;
    if (!file) return;

    const { fields, key, url } = (await fetch(`${BASE_URL}/api/shop/image`, {
      method: "POST",
      body: JSON.stringify({ fileType: file.type }),
    }).then((res) => res.json())) as {
      fields: string[];
      key: string;
      url: string;
    };

    const data = {
      ...fields,
      "Content-Type": file.type,
      file,
    };

    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value as string | Blob);
    });

    await fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => {
        if (!res.ok) {
          console.log(res);
          throw Error(res.statusText);
        }
      })
      .catch((err) => console.log(err));

    return key;
  };

  const updateShopDetail = async () => {
    type Data = {
      id: String;
      name: String;
      address: String;
      contact: String;
      email: String;
      tax: String;
      description: String;
      cashBalance: Number;
      logoKey?: String;
    };
    let data: Data = {
      id: input.id,
      name: input.name,
      address: input.address,
      contact: input.contact,
      email: input.email,
      tax: input.tax,
      description: input.description,
      cashBalance: input.cashBalance,
    };
    if (input.file) {
      const key = await handleImageUpload();
      if (!key) throw new Error("No key");

      data.logoKey = key;
    }

    console.log(data);

    const result = await fetch(`${BASE_URL}/api/shop/shop`, {
      method: "PUT",
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .catch((err) => err);

    if (!result) {
      toast.error(`There is an error, Something went wrong`);
      setWarning("Something when wrong. Please fill the form correctly.");
    }
    toast.success(`${result.name} detail has been updated successfully.`);
    return result;
  };

  return (
    <div className="bg-[#002A53]  w-screen min-h-screen flex ">
      <Navbar />
      <div className="p-6 grow h-screen overflow-auto">
        <Toaster />
        <h1 className="text-white text-2xl text-center my-4">Setting</h1>
        <div className="mx-auto flex max-w-xl flex-col gap-2">
          <div className="mb-4 flex sm:justify-between sm:items-center flex-col sm:flex-row items-start">
            <label
              htmlFor="file"
              className="relative text-center h-20 w-20 overflow-hidden rounded-full cursor-pointer bg-gray-200 font-medium text-indigo-600 focus-within:outline-none"
            >
              <span className="sr-only">File input</span>
              <div className="flex h-full w-full items-center justify-center">
                {preview ? (
                  <div className="relative h-full w-full">
                    <Image
                      alt="preview"
                      style={{ objectFit: "cover" }}
                      fill
                      src={preview}
                    />
                  </div>
                ) : (
                  <span>Select image</span>
                )}
              </div>
              <input
                name="file"
                id="file"
                onChange={handleFileSelect}
                accept="image/jpeg image/png image/jpg"
                type="file"
                className="sr-only"
              />
            </label>
            <div>
              <label
                className="text-white mb-1 sm:mb-0 sm:mr-4 text-sm sm:text-base sm:w-32"
                htmlFor="name"
              >
                Current Cash Balance: $
              </label>
              <input
                name="cash"
                id="number"
                onChange={(e) =>
                  setInput((prev) => ({
                    ...prev,
                    cashBalance: Number(e.target.value),
                  }))
                }
                value={input.cashBalance}
                type="number"
                className="h-8 sm:h-12 grow rounded-sm border-none bg-gray-200"
              />
            </div>
          </div>
          <div className="mb-4 flex sm:items-center flex-col sm:flex-row items-start">
            <label
              className="text-white mb-1 sm:mb-0 sm:mr-4 text-sm sm:text-base sm:w-32"
              htmlFor="name"
            >
              Shop Name
            </label>
            <input
              name="name"
              className=" h-8 sm:h-12 grow rounded-sm border-none bg-gray-200"
              type="text"
              placeholder="name"
              onChange={(e) =>
                setInput((prev) => ({ ...prev, name: e.target.value }))
              }
              value={input.name}
            />
          </div>
          <div className="mb-4 flex sm:items-center flex-col sm:flex-row items-start">
            <label
              className="text-white mb-1 sm:mb-0 sm:mr-4 text-sm sm:text-base sm:w-32"
              htmlFor="address"
            >
              Address
            </label>
            <input
              name="address"
              className=" h-8 sm:h-12 grow rounded-sm border-none bg-gray-200"
              type="text"
              placeholder="address"
              onChange={(e) =>
                setInput((prev) => ({ ...prev, address: e.target.value }))
              }
              value={input.address}
            />
          </div>

          <div className="mb-4 flex sm:items-center flex-col sm:flex-row items-start">
            <label
              className="text-white mb-1 sm:mb-0 sm:mr-4 text-sm sm:text-base sm:w-32"
              htmlFor="contact"
            >
              Contact Number
            </label>
            <input
              name="contact"
              className=" h-8 sm:h-12 grow rounded-sm border-none bg-gray-200"
              type="tel"
              placeholder="021-000-0000"
              onChange={(e) =>
                setInput((prev) => ({ ...prev, contact: e.target.value }))
              }
              value={input.contact}
            />
          </div>

          <div className="mb-4 flex sm:items-center flex-col sm:flex-row items-start">
            <label
              className="text-white mb-1 sm:mb-0 sm:mr-4 text-sm sm:text-base sm:w-32"
              htmlFor="email"
            >
              Email
            </label>
            <input
              name="email"
              className=" h-8 sm:h-12 grow rounded-sm border-none bg-gray-200"
              type="email"
              placeholder="shop@example.com"
              onChange={(e) =>
                setInput((prev) => ({ ...prev, email: e.target.value }))
              }
              value={input.email}
            />
          </div>

          <div className="mb-4 flex sm:items-center flex-col sm:flex-row items-start">
            <label
              className="text-white mb-1 sm:mb-0 sm:mr-4 text-sm sm:text-base sm:w-32"
              htmlFor="nataxme"
            >
              GST
            </label>
            <input
              name="tax"
              className=" h-8 sm:h-12 grow rounded-sm border-none bg-gray-200"
              type="text"
              placeholder="GST"
              onChange={(e) =>
                setInput((prev) => ({ ...prev, tax: e.target.value }))
              }
              value={input.tax}
            />
          </div>

          <textarea
            className="p-2.5 border-none bg-gray-200 rounded-sm"
            name="description"
            id="description"
            rows={4}
            placeholder="description"
            value={input.description}
            onChange={(e) =>
              setInput((prev) => ({ ...prev, description: e.target.value }))
            }
          ></textarea>

          <button
            className="h-12 rounded-sm bg-gray-200 disabled:cursor-not-allowed"
            onClick={updateShopDetail}
          >
            Update Shop Detail
          </button>
        </div>
      </div>
    </div>
  );
};

export default index;

export const getServerSideProps: GetServerSideProps<{
  shop: Shop;
}> = async () => {
  const result = await fetch(`${BASE_URL}/api/shop/shop`);
  const shop = await result.json();

  return {
    props: {
      shop,
    },
  };
};
