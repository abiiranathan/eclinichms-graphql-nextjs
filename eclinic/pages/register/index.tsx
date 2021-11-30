import React, { FormEvent, useState, useEffect } from "react";
import { ApolloError, useMutation } from "@apollo/client";
import { REGISTER_USER } from "../../graphql/queries";
import { Gender, RegisterUser, RegisterUserVariables, UserRole } from "../../graphql/schema";
import { useAuth } from "../../components/auth/AuthContext";
import AlertDanger from "../../components/alerts/AlertDanger";
import AlertInfo from "../../components/alerts/AlertInfo";
import { EyeIcon, EyeOffIcon } from "@heroicons/react/outline";

const initialState = {
  name: "",
  username: "",
  email: "",
  password: "",
  age: 25,
  sex: Gender.MALE,
  mobile: "",
  role: UserRole.DOCTOR,
};

export default function Register() {
  const { user } = useAuth();

  const [variables, setVariables] = useState(initialState);
  const [showPassword, setShowPassword] = useState(false);

  const { name, username, email, password, age, sex, mobile, role } = variables;

  const [error, setError] = useState<ApolloError | undefined>();

  const [handleRegister, { data, loading }] = useMutation<RegisterUser, RegisterUserVariables>(
    REGISTER_USER,
    {
      variables: { user: variables },
    }
  );

  useEffect(() => {
    if (data && data.registerUser && data.registerUser.user) {
      setVariables(initialState);
    }
  }, [data]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const name = e.target.name;
    const value = e.target.value;

    setVariables(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (user.isAdmin) {
      setError(undefined);
      try {
        await handleRegister({ variables: { user: { ...variables } } });
      } catch (err) {
        setError(err);
      }
    }
  };

  const getParsedError = () => {
    if (error && Array.isArray(error?.graphQLErrors)) {
      return error.graphQLErrors.map(e => {
        return e.extensions.exception.errors[0].message;
      });
    } else {
      return [error?.message];
    }
  };

  return (
    <div className="min-w-[700px] max-w-xl flex items-center justify-center mx-auto p-8">
      <div className="w-full">
        <h1 className="text-2xl text-gray-600 text-center my-4 uppercase">Register user account</h1>
        <form
          className="bg-white shadow-lg drop-shadow-lg rounded px-12 py-8 mb-4"
          onSubmit={handleSubmit}
        >
          <div className="flex gap-2 -mx-3">
            <div className="mb-4">
              <label className="block text-gray-500 text-sm font-bold mb-2" htmlFor="name">
                Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                name="name"
                required
                onChange={handleChange}
                placeholder="Full Name"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-500 text-sm font-bold mb-2" htmlFor="username">
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                name="username"
                required
                onChange={handleChange}
                placeholder="Username"
              />
            </div>
          </div>

          {/* Row 2 */}
          <div className="flex gap-2 -mx-3">
            <div className="mb-4">
              <label className="block text-gray-500 text-sm font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                name="email"
                required
                onChange={handleChange}
                placeholder="Email address"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-500 text-sm font-bold mb-2" htmlFor="mobile">
                Phone number
              </label>
              <input
                id="mobile"
                type="tel"
                pattern="[0-9]{10}"
                value={mobile}
                name="mobile"
                required
                title="Enter a 10-digit phone number"
                onChange={handleChange}
                placeholder="Phone number"
              />
            </div>
          </div>

          {/* Row 3 */}

          <div className="flex gap-1 -mx-3">
            <div className="mb-4">
              <label className="block text-gray-500 text-sm font-bold mb-2" htmlFor="age">
                Age
              </label>
              <input
                id="age"
                type="number"
                value={age}
                name="age"
                required
                onChange={handleChange}
                placeholder="Age in years"
              />
            </div>

            <div className="mb-4 min-w-[150px]">
              <label className="block text-gray-500 text-sm font-bold mb-2" htmlFor="role">
                User Role
              </label>
              <select id="role" name="role" required onChange={handleChange}>
                <option value={UserRole.ADMIN}>Admin</option>
                <option value={UserRole.ACCOUNTS}>Accountant</option>
                <option value={UserRole.DOCTOR}>Doctor</option>
                <option value={UserRole.NURSE}>Nurse</option>
                <option value={UserRole.MIDWIFE}>Midwife</option>
                <option value={UserRole.LAB}>Laboratory</option>
                <option value={UserRole.PHARMACY}>Pharmacy</option>
                <option value={UserRole.RADIOLOGY}>Radiology</option>
                <option value={UserRole.STORE}>Store</option>
              </select>
            </div>
            <div className="mb-4 min-w-[150px]">
              <label className="block text-gray-500 text-sm font-bold mb-2" htmlFor="sex">
                Sex
              </label>
              <select id="sex" name="sex" required onChange={handleChange}>
                <option value={Gender.MALE}>Male</option>
                <option value={Gender.FEMALE}>Female</option>
              </select>
            </div>
          </div>

          {/* Row 4 */}
          <div className="flex gap-1 mx-3">
            <div className="mb-6  -mx-6">
              <label className="block text-gray-500 text-sm font-bold mb-2" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={`${showPassword ? "text" : "password"}`}
                  value={password}
                  required
                  onChange={handleChange}
                  placeholder="Enter your password"
                />
                <button
                  className="absolute right-1 p-2"
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOffIcon width={18} /> : <EyeIcon width={18} />}
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            {user?.isAdmin ? (
              <button
                disabled={!username || !password || loading}
                className="btn btn-primary bg-fb-blue rounded-3xl"
                type="submit"
              >
                {loading ? "Registering account..." : "REGISTER USER"}
              </button>
            ) : (
              <div className="w-full">
                <AlertDanger
                  title="Permission denied"
                  message="Only Administrators can register a user"
                />
              </div>
            )}
          </div>

          {data && data.registerUser && data.registerUser.user && (
            <div className="my-2">
              <AlertInfo
                title={data.registerUser.user.name}
                message="User account has been created successfully"
              />
              <a href="/users" className="btn btn-default mt-5">
                View user accounts
              </a>
            </div>
          )}

          {error && (
            <ul className="text-red-500 italic my-4">
              {getParsedError().map((errString, i) => (
                <li key={i} className="list-disc">
                  {errString}
                </li>
              ))}
            </ul>
          )}
        </form>

        <p className="text-center text-gray-500 text-xs">
          &copy; 2021 Yo Medical Files (U) Ltd. All rights reserved.
        </p>
      </div>
    </div>
  );
}
