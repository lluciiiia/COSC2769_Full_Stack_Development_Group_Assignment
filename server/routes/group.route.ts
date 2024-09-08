import express from "express";
import Group from "../models/group";
import {
  acceptGroup,
  getAllGroups,
  removeMemberFromGroup,
  getGroupsByUserId,
  createGroup,
} from "../services/group.service";
import { isAuthenticated } from "../middleware/authenticate";
const router = express.Router();

router.get("/",isAuthenticated ,async (req, res) => {
  try {
    const groups = await Group.find().populate({
      path: "members",
      select: "name email profilePictureURL", // Only select these fields from the User documents
    });

    res.json(groups);
  } catch (error) {
    console.error("Error fetching groups: ", error);
    res.status(500).json({ error: "Failed to fetch groups" });
  }
});

router.get("/:groupId",isAuthenticated ,async (req, res) => {
  try {
    const group = await Group.findById(req.params.groupId);

    res.json(group);
  } catch (error) {
    console.error("Error fetching group with members:", error);
    res.status(500).json({ error: "Failed to fetch group with members" });
  }
});

router.get("/all",isAuthenticated ,async (req, res) => {
  try {
    const groups = await getAllGroups();
    res.json(groups);
  } catch (error) {
    console.error("Error fetching groups: ", error);
    res.status(500).json({ error: "Failed to fetch groups" });
  }
});

router.get("/user/:userId",isAuthenticated ,async (req, res) => {
  try {
    const userId = req.params.userId;
    const groups = await getGroupsByUserId(userId);
    res.json(groups);
  } catch (error) {
    console.error("Error fetching groups by user ID:", error);
    res.status(500).json({ error: "Failed to fetch groups by user ID" });
  }
});

router.post("/",isAuthenticated ,async (req, res) => {
  try {
    const newGroupData = {
      groupAdmin: req.body.groupAdmin,
      name: req.body.name,
      visibility: req.body.visibility,
      imageURL: req.body.imageURL,
      backgroundImageURL: req.body.backgroundImageURL,
      description: req.body.description,
    };

    const group = await createGroup(newGroupData);

    if (!group) {
      return res.status(500).json({ message: "Failed to create group" });
    }

    res.status(201).json({ message: "Group created", group });
  } catch (error: any) {
    console.error("Error creating group", error);

    if (error.name === "ValidationError") {
      return res.status(400).json({ error: error.message });
    }

    res.status(500).json({ error: "Failed to create group" });
  }
});

router.put("/leave/:groupId",isAuthenticated, async (req, res) => {
  try {
    const groupId = req.params.groupId;
    const userId = req.session.user.id;

    const updatedGroup = await removeMemberFromGroup(groupId, userId);
    if (!updatedGroup) {
      return res.status(404).json({ message: "Group not found" });
    }

    return res.json({
      message: "Member deleted successfully",
      group: updatedGroup,
    });
  } catch (error) {
    console.error("Error accepting group:", error);
    res.status(500).json({ error: "Failed to accept group" });
  }
});

router.put("/accepted/:id",isAuthenticated ,async (req, res) => {
  try {
    const groupId = req.params.id;
    const updatedGroup = await acceptGroup(groupId); // Call the service function

    if (!updatedGroup) {
      return res.status(404).json({ message: "Group not found" });
    }

    res.json({ message: "Group accepted successfully" }); // Send a confirmation message
  } catch (error) {
    console.error("Error accepting group:", error);
    res.status(500).json({ error: "Failed to accept group" });
  }
});

router.put("/:id",isAuthenticated ,async (req, res) => {
  try {
    const groupId = req.params.id;
    const updatedData = req.body;

    const updatedGroup = await Group.findByIdAndUpdate(groupId, updatedData, {
      new: true,
    });

    if (!updatedGroup) {
      return res.status(404).json({ message: "Group not found" });
    }

    res.json(updatedGroup);
  } catch (error) {
    console.error("Error updating group:", error);
    res.status(500).json({ error: "Failed to update group" });
  }
});

//delete member out of the group
router.delete("/:groupId/members/:userId",isAuthenticated ,async (req, res) => {
  try {
    const groupId = req.params.groupId;
    const userId = req.params.userId;

    const result = await removeMemberFromGroup(groupId, userId);

    res.json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id",isAuthenticated ,async (req, res) => {
  try {
    const groupId = req.params.id;
    await Group.findByIdAndDelete(groupId);
    res.json({ message: "Group deleted" });
  } catch (error) {
    console.error("Error deleting Group:", error);
    res.status(500).json({ error: "Failed to delete group" });
  }
});
export default router;
