import { useQuery } from "@apollo/client";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useMemo, useState } from "react";
import { ToolBarContext } from "../context/ToolbarContext";
import useLocalStorage from "../dataHooks/useLocalStorage";
import { LOGIN_STATUS } from "../graphql/queries";
import {
  LoginUser_login_user,
  VerifyLoginStatus,
  VerifyLoginStatus_currentUser,
} from "../graphql/schema";
import { AuthProvider } from "./auth/AuthProvider";
import Footer from "./Footer";
import Header from "./Header";
import SideBar from "./SideBar";
import Spinner from "./Spinner";
import Toolbar from "./Toolbar";

type LayoutProps = {
  children: React.ReactNode;
  home?: boolean;
};

const excludePaths = ["/login"];

export default function Layout({ children, home }: LayoutProps) {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<VerifyLoginStatus_currentUser | null>(null);
  const [showSideBar, setShowSidebar] = useLocalStorage(
    "sidebar-open",
    currentUser !== null && !(window.location.pathname === "/")
  );

  const { loading, data } = useQuery<VerifyLoginStatus>(LOGIN_STATUS, {
    fetchPolicy: "network-only",
    onCompleted: data => {
      // user is possibly null
      if (data.currentUser) {
        setCurrentUser(data.currentUser);
      }
    },
    onError: error => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  });

  useEffect(() => {
    if (!currentUser && !loading) {
      if (!excludePaths.includes(router.pathname)) {
        router.push(`/login?redirect=${window.location.href}`);
      }
    }
  }, [currentUser]);

  const login = (user: LoginUser_login_user) => {
    setCurrentUser(user);
  };

  const logout = () => {
    setCurrentUser(null);
  };

  // Patches flash of login screen
  if (loading || (data?.currentUser && !currentUser)) return <Spinner />;

  const context = {
    user: currentUser!,
    login,
    logout,
    loading,
  };

  return (
    <>
      <Head>
        <title>Eclinic Health Management System</title>
        <meta name="description" content="Eclinic Health Management System" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Nullish coalescing */}
      <AuthProvider auth={context}>
        <Header />
        <main className="relative bg-gray-50 text-gray-600">
          {currentUser && (
            <ToolBarContext.Provider
              value={{
                showSideBar,
                setShowSidebar,
              }}
            >
              <Toolbar />
            </ToolBarContext.Provider>
          )}

          <div className="flex flex-grow">
            {showSideBar && <SideBar />}
            <div
              id="layout"
              className={`${
                showSideBar ? "w-11/12" : "w-full"
              } ml-1 mt-1 bg-gray-50 pb-40 max-h-screen`}
            >
              {children}
            </div>
          </div>
        </main>

        {home && <Footer />}
      </AuthProvider>
    </>
  );
}
