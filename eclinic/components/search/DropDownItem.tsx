import { Menu } from "@headlessui/react";
import React from "react";
interface Props {
  disabled: boolean;
  text: string;
  icon: JSX.Element;
  url: string;
}

export default function DropDownItem({ disabled, text, icon: Icon, url }: Props) {
  return (
    <Menu.Item disabled={disabled}>
      {({ active }) => (
        <button
          onClick={() => (window.location.href = url)}
          disabled={disabled}
          className={`${
            active ? "bg-violet-500 text-white" : "text-gray-900"
          } group flex rounded-md items-center w-full px-2 py-2 text-sm hover:text-white`}
        >
          {Icon}
          {text}
        </button>
      )}
    </Menu.Item>
  );
}

/**
 * <EditActiveIcon className="w-5 h-5 mr-2" aria-hidden="true" />
 * <EditInactiveIcon className="w-5 h-5 mr-2" aria-hidden="true" />
 */
