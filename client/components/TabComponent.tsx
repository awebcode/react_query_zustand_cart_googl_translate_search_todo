"use client";
import React, { ReactNode, useState } from "react";
import { Tab } from "./tab/Tab";
import { TabContent } from "./tab/TabContent";
type Ttab = {
  name: string;
  content: ReactNode;
};
type Ttabs = {
  tabs: Ttab[];
};
export const TabComponent = ({ tabs }: Ttabs) => {
  const [activeTab, setActiveTab] = useState(tabs[0].name);

  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <div className="flex">
        {tabs.map((tab: any) => (
          <Tab
            key={tab.name}
            tabName={tab.name}
            isActive={activeTab === tab.name}
            onClick={handleTabClick}
          />
        ))}
      </div>
      {tabs.map((tab: any) => (
        <TabContent key={tab.name} isActive={activeTab === tab.name}>
          {tab.content}
        </TabContent>
      ))}
    </div>
  );
};
