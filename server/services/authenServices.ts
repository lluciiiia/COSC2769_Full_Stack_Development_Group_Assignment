import User from "../models/user";
import bcrypt from "bcrypt";
export const regisNewAccount = async (data: any) => {
  try {
    const { email, name, password } = data;

    let user = await User.findOne({ email });
    if (user) {
      return { status: 400, message: "User already exists" };
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    user = new User({
      name,
      email,
      password: hashPassword,
      profilePictureURL: "",
      backgroundPictureURL: "",
      introduction: "",
      address: "",
      age: null,
      phoneNumber: "",
      activeStatus: true,
      education: "",
      location: "",
      relationship: "",
      job: "",
      jobDescription: "",
      degree: "",
      years: "",
      educationDescription: "",
      inRelationship: "",
      bio: "",
      friends: [],
    });

    await user.save();

    return { status: 201, message: "User registered successfully" };
  } catch (error) {
    console.error("Error in regisNewAccount:", error);
    return { status: 500, message: "Server error" };
  }
};

export const loginUser = async (req: any) => {
  try {
    const { email, password } = req.body;
    // Check if the user exists
    const user = await User.findOne({ email });

    if (!user) {
      return { status: 400, message: "User not found" };
    }

    // Validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return { status: 400, message: "Invalid credentials" };
    }

    // Check if the account is active
    if (!user.activeStatus) {
      return { status: 400, message: "Your account is inactive" };
    }

    // Save user information in session
    req.session.user = {
      id: user._id,
      isAuthenticated: true,
      name: user.name,
      profilePictureURL: user.profilePictureURL,
      backgroundPictureURL: user.backgroundPictureURL,
      isAdmin: user.isAdmin,
      email: user.email,
    };

    return {
      status: 200,
      message: "Login successful",
      user: req.session.user,
    };
  } catch (error) {
    console.error("Error in loginUser:", error);
    return { status: 500, message: "Server error" };
  }
};

export const logoutUser = (req: any, res: any) => {
  req.session.destroy((err: any) => {
    if (err) {
      return res.status(500).json({ message: "Failed to log out" });
    }

    // Clear cookies
    res.clearCookie("isAuthenticated");
    res.clearCookie("userId");
    res.clearCookie("userName");

    return res.status(200).json({ message: "Logout successful" });
  });
};
