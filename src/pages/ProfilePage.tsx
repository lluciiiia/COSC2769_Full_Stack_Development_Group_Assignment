const ProfilePage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center bg-gray-100">
      {/* Wallpaper Section */}
      <div
        className="relative h-64 w-full bg-cover bg-center"
        style={{
          backgroundImage: "url('https://via.placeholder.com/1200x300')",
        }}
      >
        {/* Profile Picture */}
        <div className="absolute -bottom-16 left-10">
          <img
            src="https://via.placeholder.com/150"
            alt="Profile"
            className="h-32 w-32 rounded-full border-4 border-white shadow-lg"
          />
        </div>
      </div>

      {/* Name and Tabs Section */}
      <div className="mt-16 w-full px-10">
        <div className="flex items-center justify-between">
          {/* Profile Name */}
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Aqua Konosuba</h1>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-6 flex space-x-8 border-b">
          <button className="border-b-4 border-transparent pb-4 text-gray-600 hover:border-blue-600 hover:text-blue-600">
            Posts
          </button>
          <button className="border-b-4 border-transparent pb-4 text-gray-600 hover:border-blue-600 hover:text-blue-600">
            Friends
          </button>
          <button className="border-b-4 border-transparent pb-4 text-gray-600 hover:border-blue-600 hover:text-blue-600">
            Groups
          </button>
          <button className="border-b-4 border-transparent pb-4 text-gray-600 hover:border-blue-600 hover:text-blue-600">
            Photos
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="mt-8 w-full max-w-4xl px-10">
        {/* Content related to the selected tab goes here */}
      </div>
    </div>
  );
};

export default ProfilePage;
