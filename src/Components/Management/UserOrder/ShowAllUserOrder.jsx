import React from "react";
import ShowOrderCard from "./ShowOrderCard";

function ShowAllUserOrder() {
  return (
    <div >
      <h1 className="text-3xl font-black">
          طلباتي
      </h1>
      <div className="mt-6 space-y-4">
        <ShowOrderCard/>
        <ShowOrderCard/>
      </div>
    </div>
  );
}

export default ShowAllUserOrder;
