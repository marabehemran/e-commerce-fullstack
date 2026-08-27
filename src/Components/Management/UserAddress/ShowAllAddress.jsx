import React from "react";
import { MapPin, Plus } from "lucide-react";
import ShowAddressCard from "./ShowAddressCard";

function ShowAllAddress() {
  return (
    <div >

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div>

          <small className="font-black text-violet-600">
            حسابي
          </small>

          <h1 className="mt-1 flex items-center gap-2 text-3xl font-black">

            <MapPin className="text-violet-600" size={30} />

            عناويني

          </h1>

          <p className="mt-2 text-slate-500 dark:text-slate-400">
            إدارة عناوين الشحن الخاصة بك
          </p>

        </div>


        <button
          type="button"
          className="flex w-fit items-center gap-2 rounded-2xl bg-violet-700 px-5 py-3 font-black text-white"
        >
          <Plus size={20} />

          إضافة عنوان

        </button>

      </div>


      <div className="grid gap-5 lg:grid-cols-2">

        <ShowAddressCard />

        <ShowAddressCard />

        <ShowAddressCard />

      </div>

    </div>
  );
}

export default ShowAllAddress;