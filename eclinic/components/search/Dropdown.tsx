import { Menu, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import { ChevronDownIcon, PlayIcon } from "@heroicons/react/solid";
import DropDownItem from "./DropDownItem";
import { SearchPtients_patients_rows_visits } from "../../graphql/schema";
import { EditActiveIcon, DuplicateActiveIcon, ArchiveActiveIcon, MoveActiveIcon } from "../icons";

interface DropdownProps {
  visit: SearchPtients_patients_rows_visits | undefined;
  patientId: string;
}

export default function Dropdown({ visit, patientId }: DropdownProps) {
  const DropDownMenuItems = [
    {
      text: "New visit",
      icon: <DuplicateActiveIcon className="w-5 h-5 mr-2" aria-hidden="true" />,
      disabled: false,
      url: `/patients/visits/new/${patientId}`,
    },
    {
      text: "Patient Dashboard",
      icon: <ArchiveActiveIcon className="w-5 h-5 mr-2" aria-hidden="true" />,
      disabled: false,
      url: `/patients/${patientId}`,
    },
    {
      text: "Visit Dashboard",
      icon: <MoveActiveIcon className="w-5 h-5 mr-2" aria-hidden="true" />,
      disabled: !visit,
      url: `/patients/visits/${visit?.id}`,
    },
    {
      text: "Billing",
      icon: <PlayIcon className="w-5 h-5 mr-2 text-violet-300" aria-hidden="true" />,
      disabled: !visit,
      url: `/billing/${visit?.id}`,
    },
    {
      text: "Investigations",
      icon: <EditActiveIcon className="w-5 h-5 mr-2" aria-hidden="true" />,
      disabled: !visit,
      url: `/investigations/${visit?.id}`,
    },
  ];

  return (
    <div className="w-56 text-right opacity-100">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-opacity-75">
            <ChevronDownIcon
              className="w-5 h-5 ml-2 -mr-1 text-violet-200 hover:text-violet-100"
              aria-hidden="true"
            />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute z-30  right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            {DropDownMenuItems.map(item => {
              if (item.disabled) return null;

              return (
                <div className="px-1 py-1 ">
                  <DropDownItem
                    icon={item.icon}
                    text={item.text}
                    disabled={item.disabled}
                    url={item.url}
                  />
                </div>
              );
            })}
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
