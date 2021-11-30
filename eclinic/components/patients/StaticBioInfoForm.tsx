import { ChangeEvent, FormEvent, MouseEvent, useState, useEffect } from "react";
import { usePatient } from "../../context/PatientContext";
import { useSaveMedicalInfo, useUpdateMedicalInfo } from "../../dataHooks/useMedicalInfo";
import {
  InitialMedicalInfo,
  MedicalInfoIndexed,
  MedicalInfoStateIndexed,
} from "../../graphql/patients";
import { Gender, HivStatus, PregnancyStatus } from "../../graphql/schema";
import { parseGQLError } from "../../utils/error";
import AlertDanger from "../alerts/AlertDanger";

interface MedicalFormProps {
  editing: boolean;
  medicalInfo?: MedicalInfoIndexed;
  onCancel: () => void;
}

export default function MedicalForm({ editing, medicalInfo, onCancel }: MedicalFormProps) {
  const { patient, refetchQueries } = usePatient();

  const [state, setState] = useState<MedicalInfoStateIndexed>(InitialMedicalInfo);
  const [saveBoiInfo, { error, loading }] = useSaveMedicalInfo();
  const [updateBoiInfo, { error: updateError, loading: updating }] = useUpdateMedicalInfo();

  useEffect(() => {
    if (medicalInfo) {
      // Feels like magic, could be simplified but...

      const dataList = Object.entries(medicalInfo)
        .filter(([key, _]) => state[key] !== undefined)
        .map(([key, value]) => ({ [key]: value === null ? "" : value }));

      const newInfo = Object.assign({}, {}, ...dataList);
      setState(prev => ({ ...prev, ...newInfo }));
    }
  }, [medicalInfo]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await saveBoiInfo({
        variables: { data: { ...state, patientId: patient.id } },
      });
      onCancel();
      await refetchQueries();
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!patient || !medicalInfo) return;

    try {
      await updateBoiInfo({
        variables: { id: medicalInfo.id, data: { ...state, patientId: patient.id } },
      });

      onCancel();

      await refetchQueries();
    } catch (error) {
      console.log(error);
    }
  };

  const toggleState = (e: MouseEvent<HTMLDivElement>) => {
    e.currentTarget.classList.toggle("selected");
    const name = e.currentTarget.dataset.name;
    const selected = e.currentTarget.classList.contains("selected");

    if (name) {
      setState(prevState => ({ ...prevState, [name]: selected }));
    }
  };

  const onInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setState(prevState => ({ ...prevState, [name]: value }));
  };

  return (
    <form
      onSubmit={editing ? handleUpdate : handleSubmit}
      className="mx-2 bg-gray-100 p-3"
      id="medform"
    >
      {editing ? (
        <h1 className="text-red-700 my-3 uppercase">Edit patient medical info</h1>
      ) : (
        <h1 className="text-red-700 my-3 uppercase">Create patient medical info record</h1>
      )}
      <h3>CHRONIC ILLNESS(ES)</h3>
      <div className="grid grid-cols-4 gap-2">
        <div
          className={`form-col ${state.hypertension ? "selected" : ""}`}
          data-name="hypertension"
          onClick={toggleState}
        >
          <p>Hypertension</p>
        </div>

        <div
          className={`form-col ${state.diabetes ? "selected" : ""}`}
          data-name="diabetes"
          onClick={toggleState}
        >
          <p>Diabetes</p>
        </div>

        <div
          className={`form-col ${state.cancer ? "selected" : ""}`}
          data-name="cancer"
          onClick={toggleState}
        >
          <p>Cancer</p>
        </div>
        <div
          className={`form-col ${state.heart_disease ? "selected" : ""}`}
          data-name="heart_disease"
          onClick={toggleState}
        >
          <p>Heart disease</p>
        </div>
        <div
          className={`form-col ${state.liver_disease ? "selected" : ""}`}
          data-name="liver_disease"
          onClick={toggleState}
        >
          <p>Liver disease</p>
        </div>
        <div
          className={`form-col ${state.smoking ? "selected" : ""}`}
          data-name="smoking"
          onClick={toggleState}
        >
          <p>Smoking</p>
        </div>

        <div
          className={`form-col ${state.alcohol ? "selected" : ""}`}
          data-name="alcohol"
          onClick={toggleState}
        >
          <p>Alcohol use</p>
        </div>
        <div
          className={`form-col ${state.sickle_cell ? "selected" : ""}`}
          data-name="sickle_cell"
          onClick={toggleState}
        >
          <p>Sickle cell disease</p>
        </div>
      </div>

      <div className="flex justify-between w-full">
        <div className="bg-gray-50  py-4 px-3 mt-1 shadow-lg rounded-lg">
          <legend className="text-gray-600 uppercase">HIV/AIDS</legend>
          <section>
            <label htmlFor="hiv">Select the client HIV status</label>
            <select
              name="hiv"
              id="hiv"
              value={state.hiv}
              onChange={e => setState(prev => ({ ...prev, hiv: e.target.value as HivStatus }))}
            >
              <option value={HivStatus.UNKNOWN}>{HivStatus.UNKNOWN}</option>
              <option value={HivStatus.NEGATIVE}>{HivStatus.NEGATIVE}</option>
              <option value={HivStatus.POSITIVE}>{HivStatus.POSITIVE}</option>
            </select>
          </section>
        </div>

        {patient?.sex === Gender.FEMALE && (
          <div className="bg-gray-50  py-4 px-3 mt-1 shadow-lg rounded-lg">
            <legend className="text-gray-600 uppercase">Pregnancy Status</legend>
            <section>
              <label htmlFor="pregnancy">Select as appropriate</label>
              <select
                name="pregnancy"
                id="pregnancy"
                value={state.pregnancy}
                onChange={e =>
                  setState(prev => ({ ...prev, pregnancy: e.target.value as PregnancyStatus }))
                }
              >
                <option value={PregnancyStatus.NOT_APPLICABLE}>
                  {PregnancyStatus.NOT_APPLICABLE}
                </option>
                <option value={PregnancyStatus.FIRST_TRIMESTER}>
                  {PregnancyStatus.FIRST_TRIMESTER}
                </option>
                <option value={PregnancyStatus.SECOND_TRIMESTER}>
                  {PregnancyStatus.SECOND_TRIMESTER}
                </option>
                <option value={PregnancyStatus.THIRD_TRIMESTER}>
                  {PregnancyStatus.THIRD_TRIMESTER}
                </option>
              </select>
            </section>
          </div>
        )}
      </div>

      <fieldset className="py-4">
        <h3 className="text-gray-600 uppercase mb-2">Drugs, allergies and surgery</h3>
        <div className="grid grid-cols-3 gap-4">
          <section>
            <label htmlFor="allergies">Food or drug allergies</label>
            <textarea
              name="allergies"
              id="allergies"
              value={state.allergies}
              onChange={onInputChange}
              placeholder="Any history of allergy"
            />
          </section>
          <section>
            <label htmlFor="medication">Medications</label>
            <textarea
              name="medication"
              id="medication"
              value={state.medication}
              onChange={onInputChange}
              placeholder="Current and previous patient meds"
            />
          </section>

          <section>
            <label htmlFor="previous_surgery">Previous operations</label>
            <textarea
              name="previous_surgery"
              id="previous_surgery"
              value={state.previous_surgery}
              onChange={onInputChange}
              placeholder="History of previous surgery"
            />
          </section>
        </div>
      </fieldset>

      <section>
        {error && <AlertDanger title="Something wrong happend" message={parseGQLError(error)} />}
        {updateError && <AlertDanger title="Update Error" message={parseGQLError(updateError)} />}

        <button type="submit" className="mt-1 btn btn-default" disabled={loading || updating}>
          {editing ? "Update" : "Save"}
        </button>

        {editing && onCancel && (
          <button
            type="button"
            className="mt-1 ml-3 btn btn-secondary"
            disabled={loading || updating}
            onClick={onCancel}
          >
            Discard changes
          </button>
        )}
      </section>
    </form>
  );
}
