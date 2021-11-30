import { ChevronUpIcon, PlusCircleIcon } from "@heroicons/react/outline";
import Link from "next/link";
import React, { useState } from "react";
import Swal from "sweetalert2";
import { usePatient } from "../../context/PatientContext";
import { GetPatient_patient_visits } from "../../graphql/schema";
import { long_datetime, sort_visits } from "../../utils/date";
import CreateVisitForm from "./CreateVisitForm";

export default function VisitCard({ visits }: { visits: GetPatient_patient_visits[] }) {
  const numVisits = visits.length;
  const { patient, refetchQueries } = usePatient();
  const [showVisitForm, setShowVisitForm] = useState(false);

  // Can not mutate state
  const sortedVisits = sort_visits([...visits], "DESC");
  const latesVisit = sortedVisits[0];

  return (
    <>
      <div className="flex flex-wrap justify-evenly place-items-center mx-2 border p-3">
        <div className="bg-teal-900 text-white p-2 px-4 rounded-lg whitespace-nowrap">
          {numVisits} {numVisits === 1 ? " visit" : " visits"}
        </div>
        <div className="p-2 px-6 rounded-lg ">
          <button
            title={`Register a new visit for ${patient.name}`}
            className="btn btn-default whitespace-nowrap p-2 rounded-full"
            onClick={() => setShowVisitForm(!showVisitForm)}
          >
            <span className="flex items-center">
              {showVisitForm ? (
                <ChevronUpIcon height={18} color="red" />
              ) : (
                <PlusCircleIcon height={18} color="red" />
              )}
              <span className="flex-nowrap ml-1 inline-block">
                {showVisitForm ? "Close visit form" : "New Visit"}
              </span>
            </span>
          </button>
        </div>
        <div>
          <p className="text-base font-black text-blue-400">Latest visit</p>{" "}
          <p className="text-base uppercase text-gray-400">
            {latesVisit ? new Date(latesVisit.createdAt).toLocaleString() : "N/A"}
          </p>
        </div>

        <div>
          <span className="text-base font-black text-blue-400">Selected Visit</span>{" "}
          <div className="text-base uppercase text-gray-900">
            <select name="visit" className="min-w-[200px]" disabled={numVisits === 0}>
              {sortedVisits.map(visit => (
                <option key={visit.id} value={visit.id}>
                  {new Date(visit.createdAt).toLocaleString()}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {latesVisit && (
        <>
          <div className="bg-gray-100 flex-wrap gap-4 py-1 px-3 mx-2 flex justify-between items-center text-sm">
            <h2>Latest Visit: {long_datetime(latesVisit.createdAt)}</h2>
            <h2>Reason: {latesVisit.reason}</h2>
            <h2>Dept: {latesVisit.department}</h2>
            <h2>
              Dr. {latesVisit.doctor.name}{" "}
              <span className="font-bold text-gray-600">({latesVisit.consultation.name})</span>
            </h2>
          </div>
        </>
      )}

      {showVisitForm && (
        <CreateVisitForm
          patientId={patient.id}
          patientName={patient.name}
          onVisitCreated={async () => {
            setShowVisitForm(false);
            refetchQueries();
            await Swal.fire("Success", "Visit created successfully", "success");
          }}
        />
      )}
    </>
  );
}
