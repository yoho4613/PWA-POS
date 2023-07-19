import { RoleEnumType } from "@prisma/client";
import React, { useEffect, useRef, useState } from "react";
import { User } from "../../config/type";
import { BASE_URL } from "../../constant/config";
import { toast } from "react-hot-toast";

const Edit = ({
  selectedUser,
  setSelectedUser,
}: {
  selectedUser: User;
  setSelectedUser: React.Dispatch<React.SetStateAction<User | null>>;
}) => {
  const popupRef = useRef<HTMLDivElement>(null);
  const [form, setForm] = useState({
    id: selectedUser.id,
    name: selectedUser.name,
    email: selectedUser.email,
    password: "",
    role: selectedUser.role,
  });
  const [warning, setWarning] = useState<boolean>(false);
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (e.target instanceof HTMLElement) {
        if (popupRef.current && !popupRef.current.contains(e.target)) {
          setSelectedUser(null);
          document.removeEventListener("mousedown", handleClickOutside);
        }
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
  }, []);

  const handleUpdate = async () => {
    if (!form.name || !form.email || !form.password || !form.role) {
      setWarning(true);
    } else {
      await fetch(`${BASE_URL}/api/user/user`, {
        method: "PUT",
        body: JSON.stringify(form),
      })
        .then(() => {
          setSelectedUser(null);
          toast.success(
            `${selectedUser.name} detail has been updated successfully!`
          );
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <div
      ref={popupRef}
      className="absolute w-1/2 top-1/2 left-1/2 p-6 bg-gray-200 -translate-x-1/2 rounded-lg border-2 border-gray-600 -translate-y-1/2"
    >
      <div>
        <div className="mb-6">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="John Doe"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="name@flowbite.com"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your password
          </label>
          <select
            defaultValue={form.role}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={(e) => setForm(() => ({ ...form, role: e.target.value }))}
          >
            {Object.keys(RoleEnumType).map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
          {warning && (
            <p className="text-red-500">Please fill the form correctly.</p>
          )}
        </div>
        <button
          type="button"
          onClick={handleUpdate}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default Edit;
