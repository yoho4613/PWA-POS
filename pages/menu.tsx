import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import React, { useEffect, useState } from "react";
import { BASE_URL, MAX_FILE_SIZE } from "../constant/config";
import { Categories, MenuItem } from "../config/type";
import { MultiValue } from "react-select";
import dynamic from "next/dynamic";
import Image from "next/image";
import Navbar from "../components/Navbar";
import { useRouter } from "next/router";
import { Toaster, toast } from "react-hot-toast";

const DynamicSelect = dynamic(() => import("react-select"), { ssr: false });

type Input = {
  name: string;
  price: number;
  categories: MultiValue<{ value: string; label: string }>;
  file: undefined | File;
};

const initialInput = {
  name: "",
  price: 0,
  categories: [],
  file: undefined,
};

const Menu = ({
  menuItems,
  categories,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [input, setInput] = useState<Input>(initialInput);
  const [preview, setPreview] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [filter, setFilter] = useState<{ value: string; label: string }[] | []>(
    []
  );
  const router = useRouter();

  useEffect(() => {
    if (!input.file) return;

    // create the preview
    const objectUrl = URL.createObjectURL(input.file);
    setPreview(objectUrl);

    // clean up the preview
    return () => URL.revokeObjectURL(objectUrl);
  }, [input.file]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return setError("No File Selected");
    if (e.target.files[0].size > MAX_FILE_SIZE)
      return setError("File size is too big");
    setInput((prev) => ({ ...prev, file: e.target.files![0] }));
  };

  const handleImageUpload = async () => {
    const { file } = input;
    if (!file) return;

    const { fields, key, url } = (await fetch(`${BASE_URL}/api/menu/image`, {
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

  const addMenuItem = async () => {
    const key = await handleImageUpload();
    if (!key) throw new Error("No key");

    const result = await fetch(`${BASE_URL}/api/menu/menu`, {
      method: "POST",
      body: JSON.stringify({
        name: input.name,
        price: Number(input.price),
        imageKey: key,
        categories: input.categories.map((category) => category.value),
      }),
    }).then((res) => res.json());

    // Reset input
    setInput(initialInput);
    setPreview("");
    router.replace(router.asPath);

    return result;
  };

  const handleDelete = async (imageKey: string, id: string) => {
    if (!imageKey || !id) return alert("Could not delete menu Item");
    const result = await fetch(`${BASE_URL}/api/menu/menu`, {
      method: "DELETE",
      body: JSON.stringify({
        id,
        imageKey,
      }),
    });
    const response = await result.json();
    if (response) {
      router.replace(router.asPath);
      toast.success(`${response.name} has been successfully deleted.`);
    } else {
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="bg-[#002A53]  w-screen min-h-screen flex ">
      <Navbar />
      <div className="p-6 grow h-screen overflow-auto">
        <Toaster />
        <div className="mx-auto flex max-w-xl flex-col gap-2">
          <input
            name="name"
            className="h-12 rounded-sm border-none bg-gray-200"
            type="text"
            placeholder="name"
            onChange={(e) =>
              setInput((prev) => ({ ...prev, name: e.target.value }))
            }
            value={input.name}
          />

          <input
            name="price"
            className="h-12 rounded-sm border-none bg-gray-200"
            type="number"
            placeholder="price"
            onChange={(e) =>
              setInput((prev) => ({ ...prev, price: Number(e.target.value) }))
            }
            value={input.price}
          />

          <DynamicSelect
            value={input.categories}
            onChange={(e) =>
              setInput((prev) => ({ ...prev, categories: e } as Input))
            }
            isMulti
            className="h-12"
            options={categories.map((category) => ({
              value: category.id,
              label: category.name,
            }))}
          />

          <label
            htmlFor="file"
            className="relative h-12 cursor-pointer rounded-sm bg-gray-200 font-medium text-indigo-600 focus-within:outline-none"
          >
            <span className="sr-only">File input</span>
            <div className="flex h-full items-center justify-center">
              {preview ? (
                <div className="relative h-3/4 w-full">
                  <Image
                    alt="preview"
                    style={{ objectFit: "contain" }}
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

          <textarea
            className="p-2.5 border-none bg-gray-200 rounded-sm"
            name="description"
            id="description"
            rows={4}
            placeholder="description"
          ></textarea>

          <button
            className="h-12 rounded-sm bg-gray-200 disabled:cursor-not-allowed"
            disabled={!input.file || !input.name}
            onClick={addMenuItem}
          >
            Add menu item
          </button>
        </div>
        {error && <p className="text-xs text-red-600">{error}</p>}

        <div className="mx-auto mt-12 max-w-7xl">
          <div className="flex items-center w-1/2">
            <p className="text-lg text-white font-medium mr-2 mb-2">
              Your menu items:
            </p>
            {categories && (
              <DynamicSelect
                value={filter}
                onChange={(e) =>
                  setFilter(e as { value: string; label: string }[])
                }
                isMulti
                className="h-12 grow"
                options={categories.map((category) => ({
                  value: category.id,
                  label: category.name,
                }))}
              />
            )}
          </div>
          <div className="mb-12 mt-6 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-8 ">
            {menuItems &&
              menuItems
                .filter((menuItem) =>
                  filter.length
                    ? menuItem.categories.some((category) =>
                        filter.map((f) => f.value).includes(category)
                      )
                    : menuItem
                )
                .map((menuItem: MenuItem) => (
                  <div key={menuItem.id}>
                    <p className="text-white">{menuItem.name}</p>
                    <div className="relative h-40 w-40 my-2">
                      <Image priority fill alt="" src={menuItem.url} />
                    </div>
                    <button
                      onClick={() => {
                        handleDelete(menuItem.imageKey, menuItem.id)
                          .then((res) => res)
                          .catch((err: Error) => console.log(err));
                      }}
                      className="text-sm text-red-400"
                    >
                      delete
                    </button>
                  </div>
                ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;

export const getServerSideProps: GetServerSideProps<{
  menuItems: MenuItem[];
  categories: Categories[];
}> = async () => {
  const result = await fetch(`${BASE_URL}/api/menu/menu`);
  const menuItems = await result.json();
  const result2 = await fetch(`${BASE_URL}/api/categories/categories`);
  const categories = await result2.json();

  return {
    props: {
      menuItems,
      categories,
    },
  };
};
