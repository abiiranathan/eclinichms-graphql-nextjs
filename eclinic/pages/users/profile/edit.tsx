import React, { FormEvent, useState, useEffect } from "react";
import { ApolloError, useMutation } from "@apollo/client";
import { UPDATE_USER, LOGIN_STATUS } from "../../../graphql/queries";
import { LoginUser_login_user, UpdateUser, UpdateUserVariables } from "../../../graphql/schema";
import { useAuth } from "../../../components/auth/AuthContext";
import { parseGQLError } from "../../../utils/error";

export default function UpdateUserProfile() {
  const { user: loggedUser } = useAuth();

  const [variables, setVariables] = useState({
    name: "",
    username: "",
    email: "",
    age: 0,
    mobile: "",
  });

  const [user, setUser] = useState<LoginUser_login_user | null>();
  const { name, username, email, age, mobile } = variables;
  const [error, setError] = useState<ApolloError | undefined>();

  const [handleRegister, { data, loading, client }] = useMutation<UpdateUser, UpdateUserVariables>(
    UPDATE_USER,
    {
      refetchQueries: [LOGIN_STATUS],
      awaitRefetchQueries: true,
    }
  );

  useEffect(() => {
    if (data && data.updateUser && data.updateUser.id) {
      client.clearStore().then(() => {
        window.location.pathname = "/users/profile";
      });
    }
  }, [data]);

  useEffect(() => {
    setUser(loggedUser);
    const { name, username, email, age, mobile } = loggedUser;
    setVariables({ name, username, email, age, mobile });
  }, [loggedUser]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const name = e.target.name;
    const value = e.target.value;

    setVariables(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!user) return;

    try {
      await handleRegister({ variables: { id: user.id, user: { ...variables } } });
    } catch (err) {
      console.log(err);
      setError(err);
    }
  };

  const getParsedError = () => {
    return parseGQLError(error);
  };

  return (
    <div className="min-w-[700px] max-w-xl flex items-center justify-center mx-auto p-8">
      <div className="w-full">
        <h1 className="text-2xl text-gray-600 text-center my-4">Update your biodata</h1>
        <form
          className="bg-white shadow-lg drop-shadow-lg rounded px-12 py-8 mb-4"
          onSubmit={handleSubmit}
        >
          <div className="flex gap-2 flex-wrap -mx-3">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
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
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
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
          <div className="flex gap-2 flex-wrap -mx-3">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
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
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="mobile">
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

          <div className="flex gap-1 w-full justify-between items-center -mx-3">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="age">
                Age
              </label>
              <input
                id="age"
                type="number"
                value={age}
                name="age"
                required
                onChange={e => {
                  setVariables(prev => ({ ...prev, age: e.target.valueAsNumber || 0 }));
                }}
                placeholder="Age in years"
              />
            </div>
            <button
              disabled={!username || !email || !age || !mobile || loading}
              className="btn btn-default"
              type="submit"
            >
              {loading ? "Please wait..." : "Update"}
            </button>
          </div>

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
      </div>
    </div>
  );
}
