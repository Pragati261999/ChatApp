import User from '../models/User.js';
import jwt from "jsonwebtoken";


export async function signup(req, res) {
  const { email, password, fullName } = req.body;
  try {
    if (!email || !password || !fullName) {
      return res.status(400).json({ message: "All fields ar required" });
    }
    if (password.lenth < 6) {
      return res.status(400).json({ message: "must be 6 digits " });

    }
    const emailFormat = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    if (!emailFormat.test(email)) {
      return res.status(400).json({ message: "invailid mail" });
    }
    const existemail = await User.findOne({ email });
    if (existemail) {
      return res.status(400).json({ message: "already exist!" });

    }
    const idx = Math.floor(Math.random() * 100) + 1;

    const randomavtar = `https://avatar.iran.liara.run/public/${idx}.png`;
    const newuser = new User.create({
      email, fullName, password, ProfilePic: randomavtar
    });
    const token = jwt.sign({ userId: newuser._id }, process.env.JWT_SECRET, {
      expireIn: "7d"
    })
    res.cookie("jwt", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,    // prevent xss attacks, 
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production"
    })
    res.status(201).json({ success: true, user: newuser })
    // });

  } catch (error) {

  }
  res.send("signup Routes");
}
export async function login(req, res) {
}
export function logout(req, res) {
  res.clearCookie("jwt");
  res.status(200).json({ success: true, message: "Logout successful" });
}

export async function onboard(req, res) {
  try {
    const userId = req.user._id;

    const { fullName, bio, nativeLanguage, learningLanguage, location } = req.body;

    if (!fullName || !bio || !nativeLanguage || !learningLanguage || !location) {
      return res.status(400).json({
        message: "All fields are required",
        missingFields: [
          !fullName && "fullName",
          !bio && "bio",
          !nativeLanguage && "nativeLanguage",
          !learningLanguage && "learningLanguage",
          !location && "location",
        ].filter(Boolean),
      });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        ...req.body,
        isOnboarded: true,
      },
      { new: true }
    );

    if (!updatedUser) return res.status(404).json({ message: "User not found" });

    try {
      await upsertStreamUser({
        id: updatedUser._id.toString(),
        name: updatedUser.fullName,
        image: updatedUser.profilePic || "",
      });
      console.log(`Stream user updated after onboarding for ${updatedUser.fullName}`);
    } catch (streamError) {
      console.log("Error updating Stream user during onboarding:", streamError.message);
    }

    res.status(200).json({ success: true, user: updatedUser });
  } catch (error) {
    console.error("Onboarding error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}