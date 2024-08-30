import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../app/store";
import { PostParams } from "../../interfaces/Posts";
import PostForm from "./PostForm";
import {
  createPost,
  updatePost,
  getGroupsByUserId,
} from "../../controllers/posts";
import { GroupType } from "../../interfaces/Group";

const PostModal = ({ isOpen, onClose, userId, post }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [content, setContent] = useState("");
  const [visibility, setVisibility] = useState<
    "PUBLIC" | "FRIEND_ONLY" | "GROUP"
  >("PUBLIC");
  const [imageURL, setImageURL] = useState("");
  const [groups, setGroups] = useState<GroupType[]>([]);
  const [selectedGroupId, setSelectedGroupId] = useState<string>("");

  useEffect(() => {
    // Disable scrolling on the body when the modal is open
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    if (isOpen && post) {
      setContent(post.content);
      setVisibility(post.visibility);
      setImageURL(post.imageURL);
      setSelectedGroupId(post.groupId || "");
    } else if (isOpen) {
      setContent("");
      setVisibility("PUBLIC");
      setImageURL("");
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

    // Re-enable scrolling when the modal closes
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen, post, userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const postData: PostParams = {
        creatorId: userId,
        content,
        visibility,
        imageURL,
        groupId: visibility === "GROUP" ? selectedGroupId : undefined,
        history: post.history,
        createdAt: post.createdAt,
      };

      let result;
      if (post) {
        result = await dispatch(
          updatePost({ ...postData, _id: post._id }),
        ).unwrap();
        console.log("Post updated successfully:", result);
      } else {
        result = await dispatch(createPost(postData)).unwrap();
        console.log("Post created successfully:", result);
      }

      onClose();
      window.location.reload();
    } catch (error) {
      console.error("Error saving post:", error);
      alert("An error occurred while saving the post");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
      <div className="w-full max-w-lg rounded-lg bg-white p-6">
        <h2 className="mb-4 text-xl font-bold">
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
          imageURL={imageURL}
          setImageURL={setImageURL}
          onSubmit={handleSubmit}
          onClose={onClose}
          isEdit={!!post}
        />
      </div>
    </div>
  );
};

export default PostModal;
