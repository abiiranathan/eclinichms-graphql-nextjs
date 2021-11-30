import React from "react";
import { GetPatient_patient } from "../../graphql/schema";
import { patient_age } from "../../utils/date";

export default function BioData({ patient }: { patient: GetPatient_patient }) {
  return (
    <div className="pt-2 align-middle inline-block min-w-full sm:px-2 ">
      <div className="shadow border-b border-gray-200">
        <table className="min-w-full divide-y divide-gray-200 bg-gray-100 responsive-table">
          <thead className="bg-gray-50">
            <tr>
              <th
                colSpan={6}
                scope="col"
                className="px-2 py-2 text-left text-3xl text-cyan-900 font-black tracking-wider"
              >
                <div>
                  <h2 className="my-0">{patient.name.toUpperCase()}</h2>
                  {patient.email && <span className="text-sm text-cyan-700">{patient.email}</span>}
                  <p className="tracking-tighter text-gray-500 text-sm">ID: {patient.id}</p>
                </div>
              </th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            <tr>
              <td className="px-2 py-2 whitespace-nowrap">
                Age: {patient_age(new Date(patient.birthDate))}
              </td>
              <td className="px-2 py-2 whitespace-nowrap">Gender: {patient.sex}</td>
              <td className="px-2 py-2 whitespace-nowrap">
                D.O.B:{" "}
                {new Date(patient.birthDate).toLocaleDateString("en-BG", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </td>
              <td className="px-2 py-2 whitespace-nowrap">Mobile: {patient.mobile}</td>
              <td className="px-2 py-2 whitespace-nowrap">Tribe: {patient.tribe}</td>
            </tr>
            <tr>
              <td className="px-2 py-2 whitespace-nowrap">Address: {patient.address}</td>
              <td className="px-2 py-2 whitespace-nowrap">
                Marital status: {patient.maritalStatus}
              </td>
              <td className="px-2 py-2 whitespace-nowrap">N.O.K: {patient.nextOfKin}</td>
              <td className="px-2 py-2 whitespace-nowrap">Occupation: {patient.occupation}</td>
              <td className="px-2 py-2 whitespace-nowrap">Religion: {patient.religion}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
