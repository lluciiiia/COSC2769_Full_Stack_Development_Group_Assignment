const ProfileInformation = ({ name }: { name: string | undefined }) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">{name}</h1>
      </div>
    </div>
  );
};
export default ProfileInformation;
