import React from "react";

type TabNavigationProps = {
  activeTab: string;
  setActiveTab: (tab: string) => void; // Correct the type of setActiveTab
};

const TabNavigation: React.FC<TabNavigationProps> = ({
  activeTab,
  setActiveTab,
}) => {
  return (
    <div className="mt-3 flex items-center justify-between px-10">
      {["Posts", "About", "Friends", "Photos"].map((tab) => {
        return (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`text-black text-opacity-50 ${activeTab === tab ? "text-opacity-100" : ""}`}
          >
            <p
              className={`${
                activeTab === tab
                  ? "border-b-2 border-[#FFC123]"
                  : "border-transparent"
              }`}
            >
              {tab}
            </p>
          </button>
        );
      })}
    </div>
  );
};
export default TabNavigation;
