import { useMutation } from "@apollo/client";
import { RefreshIcon, UserRemoveIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";
import React from "react";
import Swal from "sweetalert2";
import AlertDanger from "../../components/alerts/AlertDanger";
import { useAuth } from "../../components/auth/AuthContext";
import BioData from "../../components/patients/BioData";
import StaticBioInfo from "../../components/patients/StaticBioInfo";
import VisitCard from "../../components/patients/VisitCard";
import { PatientProvider } from "../../context/PatientProvider";
import useFetchPatient from "../../dataHooks/useFetchPatient";
import { MedicalInfoIndexed } from "../../graphql/patients";
import { DELETE_VISIT } from "../../graphql/queries";
import { DeleteVisit, DeleteVisitVariables, GetPatient_patient_visits } from "../../graphql/schema";
import { short_datetime, sort_visits } from "../../utils/date";
import { parseGQLError } from "../../utils/error";

export default function PatientDashboard() {
  const router = useRouter();
  const { id } = router.query;
  const { loading, error, refetch, data } = useFetchPatient(id as string);

  const refetchQueries = async () => await refetch();

  if (error) {
    return <AlertDanger title="Error loading patient details" message={parseGQLError(error)} />;
  }

  if (loading || !data?.patient) return <div>Loading...</div>;

  const patient = data.patient;

  const context = {
    loading,
    patient,
    refetchQueries,
  };

  return (
    <PatientProvider context={context}>
      <div className="py-3 px-6 bg-white min-h-full">
        <div className="flex justify-between my-1 py-1">
          <h1 className="text-fb-blue text-2xl">Patient Dashboard</h1>
          <button className="btn py-1 text-fb-blue text-sm font-normal" onClick={refetchQueries}>
            <RefreshIcon height={16} />
          </button>
        </div>
        <hr />
        <BioData patient={patient} />
        <StaticBioInfo medicalInfo={patient.medicalInfo as MedicalInfoIndexed} />
        <VisitCard visits={patient.visits} />
        <PatientVisits visits={patient.visits} refetchQueries={refetchQueries} />
      </div>
    </PatientProvider>
  );
}

function PatientVisits({
  visits,
  refetchQueries,
}: {
  visits: GetPatient_patient_visits[];
  refetchQueries: () => void;
}) {
  const headers = ["Reason/Ward", "Registered/Doctor", "Dept", "Delete"];
  const sortedVisits = sort_visits([...visits], "DESC");
  const { user } = useAuth();

  const [deleteMutation] = useMutation<DeleteVisit, DeleteVisitVariables>(DELETE_VISIT);

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
        refetchQueries();
      } catch (error) {
        await Swal.fire("Deleted!", parseGQLError(error)[0], "error");
      }
    }
  };

  function goToVisit(visitId: string) {
    const endpoint = `/patients/visits/${visitId}`;
    window.location.href = endpoint;
  }

  return (
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
            {sortedVisits.map((visit, index) => (
              <tr
                key={visit.id}
                className={`cursor-pointer ${index === 0 && "bg-yellow-100 text-grey-700"}`}
                onClick={() => goToVisit(visit.id)}
              >
                <td className="px-2 py-2 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{visit.reason}</div>
                  <div className="text-sm text-gray-500">{visit.ward.name}</div>
                </td>
                <td className="px-2 py-4 text-sm text-gray-500">
                  <div className="text-gray-900 text-small">{short_datetime(visit.createdAt)}</div>
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
  );
}
