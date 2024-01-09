import { connectToDb } from "../../utils/mongoose";
import Community from "../model/community.model";
import User from "../model/user.model";

interface CommunityCardProps {
  name: string;
  bio: string;
  image: string;
  onBoarded?: boolean;
  userId: string;
}

export const createCommunity = async (
  id: string,
  name: string,
  bio: string,
  image: string,
  onBoarded: string,
  createdBy: string
) => {
  try {
    await connectToDb();
    const user = await User.findOne({ id: createdBy });
    if (!user) return null;

    const newCommunity = await Community.create({
      name,
      bio,
      image,
      onBoarded,
      createdBy,
    });

    user.community.push(newCommunity._id);
    await user.save();

    return newCommunity;
  } catch (error: any) {
    console.log("Failed to create community :", error.message);
  }
};
