import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../app/store";
import PostForm from "./PostForm";
import { createPost, updatePost } from "../../../controllers/posts";
import { getGroupsByUserId } from "../../../controllers/groups";
import { GroupType } from "../../../interfaces/Group";

const PostModal = ({
  isOpen,
  onClose,
  userId,
  post,
  groupId,
  isInGroupPage,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [content, setContent] = useState("");
  const [visibility, setVisibility] = useState<
    "PUBLIC" | "FRIEND_ONLY" | "GROUP"
  >("PUBLIC");
  const [groups, setGroups] = useState<GroupType[]>([]);
  const [selectedGroupId, setSelectedGroupId] = useState<string>("");
  const [images, setImages] = useState<string[]>([]);

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
      setImages(post.images || []);
      setSelectedGroupId(post.groupId || "");
    } else if (isOpen) {
      console.log("Creating new post");
      setContent("");
      setImages([]);
      setSelectedGroupId("");

      // Check if groupId is not empty and set visibility and selectedGroupId
      if (groupId !== "") {
        setVisibility("GROUP");
        setSelectedGroupId(groupId);
      } else {
        setVisibility("PUBLIC"); // Default to PUBLIC if groupId is empty
      }
    }

    const fetchGroups = async () => {
      try {
        const fetchedGroups: GroupType[] = await getGroupsByUserId(userId);
        setGroups(fetchedGroups);
        // Only set selectedGroupId if groups are fetched
        if (fetchedGroups?.length > 0 && selectedGroupId === "") {
          setSelectedGroupId(fetchedGroups[0]._id);
        }
      } catch (error) {
        console.error("Error fetching groups:", error);
      }
    };

    if (isOpen) fetchGroups();

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen, post, userId, groupId]);

  const handleSubmit = async (e) => {
    const finalGroupId = isInGroupPage ? groupId : selectedGroupId || undefined;
    const postParams: any = {
      creatorId: userId,
      content: content,
      visibility: visibility,
      images: images,
      groupId: visibility === "GROUP" ? finalGroupId : undefined,
      history: post?.history ? post.history : [],
      comments: post?.comments ? post.comments : [],
      createdAt: post?.createdAt ? post.createdAt : new Date(),
    };

    try {
      let result;
      if (post) {
        postParams._id = post._id;
        result = await dispatch(updatePost(postParams)).unwrap();
      } else {
        result = await dispatch(createPost(postParams)).unwrap();
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
      <div className="w-full max-w-xl rounded-lg bg-white p-6">
        <h2 className="mb-7 text-xl font-bold">
          {post ? "Edit Your Post" : "Buzz your mind!"}
        </h2>

        {/* Visibility Field */}
        <div className="mb-6">
          <label className="block text-lg font-bold text-gray-700">
            Visibility
          </label>
          {groupId ? (
            <p className="mt-2 block w-full rounded-md border border-gray-300 bg-gray-100 p-2 text-lg shadow-sm">
              Group
            </p>
          ) : (
            <select
              className="mt-2 block w-full cursor-pointer rounded-md border-gray-300 text-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              value={visibility}
              onChange={(e) =>
                setVisibility(
                  e.target.value as "PUBLIC" | "FRIEND_ONLY" | "GROUP",
                )
              }
            >
              <option value="PUBLIC">Public</option>
              <option value="FRIEND_ONLY">Friends Only</option>
              <option value="GROUP">Group</option>
            </select>
          )}
        </div>

        {/* Group Selection Field */}
        {visibility === "GROUP" && (
          <div className="mb-4">
            <label className="mb-2 block text-base font-medium">
              Selected Group:
            </label>
            {groupId ? (
              <p className="rounded border border-gray-300 bg-gray-100 p-2">
                {groupId ? (
                  <p className="rounded border border-gray-300 bg-gray-100 p-2">
                    {/* Find the group that matches the groupId */}
                    {groups.find((group) => group._id === groupId)?.name ||
                      "None"}
                  </p>
                ) : (
                  <p className="text-gray-500">No group selected</p>
                )}
              </p>
            ) : (
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
            )}
          </div>
        )}

        <PostForm
          content={content}
          setContent={setContent}
          visibility={visibility}
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
