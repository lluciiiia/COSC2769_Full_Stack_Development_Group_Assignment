import Navbar from "../components/Navbar";
import Post from "../components/Post.tsx";

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="mt-[70px] flex h-full flex-col items-center gap-6 overflow-y-auto">
        <Post
          profileImage="https://i.redd.it/07cowjrlyhda1.jpg"
          profileName="Aqua konosuba"
          postContent="Receive grades yesterday"
          postImage="https://steamuserimages-a.akamaihd.net/ugc/1013818009148019610/187908C668F299A58F2E07A25874D7075CE5F17F/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false"
          profileLink="https://example.com/profile/Konosuba"
        />
        <Post
          profileImage="https://i.redd.it/07cowjrlyhda1.jpg"
          profileName="Aqua konosuba"
          postContent="Receive grades yesterday"
          postImage="https://steamuserimages-a.akamaihd.net/ugc/1013818009148019610/187908C668F299A58F2E07A25874D7075CE5F17F/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false"
          profileLink="https://example.com/profile/Konosuba"
        />
        <Post
          profileImage="https://i.redd.it/07cowjrlyhda1.jpg"
          profileName="Aqua konosuba"
          postContent="Receive grades yesterday"
          postImage="https://steamuserimages-a.akamaihd.net/ugc/1013818009148019610/187908C668F299A58F2E07A25874D7075CE5F17F/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false"
          profileLink="https://example.com/profile/Konosuba"
        />
      </div>
    </>
  );
};
export default Home;
