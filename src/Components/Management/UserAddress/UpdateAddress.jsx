import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { ArrowRight, MapPin, Save } from "lucide-react";

import {
  getAddresses,
  updateAddress,
  resetAddressStatus,
} from "../../../features/addresses/addressSlice";

function UpdateAddress() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams();

  const { addresses, loading, error } = useSelector((state) => state.addresses);

  const [alias, setAlias] = useState("");
  const [details, setDetails] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");

  const [postalCode, setPostalCode] = useState("");


  useEffect(() => {
    if (addresses.length === 0) {
      dispatch(getAddresses());
    }
  }, [dispatch, addresses.length]);


  useEffect(() => {
    const address = addresses.find((item) => item._id === id);

    if (address) {
      setAlias(address.alias || "");
      setDetails(address.details || "");
      setPhone(address.phone || "");
      setCity(address.city || "");
      setPostalCode(address.postalCode || "");
    }
  }, [addresses, id]);

  useEffect(() => {
    return () => {
      dispatch(resetAddressStatus());
    };
  }, [dispatch]);

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
      await dispatch(
        updateAddress({
          addressId: id,
          addressData,
        }),
      ).unwrap();

      navigate("/user/alladdress");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900">
      <div>
        <small className="font-black text-violet-600">حسابي</small>

        <h1 className="mt-1 flex items-center gap-2 text-3xl font-black">
          <MapPin size={30} className="text-violet-600" />
          تعديل العنوان
        </h1>

        <p className="mt-2 text-slate-500 dark:text-slate-400">
          قم بتعديل بيانات العنوان
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block font-bold">اسم العنوان</label>

            <input
              type="text"
              value={alias}
              onChange={(e) => setAlias(e.target.value)}
              placeholder="مثال: المنزل"
              className="w-full rounded-2xl border p-3.5 dark:border-slate-700 dark:bg-slate-800"
            />
          </div>

          <div>
            <label className="mb-2 block font-bold">رقم الهاتف</label>

            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="0590000000"
              className="w-full rounded-2xl border p-3.5 dark:border-slate-700 dark:bg-slate-800"
            />
          </div>

          <div>
            <label className="mb-2 block font-bold">المدينة</label>

            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="جنين"
              className="w-full rounded-2xl border p-3.5 dark:border-slate-700 dark:bg-slate-800"
            />
          </div>

          <div>
            <label className="mb-2 block font-bold">الرمز البريدي</label>

            <input
              type="text"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              placeholder="اختياري"
              className="w-full rounded-2xl border p-3.5 dark:border-slate-700 dark:bg-slate-800"
            />
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block font-bold">تفاصيل العنوان</label>

            <textarea
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="اكتب تفاصيل العنوان..."
              className="min-h-28 w-full rounded-2xl border p-3.5 dark:border-slate-700 dark:bg-slate-800"
            />
          </div>
        </div>

        {error && <p className="mt-4 font-bold text-red-600">{error}</p>}

        <div className="mt-6 flex gap-3">
          <button
            type="submit"
            disabled={loading}
            className="cursor-pointer flex items-center gap-2 rounded-2xl bg-violet-700 px-5 py-3 font-black text-white disabled:opacity-60"
          >
            <Save size={19} />

            {loading ? "جاري الحفظ..." : "حفظ التعديلات"}
          </button>

          <button
            type="button"
            onClick={() => navigate("/user/alladdress")}
            className="cursor-pointer flex items-center gap-2 rounded-2xl border border-slate-200 px-5 py-3 font-black dark:border-slate-700"
          >
            <ArrowRight size={19} />
            رجوع
          </button>
        </div>
      </form>
    </div>
  );
}

export default UpdateAddress;
