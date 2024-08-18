import About from "./About";

const TabContent = ({ activeTab }: { activeTab: string }) => {
  switch (activeTab) {
    case "Posts":
      return <h1>Posts</h1>;
    case "About":
      return <About />;
    case "Friends":
      return <h1>Friends</h1>;
    case "Photos":
      return <h1>Photos</h1>;
    default:
      return null;
  }
};

export default TabContent;
