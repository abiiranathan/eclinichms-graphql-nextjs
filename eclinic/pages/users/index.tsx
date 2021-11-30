import { useMutation, useQuery } from "@apollo/client";
import { LockClosedIcon, LogoutIcon, PlusIcon, UserIcon } from "@heroicons/react/outline";
import Link from "next/link";
import Swal from "sweetalert2";
import AlertDanger from "../../components/alerts/AlertDanger";
import AlertWarning from "../../components/alerts/AlertWarning";
import { useAuth } from "../../components/auth/AuthContext";
import { DELETE_USER, GET_USERS } from "../../graphql/queries";
import { GetUsers, LoginUser_login_user } from "../../graphql/schema";

const headers = ["Name", "Age/Sex", "Title", "Status", "Role", "Registered", "Actions"];

export default function Users() {
  const { user: loggedUser, logout } = useAuth();

  const { data, loading, error, client } = useQuery<GetUsers>(GET_USERS);
  const [mutate, { error: deleteError }] = useMutation(DELETE_USER);

  const handleDeleteUser = async (user: LoginUser_login_user) => {
    const res = await Swal.fire({
      title: "Delete this user account",
      html: "<div className='text-red-500'>You can not undo this operation!<div>",
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "Cancel",
      confirmButtonText: "Delete",
    });

    if (!res.isConfirmed) return;

    mutate({ variables: { id: user.id } })
      .then(async msg => {
        await client.clearStore();
      })
      .catch(err => {});
  };

  if (loading) return null;

  if (error) return <AlertDanger title="Error fetching users" message={error.message} />;
  if (!data || !data.users) return null;
  if (!loggedUser?.isAdmin) {
    return (
      <div className="max-w-sm mx-auto py-20">
        <AlertDanger
          title="Permission Denied"
          message="User accounts are a preserve of Administrators"
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col align-middle min-w-full sm:px-2 lg:px-8">
      <div className="flex justify-between items-center gap-8 my-3 mx-12 max-w-xlg">
        <h1 className="my-3 text-3xl text-cyan-900">User Accounts</h1>
        <Link href="/register">
          <a className="btn btn-default" title="New user account">
            <PlusIcon width={18} height={18} />
          </a>
        </Link>

        <a className="btn btn-default cursor-pointer" onClick={logout} title="Logout">
          <LogoutIcon width={18} height={18} />
        </a>
      </div>

      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        {deleteError && (
          <div className="my-2">
            <AlertWarning title="Unable to delete user account" message={deleteError.message} />
          </div>
        )}
        <div className="py-2 align-middle inline-block min-w-full sm:px-2 lg:px-8 ">
          <div className="shadow border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200 bg-gray-100">
              <thead className="bg-gray-50">
                <tr>
                  {headers.map(header => (
                    <th
                      key={header}
                      scope="col"
                      className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data?.users?.map(user => (
                  <tr key={user.id}>
                    <td className="px-2 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <UserIcon height={24} />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{user.name}</div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                        </div>
                      </div>
                    </td>

                    <td className="px-2 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{user.age} years</div>
                      <div className="text-sm text-gray-500">{user.sex}</div>
                    </td>

                    <td className="px-2 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{user.role}</div>
                      <div className="text-sm text-gray-500">{user.username}</div>
                    </td>

                    <td className="px-2 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {loggedUser.id === user.id ? "YOU" : "Active"}
                      </span>
                    </td>

                    <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.role}
                    </td>

                    <td className="px-2 py-4 text-sm text-gray-500">
                      {new Date(user.createdAt).toLocaleDateString("en-GB", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour12: true,
                      })}
                    </td>

                    <td className="px-2 py-4 whitespace-nowrap text-right text-sm font-medium">
                      {user.id === loggedUser?.id ? (
                        <LockClosedIcon height={18} />
                      ) : (
                        <button
                          title="Delete user account"
                          className="btn btn-danger text-sm "
                          onClick={e => {
                            e.preventDefault();
                            handleDeleteUser(user);
                          }}
                        >
                          Delete
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
