// ProfileInformation.tsx
const ProfileInformation = ({
  name,
  bio,
  onEditProfile
}: {
  name: string | undefined;
  bio: string | undefined;
  onEditProfile: () => void;
}) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">{name}</h1>
        <p className="mt-2 text-gray-600">{bio}</p>
      </div>
      <button
        onClick={onEditProfile}
        className="ml-4 px-4 py-2 text-gray-800 bg-white border border-black rounded shadow hover:bg-gray-100"
      >
        Edit Profile
      </button>
    </div>
  );
};
export default ProfileInformation;
