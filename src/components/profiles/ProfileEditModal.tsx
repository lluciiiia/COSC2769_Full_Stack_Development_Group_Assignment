import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { UserType } from "../../interfaces/Users";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserType;
}

const ProfileEditModal: React.FC<ModalProps> = ({ isOpen, onClose, user }) => {
  const [activeTab, setActiveTab] = useState("UserInfo");
  const [name, setName] = useState(user.name || "");
  const [email, setEmail] = useState(user.email || "");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState(user.bio || "");
  const [job, setJob] = useState(user.job || "");
  const [jobDescription, setJobDescription] = useState(
    user.jobDescription || "",
  );
  const [education, setEducation] = useState(user.education || "");
  const [degree, setDegree] = useState(user.degree || "");
  const [years, setYears] = useState(user.years || "");
  const [educationDescription, setEducationDescription] = useState(
    user.educationDescription || "",
  );
  const [relationship, setRelationship] = useState(user.relationship || "");
  const [inRelationship, setInRelationship] = useState(
    user.inRelationship || "",
  );
  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber || "");
  const [location, setLocation] = useState(user.location || "");
  const [address, setAddress] = useState(user.address || "");
  const dispatch = useDispatch();

  if (!isOpen) return null;

  const handleSubmit = () => {
    dispatch(
      updateUser({
        ...user,
        name,
        email,
        password: password || user.password,
        bio,
        job,
        jobDescription,
        education,
        degree,
        years,
        educationDescription,
        relationship,
        inRelationship,
        phoneNumber,
        location,
        address,
      }),
    );
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="w-1/3 rounded bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-xl font-semibold">Edit Profile</h2>

        {/* Tabs */}
        <div className="mb-4 border-b border-gray-200">
          <nav className="flex space-x-4">
            <button
              onClick={() => setActiveTab("UserInfo")}
              className={`px-3 py-2 ${activeTab === "UserInfo" ? "border-b-2 border-blue-500" : "border-none"}`}
            >
              User Info
            </button>
            <button
              onClick={() => setActiveTab("Work")}
              className={`px-3 py-2 ${activeTab === "Work" ? "border-b-2 border-blue-500" : "border-none"}`}
            >
              Work
            </button>
            <button
              onClick={() => setActiveTab("Education")}
              className={`px-3 py-2 ${activeTab === "Education" ? "border-b-2 border-blue-500" : "border-none"}`}
            >
              Education
            </button>
            <button
              onClick={() => setActiveTab("Relationship")}
              className={`px-3 py-2 ${activeTab === "Relationship" ? "border-b-2 border-blue-500" : "border-none"}`}
            >
              Relationship
            </button>
            <button
              onClick={() => setActiveTab("Contact")}
              className={`px-3 py-2 ${activeTab === "Contact" ? "border-b-2 border-blue-500" : "border-none"}`}
            >
              Contact
            </button>
          </nav>
        </div>

        {/* Content */}
        <div className="mb-4">
          {activeTab === "UserInfo" && (
            <>
              <div className="mb-4">
                <label className="mb-2 block">Name:</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded border border-gray-300 px-3 py-2"
                />
              </div>
              <div className="mb-4">
                <label className="mb-2 block">Email:</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded border border-gray-300 px-3 py-2"
                />
              </div>
              <div className="mb-4">
                <label className="mb-2 block">Password:</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter new password"
                  className="w-full rounded border border-gray-300 px-3 py-2"
                />
              </div>
              <div className="mb-4">
                <label className="mb-2 block">Bio:</label>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full rounded border border-gray-300 px-3 py-2"
                />
              </div>
            </>
          )}

          {activeTab === "Work" && (
            <>
              <div className="mb-4">
                <label className="mb-2 block">Job:</label>
                <input
                  type="text"
                  value={job}
                  onChange={(e) => setJob(e.target.value)}
                  className="w-full rounded border border-gray-300 px-3 py-2"
                />
              </div>
              <div className="mb-4">
                <label className="mb-2 block">Job Description:</label>
                <textarea
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  className="w-full rounded border border-gray-300 px-3 py-2"
                />
              </div>
            </>
          )}

          {activeTab === "Education" && (
            <>
              <div className="mb-4">
                <label className="mb-2 block">Education:</label>
                <input
                  type="text"
                  value={education}
                  onChange={(e) => setEducation(e.target.value)}
                  className="w-full rounded border border-gray-300 px-3 py-2"
                />
              </div>
              <div className="mb-4">
                <label className="mb-2 block">Degree:</label>
                <input
                  type="text"
                  value={degree}
                  onChange={(e) => setDegree(e.target.value)}
                  className="w-full rounded border border-gray-300 px-3 py-2"
                />
              </div>
              <div className="mb-4">
                <label className="mb-2 block">Years:</label>
                <input
                  type="text"
                  value={years}
                  onChange={(e) => setYears(e.target.value)}
                  className="w-full rounded border border-gray-300 px-3 py-2"
                />
              </div>
              <div className="mb-4">
                <label className="mb-2 block">Education Description:</label>
                <textarea
                  value={educationDescription}
                  onChange={(e) => setEducationDescription(e.target.value)}
                  className="w-full rounded border border-gray-300 px-3 py-2"
                />
              </div>
            </>
          )}

          {activeTab === "Relationship" && (
            <>
              <div className="mb-4">
                <label className="mb-2 block">Relationship Status:</label>
                <input
                  type="text"
                  value={relationship}
                  onChange={(e) => setRelationship(e.target.value)}
                  className="w-full rounded border border-gray-300 px-3 py-2"
                />
              </div>
              <div className="mb-4">
                <label className="mb-2 block">In Relationship With:</label>
                <input
                  type="text"
                  value={inRelationship}
                  onChange={(e) => setInRelationship(e.target.value)}
                  className="w-full rounded border border-gray-300 px-3 py-2"
                />
              </div>
            </>
          )}

          {activeTab === "Contact" && (
            <>
              <div className="mb-4">
                <label className="mb-2 block">Phone Number:</label>
                <input
                  type="text"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full rounded border border-gray-300 px-3 py-2"
                />
              </div>
              <div className="mb-4">
                <label className="mb-2 block">Location:</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full rounded border border-gray-300 px-3 py-2"
                />
              </div>
              <div className="mb-4">
                <label className="mb-2 block">Address:</label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full rounded border border-gray-300 px-3 py-2"
                />
              </div>
            </>
          )}
        </div>

        {/* Buttons */}
        <div className="flex justify-end">
          <button
            onClick={handleSubmit}
            className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          >
            Save
          </button>
          <button
            onClick={onClose}
            className="ml-2 rounded bg-gray-200 px-4 py-2 hover:bg-gray-300"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileEditModal;
