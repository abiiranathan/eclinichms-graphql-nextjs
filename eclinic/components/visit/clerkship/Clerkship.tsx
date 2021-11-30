import React from "react";
import { useVisit } from "../../../context/VisitContext";
import ClerkshipForm from "./ClerkshipForm";
import ClerkshipNotes from "./ClerkshipNotes";

export default function Clerkship() {
  const {
    visit: { clerkship },
  } = useVisit();

  if (!clerkship) return <ClerkshipForm />;

  return <ClerkshipNotes clerkship={clerkship} />;
}
