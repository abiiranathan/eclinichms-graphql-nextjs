import React, { FormEvent, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { EyeIcon, EyeOffIcon, LockOpenIcon } from "@heroicons/react/solid";
import { ApolloError, useMutation } from "@apollo/client";
import { LOGIN_USER } from "../../graphql/queries";
import { LoginUser, LoginUserVariables } from "../../graphql/schema";
import { useAuth } from "../../components/auth/AuthContext";

export default function Login() {
  const router = useRouter();
  const { login, user } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<ApolloError | undefined>();

  const [handleLogin, { data, loading }] = useMutation<LoginUser, LoginUserVariables>(LOGIN_USER, {
    variables: { username, password },
  });

  useEffect(() => {
    if (data?.login) {
      const { user, token } = data.login;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      login(user);
      router.push("/");
    }
  }, [data]);

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await handleLogin({ variables: { username, password } });
    } catch (err) {
      setError(err);
    }
  };

  if (user) return null;

  return (
    <div className="w-screen h-screen flex items-center justify-center mx-auto p-8 bg-gray-100">
      <div className="w-full max-w-md">
        <h1 className="text-4xl text-blue-500 text-center my-4">LOGIN TO ECLINIC</h1>
        <form
          className="bg-cyan-700 shadow-lg drop-shadow-lg rounded px-12 py-8 mb-4"
          onSubmit={handleSubmit}
        >
          <div className="rounded-full bg-blue-800 w-12 h-12 text-center mx-auto mb-3">
            <LockOpenIcon className="w-12 h-12 text-gray-200" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-200 text-sm font-bold mb-2" htmlFor="username">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              placeholder="Username"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-200 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={`${showPassword ? "text" : "password"}`}
                value={password}
                required
                onChange={e => setPassword(e.target.value)}
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
          <div className="flex items-center justify-between">
            <button
              disabled={!username || !password || loading}
              className="btn btn-primary bg-fb-blue"
              type="submit"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </div>
          {error && (
            <p className="text-red-600 italic my-4 p-2 bg-white rounded-sm">{error.message}</p>
          )}
        </form>
        <p className="text-center text-gray-500 text-xs">
          &copy; 2021 Yo Medical Files (U) Ltd. All rights reserved.
        </p>
      </div>
    </div>
  );
}
