import React, { Dispatch, SetStateAction } from "react";
import { ItemType } from "../../graphql/schema";

interface FilterProps {
  page: number;
  pageSize: number;
  type: ItemType;
  name: string;
  setVariables: Dispatch<
    SetStateAction<{
      type: ItemType;
      page: number;
      pageSize: number;
      name: string;
    }>
  >;
}
export default function Filter({ page, pageSize, type, name, setVariables }: FilterProps) {
  return (
    <div className="mb-3 flex justify-between items-center">
      <div>
        <span>Page: </span>
        <input
          className="border"
          type="number"
          value={page}
          onChange={e => setVariables(prev => ({ ...prev, page: e.target.valueAsNumber || 1 }))}
        />
      </div>
      <div>
        <span>Page Size: </span>
        <input
          className="border"
          type="number"
          value={pageSize}
          onChange={e =>
            setVariables(prev => ({ ...prev, pageSize: e.target.valueAsNumber || 50 }))
          }
        />
      </div>
      <div>
        <span>Type: </span>
        <select
          className="border"
          value={type}
          onChange={e => setVariables(prev => ({ ...prev, type: e.target.value as ItemType }))}
        >
          <option value={ItemType.DRUG}>Drugs</option>
          <option value={ItemType.TEST}>Tests</option>
          <option value={ItemType.CONSUMABLE}>Consumables</option>
          <option value={ItemType.PROCEDURE}>Procedures</option>
        </select>
      </div>

      <div>
        <span>Search:</span>
        <input
          placeholder="&#128269; Filter by name"
          className="border"
          type="text"
          value={name}
          onChange={e => setVariables(prev => ({ ...prev, name: e.target.value }))}
        />
      </div>
    </div>
  );
}
