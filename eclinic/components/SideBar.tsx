import { ChevronLeftIcon, ChevronRightIcon, RefreshIcon } from "@heroicons/react/outline";
import Link from "next/link";
import Image from "next/image";

import React, { Dispatch, SetStateAction, useState } from "react";
import { useRouter } from "next/router";

const MenuLinks = [
  {
    title: "Patients",
    image: "/icons/history.jpg",
    url: "/patients",
  },
  {
    title: "Consultations",
    image: "/icons/visits.jpg",
    url: "/patients/visits",
  },
  {
    title: "Laboratory",
    image: "/icons/microscope.png",
    url: "/laboratory",
  },
  {
    title: "Radiology",
    image: "/icons/heartbeat.png",
    url: "/laboratory?dept=radiology",
  },
  {
    title: "Pharmacy",
    image: "/icons/pills.png",
    url: "/pharmacy",
  },
  {
    title: "Consumables",
    image: "/icons/bandage.png",
    url: "/consumables",
  },
  {
    title: "Accounts",
    image: "/icons/badge.png",
    url: "/users",
  },
  {
    title: "Inventory",
    image: "/icons/wheel bed.png",
    url: "/inventory",
  },
];

export default function SideBar() {
  const router = useRouter();

  return (
    <aside
      id="sidebar"
      className={`transition-all duration-1000 ease-linear bg-white border-r border-gray-100 mt-1 mr-1 max-h-screen pb-40 overflow-y-auto w-[150px] min-w-[150px]`}
    >
      <ul className="list-none h-100">
        {MenuLinks.map((obj, index) => (
          <li
            className={`text-blue-400 border-b py-2 hover:bg-gray-200 ${
              router.pathname === obj.url ? "bg-red-100" : ""
            }`}
            key={index}
          >
            <Link href={obj.url}>
              <a
                className="px-4 h-full flex flex-col justify-center items-center"
                title={obj.title}
              >
                <Image
                  width={36}
                  height={36}
                  layout="fixed"
                  src={obj.image}
                  className="rounded-full mr-4 inline-block"
                />
                <h3 className="text-gray-600 text-sm">{obj.title}</h3>
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
