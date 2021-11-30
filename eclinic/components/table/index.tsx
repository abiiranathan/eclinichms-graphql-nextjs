import React from "react";
import Thead from "./Thead";

export default function Table<T>({
  headers,
  data,
  renderRow,
}: {
  headers: string[];
  data: T[];
  renderRow: <T>(row: T, index: number) => JSX.Element;
}) {
  return (
    <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <Thead headers={headers} />
            <tbody className="bg-white divide-y divide-gray-200">
              {data.map((row, index) => renderRow(row, index))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
