import React, { useState } from "react";

interface TabProps {
  tabs: { label: string; content: JSX.Element }[];
}

const GroupTab: React.FC<TabProps> = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState<number>(0);

  return (
    <div>
      <div className="flex space-x-4 border-b border-gray-300">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`py-2 px-4 ${activeTab === index ? "border-b-2 border-blue-500 text-blue-500" : "text-gray-600"}`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="mt-4">
        {tabs[activeTab].content}
      </div>
    </div>
  );
};

export default GroupTab;
