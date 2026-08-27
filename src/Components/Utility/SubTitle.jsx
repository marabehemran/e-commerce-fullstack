import React from "react";
import { Link } from "react-router-dom";
function SubTitle({ title, btnTitle, pathText }) {
  return (
    <div className="flex justify-between text-2xl text-black font-black dark:text-white">
      <p>{title}</p>
      <Link to={pathText}>
        <button className="font-black text-violet-700 cursor-pointer">
          <span>{btnTitle}</span>
        </button>
      </Link>
    </div>
  );
}

export default SubTitle;
