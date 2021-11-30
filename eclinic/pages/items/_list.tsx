import React from "react";
import { FetchItems_items_rows } from "../../graphql/schema";

interface ListProps {
  rows: FetchItems_items_rows[];
}

export default function List({ rows }: ListProps) {
  return (
    <table className="table-auto border-collapse border border-green-800 min-w-full">
      <thead>
        <tr>
          <th className="w-2/3 ...">Name</th>
          <th className="w-1/3 ...">Cost</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row, index) => (
          <tr className={`${index % 2 === 0 ? "" : "bg-blue-200"}`} key={row.id}>
            <td>{row.name}</td>
            <td>{row.cost}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
