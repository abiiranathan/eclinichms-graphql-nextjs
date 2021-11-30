import React from "react";
import { GetVisit_visit_clerkship } from "../../../graphql/schema";

interface Props {
  clerkship: GetVisit_visit_clerkship;
}

export default function ClerkshipNotes({ clerkship }: Props) {
  return (
    <div>
      <pre>{JSON.stringify(clerkship, null, 2)}</pre>
    </div>
  );
}
