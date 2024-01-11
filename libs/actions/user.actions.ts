"use server";

import { revalidatePath } from "next/cache";
import { UserSchema } from "../../interface/schemaType";
import { connectToDb } from "../../utils/mongoose";
import User from "../model/user.model";
import { FilterQuery, SortOrder } from "mongoose";
import Community from "../model/community.model";
import Thread from "../model/thread.model";

export const updateUser = async (userData: UserSchema): Promise<void> => {
  try {
    await connectToDb();
    const newUser = await User.findOneAndUpdate(
      { id: userData.id },
      {
        id: userData.id,
        username: userData.username,
        bio: userData.bio,
        name: userData.name,
        image: userData.image,
        onBoarded: userData.onBoarded || false,
      },
      { upsert: true }
    );

    if (userData.path === "profile/edit") {
      revalidatePath(userData.path);
    }

    console.log("User created successfully" + newUser);
  } catch (error: any) {
    throw new Error("Failed to update/create user" + error.message);
  }
};

export const fetchUserById = async (userId: string) => {
  try {
    await connectToDb();
    const user = await User.findOne({ id: userId })
      .populate({
        path: "community",
        model: Community,
        select: "name image id",
      })
      .populate({
        path: "threads",
        model: Thread,
      });
    if (!user) return null;
    return user;
  } catch (error: any) {
    throw new Error("Failed to get the user" + error.message);
  }
};

interface getUserTypeProps {
  queryString?: string;
  pageNo?: number;
  pageSize?: number;
  userId?: string;
  orderBy?: SortOrder;
  path?: string;
}

export const fetchUsers = async ({
  userId,
  queryString = "",
  pageNo = 1,
  pageSize = 30,
  orderBy = "desc",
  path,
}: getUserTypeProps) => {
  try {
    await connectToDb();
    console.log(queryString);

    const regex = new RegExp(queryString, "i");
    const query: FilterQuery<typeof User> = {
      id: { $ne: userId },
    };

    if (queryString.trim() !== "") {
      query.$or = [
        { username: { $regex: regex } },
        { name: { $regex: regex } },
      ];
    }

    const sortOption = { createdAt: orderBy };
    const skipAmount = (pageNo - 1) * pageSize;

    const userQuery = User.find(query)
      .sort(sortOption)
      .skip(skipAmount)
      .limit(pageSize);

    const users = await userQuery.exec();
    const totalUserCount = await User.countDocuments(query);
    const isNext = totalUserCount > skipAmount + users.length;

    if (path) revalidatePath(path);

    console.log("Users: " + users);

    return { users, isNext };
  } catch (error: any) {
    console.log("Failed to fetch the user : " + error.message);
  }
};
