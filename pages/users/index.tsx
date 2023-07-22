import React, { useEffect, useRef, useState } from "react";
import Navbar from "../../components/Navbar";
import { BASE_URL } from "../../constant/config";
import { GetServerSideProps } from "next";
import { RoleEnumType } from "@prisma/client";
import { User } from "../../config/type";
import Confirmation from "../../components/User/Confirmation";
import Edit from "../../components/User/Edit";
import { Toaster, toast } from "react-hot-toast";

type Input = {
  name: string;
  email: string;
  password: string;
  role: string;
};

const initialInput = {
  name: "",
  email: "",
  password: "",
  role: "",
};

const UserPage = ({ users }: { users: User[] }) => {
  const [input, setInput] = useState<Input>(initialInput);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [popup, setPopup] = useState<"edit" | "delete" | null>(null);
  const [warning, setWarning] = useState<string | null>(null);

  const addUser = async () => {
    const response = await fetch(`${BASE_URL}/api/user/user`, {
      method: "POST",
      body: JSON.stringify(input),
    })
      .then((res) => {
        if (!res.ok) {
          throw res.status;
        }
        return res.json();
      })
      .then((res) => {
        console.log(res);
        toast.success("User added successfully");
        setInput(initialInput);
      })
      .catch((err) => {
        console.log(err);
        setWarning("Please fill the form correctly");
      });
  };
  return (
    <div className="bg-[#002A53] w-screen min-h-screen flex ">
      <Toaster />
      <Navbar />
      <div className="grow relative h-screen overflow-auto">
        {selectedUser && popup === "edit" && (
          <Edit selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
        )}
        {selectedUser && popup === "delete" && (
          <Confirmation
            selectedUser={selectedUser}
            setSelectedUser={setSelectedUser}
          />
        )}
        <h1 className="text-white text-2xl text-center my-4">User</h1>
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
            name="email"
            className="h-12 rounded-sm border-none bg-gray-200"
            type="email"
            placeholder="email"
            onChange={(e) =>
              setInput((prev) => ({ ...prev, email: e.target.value }))
            }
            value={input.email}
          />
          <input
            name="password"
            className="h-12 rounded-sm border-none bg-gray-200"
            type="password"
            placeholder="password"
            onChange={(e) =>
              setInput((prev) => ({ ...prev, password: e.target.value }))
            }
            value={input.password}
          />

          <select
            defaultValue={input.role}
            onChange={(e) =>
              setInput((prev) => ({ ...prev, role: e.target.value }))
            }
            className="h-12"
          >
            <option value={""}>Select the role</option>
            {Object.keys(RoleEnumType).map((role) => (
              <option value={role} key={role}>
                {role}
              </option>
            ))}
          </select>
          {warning && <p className="text-red-500">{warning}</p>}
          <button
            className="h-12 rounded-sm bg-gray-200 disabled:cursor-not-allowed"
            onClick={addUser}
          >
            Add User
          </button>
        </div>
        <div className="mt-10 bg-gray-50">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">
                  ID
                </th>
                <th scope="col" className="px-6 py-3">
                  User Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Email
                </th>
                <th scope="col" className="px-6 py-3">
                  Role
                </th>
                <th scope="col" className="px-6 py-3">
                  Created At
                </th>
                <th scope="col" className="px-6 py-3">
                  Last Login
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {users &&
                users
                  .sort(
                    (a, b) =>
                      new Date(b.createdAt).getTime() -
                      new Date(a.createdAt).getTime()
                  )
                  .map((user) => (
                    <tr
                      className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
                      key={user.id}
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        aria-controls="hover"
                      >
                        {user.id.slice(0, 5)}....
                      </th>
                      <td className="px-6 py-4">{user.name}</td>
                      <td className="px-6 py-4">{user.email}</td>
                      <td className="px-6 py-4">{user.role}</td>
                      <td className="px-6 py-4">{user.createdAt.toString()}</td>
                      <td className="px-6 py-4 $">{user.lastLogin}</td>
                      <td className="px-6 py-4">
                        <button
                          className="underline text-blue-600"
                          onClick={() => {
                            setSelectedUser(user);
                            setPopup("edit");
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="underline text-red-600"
                          onClick={() => {
                            setSelectedUser(user);
                            setPopup("delete");
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserPage;

export const getServerSideProps: GetServerSideProps<{
  users: User[];
}> = async () => {
  const result = await fetch(`${BASE_URL}/api/user/user`);
  const users = await result.json();

  return {
    props: {
      users,
    },
  };
};
