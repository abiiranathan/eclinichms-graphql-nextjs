import React from "react";
import { PatientFormProps } from "../../graphql/patients";
import { Gender, MaritalStatus, Religion } from "../../graphql/schema";
import { getCalendar, getValidDates } from "../../utils/date";
import { parseGQLError } from "../../utils/error";
import AlertDanger from "../alerts/AlertDanger";

const { days, months, years } = getCalendar();

export default function PatientForm({
  handleSubmit,
  handleChange,
  error,
  loading,
  state,
  title,
  update,
}: PatientFormProps) {
  return (
    <form className="shadow border-b border-gray-200" onSubmit={handleSubmit}>
      <table
        id="patient-table"
        className="min-w-full divide-y divide-gray-200 bg-gray-100 responsive-table"
      >
        <thead className="bg-gray-50">
          <tr>
            <th
              colSpan={7}
              scope="col"
              className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              {title}
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          <tr>
            <td className="px-4 py-4 whitespace-nowrap">
              <div className="relative flex flex-col">
                <label htmlFor="name" className="text-gray-600">
                  Patient Name *
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Patient name"
                  required
                  value={state.name}
                  onChange={handleChange}
                />
              </div>
            </td>

            <td className="px-4 py-4 whitespace-nowrap">
              <div className="relative flex flex-col">
                <label htmlFor="name" className="text-gray-600">
                  Gender *
                </label>
                <select
                  name="sex"
                  id="sex"
                  required
                  value={state.sex}
                  onChange={handleChange}
                  disabled={!!update}
                >
                  <option value={Gender.MALE}>{Gender.MALE}</option>
                  <option value={Gender.FEMALE}>{Gender.FEMALE}</option>
                </select>
              </div>
            </td>

            <td className="mx-4 py-4 whitespace-nowrap">
              <h6>Date of birth *</h6>
              <div className="relative flex">
                <select
                  name="day"
                  id="day"
                  required
                  className={`w-16 rounded-none`}
                  value={state.day}
                  onChange={handleChange}
                >
                  {days
                    .filter(day => getValidDates(day, state.year, state.month))
                    .map(day => (
                      <option key={day < 10 ? "0" + day : day}>{day < 10 ? "0" + day : day}</option>
                    ))}
                </select>
                <select
                  name="month"
                  id="month"
                  required
                  className="w-16 rounded-none"
                  value={state.month}
                  onChange={handleChange}
                >
                  {months.map(month => (
                    <option key={month} value={month < 10 ? "0" + month : month}>
                      {month < 10 ? "0" + month : month}
                    </option>
                  ))}
                </select>
                <select
                  name="year"
                  id="year"
                  required
                  className="w-24 rounded-none"
                  value={state.year}
                  onChange={handleChange}
                >
                  {years.map(year => (
                    <option key={"" + year}>{"" + year}</option>
                  ))}
                </select>
              </div>
            </td>
          </tr>

          <tr>
            <td className="px-4 py-4 whitespace-nowrap">
              <div className="relative flex flex-col">
                <label htmlFor="address" className="text-gray-600">
                  Address *
                </label>
                <input
                  type="text"
                  name="address"
                  id="address"
                  placeholder="Full address"
                  value={state.address}
                  onChange={handleChange}
                  required
                />
              </div>
            </td>
            <td className="px-4 py-4 whitespace-nowrap">
              <div className="relative flex flex-col">
                <label htmlFor="maritalStatus" className="text-gray-600">
                  Marital Status *
                </label>
                <select
                  name="maritalStatus"
                  id="maritalStatus"
                  required
                  value={state.maritalStatus}
                  onChange={handleChange}
                >
                  <option value={MaritalStatus.SINGLE}>{MaritalStatus.SINGLE}</option>
                  <option value={MaritalStatus.MARRIED}>{MaritalStatus.MARRIED}</option>
                  <option value={MaritalStatus.COHABITING}>{MaritalStatus.COHABITING}</option>
                  <option value={MaritalStatus.DIVORCED}>{MaritalStatus.DIVORCED}</option>
                  <option value={MaritalStatus.WIDOW}>{MaritalStatus.WIDOW}</option>
                  <option value={MaritalStatus.WIDOWER}>{MaritalStatus.WIDOWER}</option>
                  <option value={MaritalStatus.NA}>{MaritalStatus.NA}</option>
                </select>
              </div>
            </td>

            <td className="px-4 py-4 whitespace-nowrap">
              <div className="relative flex flex-col">
                <label htmlFor="religion" className="text-gray-600">
                  Religion *
                </label>
                <select
                  name="religion"
                  id="religion"
                  value={state.religion}
                  onChange={handleChange}
                >
                  <option value={Religion.CATHOLIC}>Catholic</option>
                  <option value={Religion.PROTESTANT}>Protestant</option>
                  <option value={Religion.MOSLEM}>Moslem</option>
                  <option value={Religion.ORTHODOX}>Orthodox</option>
                  <option value={Religion.PENTECOSTAL}>Pentecostal</option>
                  <option value={Religion.SDA}>SDA</option>
                  <option value={Religion.OTHER}>Other</option>
                </select>
              </div>
            </td>
          </tr>
          <tr>
            <td className="px-4 py-4 whitespace-nowrap">
              <div className="relative flex flex-col">
                <label htmlFor="nextOfKin" className="text-gray-600">
                  Next Of Kin
                </label>
                <input
                  type="text"
                  name="nextOfKin"
                  id="nextOfKin"
                  placeholder="Next of kin"
                  value={state.nextOfKin}
                  onChange={handleChange}
                />
              </div>
            </td>
            <td className="px-4 py-4 whitespace-nowrap">
              <div className="relative flex flex-col">
                <label htmlFor="mobile" className="text-gray-600">
                  Phone number
                </label>
                <input
                  type="tel"
                  name="mobile"
                  id="mobile"
                  placeholder="0789000000"
                  value={state.mobile}
                  onChange={handleChange}
                  pattern="[0-9]{10}"
                />
              </div>
            </td>

            <td className="px-4 py-4 whitespace-nowrap">
              <div className="relative flex flex-col">
                <label htmlFor="occupation" className="text-gray-600">
                  Occupation
                </label>

                <input
                  type="text"
                  name="occupation"
                  id="occupation"
                  placeholder="Enter client occupation"
                  value={state.occupation}
                  onChange={handleChange}
                />
              </div>
            </td>
          </tr>

          {/* Last row */}
          <tr>
            <td className="px-4 py-4 whitespace-nowrap">
              <div className="relative flex flex-col">
                <label htmlFor="email" className="text-gray-600">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="example@gmail.com"
                  value={state.email}
                  onChange={handleChange}
                />
              </div>
            </td>
            <td className="px-4 py-4 whitespace-nowrap">
              <div className="relative flex flex-col">
                <label htmlFor="allergies" className="text-gray-600">
                  Allergies
                </label>

                <input
                  type="text"
                  name="allergies"
                  id="allergies"
                  placeholder="Enter client allergies"
                  value={state.allergies}
                  onChange={handleChange}
                />
              </div>
            </td>

            <td className="px-4 py-4 whitespace-nowrap">
              <div className="relative flex flex-col">
                <label htmlFor="tribe" className="text-gray-600">
                  Tribe
                </label>
                <input
                  type="text"
                  name="tribe"
                  id="tribe"
                  placeholder="Tribe"
                  value={state.tribe}
                  onChange={handleChange}
                />
              </div>
            </td>
          </tr>
          <tr>
            <td className="px-4 py-4 whitespace-nowrap" colSpan={2}>
              <div className="relative flex flex-col">
                <label htmlFor="chronicIllness" className="text-gray-600">
                  Chronic Illness
                </label>
                <textarea
                  name="chronicIllness"
                  id="chronicIllness"
                  placeholder="Like HTN, DM, CCF, Asthma, SCD etc"
                  value={state.chronicIllness}
                  onChange={handleChange}
                ></textarea>
              </div>
            </td>
          </tr>
          <tr>
            <td colSpan={3} className="text-right">
              <button
                disabled={loading}
                type="submit"
                title={update ? "Update record" : "Save record"}
                className="my-3 mx-8 btn btn-primary"
              >
                {update ? "UPDATE" : "REGISTER"}
              </button>
            </td>
          </tr>

          {error && (
            <tr>
              <td>
                <AlertDanger
                  title={update ? "Error updating client info" : "Error saving client info"}
                  message={parseGQLError(error)}
                />
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <p className="ml-4 pt-4 pb-16 block text-gray-400">* Required fields</p>
    </form>
  );
}
