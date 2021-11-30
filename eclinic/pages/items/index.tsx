import { useQuery } from "@apollo/client";
import { useState } from "react";

import { GET_ITEMS } from "../../graphql/queries";
import { FetchItems, FetchItemsVariables, ItemType } from "../../graphql/schema";
import Filter from "./_filter";
import List from "./_list";

const initialState = {
  type: ItemType.DRUG,
  page: 1,
  pageSize: 10,
  name: "",
};

export default function Items() {
  const [variables, setVariables] = useState(initialState);
  const { data, error, loading } = useQuery<FetchItems, FetchItemsVariables>(GET_ITEMS, {
    variables,
  });

  const fetchPrevPage = () => setVariables(prev => ({ ...prev, page: prev.page - 1 }));
  const fetchNextPage = () => setVariables(prev => ({ ...prev, page: prev.page + 1 }));

  if (loading) return <div>Loading items...</div>;
  if (error) {
    return (
      <div>
        {error.name}: {error.message}
      </div>
    );
  }

  return (
    <div className="px-8">
      <h1 className="text-3xl text-gray-600 mb-4">Dashboard</h1>
      <Filter {...variables} setVariables={setVariables} />
      <div>{data?.items && <List rows={data.items.rows} />}</div>
      <div className="flex gap-4 my-4">
        <button
          disabled={!data?.items.hasPrev}
          onClick={fetchPrevPage}
          className="outline-none py-1 px-8 rounded-lg bg-indigo-500 text-white text-lg disabled:bg-gray-900 disabled:opacity-25"
        >
          Prev
        </button>
        <button className="outline-none py-1 px-8 rounded-lg bg-indigo-500 text-white text-lg disabled">
          Page {variables.page}/{data?.items.totalPages} pages
        </button>
        <button
          disabled={!data?.items.hasNext}
          onClick={fetchNextPage}
          className="outline-none py-1 px-8 rounded-lg bg-indigo-500 text-white text-lg disabled:bg-gray-100 disabled:opacity-25"
        >
          Next
        </button>
      </div>
    </div>
  );
}
