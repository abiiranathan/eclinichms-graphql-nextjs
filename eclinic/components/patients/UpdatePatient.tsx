import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { GET_PATIENTS, UPDATE_PATIENT } from "../../graphql/queries";
import { ChevronLeftIcon } from "@heroicons/react/outline";
import { dateFromParts } from "../../utils/date";
import {
  INITAL_PATIENT_STATE,
  PatientFormProps,
  PatientFormState,
  UpdatedPatientState,
} from "../../graphql/patients";
import {
  GetPatients_patients_rows,
  UpdatePatient,
  UpdatePatientVariables,
} from "../../graphql/schema";
import PatientForm from "./PatientForm";

interface Dialogprops {
  handleClose: () => void;
  patient: GetPatients_patients_rows;
}

export default function PatientUpdateForm({ patient, handleClose }: Dialogprops) {
  const [state, setState] = useState<PatientFormState>(INITAL_PATIENT_STATE);

  const [updateFunction, { loading, error }] = useMutation<UpdatePatient, UpdatePatientVariables>(
    UPDATE_PATIENT,
    { refetchQueries: [GET_PATIENTS], awaitRefetchQueries: true }
  );

  useEffect(() => {
    setState(UpdatedPatientState(patient));
  }, [patient.id]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const name = e.target.name;
    const value = e.target.value;

    setState(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  async function handleSave() {
    const { year, month, day, ...otherFields } = state;
    const dob = dateFromParts({ year, month, day });
    const data = { ...otherFields, birthDate: dob };

    try {
      await updateFunction({ variables: { id: patient.id, data } });
      window.location.pathname = "/patients";
    } catch (error) {
      console.log(error);
    }
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    handleSave();
  }

  const FormProps: PatientFormProps = {
    loading,
    handleChange,
    state,
    error,
    handleSubmit,
    title: "UPDATE PATIENT BIODATA",
    update: true,
  };

  return (
    <div className="w-full p-3 bg-white min-h-full">
      <div className="px-3">
        <button onClick={handleClose} className="flex items-center justify-end ml-auto mr-8">
          <ChevronLeftIcon height={18} /> Back
        </button>
      </div>
      <div className="py-2 align-middle inline-block min-w-full sm:px-2 lg:px-8 ">
        <PatientForm {...FormProps} />
      </div>
    </div>
  );
}
