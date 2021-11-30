import React from "react";
import { useVisit } from "../../../context/VisitContext";
import TriageForm from "./TriageForm";
import TriageNotes from "./TriageNotes";

export default function TriageAndVitals() {
  const {
    visit: { vitals },
  } = useVisit();

  return (
    <div>
      <TriageForm />
      {vitals && <TriageNotes vitals={vitals} />}
    </div>
  );
}
