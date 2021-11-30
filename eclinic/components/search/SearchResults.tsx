import { useQuery } from "@apollo/client";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";
import Link from "next/link";
import React from "react";
import { SEARCH_PATIENTS } from "../../graphql/queries";
import { SearchPtients, SearchPtientsVariables } from "../../graphql/schema";
import AlertDanger from "../alerts/AlertDanger";
import Dropdown from "./Dropdown";

export default function SearchResults({
  name,
  setName,
}: {
  name: string;
  setName: (name: string) => void;
}) {
  const [page, setPage] = React.useState(1);
  let sidebarRef = React.useRef<HTMLDivElement | null>(null);

  const { data, error } = useQuery<SearchPtients, SearchPtientsVariables>(SEARCH_PATIENTS, {
    variables: { name, page },
  });

  React.useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [name]);

  const handleClick = (e: MouseEvent) => {
    const target = e.target as HTMLDivElement;

    if (!sidebarRef.current) return;
    if (sidebarRef.current === target) return false;

    if (sidebarRef.current.contains(target)) {
      if (target.matches("a") || target.matches("button")) {
        setName("");
      }
    } else {
      setName("");
    }
  };

  return (
    <div
      ref={sidebarRef}
      className="absolute right-0 min-w-[600px] h-full pb-40 overflow-y-auto bg-white shadow-lg drop-shadow-2xl rounded-bl-lg z-20 border border-gray-50"
    >
      {error && <AlertDanger title="Unable to search patients" message={error.message} />}
      <div className="results my-2">
        {data && data.patients && data.patients.rows.length > 0 ? (
          <div>
            <div className="my-2 flex justify-between items-center">
              <h2 className="my-2 mx-3 text-lg text-gray-600 uppercase">SEARCH RESULTS</h2>
              <p className="text-sm mx-2 text-gray-400">
                {page} / {data.patients.totalPages} page{data.patients.totalPages !== 1 && "s"}
              </p>
              <p className="text-sm mx-2 text-gray-400">
                {data.patients.count} result{data.patients.count !== 1 && "s"}
              </p>
              <div
                className={`${!data.patients.hasNext && !data.patients.hasPrev ? "hidden" : ""}`}
              >
                <button
                  disabled={!data.patients.hasPrev}
                  className="btn"
                  onClick={() => {
                    setPage(Math.max(page - 1, 1));
                  }}
                >
                  <ChevronLeftIcon height={12} />
                </button>
                <button
                  disabled={!data.patients.hasNext}
                  className="btn ml-1"
                  onClick={() => {
                    setPage(Math.max(page - 1, 1));
                  }}
                >
                  <ChevronRightIcon height={12} />
                </button>
              </div>
            </div>

            {data.patients.rows.map(patient => {
              const sortedVisits = [...patient.visits].sort(
                (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
              );

              const latest = sortedVisits[0];

              return (
                <div key={patient.id} className="hover:shadow-lg border-b last-of-type:border-none">
                  <div className="px-3 py-2 ">
                    <div className="flex justify-between my-2">
                      <h3>{patient.name}</h3>
                      <Dropdown visit={latest} patientId={patient.id} />
                    </div>
                    <>
                      {latest && (
                        <div className="grid grid-cols-2 gap-4 items-center">
                          <span className="text-gray-600">
                            {patient.visits.length} visit{patient.visits.length !== 1 && "s"}
                          </span>
                          <p className="text-sm">
                            Last visit:{" "}
                            <span className="text-gray-600">
                              {new Date(latest.createdAt).toLocaleDateString("en-GB", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              })}
                            </span>
                          </p>
                          <p>
                            Reason: <span className="text-sm text-gray-500">{latest.reason}</span>
                          </p>
                          <p>
                            Dr: <span className="text-sm text-gray-500">{latest.doctor.name}</span>
                          </p>
                        </div>
                      )}
                    </>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <>
            {data && data.patients && data.patients.rows.length === 0 && (
              <div className="p-4 text-gray-500">Your query did not match any record!</div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
