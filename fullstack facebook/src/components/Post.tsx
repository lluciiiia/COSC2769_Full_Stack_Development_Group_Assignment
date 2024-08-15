import { LikeIcon } from "../icons/LikeIcon";
import { CommentIcon } from "../icons/CommentIcon";
interface Postparams {
    profileImage: string;
    profileName: string;
    postContent: string;
    postImage: string;
    profileLink: string; 
}
const Post: React.FC<Postparams> = ({ profileImage, profileName, postContent, postImage, profileLink }) => {
    return (
         <div className="max-w-md mx-auto bg-white rounded-lg overflow-hidden shadow-md">
            <div className="flex items-start p-6">
                {/* profile image + name */}
                <div className="flex-shrink-0 mr-4">
                    <img
                        src={profileImage}
                        alt="Profile"
                        className="rounded-full h-[50px] w-[50px]"
                    />
                </div>
                <div>
                    <div className="font-bold">{profileName}</div>
                    <a href={profileLink} className="text-gray-500 hover:underline text-sm mt-1">
                        @{profileName}
                    </a> 
                </div>
            </div>
                
            
            
          
          {/*  post text + image */}
            <div className="text-center ">
                    <p className="text-lg text-left font-semibold mb-2 ml-5">{postContent}</p>
                    <img
                        src={postImage}
                        alt="Post Content"
                        className="w-full rounded-lg h-[300px] w [50px]"
                    />
            </div>

            {/* react buton + comment*/}
                <div className="flex justify-between p-4">
                <button className="flex items-center space-x-2 text-gray-500 hover:bg-blue-100 rounded px-3 py-1">
                <LikeIcon className="w-5 h-5" fill="currentColor" />

                   <span>Like</span>
                </button>
                <button className="flex items-center space-x-2 text-gray-500 hover:bg-gray-100 rounded px-3 py-1">
                    <CommentIcon />
                    <span>Comment</span>
                </button>
            </div>

        </div>
    );
};

export default Post;
