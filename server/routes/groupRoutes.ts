import express from "express";
import Group from "../models/group";
import { acceptGroup, getAllGroups, getGroupsByUserId, rejectGroup } from "../services/groupservice";
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const groups = await Group.find();
    res.json(groups);
  } catch (error) {
    console.error("Error fetching groups: ", error);
    res.status(500).json({ error: "Failed to fetch groups" });
  }
});

router.get("/all", async (req, res) => {
  try {
    const groups = await getAllGroups();
    res.json(groups);
  } catch (error) {
    console.error("Error fetching groups: ", error);
    res.status(500).json({ error: "Failed to fetch groups" });
  }
});

router.get("/user/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const groups = await getGroupsByUserId(userId);
    res.json(groups);
  } catch (error) {
    console.error("Error fetching groups by user ID:", error);
    res.status(500).json({ error: "Failed to fetch groups by user ID" });
  }
});

router.post("/", async (req, res) => {
  try {
    const newGroup = new Group(req.body);
    console.log(newGroup);
    await newGroup.save();
    res.status(201).json({ message: "Group created", user: newGroup });
  } catch (error: any) {
    console.error("Error creating group", error);

    if (error.name === "ValidationError") {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: "Failed to create group" });
  }
});

router.put("/accepted/:id", async (req, res) => {
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

router.put("/:id", async (req, res) => {
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

router.delete("/:id", async (req, res) => {
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
