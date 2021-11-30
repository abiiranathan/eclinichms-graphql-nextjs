import { useMutation } from "@apollo/client";
import React, { ChangeEvent, FormEvent } from "react";
import { useVisit } from "../../../context/VisitContext";
import { SAVE_VITALS } from "../../../graphql/queries";
import { SaveVitals, SaveVitalsVariables } from "../../../graphql/schema";
import { useAlert } from "react-alert";

export default function TriageForm() {
  const alert = useAlert();

  const {
    visit: { id: visitId },
    refetchQueries,
  } = useVisit();

  const initialState = {
    visitId,
    sbp: 0,
    dbp: 0,
    pulse: 0,
    temperature: 0,
    resp: 0,
    spo2: 100,
    weight: 0,
    height: 0,
    gcs: 15,
    muac: 0,
  };

  const [state, setState] = React.useState(initialState);
  const [saveFunction, { loading }] = useMutation<SaveVitals, SaveVitalsVariables>(SAVE_VITALS);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await saveFunction({ variables: { data: state } });
      refetchQueries();
      setState(initialState);
      alert.success("Saved successfully!");
    } catch (error) {
      alert.error(error.message);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.valueAsNumber || 0;

    setState(prevState => ({ ...prevState, [name]: value }));
  };

  return (
    <form className="p-3 bg-white rounded-lg shadow" onSubmit={handleSubmit}>
      <h2 className="text-lg mb-1">Vitals signs & Arthropometry</h2>
      <div className="grid grid-cols-3 gap-2 lg:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-2">
        <div>
          <label htmlFor="sbp">SBP(mm Hg)</label>
          <input
            type="number"
            name="sbp"
            id="sbp"
            onChange={handleChange}
            value={state.sbp || ""}
          />
        </div>
        <div>
          <label htmlFor="dbp">DBP(mm Hg)</label>
          <input
            type="number"
            name="dbp"
            id="dbp"
            onChange={handleChange}
            value={state.dbp || ""}
          />
        </div>
        <div>
          <label htmlFor="pulse">PULSE(beats/min) *</label>
          <input
            type="number"
            name="pulse"
            id="pulse"
            required
            onChange={handleChange}
            value={state.pulse || ""}
          />
        </div>
        <div>
          <label htmlFor="temperature">TEMP(oC)</label>
          <input
            type="number"
            name="temperature"
            id="temperature"
            onChange={handleChange}
            value={state.temperature || ""}
            step={0.1}
          />
        </div>
        <div>
          <label htmlFor="resp">RESP RATE(/min) *</label>
          <input
            type="number"
            name="resp"
            id="resp"
            required
            onChange={handleChange}
            value={state.resp || ""}
          />
        </div>
        <div>
          <label htmlFor="spo2">SPO2(%)</label>
          <input
            type="number"
            name="spo2"
            id="spo2"
            onChange={handleChange}
            value={state.spo2 || ""}
          />
        </div>
        <div>
          <label htmlFor="weight">WEIGHT(kg)</label>
          <input
            type="number"
            name="weight"
            id="weight"
            onChange={handleChange}
            value={state.weight || ""}
            max={300}
            step={0.1}
          />
        </div>
        <div>
          <label htmlFor="height">HEIGHT(cm)</label>
          <input
            type="number"
            name="height"
            id="height"
            onChange={handleChange}
            value={state.height || ""}
            min={50}
            max={300}
          />
        </div>

        <div>
          <label htmlFor="muac">MUAC(cm)</label>
          <input
            type="number"
            name="muac"
            id="muac"
            step={0.1}
            onChange={handleChange}
            value={state.muac || ""}
            min={5}
            max={35}
          />
        </div>

        <div>
          <label htmlFor="gcs">GCS(out of 15) *</label>
          <input
            min={3}
            max={15}
            type="number"
            name="gcs"
            step={1}
            id="gcs"
            required
            onChange={handleChange}
            value={state.gcs || ""}
          />
        </div>
      </div>

      <div className="flex justify-between items-center">
        <button
          type="submit"
          disabled={loading}
          className="btn mt-2 py-2 px-3 bg-gray-600 text-gray-100"
        >
          Save
        </button>
        <span>* Required fields</span>
      </div>
    </form>
  );
}
