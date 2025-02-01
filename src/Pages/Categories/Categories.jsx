import React from "react";

export default function Categories({ children }) {
  // console.log('props', props);
  return (
    <>
      <div>Categories</div>
      <div className="bg-slate-300">
        {children}
      </div>
    </>
  );
}
