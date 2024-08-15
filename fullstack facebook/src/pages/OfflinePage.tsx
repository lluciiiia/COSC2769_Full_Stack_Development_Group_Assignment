import logo from "../assets/images/icons/logo.png";

const OfflinePage = () => {
  return (
    <div>
      <div className="bg-black h-10"></div>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <img src={logo} alt="" className="h-40 w-auto object-contain" />
        <h1 className="text-6xl font-light">Offline</h1>
        <h1 className="text-5xl font-thin">BuZznet will be back shortly </h1>
      </div>
    </div>
  );
};
export default OfflinePage;
