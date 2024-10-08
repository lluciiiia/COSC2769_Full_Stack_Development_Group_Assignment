import express from "express";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    // Check if session and user are defined
    if (!req.session || !req.session.user) {
      return res.status(401).json({ isAuthenticated: false });
    }

    const isAuthenticated = req.session.user.isAuthenticated;
    const isAdmin = req.session.user.isAdmin;
    const id = req.session.user.id;
    const name = req.session.user.name;
    const profilePictureURL = req.session.user.profilePictureURL;

    if (!isAuthenticated) {
      return res.status(403).json({
        isAuthenticated: false,
        isAdmin: false,
        id: "",
        name: "",
        profilePictureURL: "",
      });
    }

    // If authenticated, return the status
    return res
      .status(200)
      .json({ isAuthenticated, isAdmin, id, name, profilePictureURL });
  } catch (error) {
    console.error(error); // Log the error for debugging
    return res
      .status(500)
      .json({ message: "Error fetching authentication status" });
  }
});

export default router;
