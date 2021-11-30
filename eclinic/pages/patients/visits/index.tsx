import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { DELETE_VISIT, GET_VISITS } from "../../../graphql/queries";
import {
  DeleteVisit,
  DeleteVisitVariables,
  GetVisits,
  GetVisitsVariables,
  Order,
  Reason,
} from "../../../graphql/schema";
import { LinkIcon, UserRemoveIcon } from "@heroicons/react/outline";
import { useAuth } from "../../../components/auth/AuthContext";
import Swal from "sweetalert2";
import AlertDanger from "../../../components/alerts/AlertDanger";
import { short_datetime, patient_age } from "../../../utils/date";
import Link from "next/link";
import Image from "next/image";
import Pagination from "../../../components/Pagination";
import { parseGQLError } from "../../../utils/error";

export default function ConsultationList() {
  const headers = ["Name/Email", "Age/Sex", "Reason/Ward", "Registered/Doctor", "Dept"];

  const { user } = useAuth();
  if (user.isAdmin) {
    headers.push("Delete");
  }

  const [variables, setVariables] = useState({
    name: "",
    doctor: "",
    reason: Reason.CONSULTATION,
    ordering: Order.DESC,
    page: 1,
    pageSize: 50,
  });

  const { data, error } = useQuery<GetVisits, GetVisitsVariables>(GET_VISITS, {
    variables: { ...variables },
  });

  const [deleteMutation] = useMutation<DeleteVisit, DeleteVisitVariables>(DELETE_VISIT, {
    refetchQueries: [{ query: GET_VISITS, variables: { ...variables } }],
  });

  function goToVisit(visitId: string) {
    const endpoint = `/patients/visits/${visitId}`;
    window.location.href = endpoint;
  }

  const handleDeleteVisit = async (id: string) => {
    const res = await Swal.fire({
      title: "Delete Patient Visit",
      text: "Are you sure? All data associated with this visit will be lost!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "YES",
      confirmButtonColor: "red",
    });

    if (res.isConfirmed) {
      try {
        await deleteMutation({ variables: { id } });
        await Swal.fire("Deleted!", "Patient visit deleted.", "success");
      } catch (error) {
        await Swal.fire("Deleted!", parseGQLError(error)[0], "error");
      }
    }
  };

  if (error) return <AlertDanger title="Error fetching consultations" message={error.message} />;

  return (
    <div className="px-8 py-5 bg-white min-h-screen w-full">
      <div className="flex justify-between mb-1 items-center">
        <div className="flex">
          <Image width={32} height={32} layout="fixed" src="/icons/patient.jpg" />
          <h1 className="ml-2 text-2xl text-fb-blue">Patient Consultations</h1>
        </div>

        <div>
          <input
            type="search"
            value={variables.name}
            placeholder="&#128269; Filter consultations by client name"
            onChange={e => setVariables(prev => ({ ...prev, name: e.target.value }))}
          />
        </div>
      </div>

      <div className="grid grid-col-1 px-2 lg:px-8 xl:flex gap-2 items-center bg-fb-blue py-4">
        <div className="flex gap-1 items-center">
          <div className="flex items-center">
            <label className="mr-1 text-sm text-white">Doctor</label>
            <select
              className="min-w-[170px] text-sm"
              value={variables.doctor}
              onChange={e => setVariables(prev => ({ ...prev, doctor: e.target.value }))}
            >
              <option value="">ALL</option>
              <option value={user.id}>{user.name}</option>
            </select>
          </div>

          <div className="flex items-center">
            <label className="mr-1 text-sm text-white">Reason</label>
            <select
              className="min-w-[190px] text-sm"
              value={variables.reason}
              onChange={e => setVariables(prev => ({ ...prev, reason: e.target.value as Reason }))}
            >
              <option value={Reason.CONSULTATION}>Only consultations</option>
              <option value={Reason.LABORATORY_ONLY}>Only for lab</option>
              <option value={Reason.PHARMACY_ONLY}>Only for pharmacy</option>
            </select>
          </div>

          <div className="flex items-center">
            <label className="mr-1 text-sm text-white">Order</label>
            <select
              className="text-sm min-w-[120px]"
              value={variables.ordering}
              onChange={e => setVariables(prev => ({ ...prev, ordering: e.target.value as Order }))}
            >
              <option value={Order.DESC}>Latest first</option>
              <option value={Order.ASC}>Oldest first</option>
            </select>
          </div>
        </div>
        {data && (
          <Pagination
            className="py-2 text-white"
            hasNext={data.visits.hasNext}
            hasPrevious={data.visits.hasPrev}
            totalPages={data.visits.totalPages}
            count={data.visits.count}
            page={variables.page}
            onNext={() =>
              setVariables(prev => ({
                ...prev,
                page: Math.min(prev.page + 1, data.visits.totalPages),
              }))
            }
            onPrevious={() => setVariables(prev => ({ ...prev, page: Math.max(prev.page - 1, 1) }))}
          />
        )}
      </div>
      <div className="py-2 align-middle inline-block min-w-full">
        <div className="shadow border-b border-gray-200">
          <table className="min-w-full divide-y divide-gray-200 bg-gray-100">
            <thead className="bg-gray-50">
              <tr>
                {headers.map(header => (
                  <th
                    key={header}
                    scope="col"
                    className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data?.visits.rows.map(visit => (
                <tr key={visit.id} className="cursor-pointer" onClick={() => goToVisit(visit.id)}>
                  <td className="px-2 py-2 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          <Link href={`/patients/visits/${visit.id}`}>
                            <a className="flex items-center text-xl text-cyan-900">
                              <LinkIcon height={18} /> {visit.patient.name}
                            </a>
                          </Link>
                        </div>
                        {visit.patient.email && (
                          <div className="text-sm text-gray-500">{visit.patient.email}</div>
                        )}
                      </div>
                    </div>
                  </td>

                  <td className="px-2 py-2 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {patient_age(new Date(visit.patient.birthDate))}
                    </div>
                    <div className="text-sm text-gray-500">{visit.patient.sex}</div>
                  </td>

                  <td className="px-2 py-2 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{visit.reason}</div>
                    <div className="text-sm text-gray-500">{visit.ward.name}</div>
                  </td>

                  <td className="px-2 py-4 text-sm text-gray-500">
                    <div className="text-gray-900 text-small">
                      {short_datetime(visit.createdAt)}
                    </div>
                    <div className="text-red-900 text-base">Doctor: {visit.doctor.name}</div>
                  </td>
                  <td className="px-2 py-2 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{visit.department}</div>
                    <div className="text-sm text-gray-500 my-1">
                      {visit.clerkship ? (
                        <span className="rounded-3xl bg-green-500 text-white text-sm py-1 px-2">
                          Clerked
                        </span>
                      ) : (
                        <span className="rounded-3xl bg-orange-500 text-white text-sm py-1 px-2">
                          Not Clerked
                        </span>
                      )}
                    </div>
                  </td>

                  {user.isAdmin && (
                    <td className="px-2 py-2 text-left text-sm font-medium">
                      <button
                        title="Delete patient visit"
                        className="btn p-1 rounded-full"
                        onClick={e => {
                          e.stopPropagation();
                          handleDeleteVisit(visit.id);
                        }}
                      >
                        <UserRemoveIcon height={18} />
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
