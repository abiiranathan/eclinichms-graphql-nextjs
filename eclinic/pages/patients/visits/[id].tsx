import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import AlertDanger from "../../../components/alerts/AlertDanger";
import Spinner from "../../../components/Spinner";
import VisitTabs from "../../../components/visit/VisitTabs";
import { VisitProvider } from "../../../context/VisitContext";
import useFetchVisit from "../../../dataHooks/useFetchVisit";
import useLocalStorage from "../../../dataHooks/useLocalStorage";
import { patient_age } from "../../../utils/date";
import { parseGQLError } from "../../../utils/error";

export default function VisitDashboard() {
  const router = useRouter();
  const { id } = router.query;

  const { data, error, loading, refetch } = useFetchVisit(id as string);
  const [tabIndex, setTabIndex] = useLocalStorage("visit-tab-index", 0);

  if (loading) return <Spinner />;
  if (error || !data?.visit) {
    return <AlertDanger title="Visit Not Found" message={parseGQLError(error)} />;
  }

  const value = {
    loading,
    visit: data.visit,
    refetchQueries: async () => await refetch({ id: id as string }),
  };

  const { id: patientId, name, birthDate, sex } = data.visit.patient;

  return (
    <VisitProvider value={value}>
      <div className="p-3 min-w-full">
        <div className="flex items-center justify-between">
          <h1 className="py-3">PATIENT VISIT DASHBOARD</h1>
          <Link href={`/patients/${patientId}`}>
            <a>
              <h1 className="text-sky-600 text-lg">
                {name} - {patient_age(new Date(birthDate))}/{sex}
              </h1>
            </a>
          </Link>
        </div>
        <VisitTabs index={tabIndex!} setTabIndex={setTabIndex} />
      </div>
    </VisitProvider>
  );
}
