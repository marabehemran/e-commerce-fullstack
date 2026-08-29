import React from "react";
import { Link } from "react-router-dom";

function SubTitle({ title, btnTitle, pathText, onClick }) {
  return (
    <div className="flex justify-between text-2xl text-black font-black dark:text-white">
      <p>{title}</p>

      {btnTitle &&
        (pathText ? (
          <Link to={pathText}>
            <button className="font-black text-violet-700 cursor-pointer">
              <span>{btnTitle}</span>
            </button>
          </Link>
        ) : (
          <button
            onClick={onClick}
            className="font-black text-violet-700 cursor-pointer"
          >
            <span>{btnTitle}</span>
          </button>
        ))}
    </div>
  );
}

export default SubTitle;
