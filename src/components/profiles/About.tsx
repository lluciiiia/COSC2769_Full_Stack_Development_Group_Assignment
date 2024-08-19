import { useState } from "react";
import OverviewInformation from "./OverviewInformation";
import WorkInformation from "./WorkInformation";
import EducationInformation from "./EducationInformation";
import ContactInformation from "./ContactInformation";
import RelationshipInformation from "./RelationshipInformation";

const componentRender = (tab: string) => {
  switch (tab) {
    case "Overview":
      return <OverviewInformation />;
    case "Work":
      return <WorkInformation/>;
    case "Education":
      return <EducationInformation/>;
    case "Contact":
      return <ContactInformation/>;
    case "Relationship":
      return <RelationshipInformation/>;
    default:
      return null;
  }
};

const About = () => {
  const [activeTab, setActiveTab] = useState("Overview");

  return (
    <div className="flex rounded-xl bg-[#FFF8E6] p-4">
      {/* Sidebar */}
      <div className="w-1/5 border-r border-gray-300 pr-4">
        <h2 className="mb-4 text-lg font-bold">About</h2>
        <ul>
          {["Overview", "Work", "Education", "Contact", "Relationship"].map(
            (tab: string) => {
              return (
                <li className="mb-2" key={tab}>
                  <button
                    onClick={() => setActiveTab(tab)}
                    className={`w-full rounded-md px-3 py-2 text-left text-sm font-semibold ${tab === activeTab ? "bg-yellow-300" : "opacity-50 hover:bg-gray-100"}`}
                  >
                    {tab}
                  </button>
                </li>
              );
            },
          )}
        </ul>
      </div>
      <div className="flex w-4/5 flex-col justify-center px-10 py-4">
        {componentRender(activeTab)}
      </div>
    </div>
  );
};
export default About;
