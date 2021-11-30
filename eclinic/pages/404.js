import React from "react";

export default function PageNotFound() {
  return (
    <div className="bg-red-50 h-full grid place-items-center">
      <div className="text-center">
        <h1 className="text-4xl text-red-900">404</h1>
        <h3 className="text-lg text-red-800">This page or resource was not found!</h3>
      </div>
    </div>
  );
}
