const ProfileHeader = () => {
  return (
    <div
      className="relative h-64 w-full bg-cover bg-center"
      style={{
        backgroundImage: "url('https://via.placeholder.com/1200x300')",
      }}
    >
      <div className="absolute -bottom-16 left-10">
        <img
          src="https://via.placeholder.com/150"
          alt="Profile"
          className="h-32 w-32 rounded-full border-4 border-white shadow-lg"
        />
      </div>
    </div>
  );
};
export default ProfileHeader;
