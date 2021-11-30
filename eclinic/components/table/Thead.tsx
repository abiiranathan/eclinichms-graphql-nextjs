import React from "react";

export interface THeadProps {
  headers: string[];
}

export default function Thead({ headers }: THeadProps) {
  return (
    <thead className="bg-gray-50">
      <tr>
        {headers.map(header => (
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            {header}
          </th>
        ))}
      </tr>
    </thead>
  );
}
