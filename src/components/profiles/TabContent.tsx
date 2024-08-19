import About from "./About";
import PostsList from "./PostsList";

const TabContent = ({ activeTab }: { activeTab: string }) => {
  switch (activeTab) {
    case "Posts":
      return <PostsList/>;
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
