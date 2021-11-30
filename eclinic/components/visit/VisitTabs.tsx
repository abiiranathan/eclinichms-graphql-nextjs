import React, { Dispatch, SetStateAction } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Clerkship from "./clerkship/Clerkship";
import TriageAndVitals from "./triage";

interface VisitTabProps {
  index: number;
  setTabIndex: Dispatch<SetStateAction<number | null>>;
}

export default function VisitTabs({ index, setTabIndex }: VisitTabProps) {
  return (
    <Tabs selectedIndex={index || 0} onSelect={i => setTabIndex(i)}>
      <TabList>
        <Tab>Triage & Vitals</Tab>
        <Tab>Clerkship</Tab>
      </TabList>

      <TabPanel>
        <TriageAndVitals />
      </TabPanel>

      <TabPanel>
        <Clerkship />
      </TabPanel>
    </Tabs>
  );
}
