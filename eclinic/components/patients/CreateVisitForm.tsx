import { useMutation } from "@apollo/client";
import React, { ChangeEvent, FormEvent, useEffect } from "react";
import Swal from "sweetalert2";
import { usePatient } from "../../context/PatientContext";
import useConsultData from "../../dataHooks/useConsultData";
import { CREATE_VISIT, GET_PATIENT, GET_VISITS } from "../../graphql/queries";
import {
  Department,
  NewVisit,
  Reason,
  RegisterVisit,
  RegisterVisitVariables,
  UserRole,
} from "../../graphql/schema";
import { parseGQLError } from "../../utils/error";

interface CreateVisitFormProps {
  patientId: string;
  patientName: string;
  onVisitCreated: () => void;
}

export default function CreateVisitForm({
  patientId,
  patientName,
  onVisitCreated,
}: CreateVisitFormProps) {
  const [role, setRole] = React.useState(UserRole.DOCTOR);
  const { refetchQueries } = usePatient();

  const { doctors, wards, consultations } = useConsultData({
    role: role,
  });

  const [state, setState] = React.useState<NewVisit>({
    patientId,
    consultationId: "",
    wardId: "",
    doctorId: "",
    department: Department.OUTPATIENT,
    reason: Reason.CONSULTATION,
    isDischarged: false,
  });

  const [createVisit, { data: registeredVisit, loading }] = useMutation<
    RegisterVisit,
    RegisterVisitVariables
  >(CREATE_VISIT, {
    refetchQueries: [{ query: GET_PATIENT, variables: { id: patientId } }],
  });

  useEffect(() => {
    if (doctors && doctors.users) {
      if (doctors.users.length > 0) {
        setState(Object.assign(state, { doctorId: doctors.users[0].id }));
      } else {
        setState(Object.assign(state, { doctorId: "" }));
      }
    }
  }, [doctors]);

  useEffect(() => {
    if (wards && wards.wards) {
      if (wards.wards.length > 0) {
        setState(Object.assign(state, { wardId: wards.wards[0].id }));
      }
    }
  }, [wards]);

  useEffect(() => {
    if (consultations && consultations.consultations) {
      if (consultations.consultations.length > 0) {
        setState(Object.assign(state, { consultationId: consultations.consultations[0].id }));
      }
    }
  }, [consultations]);

  const { consultationId, wardId, doctorId, department, reason } = state;

  function isFormCompleted() {
    if (
      patientId &&
      state.consultationId &&
      state.wardId &&
      state.doctorId &&
      state.department &&
      state.reason
    )
      return true;

    return false;
  }

  function isLoadingInitialData() {
    return wards === undefined || doctors === undefined || consultations === undefined;
  }

  function handleChange(event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const name = event.target.name;
    const value = event.target.value;

    setState(prevState => ({ ...prevState, [name]: value }));
  }

  const handleCreateVisit = async (visit: NewVisit) => {
    try {
      await createVisit({
        variables: { data: visit },
      });
      refetchQueries();
      onVisitCreated();
    } catch (error) {
      await Swal.fire("Error saving visit", parseGQLError(error)[0], "error");
    }
  };

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isFormCompleted()) {
      handleCreateVisit(state);
    } else {
      await Swal.fire("Complete the form", "Make sure all fields are filled in", "warning");
    }
  }

  if (isLoadingInitialData()) {
    return (
      <div className="shadow border-b border-gray-200 p-3">
        Loading wards, consultations and doctors...
      </div>
    );
  }

  return (
    <form className="bg-white max-w-2xl my-8 mx-auto" onSubmit={handleSubmit}>
      <table
        id="patient-table"
        className="
        min-w-full divide-y divide-gray-200 bg-gray-100
        rounded-lg border relative p-4"
      >
        <thead className="bg-gray-100 sticky -top-1 z-10">
          <tr>
            <th
              scope="col"
              className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              <div className="flex items-center">
                <span className="text-xl text-gray-600">REGISTER NEW VISIT</span>
              </div>
            </th>
            <th>
              <button className="btn ml-auto p-2 bg-white" type="submit" disabled={loading}>
                Save
              </button>
            </th>
          </tr>
        </thead>

        <tbody className="bg-white divide-y divide-gray-200">
          <tr>
            <td colSpan={2} className="px-4 py-1 text-lg whitespace-nowrap">
              Client: <span className="text-red-900">{patientName}</span>
            </td>
          </tr>
          <tr>
            <td colSpan={2} className="px-4 py-3 whitespace-nowrap">
              <div className="relative grid grid-cols-2">
                <label htmlFor="name" className="text-gray-600">
                  REASON *
                </label>
                <select name="reason" id="reason" required value={reason} onChange={handleChange}>
                  <option value={Reason.CONSULTATION}>Consultation</option>
                  <option value={Reason.LABORATORY_ONLY}>Laboratory Only</option>
                  <option value={Reason.PHARMACY_ONLY}>Pharmacy Only</option>
                </select>
              </div>
            </td>
          </tr>
          {reason == Reason.CONSULTATION && consultations !== undefined && (
            <tr>
              <td colSpan={2} className="px-4 py-3 whitespace-nowrap">
                <div className="relative grid grid-cols-2">
                  <label htmlFor="consultationId" className="text-gray-600">
                    CONSULTATION
                  </label>
                  <select
                    name="consultationId"
                    id="consultationId"
                    required
                    value={consultationId}
                    onChange={handleChange}
                  >
                    {consultations.consultations.map(consultation => (
                      <option key={consultation.id} value={consultation.id}>
                        {consultation.name} - {consultation.fee}
                      </option>
                    ))}
                  </select>
                </div>
              </td>
            </tr>
          )}

          <tr>
            <td colSpan={2} className="px-4 py-3 whitespace-nowrap">
              <div className="relative grid grid-cols-2">
                <label htmlFor="role" className="text-gray-600">
                  SWITCH ROLE *
                </label>
                <select
                  title="Change role to load users in that department"
                  name="role"
                  id="role"
                  required
                  value={role}
                  onChange={e => setRole(e.target.value as UserRole)}
                >
                  <option value={UserRole.DOCTOR}>{UserRole.DOCTOR}</option>
                  <option value={UserRole.NURSE}>{UserRole.NURSE}</option>
                  <option value={UserRole.MIDWIFE}>{UserRole.MIDWIFE}</option>
                  <option value={UserRole.PHARMACY}>{UserRole.PHARMACY}</option>
                  <option value={UserRole.LAB}>{UserRole.LAB}</option>
                  <option value={UserRole.RADIOLOGY}>{UserRole.RADIOLOGY}</option>
                </select>
              </div>
            </td>
          </tr>
          <tr>
            <td colSpan={2} className="px-4 py-3 whitespace-nowrap">
              <div className="relative grid grid-cols-2">
                <label htmlFor="doctorId" className="text-gray-600">
                  ASSIGN TO DOCTOR *
                </label>
                <select
                  title="Select a health worker to see this client"
                  name="doctorId"
                  id="doctorId"
                  placeholder="Assign to health worker..."
                  value={doctorId}
                  onChange={handleChange}
                  required
                >
                  {doctors &&
                    doctors.users?.map(doctor => (
                      <option key={doctor.id} value={doctor.id}>
                        {doctor.name}
                      </option>
                    ))}
                </select>
              </div>
            </td>
          </tr>

          <tr>
            <td colSpan={2} className="px-4 py-3 whitespace-nowrap">
              <div className="relative grid grid-cols-2">
                <label htmlFor="department" className="text-gray-600">
                  DEPT *
                </label>
                <select
                  title="Select a department to assign this visit"
                  name="department"
                  id="department"
                  value={department}
                  onChange={handleChange}
                >
                  <option value={Department.OUTPATIENT}>Outpatient</option>
                  <option value={Department.MEDICINE}>Medicine</option>
                  <option value={Department.SURGERY}>Surgery</option>
                  <option value={Department.OBSTETRICS}>Obstetrics</option>
                  <option value={Department.GYNAECOLOGY}>Gynaecology</option>
                  <option value={Department.PAEDIATRICS}>Paediatrics</option>
                </select>
              </div>
            </td>
          </tr>

          <tr>
            {wards && (
              <td colSpan={2} className="px-4 py-3 whitespace-nowrap">
                <div className="relative grid grid-cols-2">
                  <label htmlFor="wardId" className="text-gray-600">
                    WARD *
                  </label>
                  <select
                    name="wardId"
                    id="wardId"
                    value={wardId}
                    onChange={handleChange}
                    title="Choose the ward to assign this visit"
                  >
                    {wards.wards.map(ward => (
                      <option value={ward.id} key={ward.id}>
                        {ward.name}
                      </option>
                    ))}
                  </select>
                </div>
              </td>
            )}
          </tr>
        </tbody>
      </table>
    </form>
  );
}
