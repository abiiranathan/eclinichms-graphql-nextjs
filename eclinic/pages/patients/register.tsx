import { useMutation } from "@apollo/client";
import { ChevronLeftIcon, SaveIcon } from "@heroicons/react/outline";
import React, { ChangeEvent, FormEvent, useState } from "react";
import PatientForm from "../../components/patients/PatientForm";
import { INITAL_PATIENT_STATE, PatientFormProps, PatientFormState } from "../../graphql/patients";
import { GET_PATIENTS, REGISTER_PATIENT } from "../../graphql/queries";

import { RegisterPatient, RegisterPatientVariables } from "../../graphql/schema";

export default function Register() {
  const [state, setState] = useState<PatientFormState>(INITAL_PATIENT_STATE);
  const [mutateFunc, { loading, error }] = useMutation<RegisterPatient, RegisterPatientVariables>(
    REGISTER_PATIENT,
    {
      refetchQueries: [GET_PATIENTS],
      awaitRefetchQueries: true,
    }
  );

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
    const dob = `${year}-${month}-${day}`;
    const data = { ...otherFields, birthDate: dob };

    try {
      await mutateFunc({ variables: { data } });
      goBack();
    } catch (error) {
      console.log(error);
    }
  }

  function goBack() {
    window.location.pathname = "/patients";
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
    title: "REGISTER NEW CLIENT / PATIENT",
    update: false,
  };

  return (
    <div className="p-3 bg-white min-h-full">
      <div className="mx-8 flex justify-between">
        <div className="flex ml-auto gap-16">
          <button onClick={goBack} className="flex items-center">
            <ChevronLeftIcon height={18} /> Back
          </button>
        </div>
      </div>
      <div className="py-2 align-middle inline-block min-w-full sm:px-2 lg:px-8 ">
        <PatientForm {...FormProps} />
      </div>
    </div>
  );
}
