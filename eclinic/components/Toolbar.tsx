import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  RefreshIcon,
} from "@heroicons/react/outline";
import React from "react";
import { useToolBarContext } from "../context/ToolbarContext";

export default function Toolbar() {
  const { showSideBar, setShowSidebar } = useToolBarContext();

  return (
    <div className="toolbar bg-gray-100 py-1 px-4 gap-1 flex justify-between items-center">
      <div className="left">
        <button
          className="btn transition-all duration-150 p-2 rounded-full bg-white text-gray-600"
          onClick={() => setShowSidebar(!showSideBar)}
          title={showSideBar ? "Hide sidebar" : "Show sidebar"}
        >
          {showSideBar ? <ChevronLeftIcon height={18} /> : <ChevronRightIcon height={18} />}
        </button>
      </div>

      <div className="flex gap-2">
        <button
          title="Back"
          onClick={() => window.history.back()}
          className="btn transition-all duration-150 p-2 rounded-full bg-white text-gray-600"
        >
          <ChevronDoubleLeftIcon height={18} />
        </button>
        <button
          onClick={() => window.location.reload()}
          title="Reload"
          className="btn transition-all duration-150 p-2 rounded-full bg-white text-gray-600"
        >
          <RefreshIcon height={18} />
        </button>
        <button
          onClick={() => window.history.forward()}
          className="btn transition-all duration-150 p-2 rounded-full bg-white text-gray-600"
          title="Forward"
        >
          <ChevronDoubleRightIcon height={18} onClick={() => window.history.forward()} />
        </button>
      </div>
    </div>
  );
}
