import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../app/store";
import { createPost, updatePost, getGroupsByUserId } from "../../controllers/posts";
import { GroupType } from "../../interfaces/Group";
import PostForm from "./PostForm";

const PostModal = ({ isOpen, onClose, userId, post }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [content, setContent] = useState("");
  const [visibility, setVisibility] = useState<"PUBLIC" | "FRIEND_ONLY" | "GROUP">("PUBLIC");
  const [groups, setGroups] = useState<GroupType[]>([]);
  const [selectedGroupId, setSelectedGroupId] = useState<string>("");
  const [images, setImages] = useState<string[]>([]); // Change File[] to string[]

  useEffect(() => {

    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    if (isOpen && post) {
      console.log("Editing post:", post);
      setContent(post.content);
      setVisibility(post.visibility);
      setImages(post.images || []); // Expecting post.images to be string[]
      setSelectedGroupId(post.groupId || "");
    } else if (isOpen) {
      console.log("Creating new post");
      setContent("");
      setVisibility("PUBLIC");
      setImages([]);
      setSelectedGroupId("");
    }

    const fetchGroups = async () => {
      try {
        const fetchedGroups: GroupType[] = await getGroupsByUserId(userId);
        setGroups(fetchedGroups);
        if (fetchedGroups.length > 0) {
          setSelectedGroupId(fetchedGroups[0]._id);
        } else {
          setSelectedGroupId("");
        }
      } catch (error) {
        console.error("Error fetching groups:", error);
      }
    };

    if (isOpen) {
      fetchGroups();
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen, post, userId]);

  const handleSubmit = async (e) => {
    // Log the data structure to be sent
    const postParams = {
        creatorId: userId,
        content: content,
        visibility: visibility,
        images: images, // Use the base64 images
        groupId: visibility === "GROUP" ? selectedGroupId : undefined,
    };


    try {
        // Directly use the postParams object
        let result;
        if (post) {
            // postParams._id = post._id; // Add the post ID for updates
            // result = await dispatch(updatePost(postParams)).unwrap(); // Use the updated postParams

        } else {
            result = await dispatch(createPost(postParams)).unwrap(); // Use the new postParams

        }

        onClose();
        window.location.reload(); 
    } catch (error) {
        console.error("Error saving post:", error); // Log any errors that occur
        alert("An error occurred while saving the post");
    }
};

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
      <div className="w-full max-w-xl rounded-lg bg-white p-6">
        <h2 className="mb-7 text-xl font-bold">
          {post ? "Edit Your Post" : "Buzz your mind!"}
        </h2>
        {visibility === "GROUP" && (
          <div className="mb-4">
            <label className="mb-2 block text-base font-medium">
              Select Group:
            </label>
            <select
              value={selectedGroupId}
              onChange={(e) => setSelectedGroupId(e.target.value)}
              className="block w-full rounded border border-gray-300 p-2 text-base"
            >
              {groups.map((group: GroupType) => (
                <option key={group._id} value={group._id}>
                  {group.name}
                </option>
              ))}
            </select>
          </div>
        )}
        <PostForm
          content={content}
          setContent={setContent}
          visibility={visibility}
          setVisibility={setVisibility}
          images={images}
          setImages={setImages}
          onSubmit={handleSubmit}  
          onClose={onClose}
          isEdit={!!post}
        />
      </div>
    </div>
  );
};

export default PostModal;
