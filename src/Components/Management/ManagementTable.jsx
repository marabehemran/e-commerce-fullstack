function ManagementTable({ children }) {
  return (
    <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-soft dark:border-slate-800 dark:bg-slate-900">

      <div className="p-5">
        <input
          className="w-full rounded-2xl border bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-800"
          placeholder="بحث..."
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">

          <thead className="bg-slate-50 text-slate-500 dark:bg-slate-800">
            <tr>
              <th className="px-5 py-4 text-start">
                العنصر
              </th>

              <th className="px-5 py-4 text-start">
                التفاصيل
              </th>

              <th className="px-5 py-4 text-start">
                الإجراء
              </th>
            </tr>
          </thead>

          <tbody>
            {children}
          </tbody>

        </table>
      </div>

    </div>
  );
}

export default ManagementTable;