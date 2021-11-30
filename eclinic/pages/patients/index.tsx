import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { DELETE_PATIENT, GET_PATIENTS } from "../../graphql/queries";
import {
  DeletePatient,
  DeletePatientVariables,
  GetPatients,
  GetPatients_patients_rows,
} from "../../graphql/schema";
import { LockClosedIcon, UserIcon, PlusCircleIcon, LinkIcon } from "@heroicons/react/outline";
import { useAuth } from "../../components/auth/AuthContext";
import Swal from "sweetalert2";
import AlertDanger from "../../components/alerts/AlertDanger";
import { long_date, patient_age } from "../../utils/date";
import Link from "next/link";
import PatientUpdateForm from "../../components/patients/UpdatePatient";

const headers = ["Name/Email", "Age/Sex", "Adress/Mobile", "Registered", "Visits", "Delete"];

export default function Patients() {
  const { data, error } = useQuery<GetPatients>(GET_PATIENTS);
  const { user } = useAuth();

  // Track the patient to display in modal dialog
  const [patientToUpdate, setPatientToUpdate] = useState<GetPatients_patients_rows | null>(null);

  // Delete patient mutation hook
  const [deletePatient] = useMutation<DeletePatient, DeletePatientVariables>(DELETE_PATIENT, {
    refetchQueries: [{ query: GET_PATIENTS }],
    awaitRefetchQueries: true,
  });

  const handleDeletePatient = async (id: string) => {
    const res = await Swal.fire({
      title: "Delete Patient Account",
      text: "Are you sure? All patient data(except payment info) will be lost!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete Patient",
      confirmButtonColor: "red",
    });

    if (res.isConfirmed) {
      await deletePatient({ variables: { id } });
      Swal.fire("Deleted!", "Patient account deleted.", "success");
    }
  };

  if (error) return <AlertDanger title="Error fetching patients" message={error.message} />;

  if (patientToUpdate) {
    return (
      <PatientUpdateForm patient={patientToUpdate} handleClose={() => setPatientToUpdate(null)} />
    );
  }

  return (
    <div className="p-3 bg-white min-h-full">
      <div className="mx-8 flex justify-between">
        <h1 className="text-2xl text-blue-900">Patients</h1>
        <div>
          <Link href="/patients/register">
            <a
              title="New patient"
              className="inline-block bg-blue-400 rounded-full p-2 drop-shadow transition-all shadow-sm hover:bg-red-400 focus:outline-none focus:ring-4 focus:ring-red-800"
            >
              <PlusCircleIcon height={24} color="white" />
            </a>
          </Link>
        </div>
      </div>
      <div className="py-2 align-middle inline-block min-w-full sm:px-2 lg:px-8 ">
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
              {data?.patients.rows.map(patient => (
                <tr key={patient.id}>
                  <td className="px-2 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          <Link href={`/patients/${patient.id}`}>
                            <a className="flex items-center text-xl text-cyan-900">
                              <LinkIcon height={18} /> {patient.name}
                            </a>
                          </Link>
                        </div>
                        <div className="text-sm text-gray-500">{patient.email}</div>
                      </div>
                    </div>
                  </td>

                  <td className="px-2 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {patient_age(new Date(patient.birthDate))}
                    </div>
                    <div className="text-sm text-gray-500">{patient.sex}</div>
                  </td>

                  <td className="px-2 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{patient.address}</div>
                    <div className="text-sm text-gray-500">{patient.mobile}</div>
                  </td>

                  <td className="px-2 py-4 text-sm text-gray-500">
                    {long_date(patient.createdAt)}
                  </td>

                  <td className="px-2 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{patient.visits.length}</div>
                    <div className="text-sm text-gray-500">visits</div>
                  </td>

                  <td className="px-2 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      className="btn btn-success py-1 px-2 text-sm"
                      onClick={() => setPatientToUpdate(patient)}
                    >
                      Update
                    </button>
                    {!user.isAdmin ? (
                      <LockClosedIcon height={18} />
                    ) : (
                      <button
                        title="Delete patient account"
                        className="btn btn-danger text-sm py-1 px-2"
                        onClick={e => {
                          e.preventDefault();
                          handleDeletePatient(patient.id);
                        }}
                      >
                        Delete
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
