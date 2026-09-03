import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { MapPin } from "lucide-react";

import ShowAddressCard from "./ShowAddressCard";

import {
  getAddresses,
  addAddress,
  deleteAddress,
  resetAddressStatus,
} from "../../../features/addresses/addressSlice";

function ShowAllAddress() {
  const dispatch = useDispatch();

  const { addresses, loading, error } = useSelector((state) => state.addresses);

  const [alias, setAlias] = useState("");
  const [details, setDetails] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");

  useEffect(() => {
    dispatch(getAddresses());
  }, [dispatch]);

  const resetForm = () => {
    setAlias("");
    setDetails("");
    setPhone("");
    setCity("");
    setPostalCode("");

    dispatch(resetAddressStatus());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!alias.trim() || !details.trim() || !phone.trim() || !city.trim()) {
      return;
    }

    const addressData = {
      alias: alias.trim(),
      details: details.trim(),
      phone: phone.trim(),
      city: city.trim(),
      postalCode: postalCode.trim(),
    };

    try {
      await dispatch(addAddress(addressData)).unwrap();

      resetForm();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (addressId) => {
    try {
      await dispatch(deleteAddress(addressId)).unwrap();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="mb-6">
        <small className="font-black text-violet-600">حسابي</small>

        <h1 className="mt-1 flex items-center gap-2 text-3xl font-black">
          <span className="text-violet-600">
            <MapPin />
          </span>
          عناويني
        </h1>

        <p className="mt-2 text-slate-500 dark:text-slate-400">
          إدارة عناوين الشحن الخاصة بك
        </p>
      </div>

      <details className="mb-5 rounded-[28px] border border-violet-200 bg-white p-5 shadow-soft dark:border-violet-900 dark:bg-slate-900">
        <summary
          onClick={resetForm}
          className="cursor-pointer font-black text-violet-700"
        >
          إضافة عنوان جديد
        </summary>

        <form
          onSubmit={handleSubmit}
          className="mt-4 rounded-[28px] border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900"
        >
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block font-black">اسم العنوان</label>

              <input
                type="text"
                value={alias}
                onChange={(e) => setAlias(e.target.value)}
                placeholder="مثال: المنزل"
                className="w-full rounded-2xl border p-3.5 dark:border-slate-700 dark:bg-slate-800"
                required
              />

              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                أدخل اسمًا يميز هذا العنوان
              </p>
            </div>

            <div>
              <label className="mb-2 block font-black">رقم الهاتف</label>

              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="0590000000"
                className="w-full rounded-2xl border p-3.5 dark:border-slate-700 dark:bg-slate-800"
                required
              />

              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                رقم الهاتف المستخدم للتواصل عند التوصيل
              </p>
            </div>

            <div>
              <label className="mb-2 block font-black">المدينة</label>

              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="جنين"
                className="w-full rounded-2xl border p-3.5 dark:border-slate-700 dark:bg-slate-800"
                required
              />
            </div>

            <div>
              <label className="mb-2 block font-black">الرمز البريدي</label>

              <input
                type="text"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                placeholder="اختياري"
                className="w-full rounded-2xl border p-3.5 dark:border-slate-700 dark:bg-slate-800"
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block font-black">تفاصيل العنوان</label>

              <textarea
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder="اكتب تفاصيل العنوان..."
                className="min-h-28 w-full rounded-2xl border p-3.5 dark:border-slate-700 dark:bg-slate-800"
                required
              />
            </div>
          </div>

          {error && (
            <p className="mt-4 text-sm font-bold text-red-500">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-5 cursor-pointer rounded-2xl bg-violet-700 px-5 py-3 font-black text-white disabled:opacity-60"
          >
            {loading ? "جاري الإضافة..." : "إضافة العنوان"}
          </button>
        </form>
      </details>

      {loading && (
        <p className="font-bold text-slate-500">جاري تحميل العناوين...</p>
      )}

      {!loading && !error && addresses.length === 0 && (
        <div className="rounded-[28px] border border-slate-200 bg-white p-8 text-center dark:border-slate-800 dark:bg-slate-900">
          <MapPin size={40} className="mx-auto text-violet-600" />

          <p className="mt-3 font-black">لا يوجد لديك عناوين حتى الآن</p>
        </div>
      )}

      <div className="grid gap-5 lg:grid-cols-2">
        {addresses.map((address) => (
          <ShowAddressCard
            key={address._id}
            address={address}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}

export default ShowAllAddress;
