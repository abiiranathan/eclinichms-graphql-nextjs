import { PencilIcon } from "@heroicons/react/outline";
import React, { useState } from "react";
import { usePatient } from "../../context/PatientContext";
import { StaticBioInfoProps } from "../../graphql/patients";
import { Gender } from "../../graphql/schema";
import { long_datetime, patient_age } from "../../utils/date";
import StaticBioInfoForm from "./StaticBioInfoForm";

const REPROD_AGE = 12;
const excludedKeys = ["id", "userId", "createdAt", "updatedAt", "alcohol", "smoking"];

export default function StaticBioInfo({ medicalInfo }: StaticBioInfoProps) {
  const [editing, setEditing] = useState(false);
  const { patient } = usePatient();

  if (!medicalInfo) {
    return <StaticBioInfoForm editing={false} onCancel={() => setEditing(false)} />;
  }

  if (medicalInfo && editing) {
    return (
      <StaticBioInfoForm
        editing={true}
        medicalInfo={medicalInfo}
        onCancel={() => setEditing(false)}
      />
    );
  }

  const isOfReproductiveAge = () => {
    if (patient.sex !== Gender.FEMALE) return false;
    const age = patient_age(new Date(patient.birthDate));

    if (/[0-9]{2,3} years/.test(age)) {
      const ageInt = parseInt(age.split(" ")[0]);

      if (ageInt > REPROD_AGE) return true;
    }

    return false;
  };

  return (
    <div className="bg-gray-100 py-1 px-3 mx-2 text-sm">
      <div className="medical-details">
        <div className="flex justify-between items-center">
          <h2 className="uppercase text-sky-600 text-lg">Patient medical info</h2>
          <div className="date">
            <h4>Created: {long_datetime(medicalInfo.createdAt)}</h4>
            {medicalInfo.createdAt !== medicalInfo.updatedAt && (
              <h4>Updated: {long_datetime(medicalInfo.updatedAt)}</h4>
            )}
          </div>
          <div>
            <button
              className="btn btn-default p-2 hover:bg-red-400 focus:ring focus:ring-red-800 focus:outline-none"
              onClick={() => setEditing(true)}
            >
              <PencilIcon height={16} />
            </button>
          </div>
        </div>

        <h3 className="mt-1 uppercase underline font-black">Chronic illnesses</h3>
        <div className="grid grid-cols-3 gap-4 items-center my-3">
          {Object.keys(medicalInfo)
            .filter(key => !excludedKeys.includes(key))
            .map(key => {
              if (key === "id" || !medicalInfo[key] || typeof medicalInfo[key] !== "boolean") {
                return null;
              }

              return (
                <div key={key} className="">
                  <div className="shadow p-3 rounded-lg bg-red-100 ring-2 ring-red-100 ring-offset-2">
                    <h4 className="font-black">{key.replace("_", " ").toUpperCase()}</h4>
                  </div>
                </div>
              );
            })}
        </div>

        <div className="grid grid-cols-3 items-center gap-2">
          <div className="text-card">
            <h4 className="text-red-500 uppercase text-sm">Allergies</h4>
            <p>{medicalInfo.allergies || "No food or medicine allergies"}</p>
          </div>
          <div className="text-card">
            <h4 className="text-red-500 uppercase text-sm">Chronic medication</h4>
            <p>{medicalInfo.medication || "Not on any chronic medication"}</p>
          </div>

          <div className="text-card">
            <h4 className="text-red-500 uppercase text-sm">Previous surgery</h4>
            <p>{medicalInfo.previous_surgery || "No history of surgery"}</p>
          </div>
          {isOfReproductiveAge() && (
            <div className="text-card">
              <h4 className="text-red-500 uppercase text-sm">Pregnancy Status</h4>
              <p>{medicalInfo.pregnancy}</p>
            </div>
          )}
          <div className="text-card">
            <h4 className="text-red-500 uppercase text-sm">HIV Status</h4>
            <p>{medicalInfo.hiv}</p>
          </div>
        </div>

        <div className="my-6">
          <h3 className="text-gray-900 uppercase font-black underline">Alcohol use and smoking</h3>
          <p>Smokes: {medicalInfo.smoking ? "Yes" : "No"}</p>
          <p>Drinks alchol: {medicalInfo.alcohol ? "Yes" : "No"}</p>
        </div>
      </div>
    </div>
  );
}
