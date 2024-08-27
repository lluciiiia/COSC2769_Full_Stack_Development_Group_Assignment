import React from "react";
import { UserType } from "../../interfaces/Users";

const renderContent = (
  activeTab: string,
  user: UserType,
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void,
) => {
  switch (activeTab) {
    case "User Info":
      return (
        <>
          {renderInput("Name", user.name, handleInputChange, "name", "text")}
          {renderInput("Email", user.email, handleInputChange, "email", "text")}
          {renderInput(
            "Password",
            user.password,
            handleInputChange,
            "password",
            "text",
          )}
          {renderInput(
            "Bio",
            user.bio || "",
            handleInputChange,
            "bio",
            "text",
            true,
          )}
        </>
      );
    case "Work":
      return (
        <>
          {renderInput("Job", user.job || "", handleInputChange, "job", "text")}
          {renderInput(
            "Job Description",
            user.jobDescription || "",
            handleInputChange,
            "jobDescription",
            "text",
            true,
          )}
        </>
      );
    case "Education":
      return (
        <>
          {renderInput(
            "Education",
            user.education || "",
            handleInputChange,
            "education",
            "text",
          )}
          {renderInput(
            "Degree",
            user.degree || "",
            handleInputChange,
            "degree",
            "text",
          )}
          {renderInput(
            "Years",
            user.years || "",
            handleInputChange,
            "years",
            "text",
          )}
          {renderInput(
            "Education Description",
            user.educationDescription || "",
            handleInputChange,
            "educationDescription",
            "text",
            true,
          )}
        </>
      );
    case "Relationship":
      return (
        <>
          {renderInput(
            "Relationship Status",
            user.relationship || "",
            handleInputChange,
            "relationship",
            "text",
          )}
          {renderInput(
            "In Relationship With",
            user.inRelationship || "",
            handleInputChange,
            "inRelationship",
            "text",
          )}
        </>
      );
    case "Contact":
      return (
        <>
          {renderInput(
            "Phone Number",
            user.phoneNumber || "",
            handleInputChange,
            "phoneNumber",
            "text",
          )}
          {renderInput(
            "Location",
            user.location || "",
            handleInputChange,
            "location",
            "text",
          )}
          {renderInput(
            "Address",
            user.address || "",
            handleInputChange,
            "address",
            "text",
          )}
        </>
      );
    default:
      return null;
  }
};

export default renderContent;

const renderInput = (
  label: string,
  value: string,
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void,
  name: string,
  type: string,
  isTextArea: boolean = false,
) => (
  <div className="mb-4">
    <label className="mb-2 block">{label}:</label>
    {isTextArea ? (
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        className="w-full rounded border border-gray-300 px-3 py-2"
      />
    ) : (
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full rounded border border-gray-300 px-3 py-2"
      />
    )}
  </div>
);
