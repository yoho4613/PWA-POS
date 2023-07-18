import React, { useEffect, useRef } from "react";
import { User } from "../../config/type";
import { BASE_URL } from "../../pages/constant/config";
import { toast } from "react-hot-toast";

const Confirmation = ({
  selectedUser,
  setSelectedUser,
}: {
  selectedUser: User;
  setSelectedUser: React.Dispatch<React.SetStateAction<User | null>>;
}) => {
  const popupRef = useRef<HTMLDivElement>(null);
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

  const handleDelete = async () => {
    const responst = await fetch(`${BASE_URL}/api/user/user`, {
      method: "DELETE",
      body: JSON.stringify({ id: selectedUser.id }),
    }).then((res) => {
      if(!res.ok) {
        throw res.status
      } 
      return res.json()
    }).then(() => {
      toast.success(`${selectedUser.name} deleted Successfully`)
      setSelectedUser(null)
    }).catch((err) => console.log(err))

  };
  return (
    <div
      ref={popupRef}
      className="absolute w-1/2 top-1/2 left-1/2 p-6 bg-gray-200 -translate-x-1/2 rounded-lg border-2 border-gray-600 -translate-y-1/2"
    >
      <h2 className="font-bold text-xl mb-6">
        Do you want to delete {selectedUser.name}?
      </h2>
      <div>
        <button
          onClick={handleDelete}
          type="button"
          className=" focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
        >
          Delete
        </button>
        <button
          onClick={() => setSelectedUser(null)}
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};
export default Confirmation;
