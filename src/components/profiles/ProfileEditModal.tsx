import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { UserType } from '../../interfaces/Users';
import { updateUser } from '../../features/userSlice';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserType;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, user }) => {
  const [activeTab, setActiveTab] = useState('UserInfo');
  const [name, setName] = useState(user.name || '');
  const [email, setEmail] = useState(user.email || '');
  const [password, setPassword] = useState('');
  const [bio, setBio] = useState(user.Bio || '');
  const [job, setJob] = useState(user.job || '');
  const [jobDescription, setJobDescription] = useState(user.jobDescription || '');
  const [education, setEducation] = useState(user.education || '');
  const [degree, setDegree] = useState(user.degree || '');
  const [years, setYears] = useState(user.years || '');
  const [educationDescription, setEducationDescription] = useState(user.educationDescription || '');
  const [relationship, setRelationship] = useState(user.relationship || '');
  const [inRelationship, setInRelationship] = useState(user.inRelationship || '');
  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber || '');
  const [location, setLocation] = useState(user.location || '');
  const [address, setAddress] = useState(user.address || '');
  const dispatch = useDispatch();

  if (!isOpen) return null;

  const handleSubmit = () => {
    dispatch(updateUser({
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
      address
    }));
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg w-1/3">
        <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>
        
        {/* Tabs */}
        <div className="mb-4 border-b border-gray-200">
          <nav className="flex space-x-4">
            <button 
              onClick={() => setActiveTab('UserInfo')}
              className={`px-3 py-2 ${activeTab === 'UserInfo' ? 'border-b-2 border-blue-500' : 'border-none'}`}>
              User Info
            </button>
            <button 
              onClick={() => setActiveTab('Work')}
              className={`px-3 py-2 ${activeTab === 'Work' ? 'border-b-2 border-blue-500' : 'border-none'}`}>
              Work
            </button>
            <button 
              onClick={() => setActiveTab('Education')}
              className={`px-3 py-2 ${activeTab === 'Education' ? 'border-b-2 border-blue-500' : 'border-none'}`}>
              Education
            </button>
            <button 
              onClick={() => setActiveTab('Relationship')}
              className={`px-3 py-2 ${activeTab === 'Relationship' ? 'border-b-2 border-blue-500' : 'border-none'}`}>
              Relationship
            </button>
            <button 
              onClick={() => setActiveTab('Contact')}
              className={`px-3 py-2 ${activeTab === 'Contact' ? 'border-b-2 border-blue-500' : 'border-none'}`}>
              Contact
            </button>
          </nav>
        </div>

        {/* Content */}
        <div className="mb-4">
          {activeTab === 'UserInfo' && (
            <>
              <div className="mb-4">
                <label className="block mb-2">Name:</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Email:</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Password:</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter new password"
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Bio:</label>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                />
              </div>
            </>
          )}

          {activeTab === 'Work' && (
            <>
              <div className="mb-4">
                <label className="block mb-2">Job:</label>
                <input
                  type="text"
                  value={job}
                  onChange={(e) => setJob(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Job Description:</label>
                <textarea
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                />
              </div>
            </>
          )}

          {activeTab === 'Education' && (
            <>
              <div className="mb-4">
                <label className="block mb-2">Education:</label>
                <input
                  type="text"
                  value={education}
                  onChange={(e) => setEducation(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Degree:</label>
                <input
                  type="text"
                  value={degree}
                  onChange={(e) => setDegree(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Years:</label>
                <input
                  type="text"
                  value={years}
                  onChange={(e) => setYears(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Education Description:</label>
                <textarea
                  value={educationDescription}
                  onChange={(e) => setEducationDescription(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                />
              </div>
            </>
          )}

          {activeTab === 'Relationship' && (
            <>
              <div className="mb-4">
                <label className="block mb-2">Relationship Status:</label>
                <input
                  type="text"
                  value={relationship}
                  onChange={(e) => setRelationship(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">In Relationship With:</label>
                <input
                  type="text"
                  value={inRelationship}
                  onChange={(e) => setInRelationship(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                />
              </div>
            </>
          )}

          {activeTab === 'Contact' && (
            <>
              <div className="mb-4">
                <label className="block mb-2">Phone Number:</label>
                <input
                  type="text"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Location:</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Address:</label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                />
              </div>
            </>
          )}
        </div>

        {/* Buttons */}
        <div className="flex justify-end">
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Save
          </button>
          <button
            onClick={onClose}
            className="ml-2 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
